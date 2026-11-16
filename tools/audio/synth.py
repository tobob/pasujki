"""Small additive/modal synth toolkit for Pasujki audio (numpy + scipy only).

Everything here is original, procedurally synthesised sound - no samples.
"""
from __future__ import annotations

import numpy as np
from scipy import signal

SR = 44100
A4 = 440.0

NOTE_OFFSETS = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}


def midi(name: str) -> int:
    """'C4' -> 60, 'F#3' -> 54, 'Bb2' -> 46."""
    letter = name[0].upper()
    rest = name[1:]
    acc = 0
    while rest and rest[0] in "#b":
        acc += 1 if rest[0] == "#" else -1
        rest = rest[1:]
    return 12 * (int(rest) + 1) + NOTE_OFFSETS[letter] + acc


def hz(m: float) -> float:
    return A4 * 2 ** ((m - 69) / 12)


def _t(dur: float) -> np.ndarray:
    return np.arange(int(dur * SR)) / SR


def attack_env(n: int, attack: float) -> np.ndarray:
    """Raised-cosine attack ramp of `attack` seconds (avoids clicks)."""
    a = max(1, int(attack * SR))
    env = np.ones(n)
    k = min(a, n)
    env[:k] = 0.5 - 0.5 * np.cos(np.pi * np.arange(k) / a)
    return env


def release_env(n: int, start: float, release: float) -> np.ndarray:
    env = np.ones(n)
    s = int(start * SR)
    r = max(1, int(release * SR))
    if s < n:
        k = min(r, n - s)
        env[s:s + k] = 0.5 + 0.5 * np.cos(np.pi * np.arange(k) / r)
        env[s + k:] = 0.0
    return env


def tail_fade(x: np.ndarray, fade: float = 0.03) -> np.ndarray:
    n = len(x)
    f = min(n, int(fade * SR))
    if f > 0:
        x[-f:] *= 0.5 + 0.5 * np.cos(np.pi * np.arange(f) / f)
    return x


# ---------------------------------------------------------------- instruments
# Each returns a mono float array starting at the note onset.

def marimba(f: float, vel: float = 1.0, ring: float | None = None, bright: float = 1.0) -> np.ndarray:
    """Modal marimba: fundamental + tuned 4th partial (+ weak ~9.9x)."""
    tau = 0.55 * (440.0 / f) ** 0.35 if ring is None else ring
    dur = min(3.0, tau * 6)
    t = _t(dur)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / tau)
    partials = [(3.93, 0.22 * bright, 0.09), (9.9, 0.04 * bright, 0.025)]
    for ratio, amp, ptau in partials:
        if f * ratio < 6500:
            y += amp * np.sin(2 * np.pi * f * ratio * t + 0.3) * np.exp(-t / ptau)
    y *= attack_env(len(t), 0.004)
    return tail_fade(vel * y)


def xylophone(f: float, vel: float = 1.0) -> np.ndarray:
    """Wooden xylophone: partial at 3x (12th), shorter ring than marimba."""
    tau = 0.32 * (440.0 / f) ** 0.3
    t = _t(min(2.0, tau * 6))
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / tau)
    if f * 3 < 6500:
        y += 0.16 * np.sin(2 * np.pi * 3.0 * f * t) * np.exp(-t / 0.06)
    if f * 6.2 < 6500:
        y += 0.03 * np.sin(2 * np.pi * 6.2 * f * t) * np.exp(-t / 0.02)
    y *= attack_env(len(t), 0.004)
    return tail_fade(vel * y)


def kalimba(f: float, vel: float = 1.0, ring: float = 1.1) -> np.ndarray:
    """Kalimba tine: long sine + soft inharmonic overtone + 'buzz' 2nd."""
    t = _t(min(3.5, ring * 5))
    y = np.sin(2 * np.pi * f * t) * np.exp(-t / ring)
    y += 0.10 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / (ring * 0.3))
    if f * 5.95 < 6500:
        y += 0.10 * np.sin(2 * np.pi * 5.95 * f * t) * np.exp(-t / 0.07)
    # tiny vibrato as the tine settles, gives warmth
    y *= attack_env(len(t), 0.003)
    return tail_fade(vel * y)


def pluck(f: float, vel: float = 1.0, dur: float = 0.6, pos: float = 0.22) -> np.ndarray:
    """Soft nylon/ukulele-ish pluck: additive harmonics with per-harmonic decay."""
    t = _t(dur + 0.4)
    y = np.zeros_like(t)
    for n in range(1, 14):
        if f * n > 6500:
            break
        amp = abs(np.sin(np.pi * n * pos)) / n ** 1.3
        tau = 0.9 / (1 + 0.7 * n)
        y += amp * np.sin(2 * np.pi * f * n * t + n) * np.exp(-t / tau)
    y *= attack_env(len(t), 0.005) * release_env(len(t), dur, 0.25)
    return tail_fade(vel * y / 1.2)


def bass(f: float, vel: float = 1.0, dur: float = 0.5, tau: float = 0.6) -> np.ndarray:
    """Round sine bass with a little 2nd/3rd harmonic so it reads on phones."""
    t = _t(dur + 0.2)
    y = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.12 * np.sin(2 * np.pi * 3 * f * t)
    y *= np.exp(-t / tau) * attack_env(len(t), 0.012) * release_env(len(t), dur, 0.12)
    return tail_fade(vel * y / 1.3)


