/**
 * Audio engine (expo-audio): one looping music player with soft fades + lazily created SFX players.
 *
 * Audio session choice:
 *  - interruptionMode 'mixWithOthers': we never pause or duck a parent's podcast/music unexpectedly.
 *  - playsInSilentMode false: the iOS ring/silent switch is respected. A muted phone stays quiet,
 *    which is the polite default for a toddler app (parents decide, not the app).
 *  - shouldPlayInBackground false + explicit pause on AppState change: nothing plays when the app
 *    is not visible (and app.json disables the background-audio mode entirely).
 * Calm rules (CALM_DESIGN_RESEARCH R9): music gain ≤ 0.35, 2 s fade-in, ducked −6 dB under reward
 * sounds, max one SFX per 150 ms. Missing sounds are simply silence.
 */
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { AppState, type AppStateStatus } from 'react-native';

import { MUSIC, SFX, VOLUME } from '@/audio';
import type { MusicId, SfxId } from '@/game/types';
import { settingsStore } from '@/storage/store';

const FADE_IN_MS = 2000;
const FADE_OUT_MS = 800;
const FADE_STEP_MS = 50;
const DUCK_RESTORE_MS = 500;
const SFX_GAP_MS = 150;
const HAPTIC_GAP_MS = 300;

/** Reward sounds that duck the music, with roughly how long they ring (ms). */
const DUCKING: Partial<Record<SfxId, number>> = { correct: 900, level_complete: 2200, world_complete: 2800 };

const MUSIC_GAIN = Math.min(0.35, VOLUME.music);
const DUCKED_GAIN = (VOLUME as { musicDucked?: number }).musicDucked ?? MUSIC_GAIN * 0.5;

type Track = { id: MusicId; player: AudioPlayer; fade?: ReturnType<typeof setInterval> };

let initialised = false;
let appActive = AppState.currentState === 'active';
let wantedMusic: MusicId | null = null;
let music: Track | null = null;
let duckedUntil = 0;
let duckTimer: ReturnType<typeof setTimeout> | undefined;
let lastSfxAt = 0;
let lastHapticAt = 0;
const sfxPlayers = new Map<SfxId, AudioPlayer>();

function safe(fn: () => void) {
  try {
    fn();
  } catch {
    // Audio must never crash play.
  }
}

const targetGain = () => (Date.now() < duckedUntil ? DUCKED_GAIN : MUSIC_GAIN);

function fadeTrack(track: Track, to: number, ms: number, done?: () => void) {
  if (track.fade) clearInterval(track.fade);
  const from = track.player.volume;
  const steps = Math.max(1, Math.round(ms / FADE_STEP_MS));
  let i = 0;
  track.fade = setInterval(() => {
    i += 1;
    safe(() => {
      track.player.volume = from + ((to - from) * i) / steps;
    });
    if (i >= steps) {
      clearInterval(track.fade);
      track.fade = undefined;
      done?.();
    }
  }, FADE_STEP_MS);
}

function stopCurrentMusic() {
  const current = music;
  if (!current) return;
  music = null;
  fadeTrack(current, 0, FADE_OUT_MS, () =>
    safe(() => {
      current.player.pause();
      current.player.remove();
    }),
  );
}

function syncMusic() {
  const enabled = settingsStore.get().music && appActive;
  const id = enabled ? wantedMusic : null;
  const source = id ? MUSIC[id] : undefined;

  if (!id || source === undefined) {
    stopCurrentMusic();
    return;
  }
  if (music?.id === id) {
    const m = music;
    if (!m.player.playing) {
      safe(() => m.player.play());
      fadeTrack(m, targetGain(), FADE_IN_MS);
    }
    return;
  }
  stopCurrentMusic();
  safe(() => {
    const player = createAudioPlayer(source);
    player.loop = true;
    player.volume = 0;
    player.play();
    const track: Track = { id, player };
    music = track;
    fadeTrack(track, targetGain(), FADE_IN_MS);
  });
}

function duck(ms: number) {
  duckedUntil = Date.now() + ms;
  if (music) fadeTrack(music, DUCKED_GAIN, 150);
  if (duckTimer) clearTimeout(duckTimer);
  duckTimer = setTimeout(() => {
    if (music && music.player.playing) fadeTrack(music, MUSIC_GAIN, DUCK_RESTORE_MS);
  }, ms);
}

function onAppState(state: AppStateStatus) {
  const active = state === 'active';
  if (active === appActive) return;
  appActive = active;
  if (!active && music) {
    // Pause immediately (no fade) so nothing leaks into the background.
    const m = music;
    if (m.fade) clearInterval(m.fade);
    safe(() => {
      m.player.pause();
      m.player.volume = 0;
    });
    return;
  }
  syncMusic();
}

export function initSound() {
  if (initialised) return;
  initialised = true;
  setAudioModeAsync({
    playsInSilentMode: false,
    interruptionMode: 'mixWithOthers',
    shouldPlayInBackground: false,
    allowsRecording: false,
  }).catch(() => {});
  AppState.addEventListener('change', onAppState);
  settingsStore.subscribe(syncMusic);
}

/** Ask for a background loop (null = silence). Switching tracks fades softly. */
export function setMusic(id: MusicId | null) {
  wantedMusic = id;
  syncMusic();
}

export function playSfx(id: SfxId) {
  if (!settingsStore.get().sounds || !appActive) return;
  const now = Date.now();
  // At most one effect at a time: ignore triggers within 150 ms (reward sounds always win).
  if (now - lastSfxAt < SFX_GAP_MS && DUCKING[id] === undefined) return;
  const source = SFX[id];
  if (source === undefined) return;
  lastSfxAt = now;
  const duckMs = DUCKING[id];
  if (duckMs !== undefined) duck(duckMs);
  safe(() => {
    let player = sfxPlayers.get(id);
    if (!player) {
      player = createAudioPlayer(source);
      player.volume = VOLUME.sfx;
      sfxPlayers.set(id, player);
    }
    const p = player;
    p.seekTo(0)
      .catch(() => {})
      .finally(() => safe(() => p.play()));
  });
}

/** Light haptic tick (pick-up / correct only). Tied to the sounds toggle, ≤ 1 per 300 ms. */
export function softHaptic() {
  if (!settingsStore.get().sounds || !appActive) return;
  const now = Date.now();
  if (now - lastHapticAt < HAPTIC_GAP_MS) return;
  lastHapticAt = now;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}
