/**
 * Checks every language in src/i18n/locales: renders every round's hint line and every world / level
 * title, plus UI strings, number words and the privacy policy, and fails (exit code 1) on missing keys
 * or empty strings. Also verifies that the English hint pack reproduces levels.ts hint_en exactly
 * (that is how other languages find which line variant a round uses).
 *
 * Run: npx tsx scripts/check-i18n.ts [--print <lang>]
 */
import { WORLDS } from '../src/game/levels';
import { COLOR_IDS, ITEM_IDS, SHAPE_IDS, TEXTURE_IDS } from '../src/game/types';
import { LANGS, LOCALES, hintSlot, hintTextStrict, hintVariants, levelTitleIn, numberWordIn, worldTitleIn } from '../src/i18n/core';

const errors: string[] = [];
const err = (lang: string, where: string, msg: string) => errors.push(`[${lang}] ${where}: ${msg}`);
const blank = (s: unknown) => typeof s !== 'string' || s.trim() === '' || /\b(undefined|NaN)\b/.test(s);

const printLang = process.argv.includes('--print') ? process.argv[process.argv.indexOf('--print') + 1] : null;
const rounds = WORLDS.flatMap((w) => w.levels.flatMap((l) => l.rounds.map((r, k) => ({ where: `${l.id} r${k + 1}`, r }))));
const enKeys = Object.keys(LOCALES.en.strings).sort();

// English pack must reproduce every hint_en, otherwise the slot lookup is wrong for every language.
for (const { where, r } of rounds) {
  if (hintSlot(r) < 0) err('en', where, `English pack cannot reproduce hint_en "${r.hint_en}" (${r.rule}/${r.prompt.kind}:${r.prompt.id})`);
}

for (const lang of LANGS) {
  const L = LOCALES[lang];
  // UI strings: same keys as English, none empty
  const keys = Object.keys(L.strings).sort();
  if (keys.join() !== enKeys.join()) err(lang, 'strings', `keys differ from en: ${keys.filter((k) => !enKeys.includes(k)).concat(enKeys.filter((k) => !keys.includes(k))).join(', ')}`);
  for (const [k, v] of Object.entries(L.strings)) {
    // Functions get one placeholder per declared parameter and must use every one of them.
    const args = typeof v === 'function' ? ['⟨1⟩', '⟨2⟩'].slice(0, Math.max(1, v.length)) : [];
    const s = typeof v === 'function' ? (v as (...a: string[]) => string)(...args) : v;
    if (blank(s)) err(lang, `strings.${k}`, 'empty');
    if (args.some((a) => !s.includes(a))) err(lang, `strings.${k}`, `does not use all ${args.length} argument(s)`);
  }
  if (L.numbers.length !== 10) err(lang, 'numbers', `expected 10, got ${L.numbers.length}`);
  for (let n = 0; n <= 9; n++) if (blank(numberWordIn(lang, n))) err(lang, `numbers[${n}]`, 'empty');
  // titles
  for (const w of WORLDS) {
    if (lang !== 'pl' && lang !== 'en' && !L.worlds?.[w.id]) err(lang, `worlds.${w.id}`, 'missing');
    if (blank(worldTitleIn(lang, w))) err(lang, `world ${w.id}`, 'empty title');
    for (const l of w.levels) {
      if (lang !== 'pl' && lang !== 'en' && !L.levels?.[l.id]) err(lang, `levels.${l.id}`, 'missing');
      if (blank(levelTitleIn(lang, l))) err(lang, `level ${l.id}`, 'empty title');
    }
  }
  const extra = Object.keys(L.levels ?? {}).filter((id) => !WORLDS.some((w) => w.levels.some((l) => l.id === id)));
  if (extra.length) err(lang, 'levels', `unknown level ids: ${extra.join(', ')}`);
  // hints: every round
  for (const { where, r } of rounds) {
    const h = hintTextStrict(lang, r);
    if (blank(h)) err(lang, where, `no hint for ${r.rule}/${r.prompt.kind}:${r.prompt.id}`);
  }
  // hint pack: every word table entry and every variant for every id (not only those used today)
  const H = L.hints;
  if (lang !== 'pl' && !H) err(lang, 'hints', 'missing hint pack');
  if (H) {
    const probe = (where: string, s: string | undefined) => blank(s) && err(lang, `hints.${where}`, `empty: ${JSON.stringify(s)}`);
    for (const id of ITEM_IDS) {
      for (const k of ['same', 'food', 'home', 'pair', 'eat', 'wants'] as const) probe(`${k}(${id})`, H[k](id));
    }
    for (const id of COLOR_IDS) for (const k of ['isColor', 'likesColor', 'suitsColor'] as const) probe(`${k}(${id})`, H[k](id));
    for (const id of SHAPE_IDS) for (const k of ['looksLike', 'getsShape'] as const) probe(`${k}(${id})`, H[k](id));
    for (const id of TEXTURE_IDS) probe(`texture.${id}`, H.texture[id]);
    for (const [k, v] of Object.entries({ ...H.weather, ...H.baby, ...H.freeTexture })) probe(k, v);
    [...H.shadow, ...H.live, ...H.wear, ...H.play, H.suits, H.give].forEach((s, i) => probe(`lines[${i}]`, s));
    // en has duplicates (wear[1] = suits, play[1] = give); indexOf picks the first, so they must agree
    if (H.wear[1] !== H.suits) err(lang, 'hints', 'wear[1] must equal suits');
    if (H.play[1] !== H.give) err(lang, 'hints', 'play[1] must equal give');
    if (LOCALES.en.hints && hintVariants(H, rounds[0].r).length !== hintVariants(LOCALES.en.hints, rounds[0].r).length)
      err(lang, 'hints', 'variant count differs from en');
  }
  // privacy
  const P = L.privacy;
  if (blank(P.title)) err(lang, 'privacy.title', 'empty');
  if (P.sections.length !== LOCALES.en.privacy.sections.length) err(lang, 'privacy', `${P.sections.length} sections, en has ${LOCALES.en.privacy.sections.length}`);
  P.sections.forEach((s, i) => {
    if (blank(s.body)) err(lang, `privacy[${i}].body`, 'empty');
    if (!!s.heading !== !!LOCALES.en.privacy.sections[i]?.heading) err(lang, `privacy[${i}]`, 'heading presence differs from en');
  });
}

// summary + optional dump
for (const lang of LANGS) {
  const hs = new Set(rounds.map(({ r }) => hintTextStrict(lang, r)));
  console.log(`${lang}: ${rounds.length} rounds (${hs.size} distinct hint lines), ${WORLDS.length} worlds, ${WORLDS.reduce((n, w) => n + w.levels.length, 0)} levels, ${LOCALES[lang].privacy.sections.length} policy sections`);
}
if (printLang && (LANGS as readonly string[]).includes(printLang)) {
  const lang = printLang as (typeof LANGS)[number];
  for (const w of WORLDS) {
    console.log(`\n# ${worldTitleIn(lang, w)}`);
    for (const l of w.levels) {
      console.log(`  ${l.id} ${levelTitleIn(lang, l)}`);
      for (const r of l.rounds) console.log(`      ${hintTextStrict(lang, r)}`);
    }
  }
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):\n` + errors.join('\n'));
  process.exit(1);
}
console.log('\ni18n OK');
