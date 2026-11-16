#!/usr/bin/env python3
"""Regenerate every Pasujki sound: music loops + SFX -> assets/audio/*.m4a

    tools/audio/.venv/bin/python tools/audio/generate.py          # everything
    tools/audio/.venv/bin/python tools/audio/generate.py sfx      # only SFX
    tools/audio/.venv/bin/python tools/audio/generate.py music    # only music

Setup once:  python3 -m venv tools/audio/.venv && tools/audio/.venv/bin/pip install numpy scipy
Needs ffmpeg on PATH (or /opt/homebrew/bin/ffmpeg).
Deterministic: fixed RNG seeds, so the output is reproducible.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np
from scipy import signal
from scipy.io import wavfile

sys.path.insert(0, str(Path(__file__).parent))
from synth import (SR, add_at, release_env, attack_env, bass, circular_reverb, fold, hz, kalimba, linear_reverb, make_ir,  # noqa: E402
                   marimba, master_sos, midi, pad, pan_stereo, periodic_filter, pluck, shaker, sine_glide,
                   soft_kick, tail_fade, xylophone)

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "audio"
BUILD = Path(__file__).parent / "build"
FFMPEG = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"

MUSIC_LUFS = -23.0  # docs/CALM_DESIGN_RESEARCH.md: ~-23 LUFS, >= 6 dB under SFX
MUSIC_MAX_TP = -3.0


# ============================================================ helpers

def parse(seq: str):
    """'C5:1 r:0.5 A4:0.5' -> [(beat_offset, dur_beats, midi|None)]."""
    out, pos = [], 0.0
    for tok in seq.split():
        n, d = tok.split(":")
        d = float(d)
        out.append((pos, d, None if n == "r" else midi(n)))
        pos += d
    return out, pos


def measure(wav: Path) -> dict:
    r = subprocess.run([FFMPEG, "-hide_banner", "-nostats", "-i", str(wav), "-af",
                        "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    txt = r.stderr
    j = json.loads(txt[txt.rindex("{"): txt.rindex("}") + 1])
    return {"I": float(j["input_i"]), "TP": float(j["input_tp"])}


def write_wav(path: Path, x: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    wavfile.write(path, SR, x.astype(np.float32))


AFCONVERT = shutil.which("afconvert")  # macOS: Apple AAC encoder (better first-frame quality, writes iTunSMPB gapless info)


def encode(wav: Path, m4a: Path, kbps: int) -> None:
    """WAV -> AAC .m4a. Prefers Apple's encoder (afconvert) - its gapless metadata (iTunSMPB:
    priming/padding/exact length) is honoured by AVFoundation (iOS) and ExoPlayer (Android), so
    loops stay sample-exact. Falls back to ffmpeg's native AAC encoder elsewhere."""
    m4a.parent.mkdir(parents=True, exist_ok=True)
    if m4a.exists():
        m4a.unlink()
    if AFCONVERT:
        subprocess.run([AFCONVERT, "-f", "m4af", "-d", "aac", "-b", str(kbps * 1000), "-q", "127",
                        str(wav), str(m4a)], check=True)
    else:
        subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav), "-c:a", "aac",
                        "-b:a", f"{kbps}k", "-map_metadata", "-1", "-movflags", "+faststart", str(m4a)], check=True)


# ============================================================ music

