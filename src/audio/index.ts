/**
 * Pasujki audio assets. Every sound is original and synthesised in code by
 * tools/audio/generate.py (run `tools/audio/.venv/bin/python tools/audio/generate.py`).
 *
 * Music: seamless loops (AAC with gapless metadata) — play with `loop = true`.
 *   menu_loop        F major, 96 BPM, 40.0 s  — kalimba + marimba, inviting
 *   play_loop_calm   D major, 90 BPM, 42.7 s  — very soft, sparse, no drums
 *   play_loop_bouncy C major, 100 BPM, 38.4 s — marimba/xylophone, bouncy but soft
 * Music is mastered to about -23 LUFS; SFX peak at -6 to -13 dBFS, soft attacks (>= 15 ms ramp).
 */
import type { MusicId, SfxId } from '@/game/types';

export const SFX: Record<SfxId, number> = {
  tap: require('../../assets/audio/tap.m4a'),
  pickup: require('../../assets/audio/pickup.m4a'),
  drop: require('../../assets/audio/drop.m4a'),
  correct: require('../../assets/audio/correct.m4a'),
  try_again: require('../../assets/audio/try_again.m4a'),
  level_complete: require('../../assets/audio/level_complete.m4a'),
  world_complete: require('../../assets/audio/world_complete.m4a'),
  pop: require('../../assets/audio/pop.m4a'),
  whoosh: require('../../assets/audio/whoosh.m4a'),
  sparkle: require('../../assets/audio/sparkle.m4a'),
};

export const MUSIC: Record<MusicId, number> = {
  menu_loop: require('../../assets/audio/menu_loop.m4a'),
  play_loop_calm: require('../../assets/audio/play_loop_calm.m4a'),
  play_loop_bouncy: require('../../assets/audio/play_loop_bouncy.m4a'),
};

/**
 * Suggested playback volumes (0..1). With these gains music sits ~10 dB under the effects.
 * While correct / level_complete / world_complete play, duck music to `musicDucked`
 * (-6 dB = music × 0.5) and return over ~500 ms (docs/CALM_DESIGN_RESEARCH.md).
 */
export const VOLUME = { music: 0.35, sfx: 0.8, musicDucked: 0.175 };
