/**
 * Language layer. Children never need text to play; it is only for the parents' area, the parental
 * gate, world titles and the optional hint line. The device's preferred languages pick one of
 * pl, en, de, fr, it, es, pt, nl (first supported one wins); anything else falls back to English.
 * Texts live in ./locales/<lang>.ts; the logic in ./core.ts.
 */
import type { Level, Round, World } from '../game/types';
import { LOCALES, hintTextIn, isLang, levelTitleIn, numberWordIn, worldTitleIn, type Lang } from './core';

export type { Lang } from './types';

function detect(): Lang {
  try {
    // Required lazily: if the native module were ever missing, fall back to English instead of crashing.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getLocales } = require('expo-localization') as typeof import('expo-localization');
    for (const l of getLocales()) {
      const code = l.languageCode?.toLowerCase();
      if (isLang(code)) return code;
    }
  } catch {
    // fall through to English
  }
  return 'en';
}

export const LANG: Lang = detect();

const locale = LOCALES[LANG];

export const t = locale.strings;
export const numberWord = (n: number) => numberWordIn(LANG, n);
export const worldTitle = (w: World) => worldTitleIn(LANG, w);
export const levelTitle = (l: Level) => levelTitleIn(LANG, l);
export const hintText = (r: Round) => hintTextIn(LANG, r);

/** Privacy policy in the current language. */
export const PRIVACY = locale.privacy;
/** Policies shown in the parents' area: current language first, then English (if different). */
export const PRIVACY_ALL = LANG === 'en' ? [LOCALES.en.privacy] : [locale.privacy, LOCALES.en.privacy];
