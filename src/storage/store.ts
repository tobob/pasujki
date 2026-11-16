/**
 * Local, offline persistence (expo-sqlite/kv-store) for progress and settings.
 * Tiny observable store so screens re-render via useSyncExternalStore.
 */
import Storage from 'expo-sqlite/kv-store';
import { useSyncExternalStore } from 'react';

export type Settings = {
  music: boolean;
  sounds: boolean;
  /** Show the Polish hint line during play (for parents playing along). */
  showHints: boolean;
  /** Parents can open every level and world. */
  unlockAll: boolean;
};

export type Progress = {
  /** Best stars (1..3) per completed level id. */
  stars: Record<string, number>;
};

const SETTINGS_KEY = 'pasujki.settings.v1';
const PROGRESS_KEY = 'pasujki.progress.v1';

const DEFAULT_SETTINGS: Settings = { music: true, sounds: true, showHints: false, unlockAll: false };
const DEFAULT_PROGRESS: Progress = { stars: {} };

function read<T extends object>(key: string, fallback: T): T {
  try {
    const raw = Storage.getItemSync(key);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) };
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    Storage.setItemSync(key, JSON.stringify(value));
  } catch {
    // Storage failure must never break play; state still lives in memory.
  }
}

function createStore<T extends object>(key: string, fallback: T) {
  let state: T | null = null;
  const listeners = new Set<() => void>();
  const get = (): T => {
    if (state === null) state = read(key, fallback);
    return state;
  };
  const set = (next: T) => {
    state = next;
    write(key, next);
    listeners.forEach((l) => l());
  };
  const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  };
  return { get, set, subscribe };
}

export const settingsStore = createStore<Settings>(SETTINGS_KEY, DEFAULT_SETTINGS);
export const progressStore = createStore<Progress>(PROGRESS_KEY, DEFAULT_PROGRESS);

export function useSettings(): Settings {
  return useSyncExternalStore(settingsStore.subscribe, settingsStore.get, settingsStore.get);
}

export function useProgress(): Progress {
  return useSyncExternalStore(progressStore.subscribe, progressStore.get, progressStore.get);
}

export function updateSettings(patch: Partial<Settings>) {
  settingsStore.set({ ...settingsStore.get(), ...patch });
}

/** Records a completed level, keeping the best result. */
export function saveLevelResult(levelId: string, stars: number) {
  const prev = progressStore.get();
  const best = Math.max(prev.stars[levelId] ?? 0, stars);
  progressStore.set({ ...prev, stars: { ...prev.stars, [levelId]: best } });
}

export function resetProgress() {
  progressStore.set({ stars: {} });
}