class Loop:
    """Beat-grid renderer for a seamless loop. spb = samples per beat (multiple of 16 so the
    loop length is a whole number of 1024-sample AAC frames -> no padding at the loop end)."""

    def __init__(self, spb: int, beats: int, seed: int):
        self.spb, self.beats = spb, beats
        self.L = spb * beats
        self.dry = np.zeros((self.L + 6 * SR, 2))
        self.send = np.zeros_like(self.dry)
        self.rng = np.random.default_rng(seed)

    @property
    def bpm(self) -> float:
        return SR * 60 / self.spb

    def beat_s(self) -> float:
        return self.spb / SR

    def put(self, mono_or_st: np.ndarray, beat: float, pan: float = 0.0, gain: float = 1.0,
            rev: float = 0.25, jitter: float = 0.004) -> None:
        x = mono_or_st if mono_or_st.ndim == 2 else pan_stereo(mono_or_st, pan)
        start = int(round(beat * self.spb + self.rng.uniform(0, jitter) * SR))
        add_at(self.dry, x * gain, start)
        if rev:
            add_at(self.send, x * gain * rev, start)

    def melody(self, inst, seq: str, start_beat: float, pan=0.0, gain=1.0, rev=0.3, octave=0, vel=(0.85, 1.0)):
        notes, length = parse(seq)
        for off, d, m in notes:
            if m is None:
                continue
            v = self.rng.uniform(*vel)
            self.put(inst(hz(m + 12 * octave), v, d * self.beat_s()), start_beat + off, pan, gain, rev)
        return length

    def render(self, ir: np.ndarray, wet: float = 1.0) -> np.ndarray:
        dry = fold(self.dry, self.L)
        send = fold(self.send, self.L)
        mix = dry + wet * circular_reverb(send, ir)
        return periodic_filter(mix, master_sos())


def spb_for(bpm: float) -> int:
    return int(round(SR * 60 / bpm / 16)) * 16


# instrument adapters with a common signature (f, vel, dur_seconds)
def I_marimba(f, v, d):
    return marimba(f, v)


def I_xylo(f, v, d):
    return xylophone(f, v)


def I_kalimba(f, v, d):
    return kalimba(f, v)


def I_pluck(f, v, d):
    return pluck(f, v, dur=min(d, 0.8))


def I_bass(f, v, d):
    return bass(f, v, dur=max(0.12, d * 0.9))


def chord_notes(names: str) -> list[float]:
    return [hz(midi(n)) for n in names.split()]


def menu_loop() -> tuple[np.ndarray, dict]:
    """F major, ~96 BPM, 16 bars. Kalimba melody, marimba arpeggios, pad, round bass, soft shaker."""
    lp = Loop(spb_for(96), 64, seed=11)
    chords = [("F3 A3 C4 F4", "F2", ["F3", "C4", "A4", "C4"]),
              ("D3 F3 A3 D4", "D2", ["D3", "A3", "F4", "A3"]),
              ("Bb2 D3 F3 Bb3", "Bb1", ["Bb2", "F3", "D4", "F3"]),
              ("C3 E3 G3 C4", "C2", ["C3", "G3", "E4", "G3"])]
    melody = [
        "C5:1 A4:0.5 C5:0.5 D5:1 C5:1", "A4:1.5 G4:0.5 F4:1 r:1",
        "D5:1 C5:0.5 D5:0.5 F5:1 D5:1", "C5:2 G4:1 r:1",
        "C5:1 A4:0.5 C5:0.5 D5:1 F5:1", "D5:1.5 C5:0.5 A4:1 r:1",
        "G4:1 A4:0.5 C5:0.5 D5:1 C5:0.5 A4:0.5", "G4:3 r:1",
        "F5:1 D5:0.5 C5:0.5 A4:2", "D5:1 C5:0.5 A4:0.5 D5:2",
        "F5:1 D5:1 C5:1 D5:1", "C5:1.5 G4:0.5 C5:2",
        "C5:1 A4:0.5 C5:0.5 D5:1 C5:1", "A4:1.5 G4:0.5 A4:1 D5:1",
        "C5:1 A4:0.5 G4:0.5 F4:1 G4:1", "G4:2 r:2",
    ]
    for bar in range(16):
        b0 = bar * 4
        ch, root, arp = chords[bar % 4]
        lp.put(pad(chord_notes(ch), 4 * lp.beat_s(), vel=1.0, rng=lp.rng), b0, gain=0.16, rev=0.35)
        lp.put(bass(hz(midi(root)), 0.9, dur=1.6 * lp.beat_s()), b0, gain=0.42, rev=0.05)
        lp.put(bass(hz(midi(root) + 7), 0.7, dur=0.8 * lp.beat_s()), b0 + 2.5, gain=0.32, rev=0.05)
        lp.put(bass(hz(midi(root)), 0.75, dur=0.9 * lp.beat_s()), b0 + 3, gain=0.34, rev=0.05)
        for i in range(8):
            n = arp[i % 4]
            v = 0.8 if i % 2 == 0 else 0.6
            lp.put(marimba(hz(midi(n) + 12), v * lp.rng.uniform(0.9, 1.0)), b0 + i * 0.5,
                   pan=-0.35, gain=0.13, rev=0.3)
        lp.melody(I_kalimba, melody[bar], b0, pan=0.15, gain=0.34, rev=0.4)
        for i in range(8):  # offbeat shaker, very soft
            if i % 2 == 1:
                lp.put(shaker(lp.rng, lp.rng.uniform(0.8, 1.0)), b0 + i * 0.5, pan=0.45, gain=0.045, rev=0.1)
        if bar % 2 == 0:
            lp.put(soft_kick(0.8), b0, gain=0.22, rev=0.0)
    info = dict(key="F major", bpm=lp.bpm, bars=16,
                instruments="kalimba melody, marimba 8th-note arpeggios, warm pad, round bass, soft shaker, very soft kick every 2 bars")
    return lp.render(make_ir(2.0, seed=3)), info


