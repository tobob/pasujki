/**
 * DEV-ONLY verification hook (stripped of effect in release: everything is behind __DEV__).
 * A one-shot JSON script in kv-store key `pasujki.dev`, written from the host with sqlite3 into the
 * simulator's app container, lets screenshots be taken without UI automation tools:
 *   {"route":"/play/w1-l1","demo":"tap"|"drag"|"miss","reset":true}
 */
import Storage from 'expo-sqlite/kv-store';

export type DevDemo = 'tap' | 'drag' | 'miss';
type DevScript = { route?: string; demo?: DevDemo; reset?: boolean; gate?: 'question' | 'open' };

let demo: DevDemo | undefined;
let gate: DevScript['gate'];

export function takeDevScript(): DevScript | null {
  if (!__DEV__) return null;
  try {
    const raw = Storage.getItemSync('pasujki.dev');
    if (!raw) return null;
    Storage.removeItemSync('pasujki.dev');
    const script = JSON.parse(raw) as DevScript;
    demo = script.demo;
    gate = script.gate;
    return script;
  } catch {
    return null;
  }
}

export function devDemo(): DevDemo | undefined {
  return __DEV__ ? demo : undefined;
}

export function devGate(): DevScript['gate'] {
  return __DEV__ ? gate : undefined;
}
