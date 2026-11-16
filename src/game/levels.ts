/**
 * Pasujki — LEVELS (owner: levels agent). See docs/LEVELS.md for the research and the progression.
 *
 * Levels are described declaratively below (which prompts, how many active corners, how hard the
 * distractors are) and expanded into plain `Round` data at module load by a small deterministic
 * generator (seeded shuffle per level id: same output on every run / device). `WORLDS` itself is plain
 * data; nothing in it is a function. Validate with: npx tsx scripts/validate-levels.ts
 *
 * Variety (v0.2): within a level an item appears at most twice (prompt + targets), an answer item is
 * never reused as an answer in the same level, prompts never repeat in a level, and the generator
 * prefers items that were used least in the current world and avoids the previous level's answers.
 */
import { SILHOUETTE_CLEAR } from '../art/silhouette-ok';
import {
  BABY_OF,
  ITEM_ATTRS,
  LIVES_IN,
  PAIRS,
  SIL_FAMILY,
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
const SHADOW_HINTS: [string, string][] = [
  ['Czyj to cień?', 'Whose shadow is this?'],
  ['Kto się schował w cieniu?', 'Who is hiding in the shadow?'],
  ['Do kogo pasuje ten cień?', 'Who does this shadow belong to?'],
];
/** Themed lines for abstract ("free") levels. */
type FreeTheme = 'default' | 'gift' | 'eat' | 'live' | 'wear' | 'play';
const FREE_LINES: Record<Exclude<FreeTheme, 'default' | 'eat' | 'gift'>, [string, string][]> = {
  live: [
    ['Kto by tu zamieszkał?', 'Who would live here?'],
    ['Czyj to będzie domek?', 'Whose home will this be?'],
    ['Kto się tu wprowadzi?', 'Who will move in here?'],
  ],
  wear: [
    ['Kto to założy?', 'Who will wear this?'],
    ['Komu to pasuje?', 'Who does this suit?'],
    ['Kto się w to przebierze?', 'Who will dress up in this?'],
  ],
  play: [
    ['Kto się tym pobawi?', 'Who will play with this?'],
    ['Komu to dasz?', 'Who will you give it to?'],
    ['Kto chce się bawić?', 'Who wants to play?'],
  ],
};
const TAKI_SAM: Record<PlGender, string> = { m: 'taki sam', f: 'taka sama', n: 'takie samo', pl: 'takie same' };
const jest = (g: PlGender) => (g === 'pl' ? 'są' : 'jest');

function need<T>(v: T | undefined, what: string): T {
  if (v === undefined) throw new Error(`levels: missing word form: ${what}`);
  return v;
}

function freeHint(theme: FreeTheme, p: Prompt, k: number): [string, string] {
  switch (p.kind) {
    case 'color': {
      const w = COLOR_WORDS[p.id];
      return k % 2 === 0 ? [`Kto lubi kolor ${w.m}?`, `Who likes ${w.en}?`] : [`Komu pasuje kolor ${w.m}?`, `Who suits ${w.en}?`];
    }
    case 'texture':
      return FREE_TEXTURE_HINTS[p.id] ?? TEXTURE_HINTS[p.id];
    case 'shape':
      return [`Komu dasz ${SHAPE_WORDS[p.id].acc}?`, `Who gets ${SHAPE_WORDS[p.id].en}?`];
    case 'shadow':
      return SHADOW_HINTS[k % SHADOW_HINTS.length];
    case 'item': {
      const at = ITEM_ATTRS[p.id];
      if (theme === 'eat') return [`Co zje ${at.pl}?`, `What would the ${at.en} eat?`];
      if (theme === 'live' || theme === 'wear' || theme === 'play') return FREE_LINES[theme][k % 3];
      const lines: [string, string][] = [
        ['Komu to pasuje?', 'Who does this suit?'],
        [`Kto chce ${need(at.acc, p.id + '.acc')}?`, `Who wants the ${at.en}?`],
        ['Komu to dasz?', 'Who will you give it to?'],
      ];
      return lines[k % lines.length];
    }
  }
}

function hintFor(rule: MatchRule, p: Prompt, theme: FreeTheme, k: number): [string, string] {
  if (rule === 'free') return freeHint(theme, p, k);
  switch (p.kind) {
    case 'color':
      return [`Co jest ${COLOR_WORDS[p.id].n}?`, `What is ${COLOR_WORDS[p.id].en}?`];
    case 'shape':
      return [`Co wygląda jak ${SHAPE_WORDS[p.id].pl}?`, `What looks like ${SHAPE_WORDS[p.id].en}?`];
    case 'texture':
      return TEXTURE_HINTS[p.id];
    case 'shadow':
      return SHADOW_HINTS[k % SHADOW_HINTS.length];
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
 * easy   – distractors from another category / silhouette family and of another, clearly different
 *          colour (never a confusable hue) than the answer: obviously wrong.
 * medium – distractors of a different colour than the answer, same domain allowed.
 * hard   – lures: distractors preferably share the answer's colour (a confusable hue in colour rounds,
 *          the same silhouette family in shadow rounds), so the child has to use the rule.
 */
type Diff = 'easy' | 'medium' | 'hard';
/** `prompt` omitted = 'shadow' round whose item is picked by the generator (from SILHOUETTE_CLEAR). */
type RoundSpec = { rule: MatchRule; prompt?: Prompt; answer?: ItemId };
type LevelSpec = {
  title_pl: string;
  title_en: string;
  age: Level['age'];
  active: 2 | 3 | 4;
  diff: Diff;
  theme?: FreeTheme;
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
const shadows = (n: number): RoundSpec[] => Array.from({ length: n }, () => ({ rule: 'shadow' as const }));
const free = (...ps: Prompt[]): RoundSpec[] => ps.map((prompt) => ({ rule: 'free', prompt }));
const freeItems = (...ids: ItemId[]): RoundSpec[] => free(...ids.map(it));

type LvlOpts = Omit<LevelSpec, 'title_pl' | 'title_en' | 'rounds'>;
const L = (title_pl: string, title_en: string, o: LvlOpts, rounds: RoundSpec[]): LevelSpec => ({ title_pl, title_en, ...o, rounds });

const WORLD_SPECS: WorldSpec[] = [
  // ── W1: identical picture (2+) ───────────────────────────────────────────────────────────────
  {
    title_pl: 'Takie same', title_en: 'The same', tint: WORLD_TINTS[0],
    levels: [
      L('Pierwsze kroki', 'First steps', { age: '2+', active: 2, diff: 'easy' }, same('cat', 'ball', 'banana', 'car', 'duck', 'sun')),
      L('Gdzie jest drugi?', 'Where is the other one?', { age: '2+', active: 2, diff: 'easy' }, same('dog', 'strawberry', 'fish', 'star', 'teddy', 'boat')),
      L('Para do pary', 'Find the twin', { age: '2+', active: 2, diff: 'easy' }, same('pig', 'apple', 'umbrella', 'flower', 'train', 'frog')),
      L('Trzy okienka', 'Three windows', { age: '2+', active: 3, diff: 'easy' }, same('rabbit', 'carrot', 'airplane', 'bee', 'balloon', 'cup')),
      L('Co tu mamy?', 'What do we have here?', { age: '2+', active: 3, diff: 'easy' }, same('elephant', 'pear', 'drum', 'moon', 'sock', 'kite')),
      L('Zgadnij!', 'Guess!', { age: '2+', active: 3, diff: 'medium' }, same('lion', 'cake', 'bucket', 'hat', 'snail', 'gift')),
      L('Cztery okienka', 'Four windows', { age: '2+', active: 4, diff: 'medium' }, same('giraffe', 'block', 'mushroom', 'owl', 'bicycle', 'cherry')),
      L('Bystre oczka', 'Bright eyes', { age: '2+', active: 4, diff: 'medium' }, same('hedgehog', 'fox', 'shovel', 'key', 'rainbow', 'octopus')),
    ],
  },
  // ── W2: colours (2.5+ → 4+) ──────────────────────────────────────────────────────────────────
  {
    title_pl: 'Kolory', title_en: 'Colours', tint: WORLD_TINTS[1],
    levels: [
      L('Pierwsze kolory', 'First colours', { age: '2+', active: 2, diff: 'easy' }, colors('red', 'yellow', 'blue', 'green', 'orange', 'white')),
      L('Kolorowy dzień', 'A colourful day', { age: '2+', active: 2, diff: 'easy' }, colors('blue', 'green', 'red', 'yellow', 'pink', 'brown')),
      L('Tęcza', 'Rainbow', { age: '2+', active: 3, diff: 'easy' }, colors('red', 'yellow', 'blue', 'green', 'purple', 'orange')),
      L('Nowe kolory', 'New colours', { age: '3+', active: 3, diff: 'easy' }, colors('orange', 'pink', 'brown', 'white', 'grey', 'blue')),
      L('Ciemne i jasne', 'Dark and light', { age: '3+', active: 3, diff: 'medium' }, colors('purple', 'pink', 'brown', 'black', 'grey', 'yellow')),
      L('Cztery kolory', 'Four colours', { age: '3+', active: 4, diff: 'medium' }, colors('red', 'green', 'orange', 'white', 'purple', 'black')),
      L('Wszystkie kolory', 'All the colours', { age: '3+', active: 4, diff: 'medium' }, colors('pink', 'grey', 'brown', 'yellow', 'blue', 'purple')),
      L('Podobne kolory', 'Look-alike colours', { age: '4+', active: 4, diff: 'hard' }, colors('red', 'pink', 'orange', 'purple', 'grey', 'white')),
    ],
  },
  // ── W3: shapes (3+ → 4+) ─────────────────────────────────────────────────────────────────────
  {
    title_pl: 'Kształty', title_en: 'Shapes', tint: WORLD_TINTS[2],
    levels: [
      L('Kółko i gwiazdka', 'Circle and star', { age: '3+', active: 2, diff: 'easy' }, shapes('circle', 'star', 'heart', 'square', 'triangle', 'crescent')),
      L('Kwadrat i serduszko', 'Square and heart', { age: '3+', active: 2, diff: 'easy' }, shapes('circle', 'square', 'heart', 'oval', 'crescent', 'triangle')),
      L('Trójkąt i rogalik', 'Triangle and crescent', { age: '3+', active: 3, diff: 'easy' }, shapes('triangle', 'circle', 'star', 'oval', 'rectangle', 'square')),
      L('Jajeczko', 'Oval', { age: '3+', active: 3, diff: 'medium' }, shapes('square', 'crescent', 'oval', 'circle', 'triangle', 'heart')),
      L('Prostokąt', 'Rectangle', { age: '3+', active: 3, diff: 'medium' }, shapes('star', 'rectangle', 'circle', 'square', 'crescent', 'oval')),
      L('Cztery kształty', 'Four shapes', { age: '4+', active: 4, diff: 'medium' }, shapes('heart', 'triangle', 'oval', 'square', 'circle', 'crescent')),
      L('Wszystkie kształty', 'All the shapes', { age: '4+', active: 4, diff: 'hard' }, shapes('circle', 'square', 'triangle', 'star', 'oval', 'rectangle')),
    ],
  },
  // ── W4: shadows (3+ → 4+) ────────────────────────────────────────────────────────────────────
  {
    title_pl: 'Cienie', title_en: 'Shadows', tint: '#ECEEF6',
    levels: [
      L('Czyj to cień?', 'Whose shadow?', { age: '3+', active: 2, diff: 'easy' }, shadows(6)),
      L('Schowani w cieniu', 'Hiding in the shadow', { age: '3+', active: 3, diff: 'easy' }, shadows(6)),
      L('Cienie na ścianie', 'Shadows on the wall', { age: '3+', active: 3, diff: 'medium' }, shadows(6)),
      L('Cztery cienie', 'Four shadows', { age: '4+', active: 4, diff: 'medium' }, shadows(6)),
      L('Podobne cienie', 'Look-alike shadows', { age: '4+', active: 4, diff: 'hard' }, shadows(6)),
      L('Mistrz cieni', 'Shadow champion', { age: '4+', active: 4, diff: 'hard' }, shadows(6)),
    ],
  },
  // ── W5: textures / patterns (3+ → 4+) ────────────────────────────────────────────────────────
  {
    title_pl: 'Wzorki', title_en: 'Patterns', tint: WORLD_TINTS[3],
    levels: [
      L('Paski i kropki', 'Stripes and spots', { age: '3+', active: 2, diff: 'easy' },
        textures('stripes_bw', 'spots_red_black', ['wool', 'sheep'], 'scales', ['feathers', 'hen'], ['fur_brown', 'bear'])),
      L('Futerko i piórka', 'Fur and feathers', { age: '3+', active: 2, diff: 'easy' },
        textures('stripes_orange', 'spots_giraffe', ['feathers', 'parrot'], ['wool', 'lamb'], ['fur_brown', 'monkey'], 'honeycomb')),
      L('Kto to ma?', 'Who has it?', { age: '3+', active: 3, diff: 'easy' },
        textures('stripes_bw', 'scales', ['wood', 'tree'], ['feathers', 'owl'], ['fur_brown', 'horse'], 'spots_red_black')),
      L('Z czego to jest?', 'What is it made of?', { age: '3+', active: 3, diff: 'medium' },
        textures('waves', 'bricks', 'ice', ['wood', 'doghouse'], 'honeycomb', 'stripes_orange')),
      L('Miękkie i twarde', 'Soft and hard', { age: '3+', active: 3, diff: 'medium' },
        textures('spots_giraffe', ['wool', 'sheep'], ['feathers', 'flamingo'], ['fur_brown', 'dog'], 'stripes_bw', 'scales')),
      L('Cztery wzorki', 'Four patterns', { age: '3+', active: 4, diff: 'medium' },
        textures('spots_red_black', 'stripes_orange', 'waves', ['wood', 'barn'], 'bricks', ['feathers', 'crow'])),
      L('Uważne oczka', 'Sharp eyes', { age: '4+', active: 4, diff: 'hard' },
        textures('spots_giraffe', ['wool', 'lamb'], ['fur_brown', 'bear'], ['feathers', 'duck'], 'stripes_bw', 'ice')),
      L('Mistrz wzorków', 'Pattern champion', { age: '4+', active: 4, diff: 'hard' },
        textures('honeycomb', 'waves', 'scales', 'stripes_orange', ['wood', 'hutch'], 'spots_red_black')),
    ],
  },
  // ── W6: mother & baby, food, homes (3+ → 4+) ─────────────────────────────────────────────────
  {
    title_pl: 'Kto z kim?', title_en: 'Who goes with whom?', tint: WORLD_TINTS[4],
    levels: [
      L('Mama i maluszek', 'Mummy and baby', { age: '3+', active: 3, diff: 'easy' },
        [...rel('baby', 'chick', 'kitten', 'lamb'), ...rel('food', ['carrot', 'rabbit'], ['banana', 'monkey'], ['honey', 'bear'])]),
      L('Kto co je?', 'Who eats what?', { age: '3+', active: 3, diff: 'easy' },
        [...rel('food', ['cheese', 'mouse'], ['acorn', 'squirrel'], ['bone', 'dog'], ['hay', 'horse']), ...rel('baby', 'duckling', 'calf')]),
      L('Gdzie mieszka?', 'Where does it live?', { age: '3+', active: 3, diff: 'easy' },
        [...rel('home', ['bee', 'beehive'], ['fish', 'pond'], ['penguin', 'iceberg'], ['rabbit', 'hutch']), ...rel('baby', 'puppy'), ...rel('food', ['milk', 'cat'])]),
      L('Domki i smakołyki', 'Homes and treats', { age: '3+', active: 3, diff: 'easy' },
        [...rel('home', ['squirrel', 'tree'], ['cow', 'barn']), ...rel('food', ['mushroom', 'hedgehog'], ['worm', 'bird']), ...rel('baby', 'chick', 'lamb')]),
      L('Smacznego!', 'Enjoy your meal!', { age: '3+', active: 3, diff: 'medium' },
        [...rel('food', ['fish', 'penguin'], ['leaf', 'giraffe'], ['apple', 'horse']), ...rel('baby', 'kitten', 'calf'), ...rel('home', ['whale', 'sea'])]),
      L('Kto gdzie mieszka?', 'Who lives where?', { age: '3+', active: 3, diff: 'medium' },
        [...rel('home', ['frog', 'pond'], ['hen', 'nest'], ['owl', 'tree']), ...rel('food', ['flower', 'butterfly'], ['carrot', 'rabbit']), ...rel('baby', 'puppy')]),
      L('Wszystkie mamy', 'All the mummies', { age: '4+', active: 4, diff: 'medium' },
        [...rel('baby', 'lamb', 'chick', 'duckling'), ...rel('food', ['honey', 'bear'], ['bread', 'mouse']), ...rel('home', ['octopus', 'sea'])]),
      L('Leśni przyjaciele', 'Forest friends', { age: '4+', active: 4, diff: 'medium' },
        [...rel('baby', 'kitten', 'calf'), ...rel('food', ['egg', 'fox'], ['acorn', 'squirrel'], ['mushroom', 'hedgehog']), ...rel('home', ['monkey', 'tree'])]),
      L('Na łące i w stawie', 'In the meadow and the pond', { age: '4+', active: 4, diff: 'medium' },
        [...rel('home', ['bird', 'nest'], ['pig', 'barn'], ['flamingo', 'pond']), ...rel('food', ['blueberries', 'bear'], ['hay', 'cow']), ...rel('baby', 'puppy')]),
      L('Uważaj!', 'Careful!', { age: '4+', active: 4, diff: 'hard' },
        [...rel('baby', 'chick', 'kitten'), ...rel('food', ['carrot', 'rabbit'], ['cheese', 'mouse']), ...rel('home', ['penguin', 'iceberg'], ['squirrel', 'tree'])]),
      L('Podobni', 'Look-alikes', { age: '4+', active: 4, diff: 'hard' },
        [...rel('baby', 'lamb', 'duckling'), ...rel('food', ['hay', 'horse'], ['worm', 'bird']), ...rel('home', ['bee', 'beehive'], ['fish', 'pond'])]),
      L('Mistrz zwierzaków', 'Animal champion', { age: '4+', active: 4, diff: 'hard' },
        [...rel('baby', 'calf', 'puppy'), ...rel('food', ['acorn', 'squirrel'], ['milk', 'cat']), ...rel('home', ['rabbit', 'hutch'], ['whale', 'sea'])]),
    ],
  },
  // ── W7: weather & pairs, then lures (4+ → 5+) ────────────────────────────────────────────────
  {
    title_pl: 'Pogoda i pary', title_en: 'Weather and pairs', tint: WORLD_TINTS[5],
    levels: [
      L('Jaka pogoda?', "What's the weather?", { age: '4+', active: 3, diff: 'easy' },
        [...rel('weather', 'sun', ['raindrop', 'umbrella'], ['snowflake', 'scarf']), ...rel('pair', ['sock', 'shoe'], ['spoon', 'cup'], ['key', 'house'])]),
      L('Co się przyda?', 'What do we need?', { age: '4+', active: 3, diff: 'easy' },
        [...rel('weather', ['cloud', 'boot'], ['snowflake', 'mitten']), ...rel('pair', ['pillow', 'bed'], ['crayon', 'book'], ['bucket', 'shovel'], ['moon', 'star'])]),
      L('Co do pary?', 'What makes a pair?', { age: '4+', active: 3, diff: 'easy' },
        [...rel('weather', ['raindrop', 'umbrella'], 'sun'), ...rel('pair', ['toothbrush', 'soap'], ['cake', 'party_hat'], ['bone', 'kennel_bowl'], ['egg', 'nest'])]),
      L('Pary', 'Pairs', { age: '4+', active: 3, diff: 'medium' },
        [...rel('weather', ['snowflake', 'hat'], ['cloud', 'boot']), ...rel('pair', ['mitten', 'scarf'], ['flower', 'bee'], ['lamp', 'book'], ['gift', 'balloon'])]),
      L('Deszcz i śnieg', 'Rain and snow', { age: '4+', active: 4, diff: 'medium' },
        [...rel('weather', 'sun', ['raindrop', 'umbrella'], ['snowflake', 'mitten']), ...rel('pair', ['milk', 'cup'], ['star', 'moon'], ['shovel', 'bucket'])]),
      L('Urodziny', 'Birthday', { age: '4+', active: 4, diff: 'medium' },
        [...rel('weather', ['cloud', 'boot'], ['snowflake', 'scarf']), ...rel('pair', ['sock', 'shoe'], ['toothbrush', 'cup'], ['party_hat', 'gift'], ['honey', 'bee'])]),
      L('Co jest czyje?', 'What belongs where?', { age: '4+', active: 4, diff: 'medium' },
        [...rel('weather', ['raindrop', 'umbrella'], 'sun'), ...rel('pair', ['bed', 'teddy'], ['egg', 'hen'], ['key', 'house'], ['cheese', 'sandwich'])]),
      L('Uważaj na kolory', 'Mind the colours', { age: '5+', active: 4, diff: 'hard' },
        [...rel('weather', ['raindrop', 'boot'], ['snowflake', 'scarf'], 'sun'), ...rel('pair', ['sock', 'shoe'], ['toothbrush', 'soap'], ['star', 'moon'])]),
      L('Podchwytliwe pary', 'Tricky pairs', { age: '5+', active: 4, diff: 'hard' },
        [...rel('weather', ['cloud', 'umbrella'], ['snowflake', 'mitten']), ...rel('pair', ['bucket', 'shovel'], ['cake', 'party_hat'], ['spoon', 'cup'], ['pillow', 'bed'])]),
      L('Mistrz pasowania', 'Matching champion', { age: '5+', active: 4, diff: 'hard' }, [
        ...colors('purple'), ...shapes('square'), ...textures('stripes_orange'),
        ...rel('food', ['carrot', 'rabbit']), ...rel('baby', 'kitten'), ...rel('pair', ['bone', 'dog']),
      ]),
    ],
  },
  // ── W8: abstract "Wymyślanki" – nothing truly fits, every choice is celebrated ───────────────
  {
    title_pl: 'Wymyślanki', title_en: 'Make-believe', tint: '#FDEFE3',
    levels: [
      L('Kto lubi ten kolor?', 'Who likes this colour?', { age: '3+', active: 4, diff: 'easy' },
        free(col('purple'), col('pink'), col('blue'), col('green'), col('orange'), col('black'))),
      L('Czyje wzorki?', 'Whose patterns?', { age: '3+', active: 4, diff: 'easy' },
        free(tex('polka'), tex('checks'), tex('bricks'), tex('stripes_bw'), tex('waves'), tex('honeycomb'))),
      L('Komu prezent?', 'A present for whom?', { age: '3+', active: 4, diff: 'easy', theme: 'gift' },
        freeItems('balloon', 'drum', 'heart_toy', 'teddy', 'gift', 'kite')),
      L('Co zje dinozaur?', 'What would a dinosaur eat?', { age: '3+', active: 4, diff: 'easy', theme: 'eat' },
        freeItems('dinosaur', 'octopus', 'lion', 'tiger', 'snowman', 'teddy')),
      L('Kto by tu zamieszkał?', 'Who would live here?', { age: '3+', active: 4, diff: 'easy', theme: 'live' },
        freeItems('iceberg', 'beehive', 'doghouse', 'hutch', 'nest', 'pond')),
      L('Wymyśl sam', 'Your own idea', { age: '3+', active: 4, diff: 'easy', theme: 'gift' },
        free(shp('heart'), shp('star'), col('yellow'), tex('wool'), shp('square'), it('apple'))),
      L('Co założymy?', 'What shall we wear?', { age: '3+', active: 4, diff: 'easy', theme: 'wear' },
        freeItems('sunglasses', 'scarf', 'hat', 'boot', 'sock', 'party_hat')),
      L('Komu ten kolor?', 'Whose colour is it?', { age: '3+', active: 4, diff: 'easy' },
        free(col('red'), col('yellow'), col('white'), col('brown'), col('grey'), col('blue'))),
      L('Pobawmy się!', "Let's play!", { age: '3+', active: 4, diff: 'easy', theme: 'play' },
        freeItems('ball', 'bucket', 'block', 'rainbow', 'shovel', 'bicycle')),
    ],
  },
];

// ── generator ─────────────────────────────────────────────────────────────────────────────────
const has = (i: ItemId, t: string) => (ITEM_ATTRS[i].tags as string[]).includes(t);
const ANIMALS = ITEM_IDS.filter((i) => has(i, 'animal') && !has(i, 'baby'));
const FOODS = ITEM_IDS.filter((i) => has(i, 'food') && !has(i, 'animal'));
const HOMES = ITEM_IDS.filter((i) => has(i, 'home'));
const THINGS = ITEM_IDS.filter((i) => !has(i, 'animal'));
const SIL_OK = ITEM_IDS.filter((i) => (SILHOUETTE_CLEAR as readonly ItemId[]).includes(i));
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
const kin = (x: ItemId, y: ItemId) => BABY_OF[x] === y || BABY_OF[y] === x;
const promptItem = (p: Prompt): ItemId | null => (p.kind === 'item' || p.kind === 'shadow' ? p.id : null);
const promptKey = (p: Prompt) => `${p.kind}:${p.id}${p.kind === 'shape' && p.color ? ':' + p.color : ''}`;

/** Per-world memory: how often each item was shown, and the previous level's answers. */
type WorldState = { seen: Map<ItemId, number>; prevAnswers: Set<ItemId> };
/** Per-level memory. */
type LevelState = { count: Map<ItemId, number>; answers: Set<ItemId>; recent: Set<ItemId> };

const MAX_PER_LEVEL = 2;
const roomFor = (ls: LevelState, i: ItemId) => (ls.count.get(i) ?? 0) < MAX_PER_LEVEL;

/** Order by "least seen in this world", ties broken by the seeded shuffle. */
function byFreshness(items: readonly ItemId[], ws: WorldState, rng: Rng): ItemId[] {
  return shuffle(items, rng).sort((a, b) => (ws.seen.get(a) ?? 0) - (ws.seen.get(b) ?? 0));
}

function answerCandidates(s: RoundSpec, p: Prompt): ItemId[] {
  if (s.answer) return [s.answer];
  switch (s.rule) {
    case 'same':
    case 'shadow':
      return [promptItem(p)!];
    case 'baby':
      return p.kind === 'item' && BABY_OF[p.id] ? [BABY_OF[p.id]!] : [];
    case 'home':
      return p.kind === 'item' ? (LIVES_IN[p.id] ?? []).slice(0, 1) : [];
    case 'food':
      return ANIMALS.filter((i) => satisfies('food', p, i));
    default:
      return ITEM_IDS.filter((i) => satisfies(s.rule, p, i) && i !== promptItem(p));
  }
}

/** Which items may sit in a corner of this round at all, before difficulty filtering. */
function domain(rule: MatchRule, answer: ItemId): readonly ItemId[] {
  switch (rule) {
    case 'color':
      return ITEM_IDS.filter((i) => ITEM_ATTRS[i].colorFair);
    case 'texture':
      return has(answer, 'animal') ? ANIMALS : THINGS.filter((i) => !has(i, 'food'));
    case 'food':
    case 'baby':
      return ANIMALS;
    case 'home':
      return HOMES;
    case 'weather':
      return THINGS;
    case 'pair':
      return THINGS.filter((i) => !has(i, 'food')); // food next to food/kitchen prompts reads as "goes together"
    case 'shadow':
      return SIL_OK;
    default:
      return ITEM_IDS;
  }
}

function pickDistractors(
  s: RoundSpec, p: Prompt, answer: ItemId | null, n: number, diff: Diff, theme: FreeTheme,
  rng: Rng, ls: LevelState, ws: WorldState,
): ItemId[] {
  const pItem = promptItem(p);
  const ok = (i: ItemId) => roomFor(ls, i) && i !== answer && i !== pItem;
  let preferred: ItemId[];
  let fallback: ItemId[];

  if (s.rule === 'free' || answer === null) {
    const base = theme === 'eat' ? FOODS : ANIMALS;
    preferred = base.filter((i) => ok(i) && !relatesUnderAnyRule(p, i) && !(pItem && kin(i, pItem)));
    fallback = preferred;
  } else {
    const ans = answer;
    const legal = domain(s.rule, ans).filter(
      (i) => ok(i) && !plausible(s.rule, p, i) && !kin(i, ans) && !(pItem && kin(i, pItem)),
    );
    fallback = legal.filter((i) => s.rule !== 'color' || (colorOf(i) !== colorOf(ans) && !CONFUSABLE[colorOf(ans)].includes(colorOf(i))) || diff === 'hard');
    let pool = legal;
    switch (s.rule) {
      case 'shape':
        if (diff === 'hard') pool = pool.filter((i) => ITEM_ATTRS[i].outline !== null); // other clear shapes
        else if (diff === 'easy') pool = pool.filter((i) => ITEM_ATTRS[i].outline === null); // shapeless things
        break;
      case 'shadow':
        if (diff === 'easy') pool = pool.filter((i) => SIL_FAMILY[i] !== SIL_FAMILY[ans]);
        break;
      case 'baby':
        pool = diff === 'easy' ? pool.filter((i) => !MOTHERS.has(i) && has(i, 'wild') && SIL_FAMILY[i] !== SIL_FAMILY[ans]) : pool.filter((i) => has(i, 'farm') || has(i, 'pet'));
        break;
      case 'weather':
        if (diff === 'easy') pool = pool.filter((i) => has(i, 'toy') || has(i, 'food'));
        if (diff === 'medium') pool = pool.filter((i) => WEATHER_STUFF.has(i) || has(i, 'clothing') || has(i, 'toy'));
        break;
      case 'pair':
        if (diff === 'easy') pool = ANIMALS.filter((i) => ok(i) && !plausible('pair', p, i) && !kin(i, ans));
        if (diff === 'medium') pool = pool.filter((i) => PAIR_STUFF.has(i));
        break;
      case 'same':
        if (diff === 'easy') pool = pool.filter((i) => ITEM_ATTRS[i].tags[0] !== ITEM_ATTRS[ans].tags[0]);
        break;
    }
    if (diff !== 'hard' && s.rule !== 'shadow') {
      // never a colour lure: a different colour from the answer; in easy rounds (and in every
      // colour round) also no confusable hue
      const c = colorOf(ans);
      const strict = diff === 'easy' || s.rule === 'color';
      pool = pool.filter((i) => colorOf(i) !== c && !(strict && CONFUSABLE[c].includes(colorOf(i))));
    }
    preferred = pool;
  }

  // freshest first (least seen in this world, not in the previous round); hard rounds: lures first
  const notRecent = (xs: ItemId[]) => xs.filter((i) => !ls.recent.has(i));
  let ordered = [
    ...byFreshness(notRecent(preferred), ws, rng),
    ...byFreshness(preferred.filter((i) => ls.recent.has(i)), ws, rng),
  ];
  if (diff === 'hard' && answer) {
    const isLure =
      s.rule === 'shadow'
        ? (i: ItemId) => SIL_FAMILY[i] === SIL_FAMILY[answer]
        : p.kind === 'color'
          ? (i: ItemId) => CONFUSABLE[p.id].includes(colorOf(i))
          : (i: ItemId) => colorOf(i) === colorOf(answer);
    const lures = ordered.filter(isLure).slice(0, Math.min(2, n));
    ordered = [...lures, ...ordered.filter((i) => !lures.includes(i))];
  }
  ordered = [...ordered, ...byFreshness(fallback.filter((i) => !ordered.includes(i)), ws, rng)];

  // colour & free rounds (and easy ones): every corner a different colour, no confusable neighbours
  const distinct = s.rule === 'color' || s.rule === 'free' || diff === 'easy';
  const chosen: ItemId[] = [];
  const used: ColorId[] = answer ? [colorOf(answer)] : [];
  for (const i of ordered) {
    if (chosen.length === n) break;
    if (chosen.includes(i)) continue;
    if (s.rule === 'shadow' && chosen.some((c) => plausible('shadow', { kind: 'shadow', id: c }, i))) continue;
    const c = colorOf(i);
    if (distinct && s.rule !== 'shadow' && used.includes(c)) continue;
    if (distinct && diff === 'easy' && s.rule !== 'shadow' && used.some((u) => CONFUSABLE[u].includes(c))) continue;
    chosen.push(i);
    used.push(c);
  }
  if (chosen.length < n) {
    throw new Error(`levels: not enough distractors for ${s.rule}/${promptKey(p)} (got ${chosen.length}/${n})`);
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

/** Pick the items for auto 'shadow' rounds: clear silhouettes, least seen, not last level's answers. */
function resolvePrompts(specs: RoundSpec[], rng: Rng, ws: WorldState): { s: RoundSpec; p: Prompt }[] {
  const taken = new Set<ItemId>(specs.map((s) => (s.prompt ? promptItem(s.prompt) : null)).filter((x): x is ItemId => !!x));
  return specs.map((s) => {
    if (s.prompt) return { s, p: s.prompt };
    const cands = byFreshness(SIL_OK.filter((i) => !taken.has(i) && !ws.prevAnswers.has(i)), ws, rng);
    // keep the shadows of one level visually distinct from each other
    const pick = cands.find((i) => ![...taken].some((t) => plausible('shadow', { kind: 'shadow', id: t }, i)));
    if (!pick) throw new Error('levels: not enough clear silhouettes (src/art/silhouette-ok.ts)');
    taken.add(pick);
    return { s, p: { kind: 'shadow', id: pick } };
  });
}

function orderRounds<T extends { s: RoundSpec; p: Prompt }>(rs: T[], rng: Rng): T[] {
  for (let attempt = 0; attempt < 500; attempt++) {
    const o = shuffle(rs, rng);
    const okOrder = o.every(
      (r, k) => k === 0 || (promptKey(r.p) !== promptKey(o[k - 1].p) && (!r.s.answer || r.s.answer !== o[k - 1].s.answer)),
    );
    if (okOrder) return o;
  }
  throw new Error('levels: cannot order rounds without repeats');
}

function buildLevel(world: number, idx: number, spec: LevelSpec, ws: WorldState): Level {
  const id = `w${world}-l${idx + 1}`;
  const rng = rngFor(id);
  const theme = spec.theme ?? 'default';
  const rs = orderRounds(resolvePrompts(spec.rounds, rng, ws), rng);
  const plan = quadrantPlan(Math.max(rs.filter((r) => r.s.rule !== 'free').length, 1), rng);
  const ls: LevelState = { count: new Map(), answers: new Set(), recent: new Set() };
  const bump = (i: ItemId) => ls.count.set(i, (ls.count.get(i) ?? 0) + 1);
  for (const r of rs) {
    const pi = promptItem(r.p);
    if (pi) bump(pi);
    if (pi && (r.s.rule === 'same' || r.s.rule === 'shadow')) bump(pi); // its answer corner
    else if (r.s.answer) bump(r.s.answer); // reserve pinned answers so distractors can't use up their slots
  }
  let g = 0;
  let k = 0;

  const rounds: Round[] = rs.map(({ s, p }) => {
    const targets: Target[] = [null, null, null, null];
    let answer: Round['answer'] = null;
    if (s.rule === 'free') {
      pickDistractors(s, p, null, 4, spec.diff, theme, rng, ls, ws).forEach((d, j) => (targets[j] = { id: d }));
    } else {
      const self = s.rule === 'same' || s.rule === 'shadow';
      const pinned = !!s.answer;
      const cands = answerCandidates(s, p).filter((c) => pinned || (!ls.answers.has(c) && (self || roomFor(ls, c))));
      if (!cands.length) throw new Error(`levels: no answer for ${id} ${s.rule}/${promptKey(p)}`);
      const sorted = byFreshness(cands, ws, rng).sort((x, y) => Number(ws.prevAnswers.has(x)) - Number(ws.prevAnswers.has(y)));
      const ans = sorted[0];
      ls.answers.add(ans);
      if (!pinned && !self) bump(ans);
      const q = plan[g++];
      answer = q;
      targets[q] = { id: ans };
      const corners = shuffle(([0, 1, 2, 3] as const).filter((c) => c !== q), rng).slice(0, spec.active - 1);
      const ds = pickDistractors(s, p, ans, spec.active - 1, spec.diff, theme, rng, ls, ws);
      corners.forEach((c, j) => (targets[c] = { id: ds[j] }));
      ds.forEach(bump);
    }
    if (s.rule === 'free') targets.forEach((t) => t && bump(t.id));
    ls.recent.clear();
    for (const t of targets) if (t) ls.recent.add(t.id);
    const [hint_pl, hint_en] = hintFor(s.rule, p, theme, k++);
    return { prompt: p, targets: targets as Round['targets'], answer, rule: s.rule, hint_pl, hint_en };
  });

  // world memory
  for (const [i, c] of ls.count) ws.seen.set(i, (ws.seen.get(i) ?? 0) + c);
  ws.prevAnswers = new Set(rounds.filter((r) => r.answer !== null).map((r) => r.targets[r.answer!]!.id));

  return { id, world, title_pl: spec.title_pl, title_en: spec.title_en, age: spec.age, rounds };
}

export const WORLDS: World[] = WORLD_SPECS.map((w, wi) => {
  const ws: WorldState = { seen: new Map(), prevAnswers: new Set() };
  return {
    id: wi + 1,
    title_pl: w.title_pl,
    title_en: w.title_en,
    tint: w.tint,
    levels: w.levels.map((l, li) => buildLevel(wi + 1, li, l, ws)),
  };
});