def play_loop_calm() -> tuple[np.ndarray, dict]:
    """D major, ~90 BPM, 16 bars. Sparse kalimba, pad, soft pluck ostinato, whole-note bass. No drums."""
    lp = Loop(spb_for(90), 64, seed=22)
    chords = [("D3 F#3 A3 E4", "D2", ["D4", "A4", "F#4", "A4"]),
              ("G2 D3 G3 B3", "G1", ["B3", "D4", "G4", "D4"]),
              ("B2 D3 F#3 A3", "B1", ["B3", "F#4", "D4", "F#4"]),
              ("A2 E3 A3 C#4", "A1", ["A3", "E4", "C#4", "E4"])]
    melody = [
        "A4:2 F#4:2", "B4:1 A4:1 D5:2", "F#4:1.5 E4:0.5 D4:2", "E4:3 r:1",
        "A4:1 B4:1 A4:2", "D5:2 B4:2", "A4:1.5 F#4:0.5 E4:2", "E4:1 F#4:1 E4:2",
        "r:1 F#5:1 E5:1 D5:1", "B4:4", "r:1 D5:1 B4:1 A4:1", "A4:4",
        "A4:2 F#4:2", "B4:1 A4:1 D5:2", "F#4:1.5 E4:0.5 D4:2", "E4:2 r:2",
    ]
    for bar in range(16):
        b0 = bar * 4
        ch, root, arp = chords[bar % 4]
        lp.put(pad(chord_notes(ch), 4 * lp.beat_s(), vel=1.0, attack=1.4, release=1.6, rng=lp.rng),
               b0, gain=0.2, rev=0.45)
        lp.put(bass(hz(midi(root) + 12), 0.8, dur=3.6 * lp.beat_s(), tau=1.6), b0, gain=0.33, rev=0.1)
        # gentle pluck ostinato on quarter notes, alternating soft/softer -> slow sway
        for i in range(4):
            lp.put(pluck(hz(midi(arp[i])), 0.9 if i % 2 == 0 else 0.65, dur=0.5), b0 + i,
                   pan=-0.3, gain=0.12, rev=0.35)
        lp.melody(I_kalimba, melody[bar], b0, pan=0.2, gain=0.28, rev=0.55, vel=(0.75, 0.9))
    info = dict(key="D major", bpm=lp.bpm, bars=16,
                instruments="sparse kalimba melody, soft nylon-pluck quarter-note ostinato, slow warm pad, soft sustained bass; no drums")
    return lp.render(make_ir(2.4, seed=5)), info


