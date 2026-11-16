/**
 * Language-independent i18n logic (no native modules, so scripts and the site generator can use it
 * for any language). The app uses the LANG-bound wrappers in ./index.ts.
 */
import type { Level, Round, World } from '../game/types';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import it from './locales/it';
import nl from './locales/nl';
import pl from './locales/pl';
import pt from './locales/pt';
import { LANGS, type HintPack, type Lang, type Locale } from './types';

export { LANGS, type Lang, type Locale };

export const LOCALES: Record<Lang, Locale> = { pl, en, de, fr, it, es, pt, nl };

export const isLang = (x: string | null | undefined): x is Lang => !!x && (LANGS as readonly string[]).includes(x);

export const worldTitleIn = (lang: Lang, w: World) =>
  lang === 'pl' ? w.title_pl : lang === 'en' ? w.title_en : (LOCALES[lang].worlds?.[w.id] ?? w.title_en);

export const levelTitleIn = (lang: Lang, l: Level) =>
  lang === 'pl' ? l.title_pl : lang === 'en' ? l.title_en : (LOCALES[lang].levels?.[l.id] ?? l.title_en);

export const numberWordIn = (lang: Lang, n: number) => LOCALES[lang].numbers[n] ?? String(n);

/**
 * Every line a round could have been given by levels.ts hintFor()/freeHint(), in a fixed order that is
 * the same for every language. Which one a round actually uses depends on the level's theme and the
 * round's position, which are not stored on the Round, so we find it by matching hint_en against the
 * English list and take the same slot in the target language.
 */
export function hintVariants(h: HintPack, r: Round): (string | undefined)[] {
  const p = r.prompt;
  if (r.rule === 'free') {
    switch (p.kind) {
      case 'color':
        return [h.likesColor(p.id), h.suitsColor(p.id)];
      case 'texture':
        return [h.freeTexture[p.id] ?? h.texture[p.id]];
      case 'shape':
        return [h.getsShape(p.id)];
      case 'shadow':
        return h.shadow;
      case 'item':
        return [h.eat(p.id), ...h.live, ...h.wear, ...h.play, h.suits, h.wants(p.id), h.give];
    }
  }
  switch (p.kind) {
    case 'color':
      return [h.isColor(p.id)];
    case 'shape':
      return [h.looksLike(p.id)];
    case 'texture':
      return [h.texture[p.id]];
    case 'shadow':
      return h.shadow;
    case 'item':
      switch (r.rule) {
        case 'same':
          return [h.same(p.id)];
        case 'food':
          return [h.food(p.id)];
        case 'home':
          return [h.home(p.id)];
        case 'baby':
          return [h.baby[p.id as keyof HintPack['baby']]];
        case 'weather':
          return [h.weather[p.id as keyof HintPack['weather']]];
        case 'pair':
          return [h.pair(p.id)];
        default:
          return [];
      }
  }
}

/** Slot of the round's line in hintVariants(), or -1 if the English pack cannot reproduce hint_en. */
export const hintSlot = (r: Round) => hintVariants(en.hints!, r).indexOf(r.hint_en);

/** The round's hint line in `lang`; undefined when that language has no line for it. */
export function hintTextStrict(lang: Lang, r: Round): string | undefined {
  if (lang === 'pl') return r.hint_pl;
  if (lang === 'en') return r.hint_en;
  const h = LOCALES[lang].hints;
  const slot = hintSlot(r);
  if (!h || slot < 0) return undefined;
  return hintVariants(h, r)[slot];
}

/** Same, but never empty: falls back to the English line. */
export const hintTextIn = (lang: Lang, r: Round) => hintTextStrict(lang, r) || r.hint_en;