def pad(freqs: list[float], dur: float, vel: float = 1.0, attack: float = 0.9, release: float = 1.2,
        rng: np.random.Generator | None = None, nharm: int = 9) -> np.ndarray:
    """Warm detuned additive pad (soft saw-ish, heavily rolled off). Returns stereo (n,2)."""
    rng = rng or np.random.default_rng(0)
    t = _t(dur + release + 0.1)
    out = np.zeros((len(t), 2))
    for f in freqs:
        for ch, det in ((0, -5), (1, 5)):
            fd = f * 2 ** (det / 1200)
            v = np.zeros_like(t)
            for n in range(1, nharm + 1):
                if fd * n > 5000:
                    break
                amp = 1.0 / n ** 1.6
                v += amp * np.sin(2 * np.pi * fd * n * t + rng.uniform(0, 2 * np.pi))
            # slow amplitude shimmer
            v *= 1 + 0.06 * np.sin(2 * np.pi * rng.uniform(0.15, 0.35) * t + rng.uniform(0, 6))
            out[:, ch] += v
    env = attack_env(len(t), attack) * release_env(len(t), dur, release)
    out *= env[:, None] * vel / (len(freqs) * 1.5)
    return out


def soft_kick(vel: float = 1.0) -> np.ndarray:
    t = _t(0.45)
    fr = 48 + 70 * np.exp(-t / 0.03)
    ph = 2 * np.pi * np.cumsum(fr) / SR
    y = np.sin(ph) * np.exp(-t / 0.13) * attack_env(len(t), 0.004)
    return tail_fade(vel * y)


def shaker(rng: np.random.Generator, vel: float = 1.0, length: float = 0.09) -> np.ndarray:
    t = _t(length + 0.05)
    n = rng.standard_normal(len(t))
    sos = signal.butter(2, [2500, 6000], btype="bandpass", fs=SR, output="sos")
    n = signal.sosfilt(sos, n)
    env = attack_env(len(t), 0.012) * np.exp(-t / (length / 3))
    return tail_fade(vel * n * env * 0.5)


def sine_glide(f0: float, f1: float, dur: float, glide: float, tau: float, attack: float = 0.006,
               harm2: float = 0.15) -> np.ndarray:
    """Pitch-gliding round tone (bloops, plops, pops)."""
    t = _t(dur)
    k = np.clip(t / glide, 0, 1)
    k = 0.5 - 0.5 * np.cos(np.pi * k)
    fr = f0 * (f1 / f0) ** k
    ph = 2 * np.pi * np.cumsum(fr) / SR
    y = np.sin(ph) + harm2 * np.sin(2 * ph)
    y *= np.exp(-t / tau) * attack_env(len(t), attack)
    return tail_fade(y)


# ---------------------------------------------------------------- mixing utils

def pan_stereo(mono: np.ndarray, pan: float) -> np.ndarray:
    """pan in [-1, 1], constant power."""
    a = (pan + 1) * np.pi / 4
    return np.stack([mono * np.cos(a), mono * np.sin(a)], axis=1)


def add_at(buf: np.ndarray, x: np.ndarray, start: int) -> None:
    end = min(len(buf), start + len(x))
    if end > start:
        buf[start:end] += x[: end - start]


def make_ir(rt60: float = 1.8, predelay: float = 0.018, seed: int = 7, length: float | None = None) -> np.ndarray:
    """Synthetic stereo room/plate IR: decorrelated noise, darker as it decays."""
    rng = np.random.default_rng(seed)
    length = length or rt60 * 1.2
    t = _t(length)
    out = np.zeros((len(t), 2))
    for ch in range(2):
        bright = rng.standard_normal(len(t)) * np.exp(-6.9 * t / (rt60 * 0.45))
        dark = rng.standard_normal(len(t))
        dark = signal.sosfilt(signal.butter(2, 1800, fs=SR, output="sos"), dark) * 2.2
        dark *= np.exp(-6.9 * t / rt60)
        ir = signal.sosfilt(signal.butter(2, 5000, fs=SR, output="sos"), bright * 0.5 + dark)
        ir *= attack_env(len(t), 0.01)
        out[:, ch] = ir
    pd = int(predelay * SR)
    out = np.vstack([np.zeros((pd, 2)), out])
    out /= np.sqrt(np.sum(out ** 2) / 2)
    return out


def circular_reverb(x: np.ndarray, ir: np.ndarray) -> np.ndarray:
    """Circular (wrap-around) convolution: the reverb tail of the loop end lands on the loop start."""
    L = len(x)
    assert len(ir) < L
    X = np.fft.rfft(x, axis=0)
    H = np.fft.rfft(ir, n=L, axis=0)
    # mono-in -> stereo IR to keep image stable: L->L, R->R
    return np.fft.irfft(X * H, n=L, axis=0)


def linear_reverb(x: np.ndarray, ir: np.ndarray) -> np.ndarray:
    return signal.fftconvolve(x, ir, axes=0)


def periodic_filter(x: np.ndarray, sos: np.ndarray) -> np.ndarray:
    """Apply an IIR filter to a periodic signal so the result stays periodic (tile 3x, keep middle)."""
    L = len(x)
    y = signal.sosfilt(sos, np.concatenate([x, x, x]), axis=0)
    return y[L:2 * L]


def fold(buf: np.ndarray, L: int) -> np.ndarray:
    """Wrap everything rendered past the loop length back onto the start."""
    out = buf[:L].copy()
    rest = buf[L:]
    while len(rest):
        k = min(L, len(rest))
        out[:k] += rest[:k]
        rest = rest[k:]
    return out


def master_sos():
    hp = signal.butter(2, 35, btype="highpass", fs=SR, output="sos")
    lp = signal.butter(4, 7000, btype="lowpass", fs=SR, output="sos")
    return np.vstack([hp, lp])