def play_loop_bouncy() -> tuple[np.ndarray, dict]:
    """C major, ~100 BPM, 16 bars. Marimba lead, xylophone answers, pluck off-beat stabs, bouncy bass, kick+shaker."""
    lp = Loop(spb_for(100), 64, seed=33)
    chords = [("C3 E3 G3 C4", "C2", "E4 G4 C5"),
              ("A2 C3 E3 A3", "A1", "C4 E4 A4"),
              ("F2 A2 C3 F3", "F1", "C4 F4 A4"),
              ("G2 B2 D3 G3", "G1", "B3 D4 G4")]
    melody = [
        "C5:0.5 E5:0.5 G5:0.5 r:0.5 E5:0.5 G5:0.5 A5:1",
        "G5:0.5 E5:0.5 r:0.5 C5:0.5 D5:1 r:1",
        "A4:0.5 C5:0.5 D5:0.5 r:0.5 C5:0.5 D5:0.5 A5:0.5 G5:0.5",
        "G5:1 E5:0.5 D5:0.5 D5:1 r:1",
        "C5:0.5 E5:0.5 G5:0.5 r:0.5 E5:0.5 G5:0.5 A5:1",
        "C6:0.5 A5:0.5 r:0.5 G5:0.5 E5:1 r:1",
        "D5:0.5 E5:0.5 G5:0.5 E5:0.5 D5:0.5 C5:0.5 A4:1",
        "D5:1.5 E5:0.5 D5:1 r:1",
        None, None, None, None,  # B section: xylophone call, marimba answer (below)
        "C5:0.5 E5:0.5 G5:0.5 r:0.5 E5:0.5 G5:0.5 A5:1",
        "G5:0.5 E5:0.5 r:0.5 C5:0.5 D5:1 E5:1",
        "C5:0.5 A4:0.5 C5:0.5 D5:0.5 E5:1 D5:0.5 C5:0.5",
        "D5:2 r:2",
    ]
    b_call = ["E5:1 r:0.5 E5:0.5 G5:1 E5:1", "A5:1 r:0.5 G5:0.5 E5:2",
              "C5:1 r:0.5 D5:0.5 A4:1 C5:1", "D5:2 G4:1 r:1"]
    b_answer = ["r:3 G4:0.5 A4:0.5", "r:3 C5:0.5 D5:0.5", "r:3 F4:0.5 G4:0.5", "r:2 B4:0.5 D5:0.5 G5:1"]
    for bar in range(16):
        b0 = bar * 4
        ch, root, stab = chords[bar % 4]
        r = midi(root)
        lp.put(pad(chord_notes(ch), 4 * lp.beat_s(), vel=1.0, attack=0.6, rng=lp.rng, nharm=7),
               b0, gain=0.10, rev=0.35)
        # bouncy bass: root - (5th on the "and") - root - octave
        for off, iv, v, d in ((0, 0, 0.95, 0.8), (1.5, 7, 0.7, 0.4), (2, 0, 0.85, 0.8), (3, 12, 0.7, 0.5), (3.5, 7, 0.6, 0.4)):
            lp.put(bass(hz(r + iv + 12), v, dur=d * lp.beat_s(), tau=0.35), b0 + off, gain=0.36, rev=0.05)
        # off-beat pluck chord stabs ("skippy" feel) on the 'and' of each beat, softly
        for beat in range(4):
            for k, n in enumerate(stab.split()):
                lp.put(pluck(hz(midi(n)), 0.6 if beat % 2 else 0.5, dur=0.18), b0 + beat + 0.5 + k * 0.006,
                       pan=0.35, gain=0.075, rev=0.25, jitter=0.0)
        # drums
        lp.put(soft_kick(0.9), b0, gain=0.30, rev=0.0)
        lp.put(soft_kick(0.75), b0 + 2, gain=0.26, rev=0.0)
        for i in range(8):
            lp.put(shaker(lp.rng, 0.9 if i % 2 else 0.55), b0 + i * 0.5, pan=-0.4, gain=0.05, rev=0.1)
        if melody[bar] is not None:
            lp.melody(I_marimba, melody[bar], b0, pan=0.0, gain=0.30, rev=0.3)
        else:
            j = bar - 8
            lp.melody(I_xylo, b_call[j], b0, pan=0.25, gain=0.28, rev=0.3, octave=-1)
            lp.melody(I_marimba, b_answer[j], b0, pan=-0.25, gain=0.26, rev=0.3)
    info = dict(key="C major", bpm=lp.bpm, bars=16,
                instruments="marimba lead (C pentatonic), xylophone call-and-answer in the middle section, soft off-beat nylon-pluck chord stabs, bouncy round bass, soft kick on 1 & 3, light shaker")
    return lp.render(make_ir(1.7, seed=9)), info


