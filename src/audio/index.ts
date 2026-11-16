/**
 * STUB — replaced by the audio agent. Maps ids to bundled assets (require(...) module numbers).
 * Missing entries are allowed: the engine must treat a missing sound as silence.
 */
import type { MusicId, SfxId } from '@/game/types';

export const SFX: Partial<Record<SfxId, number>> = {};
export const MUSIC: Partial<Record<MusicId, number>> = {};
/** Suggested playback volumes (0..1) — music sits quietly under the effects. */
export const VOLUME = { music: 0.35, sfx: 0.8 };
