/**
 * Pasujki — LEVELS (owner: levels agent). See docs/LEVELS.md for the research and the progression.
 *
 * Levels are described declaratively below (which prompts, how many active corners, how hard the
 * distractors are) and expanded into plain `Round` data at module load by a small deterministic
 * generator (seeded shuffle per level id: same output on every run / device). `WORLDS` itself is plain
 * data; nothing in it is a function. Validate with: npx tsx scripts/validate-levels.ts
 */
import {
  BABY_OF,
  ITEM_ATTRS,
  LIVES_IN,
  PAIRS,
  WEATHER_NEEDS,
  plausible,
  relatesUnderAnyRule,
  satisfies,
  type PlGender,
} from './item-attributes';
import { WORLD_TINTS } from './palette';
import {
  ITEM_IDS,
  type ColorId,
  type ItemId,
  type Level,
  type MatchRule,
  type Prompt,
  type Round,
  type ShapeId,
  type Target,
  type TextureId,
  type World,
} from './types';

// ── seeded RNG ────────────────────────────────────────────────────────────────────────────────
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
type Rng = () => number;
function rngFor(seed: string): Rng {
  let t = hash(seed);
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle<T>(arr: readonly T[], rng: Rng): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Polish / English words ─────────────────────────────────────────────────────────────────────
const COLOR_WORDS: Record<ColorId, { n: string; m: string; en: string }> = {
  red: { n: 'czerwone', m: 'czerwony', en: 'red' },
  yellow: { n: 'żółte', m: 'żółty', en: 'yellow' },
  blue: { n: 'niebieskie', m: 'niebieski', en: 'blue' },
  green: { n: 'zielone', m: 'zielony', en: 'green' },
  orange: { n: 'pomarańczowe', m: 'pomarańczowy', en: 'orange' },
  purple: { n: 'fioletowe', m: 'fioletowy', en: 'purple' },
  pink: { n: 'różowe', m: 'różowy', en: 'pink' },
  brown: { n: 'brązowe', m: 'brązowy', en: 'brown' },
  white: { n: 'białe', m: 'biały', en: 'white' },
  black: { n: 'czarne', m: 'czarny', en: 'black' },
  grey: { n: 'szare', m: 'szary', en: 'grey' },
};
const SHAPE_WORDS: Record<ShapeId, { pl: string; acc: string; en: string }> = {
  circle: { pl: 'kółko', acc: 'kółko', en: 'a circle' },
  square: { pl: 'kwadrat', acc: 'kwadrat', en: 'a square' },
  triangle: { pl: 'trójkąt', acc: 'trójkąt', en: 'a triangle' },
  star: { pl: 'gwiazdka', acc: 'gwiazdkę', en: 'a star' },
  heart: { pl: 'serduszko', acc: 'serduszko', en: 'a heart' },
  oval: { pl: 'jajeczko', acc: 'jajeczko', en: 'an oval' },
  rectangle: { pl: 'prostokąt', acc: 'prostokąt', en: 'a rectangle' },
  crescent: { pl: 'rogalik', acc: 'rogalik', en: 'a crescent' },
};
const TEXTURE_HINTS: Record<TextureId, [string, string]> = {
  stripes_bw: ['Kto ma czarno-białe paski?', 'Who has black and white stripes?'],
  stripes_orange: ['Kto ma takie paski?', 'Who has these stripes?'],
  spots_red_black: ['Kto ma takie kropeczki?', 'Who has these spots?'],
  spots_giraffe: ['Kto ma takie łatki?', 'Who has these patches?'],
  wool: ['Kto ma mięciutką wełnę?', 'Who has soft wool?'],
  feathers: ['Kto ma piórka?', 'Who has feathers?'],
  scales: ['Kto ma łuski?', 'Who has scales?'],
  honeycomb: ['Gdzie są plastry miodu?', 'Where is the honeycomb?'],
  wood: ['Co jest z drewna?', 'What is made of wood?'],
  waves: ['Gdzie są fale?', 'Where are the waves?'],
  bricks: ['Co jest z cegieł?', 'What is made of bricks?'],
  ice: ['Co jest z lodu?', 'What is made of ice?'],
  fur_brown: ['Kto ma brązowe futerko?', 'Who has brown fur?'],
  polka: ['Komu pasują kropki?', 'Who would like dots?'],
  checks: ['Kto chce kratkę?', 'Who would like checks?'],
  grass: ['Kto chce trawkę?', 'Who would like grass?'],
};
/** Free-round lines for textures that also have a real meaning elsewhere. */
const FREE_TEXTURE_HINTS: Partial<Record<TextureId, [string, string]>> = {
  stripes_bw: ['Kto chce mieć paski?', 'Who would like stripes?'],
  bricks: ['Kto zbuduje domek z cegieł?', 'Who will build a brick house?'],
  waves: ['Kto chce popływać?', 'Who wants to go swimming?'],
  honeycomb: ['Kto lubi takie plasterki?', 'Who likes this pattern?'],
  wool: ['Komu zrobimy sweterek?', 'Who gets a woolly jumper?'],
};
const WEATHER_HINTS: Partial<Record<ItemId, [string, string]>> = {
  sun: ['Słoneczko świeci! Co się przyda?', 'The sun is shining! What do we need?'],
  raindrop: ['Pada deszczyk! Co się przyda?', "It's raining! What do we need?"],
  cloud: ['Chmurka! Zaraz będzie padać. Co się przyda?', 'A cloud! Rain is coming. What do we need?'],
  snowflake: ['Pada śnieżek! Co się przyda?', "It's snowing! What do we need?"],
};
const TAKI_SAM: Record<PlGender, string> = { m: 'taki sam', f: 'taka sama', n: 'takie samo', pl: 'takie same' };
const jest = (g: PlGender) => (g === 'pl' ? 'są' : 'jest');

function need<T>(v: T | undefined, what: string): T {
  if (v === undefined) throw new Error(`levels: missing word form: ${what}`);
  return v;
}

function hintFor(rule: MatchRule, p: Prompt, freeIdx: number): [string, string] {
  if (rule === 'free') {
    switch (p.kind) {
      case 'color': {
        const w = COLOR_WORDS[p.id];
        return [`Kto lubi kolor ${w.m}?`, `Who likes ${w.en}?`];
      }
      case 'texture':
        return FREE_TEXTURE_HINTS[p.id] ?? TEXTURE_HINTS[p.id];
      case 'shape':
        return [`Komu dasz ${SHAPE_WORDS[p.id].acc}?`, `Who gets ${SHAPE_WORDS[p.id].en}?`];
      case 'item': {
        const at = ITEM_ATTRS[p.id];
        const lines: [string, string][] = [
          ['Komu to pasuje?', 'Who does this suit?'],
          [`Kto chce ${need(at.acc, p.id + '.acc')}?`, `Who wants the ${at.en}?`],
          ['Komu to dasz?', 'Who will you give it to?'],
        ];
        return lines[freeIdx % lines.length];
      }
    }
  }
  switch (p.kind) {
    case 'color':
      return [`Co jest ${COLOR_WORDS[p.id].n}?`, `What is ${COLOR_WORDS[p.id].en}?`];
    case 'shape':
      return [`Co wygląda jak ${SHAPE_WORDS[p.id].pl}?`, `What looks like ${SHAPE_WORDS[p.id].en}?`];
    case 'texture':
      return TEXTURE_HINTS[p.id];
    case 'item': {
      const at = ITEM_ATTRS[p.id];
      switch (rule) {
        case 'same':
          return [`Gdzie ${jest(at.g)} ${TAKI_SAM[at.g]} ${at.pl}?`, `Where is the same ${at.en}?`];
        case 'food':
          return [`Kto lubi ${need(at.acc, p.id + '.acc')}?`, `Who likes the ${at.en}?`];
        case 'home':
          return [`Gdzie mieszka ${at.pl}?`, `Where does the ${at.en} live?`];
        case 'baby':
          return [`Gdzie jest mama ${need(at.gen, p.id + '.gen')}?`, `Where is the ${at.en}'s mummy?`];
        case 'weather':
          return need(WEATHER_HINTS[p.id], p.id + '.weather');
        case 'pair':
          return [`Co pasuje do ${need(at.gen, p.id + '.gen')}?`, `What goes with the ${at.en}?`];
        default:
          throw new Error(`levels: no hint for ${rule}/${p.id}`);
      }
    }
  }
}

// ── level specs ───────────────────────────────────────────────────────────────────────────────
/**
 * easy   – distractors from another category and of another, clearly different colour (never a
 *          confusable hue) than the answer: obviously wrong.
 * medium – distractors of a different colour than the answer, same domain allowed.
 * hard   – lures: distractors preferably share the answer's colour (or a confusable hue in colour
 *          rounds), so the child has to use the rule, not the colour.
 */
type Diff = 'easy' | 'medium' | 'hard';
type RoundSpec = { rule: MatchRule; prompt: Prompt; answer?: ItemId };
type LevelSpec = {
  title_pl: string;
  title_en: string;
  age: Level['age'];
  active: 2 | 3 | 4;
  diff: Diff;
  rounds: RoundSpec[];
};
type WorldSpec = { title_pl: string; title_en: string; tint: string; levels: LevelSpec[] };

const it = (id: ItemId): Prompt => ({ kind: 'item', id });
const col = (id: ColorId): Prompt => ({ kind: 'color', id });
const shp = (id: ShapeId): Prompt => ({ kind: 'shape', id });
const tex = (id: TextureId): Prompt => ({ kind: 'texture', id });

const same = (...ids: ItemId[]): RoundSpec[] => ids.map((id) => ({ rule: 'same', prompt: it(id) }));
const colors = (...ids: ColorId[]): RoundSpec[] => ids.map((id) => ({ rule: 'color', prompt: col(id) }));
const shapes = (...ids: ShapeId[]): RoundSpec[] => ids.map((id) => ({ rule: 'shape', prompt: shp(id) }));
const textures = (...ids: (TextureId | [TextureId, ItemId])[]): RoundSpec[] =>
  ids.map((x) => (Array.isArray(x) ? { rule: 'texture', prompt: tex(x[0]), answer: x[1] } : { rule: 'texture', prompt: tex(x) }));
const rel = (rule: MatchRule, ...ids: (ItemId | [ItemId, ItemId])[]): RoundSpec[] =>
  ids.map((x) => (Array.isArray(x) ? { rule, prompt: it(x[0]), answer: x[1] } : { rule, prompt: it(x) }));
const free = (...ps: Prompt[]): RoundSpec[] => ps.map((prompt) => ({ rule: 'free', prompt }));

const WORLD_SPECS: WorldSpec[] = [
  // ── W1: identical picture (2+) ───────────────────────────────────────────────────────────────
  {
    title_pl: 'Takie same', title_en: 'The same', tint: WORLD_TINTS[0],
    levels: [
      { title_pl: 'Pierwsze kroki', title_en: 'First steps', age: '2+', active: 2, diff: 'easy',
        rounds: same('cat', 'ball', 'banana', 'car', 'duck', 'sun') },
      { title_pl: 'Gdzie jest drugi?', title_en: 'Where is the other one?', age: '2+', active: 2, diff: 'easy',
        rounds: same('dog', 'strawberry', 'fish', 'star', 'teddy', 'boat') },
      { title_pl: 'Trzy okienka', title_en: 'Three windows', age: '2+', active: 3, diff: 'easy',
        rounds: same('pig', 'frog', 'apple', 'umbrella', 'flower', 'train') },
      { title_pl: 'Co tu mamy?', title_en: 'What do we have here?', age: '2+', active: 3, diff: 'medium',
        rounds: same('rabbit', 'carrot', 'airplane', 'bee', 'balloon', 'cup') },
      { title_pl: 'Cztery okienka', title_en: 'Four windows', age: '2+', active: 4, diff: 'medium',
        rounds: same('elephant', 'lion', 'pear', 'drum', 'moon', 'sock') },
    ],
  },
  // ── W2: colours (2.5+ → 3+) ──────────────────────────────────────────────────────────────────
  {
    title_pl: 'Kolory', title_en: 'Colours', tint: WORLD_TINTS[1],
    levels: [
      { title_pl: 'Pierwsze kolory', title_en: 'First colours', age: '2+', active: 2, diff: 'easy',
        rounds: colors('red', 'yellow', 'red', 'yellow', 'blue', 'blue') },
      { title_pl: 'Niebieskie i zielone', title_en: 'Blue and green', age: '2+', active: 2, diff: 'easy',
        rounds: colors('green', 'blue', 'green', 'red', 'yellow', 'blue') },
      { title_pl: 'Tęcza', title_en: 'Rainbow', age: '3+', active: 3, diff: 'easy',
        rounds: colors('red', 'yellow', 'blue', 'green', 'orange', 'orange') },
      { title_pl: 'Nowe kolory', title_en: 'New colours', age: '3+', active: 3, diff: 'medium',
        rounds: colors('orange', 'pink', 'purple', 'brown', 'white', 'red') },
      { title_pl: 'Wszystkie kolory', title_en: 'All the colours', age: '3+', active: 4, diff: 'medium',
        rounds: colors('pink', 'purple', 'brown', 'black', 'grey', 'white') },
    ],
  },
  // ── W3: shapes (3+) ──────────────────────────────────────────────────────────────────────────
  {
    title_pl: 'Kształty', title_en: 'Shapes', tint: WORLD_TINTS[2],
    levels: [
      { title_pl: 'Kółko i gwiazdka', title_en: 'Circle and star', age: '3+', active: 2, diff: 'easy',
        rounds: shapes('circle', 'star', 'heart', 'circle', 'star', 'heart') },
      { title_pl: 'Trójkąt i rogalik', title_en: 'Triangle and crescent', age: '3+', active: 3, diff: 'easy',
        rounds: shapes('circle', 'star', 'heart', 'triangle', 'crescent', 'triangle') },
      { title_pl: 'Jajeczko', title_en: 'Oval', age: '3+', active: 3, diff: 'medium',
        rounds: shapes('oval', 'rectangle', 'crescent', 'circle', 'triangle', 'oval') },
      { title_pl: 'Wszystkie kształty', title_en: 'All the shapes', age: '4+', active: 4, diff: 'hard',
        rounds: shapes('circle', 'triangle', 'star', 'oval', 'rectangle', 'crescent') },
    ],
  },
  // ── W4: textures / patterns (3+ → 4+) ────────────────────────────────────────────────────────
  {
    title_pl: 'Wzorki', title_en: 'Patterns', tint: WORLD_TINTS[3],
    levels: [
      { title_pl: 'Paski i kropki', title_en: 'Stripes and spots', age: '3+', active: 2, diff: 'easy',
        rounds: textures('stripes_bw', 'spots_red_black', ['wool', 'sheep'], 'stripes_orange', 'spots_giraffe', 'scales') },
      { title_pl: 'Futerko i piórka', title_en: 'Fur and feathers', age: '3+', active: 3, diff: 'easy',
        rounds: textures(['feathers', 'hen'], ['fur_brown', 'bear'], ['wool', 'lamb'], 'stripes_bw', 'spots_giraffe', ['feathers', 'parrot']) },
      { title_pl: 'Z czego to jest?', title_en: 'What is it made of?', age: '3+', active: 4, diff: 'medium',
        rounds: textures('scales', ['wood', 'tree'], 'waves', 'bricks', 'ice', 'honeycomb') },
      { title_pl: 'Uważne oczka', title_en: 'Sharp eyes', age: '4+', active: 4, diff: 'hard',
        rounds: textures('stripes_orange', 'spots_giraffe', ['wool', 'sheep'], 'spots_red_black', ['fur_brown', 'bear'], ['feathers', 'duck']) },
    ],
  },
  // ── W5: mother & baby, food, homes (3+ → 4+) ─────────────────────────────────────────────────
  {
    title_pl: 'Kto z kim?', title_en: 'Who goes with whom?', tint: WORLD_TINTS[4],
    levels: [
      { title_pl: 'Mama i maluszek', title_en: 'Mummy and baby', age: '3+', active: 3, diff: 'easy',
        rounds: rel('baby', 'chick', 'kitten', 'puppy', 'lamb', 'calf', 'duckling') },
      { title_pl: 'Kto co je?', title_en: 'Who eats what?', age: '3+', active: 3, diff: 'easy',
        rounds: rel('food', ['carrot', 'rabbit'], ['bone', 'dog'], ['cheese', 'mouse'], ['banana', 'monkey'], ['acorn', 'squirrel'], ['honey', 'bear']) },
      { title_pl: 'Gdzie mieszka?', title_en: 'Where does it live?', age: '3+', active: 3, diff: 'easy',
        rounds: rel('home', ['dog', 'doghouse'], ['bee', 'beehive'], ['fish', 'pond'], ['penguin', 'iceberg'], ['squirrel', 'tree'], ['rabbit', 'hutch']) },
      { title_pl: 'Wszystkie mamy', title_en: 'All the mummies', age: '4+', active: 4, diff: 'medium',
        rounds: rel('baby', 'duckling', 'calf', 'chick', 'puppy', 'kitten', 'lamb') },
      { title_pl: 'Smacznego!', title_en: 'Enjoy your meal!', age: '4+', active: 4, diff: 'medium',
        rounds: rel('food', ['milk', 'cat'], ['leaf', 'giraffe'], ['corn', 'hen'], ['flower', 'butterfly'], ['bread', 'duck'], ['fish', 'penguin']) },
      { title_pl: 'Domki', title_en: 'Homes', age: '4+', active: 4, diff: 'medium',
        rounds: rel('home', ['whale', 'sea'], ['frog', 'pond'], ['cow', 'barn'], ['hen', 'nest'], ['owl', 'tree'], ['duck', 'pond']) },
    ],
  },
  // ── W6: weather & pairs, then lures (4+ → 5+) ────────────────────────────────────────────────
  {
    title_pl: 'Pogoda i pary', title_en: 'Weather and pairs', tint: WORLD_TINTS[5],
    levels: [
      { title_pl: 'Jaka pogoda?', title_en: "What's the weather?", age: '4+', active: 3, diff: 'easy',
        rounds: rel('weather', 'sun', ['raindrop', 'umbrella'], ['snowflake', 'scarf'], ['cloud', 'boot'], 'sun', ['snowflake', 'mitten']) },
      { title_pl: 'Co się przyda?', title_en: 'What do we need?', age: '4+', active: 4, diff: 'medium',
        rounds: rel('weather', 'sun', ['raindrop', 'boot'], ['snowflake', 'hat'], ['cloud', 'umbrella'], ['snowflake', 'mitten'], ['raindrop', 'umbrella']) },
      { title_pl: 'Co do pary?', title_en: 'What makes a pair?', age: '4+', active: 3, diff: 'easy',
        rounds: rel('pair', ['sock', 'shoe'], ['toothbrush', 'cup'], ['pillow', 'bed'], ['spoon', 'cup'], ['key', 'house'], ['crayon', 'book']) },
      { title_pl: 'Pary', title_en: 'Pairs', age: '4+', active: 4, diff: 'medium',
        rounds: rel('pair', ['shoe', 'sock'], ['mitten', 'scarf'], ['bed', 'pillow'], ['house', 'key'], ['book', 'crayon'], ['moon', 'star']) },
      { title_pl: 'Uważaj na kolory', title_en: 'Mind the colours', age: '5+', active: 4, diff: 'hard',
        rounds: [
          ...rel('weather', ['raindrop', 'umbrella'], ['snowflake', 'scarf'], 'sun'),
          ...rel('pair', ['sock', 'shoe'], ['toothbrush', 'soap'], ['star', 'moon']),
        ] },
      { title_pl: 'Mistrz pasowania', title_en: 'Matching champion', age: '5+', active: 4, diff: 'hard',
        rounds: [
          ...colors('purple'),
          ...shapes('circle'),
          ...textures('stripes_orange'),
          ...rel('food', ['carrot', 'rabbit']),
          ...rel('baby', 'kitten'),
          ...rel('pair', ['bone', 'dog']),
        ] },
    ],
  },
  // ── W7: abstract "Wymyślanki" – nothing truly fits, every choice is celebrated ───────────────
  {
    title_pl: 'Wymyślanki', title_en: 'Make-believe', tint: '#FDEFE3',
    levels: [
      { title_pl: 'Kto lubi ten kolor?', title_en: 'Who likes this colour?', age: '3+', active: 4, diff: 'easy',
        rounds: free(col('purple'), col('pink'), col('blue'), col('green'), col('orange'), col('black')) },
      { title_pl: 'Czyje wzorki?', title_en: 'Whose patterns?', age: '3+', active: 4, diff: 'easy',
        rounds: free(tex('polka'), tex('checks'), tex('bricks'), tex('stripes_bw'), tex('waves'), tex('honeycomb')) },
      { title_pl: 'Komu prezent?', title_en: 'A present for whom?', age: '3+', active: 4, diff: 'easy',
        rounds: free(it('balloon'), it('drum'), it('heart_toy'), it('teddy'), it('banana'), it('flower')) },
      { title_pl: 'Wymyśl sam', title_en: 'Your own idea', age: '3+', active: 4, diff: 'easy',
        rounds: free(shp('heart'), shp('star'), col('yellow'), tex('wool'), shp('square'), it('apple')) },
    ],
  },
];

// ── generator ─────────────────────────────────────────────────────────────────────────────────
const has = (i: ItemId, t: string) => (ITEM_ATTRS[i].tags as string[]).includes(t);
const ANIMALS = ITEM_IDS.filter((i) => has(i, 'animal') && !has(i, 'baby'));
const HOMES = ITEM_IDS.filter((i) => has(i, 'home'));
const THINGS = ITEM_IDS.filter((i) => !has(i, 'animal'));
const MOTHERS = new Set<ItemId>(Object.values(BABY_OF) as ItemId[]);
const WEATHER_STUFF = new Set<ItemId>(Object.values(WEATHER_NEEDS).flat() as ItemId[]);
const PAIR_STUFF = new Set<ItemId>(Object.keys(PAIRS) as ItemId[]);

/** Colours a toddler easily mixes up. Kept apart in easy/medium rounds, used as lures in hard ones. */
export const CONFUSABLE: Record<ColorId, ColorId[]> = {
  red: ['pink', 'orange'], pink: ['red', 'purple'], orange: ['red', 'yellow', 'brown'], yellow: ['orange'],
  blue: ['purple'], purple: ['blue', 'pink'], brown: ['orange', 'black'], white: ['grey'], grey: ['white', 'black'],
  black: ['grey', 'brown'], green: [],
};

const colorOf = (i: ItemId) => ITEM_ATTRS[i].color;

function answerCandidates(s: RoundSpec): ItemId[] {
  if (s.answer) return [s.answer];
  const p = s.prompt;
  switch (s.rule) {
    case 'same':
      return p.kind === 'item' ? [p.id] : [];
    case 'baby':
      return p.kind === 'item' && BABY_OF[p.id] ? [BABY_OF[p.id]!] : [];
    case 'home':
      return p.kind === 'item' ? (LIVES_IN[p.id] ?? []).slice(0, 1) : [];
    case 'food':
      // prompt is a food; the answer is an animal (not a baby) that eats it
      return ANIMALS.filter((i) => satisfies('food', p, i));
    default:
      return ITEM_IDS.filter((i) => satisfies(s.rule, p, i) && !(p.kind === 'item' && p.id === i));
  }
}

/** Which items may sit in a corner of this round at all, before difficulty filtering. */
function domain(s: RoundSpec, answer: ItemId): readonly ItemId[] {
  switch (s.rule) {
    case 'color':
      return ITEM_IDS.filter((i) => ITEM_ATTRS[i].colorFair);
    case 'texture':
      return has(answer, 'animal') ? ANIMALS : THINGS.filter((i) => !has(i, 'food'));
    case 'food':
    case 'baby':
    case 'free':
      return ANIMALS;
    case 'home':
      return HOMES;
    case 'weather':
    case 'pair':
      return THINGS;
    default:
      return ITEM_IDS;
  }
}

function pickDistractors(s: RoundSpec, answer: ItemId | null, n: number, diff: Diff, rng: Rng, recent: Set<ItemId>): ItemId[] {
  const p = s.prompt;
  const promptItem = p.kind === 'item' ? p.id : null;
  const kin = (x: ItemId, y: ItemId) => BABY_OF[x] === y || BABY_OF[y] === x;
  let pool: ItemId[];

  if (s.rule === 'free' || answer === null) {
    pool = ANIMALS.filter((i) => !relatesUnderAnyRule(p, i));
  } else {
    const ans = answer;
    pool = domain(s, ans).filter((i) => i !== ans && i !== promptItem && !plausible(s.rule, p, i) && !kin(i, ans));
    if (promptItem) pool = pool.filter((i) => !kin(i, promptItem));

    switch (s.rule) {
      case 'shape':
        if (diff === 'hard') pool = pool.filter((i) => ITEM_ATTRS[i].outline !== null); // other clear shapes
        else if (diff === 'easy') pool = pool.filter((i) => ITEM_ATTRS[i].outline === null); // shapeless animals/things
        break;
      case 'baby':
        pool = diff === 'easy' ? pool.filter((i) => !MOTHERS.has(i) && has(i, 'wild')) : pool.filter((i) => MOTHERS.has(i));
        break;
      case 'weather':
        if (diff === 'easy') pool = pool.filter((i) => has(i, 'toy') || has(i, 'food'));
        if (diff === 'medium') pool = pool.filter((i) => WEATHER_STUFF.has(i) || has(i, 'clothing') || has(i, 'toy'));
        break;
      case 'pair':
        if (diff === 'easy') pool = ANIMALS.filter((i) => !plausible('pair', p, i) && !kin(i, ans));
        if (diff === 'medium') pool = pool.filter((i) => PAIR_STUFF.has(i));
        break;
      case 'same':
        if (diff === 'easy') pool = pool.filter((i) => ITEM_ATTRS[i].tags[0] !== ITEM_ATTRS[ans].tags[0]);
        break;
    }
    if (diff !== 'hard') {
      // never a colour lure: a different colour from the answer; in easy rounds (and in every
      // colour round) also no confusable hue
      const c = colorOf(ans);
      const strict = diff === 'easy' || s.rule === 'color';
      pool = pool.filter((i) => colorOf(i) !== c && !(strict && CONFUSABLE[c].includes(colorOf(i))));
    }
  }

  // prefer items not shown in the previous round, then shuffle; hard rounds put colour lures first
  const fresh = pool.filter((i) => !recent.has(i));
  let ordered = shuffle(fresh.length >= n + 2 ? fresh : pool, rng);
  if (diff === 'hard' && answer) {
    const lureColors: ColorId[] = p.kind === 'color' ? CONFUSABLE[p.id] : [colorOf(answer)];
    const lures = ordered.filter((i) => lureColors.includes(colorOf(i))).slice(0, Math.min(2, n));
    ordered = [...lures, ...ordered.filter((i) => !lures.includes(i))];
  }

  // colour & free rounds (and easy ones): every corner a different colour, no confusable neighbours
  const distinct = s.rule === 'color' || s.rule === 'free' || diff === 'easy';
  const chosen: ItemId[] = [];
  const used: ColorId[] = answer ? [colorOf(answer)] : [];
  for (const i of ordered) {
    if (chosen.length === n) break;
    const c = colorOf(i);
    if (distinct && used.includes(c)) continue;
    if (distinct && diff === 'easy' && used.some((u) => CONFUSABLE[u].includes(c))) continue;
    chosen.push(i);
    used.push(c);
  }
  if (chosen.length < n) {
    throw new Error(`levels: not enough distractors for ${s.rule}/${JSON.stringify(p)} (got ${chosen.length}/${n})`);
  }
  return chosen;
}

/** Answer quadrants for a level: balanced (counts differ by ≤ 1) and never the same corner twice in a row. */
function quadrantPlan(n: number, rng: Rng): (0 | 1 | 2 | 3)[] {
  for (let attempt = 0; attempt < 500; attempt++) {
    const plan: (0 | 1 | 2 | 3)[] = [];
    while (plan.length < n) plan.push(...shuffle([0, 1, 2, 3] as const, rng));
    const cut = shuffle(plan.slice(0, n), rng);
    if (cut.every((q, k) => k === 0 || q !== cut[k - 1])) return cut;
  }
  throw new Error('levels: no quadrant plan');
}

const promptKey = (p: Prompt) => `${p.kind}:${p.id}`;

function orderRounds(specs: RoundSpec[], rng: Rng): RoundSpec[] {
  for (let attempt = 0; attempt < 500; attempt++) {
    const o = shuffle(specs, rng);
    const ok = o.every(
      (s, k) => k === 0 || (promptKey(s.prompt) !== promptKey(o[k - 1].prompt) && (!s.answer || s.answer !== o[k - 1].answer)),
    );
    if (ok) return o;
  }
  throw new Error('levels: cannot order rounds without repeats');
}

function buildLevel(world: number, idx: number, spec: LevelSpec): Level {
  const id = `w${world}-l${idx + 1}`;
  const rng = rngFor(id);
  const specs = orderRounds(spec.rounds, rng);
  const plan = quadrantPlan(Math.max(specs.filter((s) => s.rule !== 'free').length, 1), rng);
  const usedAnswers = new Map<ItemId, number>();
  const recent = new Set<ItemId>();
  let prevAnswer: ItemId | null = null;
  let g = 0;
  let freeIdx = 0;

  const rounds: Round[] = specs.map((s) => {
    const targets: Target[] = [null, null, null, null];
    let answer: Round['answer'] = null;
    if (s.rule === 'free') {
      pickDistractors(s, null, 4, spec.diff, rng, recent).forEach((d, k) => (targets[k] = { id: d }));
    } else {
      const cands = answerCandidates(s);
      if (!cands.length) throw new Error(`levels: no answer for ${id} ${s.rule}/${promptKey(s.prompt)}`);
      const sorted = shuffle(cands, rng).sort((x, y) => (usedAnswers.get(x) ?? 0) - (usedAnswers.get(y) ?? 0));
      const ans = sorted.find((c) => c !== prevAnswer) ?? sorted[0];
      usedAnswers.set(ans, (usedAnswers.get(ans) ?? 0) + 1);
      prevAnswer = ans;
      const q = plan[g++];
      answer = q;
      targets[q] = { id: ans };
      const corners = shuffle(([0, 1, 2, 3] as const).filter((k) => k !== q), rng).slice(0, spec.active - 1);
      const ds = pickDistractors(s, ans, spec.active - 1, spec.diff, rng, recent);
      corners.forEach((k, j) => (targets[k] = { id: ds[j] }));
    }
    recent.clear();
    for (const t of targets) if (t) recent.add(t.id);
    const [hint_pl, hint_en] = hintFor(s.rule, s.prompt, s.rule === 'free' ? freeIdx++ : 0);
    return { prompt: s.prompt, targets: targets as Round['targets'], answer, rule: s.rule, hint_pl, hint_en };
  });

  return { id, world, title_pl: spec.title_pl, title_en: spec.title_en, age: spec.age, rounds };
}

export const WORLDS: World[] = WORLD_SPECS.map((w, wi) => ({
  id: wi + 1,
  title_pl: w.title_pl,
  title_en: w.title_en,
  tint: w.tint,
  levels: w.levels.map((l, li) => buildLevel(wi + 1, li, l)),
}));