def build_music() -> list[dict]:
    results = []
    for name, fn in (("menu_loop", menu_loop), ("play_loop_calm", play_loop_calm), ("play_loop_bouncy", play_loop_bouncy)):
        x, info = fn()
        tmp = BUILD / f"{name}.raw.wav"
        # measure on two concatenated loops (steady-state loudness of a looping track)
        write_wav(tmp, np.concatenate([x, x]) * 0.25)
        m = measure(tmp)
        gain_db = MUSIC_LUFS - m["I"]
        tp_after = m["TP"] + gain_db
        if tp_after > MUSIC_MAX_TP:
            gain_db -= tp_after - MUSIC_MAX_TP
        y = x * 0.25 * 10 ** (gain_db / 20)
        wav = BUILD / f"{name}.wav"
        write_wav(wav, y)
        encode(wav, OUT / f"{name}.m4a", 128)
        info.update(name=name, seconds=len(y) / SR, samples=len(y))
        results.append(info)
        print(f"  music {name}: {info['seconds']:.2f}s  {info['key']}  {info['bpm']:.1f} BPM  gain {gain_db:+.1f} dB")
    return results


# ============================================================ SFX

def mix(*xs: np.ndarray) -> np.ndarray:
    """Sum mono arrays of different lengths."""
    out = np.zeros(max(len(x) for x in xs))
    for x in xs:
        out[: len(x)] += x
    return out


def sfx_reverb(x: np.ndarray, wet: float, rt: float = 1.0) -> np.ndarray:
    ir = make_ir(rt, predelay=0.012, seed=21)[:, 0]
    return mix(x, wet * signal.fftconvolve(x, ir))


SFX_ATTACK = 0.015


def sfx_finish(x: np.ndarray, peak_db: float, max_len: float | None = None) -> np.ndarray:
    sos = np.vstack([signal.butter(2, 60, btype="highpass", fs=SR, output="sos"),
                     signal.butter(4, 7500, fs=SR, output="sos")])
    y = signal.sosfilt(sos, x)
    # trim trailing near-silence (below -70 dB rel. peak), then fade
    pk = np.max(np.abs(y))
    idx = np.nonzero(np.abs(y) > pk * 10 ** (-70 / 20))[0]
    y = y[: idx[-1] + 1] if len(idx) else y
    if max_len:
        y = y[: int(max_len * SR)]
    y = tail_fade(y, min(0.2, len(y) / SR / 3))
    y = y * attack_env(len(y), SFX_ATTACK)  # research: soft attack >= 10 ms, no clicks
    y = np.concatenate([np.zeros(int(0.003 * SR)), y])  # tiny lead-in, keeps attack ramp intact after AAC
    return y / np.max(np.abs(y)) * 10 ** (peak_db / 20)


