import { Platform } from 'react-native';
import { Easing, ReduceMotion } from 'react-native-reanimated';

import { UI } from '@/game/palette';

/**
 * Calm motion tokens (docs/CALM_DESIGN_RESEARCH.md R1–R3). Everything stays inside 250–600 ms,
 * ease-in-out or explicitly damped springs — never Reanimated's default (under-damped) spring.
 */
export const MOTION = {
  fast: 250,
  base: 400,
  slow: 600,
  /** Touch acknowledgement (pick-up lift). */
  touch: 150,
  /** Round change: board fades out, a 300–500 ms breath, then the next prompt fades/scales in. */
  roundFadeOut: 300,
  roundPause: 350,
  roundFadeIn: 400,
  /** Whole success celebration (glide + bounce + glow + stars) ≤ 1.5 s. */
  celebrateHold: 1400,
  /** Idle "breathing" of the prompt card: 1.00 ↔ 1.03, period ≈ 3.7 s. */
  breathHalf: 1850,
  breathScale: 1.03,
  /** 3rd miss: prompt travels to the right corner by itself. */
  guideGlide: 900,
  /** Inactivity ladder: one stronger breath after 8 s, hint glow after 15 s. */
  idleBreathAfter: 8000,
  idleHintAfter: 15000,
  easing: Easing.inOut(Easing.quad),
  easeOut: Easing.out(Easing.quad),
  /** Snap into a quadrant: overshoot ≤ 3 %. */
  snap: { duration: 400, dampingRatio: 0.9, reduceMotion: ReduceMotion.System },
  /** Drift back to the centre after a miss: slow, floaty, no bounce. */
  driftBack: { duration: 550, dampingRatio: 1, reduceMotion: ReduceMotion.System },
  /** The single allowed "happy bounce" of a picture (peak ≤ 1.10). */
  happy: { duration: 550, dampingRatio: 0.65, reduceMotion: ReduceMotion.System },
  settle: { duration: 400, dampingRatio: 0.9, reduceMotion: ReduceMotion.System },
} as const;

export const FONT = Platform.select({ ios: 'ui-rounded', default: undefined });

export const SHADOW = {
  soft: '0px 4px 14px rgba(75, 68, 83, 0.10)',
  lifted: '0px 10px 24px rgba(75, 68, 83, 0.16)',
} as const;

/** A few UI tones derived from the shared palette. */
export const TONE = {
  ...UI,
  star: '#F6C945',
  halo: '#FBE3A0',
  play: '#8FCB93',
  playDark: '#6FB374',
  sleeping: '#C9C2CF',
  dot: '#E4DDE8',
} as const;

export const RADIUS = { tile: 32, card: 28, pill: 999 } as const;
