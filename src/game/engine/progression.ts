/** Pure game rules: judging, stars, unlocking. No React, no side effects. */
import { WORLDS } from '@/game/levels';
import type { ItemId, Level, Round, World } from '@/game/types';
import type { Progress, Settings } from '@/storage/store';

/** Is dropping/tapping quadrant `index` a success? Empty (null) corners are never a valid drop. */
export function isCorrect(round: Round, index: number): boolean {
  const target = round.targets[index];
  if (!target) return false;
  if (round.rule === 'free' || round.answer === null) return true;
  return round.answer === index;
}

/**
 * Stars reward finishing, never punish: completing always gives ≥1 star.
 * Measured by gentle mistakes per round. Abstract ("free") levels always give 3.
 */
export function starsFor(level: Level, mistakes: number): 1 | 2 | 3 {
  if (level.rounds.every((r) => r.rule === 'free')) return 3;
  const perRound = mistakes / Math.max(1, level.rounds.length);
  if (perRound <= 0.25) return 3;
  if (perRound <= 0.75) return 2;
  return 1;
}

export const ALL_LEVELS: Level[] = WORLDS.flatMap((w) => w.levels);

export function findLevel(id: string | undefined): Level | undefined {
  return ALL_LEVELS.find((l) => l.id === id);
}

export function findWorld(id: number): World | undefined {
  return WORLDS.find((w) => w.id === id);
}

export function nextLevelId(id: string): string | undefined {
  const i = ALL_LEVELS.findIndex((l) => l.id === id);
  return i >= 0 ? ALL_LEVELS[i + 1]?.id : undefined;
}

const isDone = (p: Progress, levelId: string) => (p.stars[levelId] ?? 0) > 0;

/** World 1 is always open; world N opens once world N-1 is fully completed. */
export function isWorldUnlocked(world: World, p: Progress, s: Settings): boolean {
  if (s.unlockAll) return true;
  const idx = WORLDS.findIndex((w) => w.id === world.id);
  if (idx <= 0) return true;
  return WORLDS[idx - 1].levels.every((l) => isDone(p, l.id));
}

/** Every level in world 1 is open; elsewhere a level opens after the previous one in its world. */
export function isLevelUnlocked(level: Level, p: Progress, s: Settings): boolean {
  if (s.unlockAll) return true;
  const world = findWorld(level.world);
  if (!world || !isWorldUnlocked(world, p, s)) return false;
  if (WORLDS.indexOf(world) === 0) return true;
  const i = world.levels.findIndex((l) => l.id === level.id);
  return i <= 0 || isDone(p, world.levels[i - 1].id);
}

export function worldStars(world: World, p: Progress) {
  const earned = world.levels.reduce((sum, l) => sum + (p.stars[l.id] ?? 0), 0);
  return { earned, max: world.levels.length * 3, done: world.levels.filter((l) => isDone(p, l.id)).length };
}

/** The level the big Play button starts: the first open level not yet completed (else the first one). */
export function continueLevelId(p: Progress, s: Settings): string | undefined {
  const open = ALL_LEVELS.filter((l) => isLevelUnlocked(l, p, s));
  return (open.find((l) => !isDone(p, l.id)) ?? open[open.length - 1] ?? ALL_LEVELS[0])?.id;
}

/** A representative picture for a level (used on map buttons and the sticker). */
export function levelPicture(level: Level | undefined): ItemId {
  const round = level?.rounds[0];
  if (round?.prompt.kind === 'item') return round.prompt.id;
  const t = round?.targets.find((x) => x !== null);
  return t?.id ?? 'star';
}

/** Sticker = the correct picture from the level's last round (a nice memory of what was matched). */
export function stickerPicture(level: Level | undefined): ItemId {
  const round = level?.rounds[level.rounds.length - 1];
  if (!round) return 'star';
  const t = (round.answer !== null ? round.targets[round.answer] : null) ?? round.targets.find((x) => x !== null);
  return t?.id ?? levelPicture(level);
}

export function worldPicture(world: World): ItemId {
  return levelPicture(world.levels[0]);
}
