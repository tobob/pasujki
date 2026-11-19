import type { ColorId, ItemId, ShapeId, TextureId } from '../game/types';

export const LANGS = ['pl', 'en', 'de', 'fr', 'it', 'es', 'pt', 'nl'] as const;
export type Lang = (typeof LANGS)[number];

/** UI strings (parents' area, parental gate, buttons). Same keys in every language. */
export type UiStrings = {
  play: string;
  map: string;
  parents: string;
  start: string;
  back: string;
  exit: string;
  next: string;
  bravo: string;
  gateTitle: string;
  gateHold: string;
  gateHoldButton: string;
  gateQuestion: (a: string, b: string) => string;
  music: string;
  sounds: string;
  hints: string;
  hintsDetail: string;
  unlockAll: string;
  unlockAllDetail: string;
  reset: string;
  resetTitle: string;
  resetBody: string;
  cancel: string;
  resetConfirm: string;
  aboutTitle: string;
  about: string;
  worldsTitle: string;
  worlds: string;
  soundTitle: string;
  soundNote: string;
  safetyTitle: string;
  safety: string;
  version: string;
  /** Grown-ups' area bottom buttons and the one-time "Do you like Pasujki?" card. `store` = 'App Store' | 'Google Play'. */
  rateApp: (store: string) => string;
  rateShort: (store: string) => string;
  feedbackButton: string;
  linksNote: string;
  likeTitle: string;
  likeYes: string;
  likeNo: string;
  notNow: string;
  noTitle: string;
  noBody: string;
  tellUs: string;
};

export type Section = { heading?: string; body: string };
export type Policy = { title: string; sections: Section[] };

/**
 * Builds the optional hint line for languages that have no pre-generated hint on the Round
 * (everything except pl/en). Mirrors hintFor()/freeHint() in src/game/levels.ts. Item-dependent
 * lines are functions so each language can handle its own articles / cases.
 */
export type HintPack = {
  // rule-based (graded) rounds
  isColor: (c: ColorId) => string; //            "What is red?"
  looksLike: (s: ShapeId) => string; //           "What looks like a circle?"
  texture: Record<TextureId, string>;
  shadow: [string, string, string];
  weather: Record<'sun' | 'raindrop' | 'cloud' | 'snowflake', string>;
  same: (i: ItemId) => string; //                 "Where is the same cat?"
  food: (i: ItemId) => string; //                 "Who likes the cheese?"
  home: (i: ItemId) => string; //                 "Where does the bee live?"
  baby: Record<'chick' | 'kitten' | 'puppy' | 'lamb' | 'calf' | 'duckling', string>; // "Where is the chick's mummy?"
  pair: (i: ItemId) => string; //                 "What goes with the sock?"
  // free ("make-believe") rounds
  likesColor: (c: ColorId) => string; //          "Who likes red?"
  suitsColor: (c: ColorId) => string; //          "Who suits red?"
  freeTexture: Partial<Record<TextureId, string>>;
  getsShape: (s: ShapeId) => string; //           "Who gets a circle?"
  eat: (i: ItemId) => string; //                  "What would the dinosaur eat?"
  live: [string, string, string];
  wear: [string, string, string];
  play: [string, string, string];
  suits: string; //                               "Who does this suit?"
  wants: (i: ItemId) => string; //                "Who wants the apple?"
  give: string; //                                "Who will you give it to?"
};

export type Locale = {
  /** Name of the language in itself (site language switcher). */
  name: string;
  strings: UiStrings;
  /** Number words 0–9 for the parental gate question. */
  numbers: [string, string, string, string, string, string, string, string, string, string];
  /** World titles by world id and level titles by level id. pl/en omit them: levels.ts holds the source text. */
  worlds?: Record<number, string>;
  levels?: Record<string, string>;
  /**
   * pl: null (hint_pl is pre-generated on every Round). en: shown as hint_en, but its pack is also
   * used to tell which line variant a round uses (and check-i18n verifies it reproduces hint_en).
   */
  hints: HintPack | null;
  privacy: Policy;
};