def seq_notes(inst, notes, step: float, total: float, vels=None) -> np.ndarray:
    buf = np.zeros(int(total * SR) + 4 * SR)
    for i, n in enumerate(notes):
        if n is None:
            continue
        v = vels[i] if vels else 1.0
        add_at(buf, inst(hz(midi(n)), v), int(i * step * SR))
    return buf


def sfx_tap():
    y = marimba(hz(midi("A5")), 1.0, ring=0.045, bright=0.5)
    y = mix(y, 0.5 * sine_glide(520, 480, 0.1, 0.05, 0.025))
    return sfx_finish(sfx_reverb(y, 0.04, 0.35), -9, 0.16)


def sfx_pickup():
    y = sine_glide(330, 620, 0.2, 0.09, 0.055, attack=0.012, harm2=0.12)
    return sfx_finish(sfx_reverb(y, 0.06, 0.4), -7, 0.2)


def sfx_drop():
    plop = sine_glide(420, 150, 0.32, 0.09, 0.07, attack=0.006, harm2=0.2)
    thud = sine_glide(110, 60, 0.3, 0.1, 0.07, attack=0.008, harm2=0.0)
    return sfx_finish(sfx_reverb(mix(0.8 * plop, 0.7 * thud), 0.08, 0.6), -7, 0.4)


def sfx_correct():
    buf = seq_notes(lambda f, v: mix(marimba(f, v), 0.35 * kalimba(f * 2, v * 0.5, ring=0.5)),
                    ["C5", "E5", "G5"], 0.11, 0.9, vels=[0.8, 0.9, 1.0])
    return sfx_finish(sfx_reverb(buf, 0.2, 0.9), -8, 1.2)


def sfx_try_again():
    # warm, round, questioning "hm-hm?": E4 then G4 gliding slightly up - curious, never "wrong".
    a = sine_glide(hz(midi("E4")), hz(midi("E4")), 0.16, 0.1, 0.09, attack=0.015, harm2=0.25)
    a *= release_env(len(a), 0.11, 0.05)
    b = sine_glide(hz(midi("G4")), hz(midi("G4")) * 1.04, 0.26, 0.2, 0.12, attack=0.015, harm2=0.25)
    buf = np.zeros(int(0.8 * SR))
    add_at(buf, a, 0)
    add_at(buf, b, int(0.13 * SR))
    # soft wooden body under it
    add_at(buf, 0.3 * marimba(hz(midi("E3")), 0.6, ring=0.12), 0)
    add_at(buf, 0.3 * marimba(hz(midi("G3")), 0.6, ring=0.12), int(0.13 * SR))
    return sfx_finish(sfx_reverb(buf, 0.08, 0.5), -8, 0.4)


def sfx_level_complete():
    buf = np.zeros(int(3.5 * SR))
    for i, n in enumerate(["C5", "E5", "G5", "A5"]):
        add_at(buf, marimba(hz(midi(n)), 0.8 + 0.05 * i), int(i * 0.16 * SR))
    add_at(buf, marimba(hz(midi("G5")), 0.85), int(0.80 * SR))
    add_at(buf, marimba(hz(midi("C6")), 0.9), int(0.96 * SR))
    add_at(buf, 0.5 * kalimba(hz(midi("C6")), 0.6, ring=0.7), int(0.96 * SR))
    p = pad(chord_notes("C4 E4 G4 C5"), 1.4, vel=1.0, attack=0.25, release=0.9).mean(axis=1)
    add_at(buf, 0.45 * p, int(0.64 * SR))
    add_at(buf, 0.5 * bass(hz(midi("C3")), 0.8, dur=1.2, tau=0.8), int(0.96 * SR))
    return sfx_finish(sfx_reverb(buf, 0.25, 1.4), -6, 3.0)


