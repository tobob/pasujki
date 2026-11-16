#!/usr/bin/env python3
"""Numerical self-review of assets/audio/*.m4a (we can't listen, so we measure).

    tools/audio/.venv/bin/python tools/audio/analyze.py [--spectrograms]

Prints duration, sample peak, RMS, integrated loudness (EBU R128), true peak, spectral
centroid / 95% rolloff, and for music loops the seam discontinuity when two decoded loops are
concatenated (ratio of the jump at the seam to the 99.9th percentile of in-file sample steps;
< ~1 means the seam is indistinguishable from normal audio).
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from generate import FFMPEG, OUT, measure  # noqa: E402

SR = 44100
HERE = Path(__file__).parent
MUSIC = ["menu_loop", "play_loop_calm", "play_loop_bouncy"]


def valid_length(path: Path) -> int | None:
    """Exact sample count from iTunSMPB gapless metadata (players trim priming+padding with it)."""
    r = subprocess.run([FFMPEG.replace("ffmpeg", "ffprobe"), "-v", "error", "-show_entries", "format_tags=iTunSMPB",
                        "-of", "default=nw=1:nk=1", str(path)], capture_output=True, text=True)
    parts = r.stdout.split()
    return int(parts[3], 16) if len(parts) >= 4 else None


def decode(path: Path, ch: int) -> np.ndarray:
    n = valid_length(path)
    raw = subprocess.run([FFMPEG, "-v", "error", "-i", str(path), "-f", "f32le", "-ac", str(ch), "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).reshape(-1, ch).astype(np.float64)
    return x[:n] if n else x


def db(x: float) -> float:
    return 20 * np.log10(max(x, 1e-12))


def spectral(x: np.ndarray) -> tuple[float, float]:
    mono = x.mean(axis=1)
    n = 4096
    acc = np.zeros(n // 2 + 1)
    win = np.hanning(n)
    for s in range(0, max(1, len(mono) - n), n // 2):
        seg = mono[s:s + n]
        if len(seg) < n:
            seg = np.pad(seg, (0, n - len(seg)))
        acc += np.abs(np.fft.rfft(seg * win)) ** 2
    f = np.fft.rfftfreq(n, 1 / SR)
    mag = np.sqrt(acc)
    centroid = float(np.sum(f * mag) / np.sum(mag))
    cum = np.cumsum(acc) / np.sum(acc)
    rolloff = float(f[np.searchsorted(cum, 0.95)])
    return centroid, rolloff


def seam_ratio(x: np.ndarray) -> tuple[float, float]:
    """Seam of x|x. step = |x[0]-x[-1]| / p99.9 of in-file sample steps (<1: no jump).
    click = HF(>3 kHz) RMS of a 256-sample window centred on the seam / max(window before, window after).
    A click spikes the centred window above both neighbours (>1.5); a note onset right after the seam doesn't."""
    from scipy import signal
    d1 = np.abs(np.diff(x, axis=0)).max(axis=1)
    step = np.abs(x[0] - x[-1]).max() / np.percentile(d1, 99.9)
    L, w = len(x), 256
    y = np.concatenate([x[-4 * w:], x[: 4 * w]]).mean(axis=1)
    hp = signal.sosfiltfilt(signal.butter(4, 3000, "highpass", fs=SR, output="sos"), y)
    c = 4 * w
    rms = lambda a, b: np.sqrt(np.mean(hp[a:b] ** 2)) + 1e-12  # noqa: E731
    click = rms(c - w // 2, c + w // 2) / max(rms(c - 3 * w // 2, c - w // 2), rms(c + w // 2, c + 3 * w // 2))
    return float(step), float(click)


def main() -> None:
    info = {}
    ij = HERE / "build" / "music_info.json"
    if ij.exists():
        info = {d["name"]: d for d in json.loads(ij.read_text())}
    rows = []
    for f in sorted(OUT.glob("*.m4a")):
        name = f.stem
        is_music = name in MUSIC
        x = decode(f, 2 if is_music else 1)
        m = measure(f)
        cen, roll = spectral(x)
        mono = np.abs(x).max(axis=1)
        on = int(np.argmax(mono > 1e-3))
        ref = mono[on:on + int(0.08 * SR)].max()
        att = (np.argmax(mono[on:] > 0.9 * ref)) / SR * 1000
        row = dict(att=att, name=name, dur=len(x) / SR, peak=db(np.abs(x).max()), rms=db(np.sqrt(np.mean(x ** 2))),
                   lufs=m["I"], tp=m["TP"], cen=cen, roll=roll, seam="")
        if is_music:
            s1, s2 = seam_ratio(x)
            exp = info.get(name, {}).get("samples")
            lenok = "len ok" if exp is None or exp == len(x) else f"len {len(x)} != {exp}"
            row["seam"] = f"step {s1:.2f} click {s2:.2f} {lenok}"
        rows.append(row)
    hdr = f"{'file':18} {'dur s':>6} {'peak':>6} {'rms':>6} {'LUFS':>6} {'TP':>6} {'centr':>6} {'roll95':>6} {"att90":>6}  seam"
    print(hdr)
    print("-" * len(hdr))
    for r in rows:
        print(f"{r['name']:18} {r['dur']:6.2f} {r['peak']:6.1f} {r['rms']:6.1f} {r['lufs']:6.1f} {r['tp']:6.1f} "
              f"{r['cen']:6.0f} {r['roll']:6.0f} {r['att']:6.1f}  {r['seam']}")
    problems = [r["name"] for r in rows if r["peak"] > -1.0 or r["tp"] > -1.0]
    print("\nclipping risk:", problems or "none")

    if "--spectrograms" in sys.argv:
        for name in MUSIC:
            png = HERE / f"spectrogram_{name}.png"
            subprocess.run([FFMPEG, "-v", "error", "-y", "-i", str(OUT / f"{name}.m4a"), "-lavfi",
                            "showspectrumpic=s=1200x500:legend=1:scale=log:fscale=lin:stop=12000",
                            str(png)], check=True)
            print("spectrogram ->", png)


if __name__ == "__main__":
    main()