def sfx_world_complete():
    buf = np.zeros(int(5 * SR))
    line = ["C5", "D5", "E5", "G5", "A5", None, "G5", "A5", "C6"]
    for i, n in enumerate(line):
        if n:
            add_at(buf, marimba(hz(midi(n)), 0.75 + 0.03 * i), int(i * 0.15 * SR))
    p1 = pad(chord_notes("F3 A3 C4 F4"), 0.9, vel=1.0, attack=0.3, release=0.6).mean(axis=1)
    p2 = pad(chord_notes("C4 E4 G4 C5"), 1.8, vel=1.0, attack=0.3, release=1.2).mean(axis=1)
    add_at(buf, 0.4 * p1, int(0.2 * SR))
    add_at(buf, 0.45 * p2, int(1.2 * SR))
    add_at(buf, 0.5 * bass(hz(midi("F2")), 0.7, dur=0.9, tau=0.8), int(0.3 * SR))
    add_at(buf, 0.5 * bass(hz(midi("C3")), 0.8, dur=1.6, tau=1.0), int(1.2 * SR))
    for i, n in enumerate(["E6", "G6", "C7"]):  # gentle twinkle at the end, quiet
        add_at(buf, 0.18 * kalimba(hz(midi(n)), 0.6, ring=0.4), int((1.45 + i * 0.12) * SR))
    return sfx_finish(sfx_reverb(buf, 0.28, 1.6), -6, 4.0)


def sfx_pop():
    y = sine_glide(380, 900, 0.14, 0.035, 0.035, attack=0.004, harm2=0.1)
    return sfx_finish(sfx_reverb(y, 0.05, 0.4), -9, 0.2)


def sfx_whoosh():
    rng = np.random.default_rng(42)
    dur = 0.6
    n = rng.standard_normal(int(dur * SR))
    t = np.arange(len(n)) / SR
    # time-varying band-pass: centre sweeps 350 -> 1400 -> 700 Hz (processed in short blocks with overlap-add)
    out = np.zeros_like(n)
    blk, hop = 1024, 256
    win = np.hanning(blk)
    for s in range(0, len(n) - blk, hop):
        c = t[s + blk // 2] / dur
        fc = 350 + 1050 * np.sin(np.pi * c) ** 1.5
        sos = signal.butter(2, [fc * 0.6, fc * 1.6], btype="bandpass", fs=SR, output="sos")
        seg = signal.sosfilt(sos, n[s:s + blk] * win)
        out[s:s + blk] += seg * win
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2
    return sfx_finish(out * env, -10, 0.65)


def sfx_sparkle():
    buf = np.zeros(int(1.6 * SR))
    for i, (n, v) in enumerate([("G5", 0.7), ("C6", 0.8), ("E6", 0.7), ("G6", 0.6), ("E6", 0.4)]):
        add_at(buf, kalimba(hz(midi(n)), v, ring=0.35), int(i * 0.075 * SR))
    return sfx_finish(sfx_reverb(buf, 0.3, 1.2), -13, 1.5)


SFX_BUILDERS = {
    "tap": sfx_tap, "pickup": sfx_pickup, "drop": sfx_drop, "correct": sfx_correct, "try_again": sfx_try_again,
    "level_complete": sfx_level_complete, "world_complete": sfx_world_complete, "pop": sfx_pop,
    "whoosh": sfx_whoosh, "sparkle": sfx_sparkle,
}


def build_sfx() -> None:
    for name, fn in SFX_BUILDERS.items():
        y = fn()
        wav = BUILD / f"{name}.wav"
        write_wav(wav, y)
        encode(wav, OUT / f"{name}.m4a", 96)
        print(f"  sfx   {name}: {len(y) / SR:.2f}s")


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    os.makedirs(OUT, exist_ok=True)
    if what in ("all", "music"):
        info = build_music()
        (BUILD / "music_info.json").write_text(json.dumps(info, indent=2))
    if what in ("all", "sfx"):
        build_sfx()
    print("done ->", OUT)
