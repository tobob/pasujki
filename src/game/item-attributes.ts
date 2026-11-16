/**
 * Pasujki — ITEM ATTRIBUTES (owner: levels agent).
 *
 * The truth tables the level generator (src/game/levels.ts) and the validator
 * (scripts/validate-levels.ts) use to decide whether a target matches a prompt. The engine may use
 * them too (e.g. parents' area labels).
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ DOMINANT COLOUR TABLE: the illustrator paints each item's biggest fill with EXACTLY this      │
 * │ palette colour (COLORS in src/game/palette.ts). Agreed with src/art/dominant.ts.              │
 * │                                                                                              │
 * │ red     ladybug, parrot, strawberry, apple, watermelon*, doghouse, barn, scarf, car, drum,     │
 * │         balloon, tomato, gift, rainbow*, shovel, cherry                                      │
 * │ yellow  duck, lion, giraffe, bee, chick, duckling, banana, lemon, cheese, corn, beehive, sun,  │
 * │         moon, star, boot, house*, hay, bucket                                                │
 * │ blue    whale, blueberries, pond, sea, kennel_bowl, ball, raindrop, snowflake, hat, cup, bed,  │
 * │         airplane, shoe, clock, block, bird                                                   │
 * │ green   frog, turtle, pear, leaf, tree, toothbrush, train, bicycle, book, sock, peas, dinosaur │
 * │ orange  cat, fish, tiger, snail, squirrel, kitten, orange, carrot, honey, boat, lamp, pumpkin, │
 * │         kite, fox                                                                            │
 * │ purple  butterfly, grapes, umbrella, mitten, crayon, party_hat, plum, octopus                │
 * │ pink    pig, flamingo, worm, soap, flower, heart_toy, cake                                   │
 * │ brown   dog, horse, bear, owl, monkey, puppy, acorn, bread, nest, hutch, teddy, sandwich,      │
 * │         hedgehog, mushroom                                                                      │
 * │ white   cow*, sheep, hen, zebra*, lamb, calf*, bone, milk, egg, iceberg, cloud, snowman,       │
 * │         pillow                                                                               │
 * │ black   penguin*, sunglasses, crow                                                           │
 * │ grey    elephant, rabbit, mouse, spoon, key                                                  │
 * │                                                                                              │
 * │ * = two-tone (patches/stripes/rind): never used in colour rounds (colorFair: false).          │
 * │                                                                                              │
 * │ SHAPE-CRITICAL ART (shape rounds rely on these outlines reading clearly):                    │
 * │ circle: ball, orange, sun, clock   oval: egg, lemon, balloon   crescent: moon, banana         │
 * │ star: star   heart: heart_toy   triangle: carrot (cone), party_hat   rectangle: soap          │
 * │ square: gift, block                                                                          │
 * └──────────────────────────────────────────────────────────────────────────────────────────────┘
 */
import type { ColorId, ItemId, MatchRule, Prompt, ShapeId, TextureId } from './types';

export type Tag =
  | 'animal' | 'farm' | 'wild' | 'pet' | 'bird' | 'insect' | 'water' | 'baby'
  | 'food' | 'fruit' | 'vegetable' | 'nature'
  | 'home'
  | 'weather' | 'sky' | 'night'
  | 'clothing' | 'cold' | 'rain' | 'summer'
  | 'bath' | 'kitchen' | 'bedtime' | 'toy' | 'vehicle' | 'household' | 'music' | 'drawing';

export type PlGender = 'm' | 'f' | 'n' | 'pl';

export type ItemAttr = {
  /** Dominant fill colour (see table above). */
  color: ColorId;
  /** false = two-tone item, never a target in colour rounds. */
  colorFair: boolean;
  /** Second big colour of a two-tone item (zebra's black stripes), so "nothing fits" rounds stay honest. */
  color2?: ColorId;
  /** Clear outline that a shape prompt matches, or null. */
  outline: ShapeId | null;
  /** true = outline vaguely resembles a basic shape (round fruit, oval body…): never a distractor in shape rounds. */
  shapeAmbiguous: boolean;
  tags: Tag[];
  /** Child-directed Polish name (nominative, usually diminutive) + grammatical gender. */
  pl: string;
  g: PlGender;
  /** Genitive (do + gen: "Co pasuje do skarpetki?", "mama kurczaczka"). Only where hints need it. */
  gen?: string;
  /** Accusative ("Kto lubi marchewkę?"). Only where hints need it. */
  acc?: string;
  en: string;
};

type Opt = Partial<Pick<ItemAttr, 'colorFair' | 'color2' | 'outline' | 'shapeAmbiguous' | 'gen' | 'acc'>>;
const a = (color: ColorId, tags: Tag[], pl: string, g: PlGender, en: string, o: Opt = {}): ItemAttr => ({
  color,
  colorFair: o.colorFair ?? true,
  color2: o.color2,
  outline: o.outline ?? null,
  shapeAmbiguous: o.shapeAmbiguous ?? false,
  tags,
  pl,
  g,
  gen: o.gen,
  acc: o.acc,
  en,
});
const AMB = { shapeAmbiguous: true } as const;

export const ITEM_ATTRS: Record<ItemId, ItemAttr> = {
  // ── animals ───────────────────────────────────────────────────────────────────────────────
  cat: a('orange', ['animal', 'pet'], 'kotek', 'm', 'cat', { gen: 'kotka' }),
  dog: a('brown', ['animal', 'pet'], 'piesek', 'm', 'dog', { gen: 'pieska' }),
  cow: a('white', ['animal', 'farm'], 'krówka', 'f', 'cow', { colorFair: false, color2: 'black' }),
  pig: a('pink', ['animal', 'farm'], 'świnka', 'f', 'pig', AMB),
  sheep: a('white', ['animal', 'farm'], 'owieczka', 'f', 'sheep', AMB),
  horse: a('brown', ['animal', 'farm'], 'konik', 'm', 'horse'),
  hen: a('white', ['animal', 'farm', 'bird'], 'kurka', 'f', 'hen'),
  duck: a('yellow', ['animal', 'farm', 'bird', 'water'], 'kaczka', 'f', 'duck'),
  frog: a('green', ['animal', 'water'], 'żabka', 'f', 'frog'),
  fish: a('orange', ['animal', 'water'], 'rybka', 'f', 'fish', { shapeAmbiguous: true, acc: 'rybkę' }),
  elephant: a('grey', ['animal', 'wild'], 'słonik', 'm', 'elephant'),
  lion: a('yellow', ['animal', 'wild'], 'lew', 'm', 'lion', AMB),
  giraffe: a('yellow', ['animal', 'wild'], 'żyrafa', 'f', 'giraffe'),
  zebra: a('white', ['animal', 'wild'], 'zebra', 'f', 'zebra', { colorFair: false, color2: 'black' }),
  tiger: a('orange', ['animal', 'wild'], 'tygrys', 'm', 'tiger'),
  ladybug: a('red', ['animal', 'insect'], 'biedronka', 'f', 'ladybird', AMB),
  bee: a('yellow', ['animal', 'insect'], 'pszczółka', 'f', 'bee', { shapeAmbiguous: true, gen: 'pszczółki' }),
  butterfly: a('purple', ['animal', 'insect'], 'motylek', 'm', 'butterfly'),
  bear: a('brown', ['animal', 'wild'], 'miś', 'm', 'bear'),
  rabbit: a('grey', ['animal', 'pet'], 'króliczek', 'm', 'rabbit'),
  mouse: a('grey', ['animal', 'pet'], 'myszka', 'f', 'mouse'),
  owl: a('brown', ['animal', 'wild', 'bird', 'night'], 'sowa', 'f', 'owl', AMB),
  penguin: a('black', ['animal', 'wild', 'bird', 'water'], 'pingwinek', 'm', 'penguin', { colorFair: false, color2: 'white', shapeAmbiguous: true }),
  monkey: a('brown', ['animal', 'wild'], 'małpka', 'f', 'monkey'),
  snail: a('orange', ['animal', 'nature'], 'ślimak', 'm', 'snail', AMB),
  turtle: a('green', ['animal', 'water'], 'żółwik', 'm', 'turtle', AMB),
  squirrel: a('orange', ['animal', 'wild'], 'wiewiórka', 'f', 'squirrel'),
  flamingo: a('pink', ['animal', 'wild', 'bird', 'water'], 'flaming', 'm', 'flamingo'),
  whale: a('blue', ['animal', 'wild', 'water'], 'wieloryb', 'm', 'whale', AMB),
  parrot: a('red', ['animal', 'wild', 'bird'], 'papużka', 'f', 'parrot'),
  // ── babies ────────────────────────────────────────────────────────────────────────────────
  chick: a('yellow', ['animal', 'farm', 'bird', 'baby'], 'kurczaczek', 'm', 'chick', { shapeAmbiguous: true, gen: 'kurczaczka' }),
  kitten: a('orange', ['animal', 'pet', 'baby'], 'kociątko', 'n', 'kitten', { gen: 'kociątka' }),
  puppy: a('brown', ['animal', 'pet', 'baby'], 'szczeniaczek', 'm', 'puppy', { gen: 'szczeniaczka' }),
  lamb: a('white', ['animal', 'farm', 'baby'], 'jagniątko', 'n', 'lamb', { shapeAmbiguous: true, gen: 'jagniątka' }),
  calf: a('white', ['animal', 'farm', 'baby'], 'cielątko', 'n', 'calf', { colorFair: false, color2: 'brown', gen: 'cielątka' }),
  duckling: a('yellow', ['animal', 'farm', 'bird', 'water', 'baby'], 'kaczuszka', 'f', 'duckling', { shapeAmbiguous: true, gen: 'kaczuszki' }),
  // ── food ──────────────────────────────────────────────────────────────────────────────────
  strawberry: a('red', ['food', 'fruit'], 'truskawka', 'f', 'strawberry', { shapeAmbiguous: true, acc: 'truskawkę' }),
  banana: a('yellow', ['food', 'fruit'], 'banan', 'm', 'banana', { outline: 'crescent', acc: 'banana' }),
  lemon: a('yellow', ['food', 'fruit'], 'cytrynka', 'f', 'lemon', { outline: 'oval' }),
  orange: a('orange', ['food', 'fruit'], 'pomarańcza', 'f', 'orange', { outline: 'circle' }),
  apple: a('red', ['food', 'fruit'], 'jabłuszko', 'n', 'apple', { shapeAmbiguous: true, acc: 'jabłuszko' }),
  pear: a('green', ['food', 'fruit'], 'gruszka', 'f', 'pear', AMB),
  grapes: a('purple', ['food', 'fruit'], 'winogronka', 'pl', 'grapes', AMB),
  carrot: a('orange', ['food', 'vegetable'], 'marchewka', 'f', 'carrot', { outline: 'triangle', acc: 'marchewkę' }),
  cheese: a('yellow', ['food'], 'serek', 'm', 'cheese', { shapeAmbiguous: true, gen: 'serka', acc: 'serek' }),
  bone: a('white', ['food', 'pet'], 'kostka', 'f', 'bone', { acc: 'kostkę', gen: 'kostki' }),
  honey: a('orange', ['food'], 'miodek', 'm', 'honey', { shapeAmbiguous: true, gen: 'miodku', acc: 'miodek' }),
  leaf: a('green', ['food', 'nature'], 'listek', 'm', 'leaf', { shapeAmbiguous: true, acc: 'listek' }),
  acorn: a('brown', ['food', 'nature'], 'żołądź', 'm', 'acorn', { shapeAmbiguous: true, acc: 'żołądź' }),
  milk: a('white', ['food'], 'mleczko', 'n', 'milk', { shapeAmbiguous: true, gen: 'mleczka', acc: 'mleczko' }),
  watermelon: a('red', ['food', 'fruit'], 'arbuz', 'm', 'watermelon', { colorFair: false, color2: 'green', shapeAmbiguous: true }),
  blueberries: a('blue', ['food', 'fruit'], 'jagódki', 'pl', 'blueberries', { shapeAmbiguous: true, acc: 'jagódki' }),
  corn: a('yellow', ['food', 'vegetable'], 'kukurydza', 'f', 'corn', { shapeAmbiguous: true, acc: 'kukurydzę' }),
  bread: a('brown', ['food'], 'chlebek', 'm', 'bread', { shapeAmbiguous: true, acc: 'chlebek' }),
  egg: a('white', ['food'], 'jajko', 'n', 'egg', { outline: 'oval', gen: 'jajka', acc: 'jajko' }),
  worm: a('pink', ['food', 'nature'], 'robaczek', 'm', 'worm', { acc: 'robaczka' }),
  // ── homes / places ────────────────────────────────────────────────────────────────────────
  doghouse: a('red', ['home'], 'buda', 'f', 'doghouse', AMB),
  beehive: a('yellow', ['home'], 'ul', 'm', 'beehive', AMB),
  nest: a('brown', ['home', 'nature'], 'gniazdko', 'n', 'nest', AMB),
  pond: a('blue', ['home', 'water', 'nature'], 'stawek', 'm', 'pond', AMB),
  barn: a('red', ['home', 'farm'], 'stodoła', 'f', 'barn', AMB),
  iceberg: a('white', ['home', 'water', 'cold'], 'kra', 'f', 'iceberg', AMB),
  tree: a('green', ['home', 'nature'], 'drzewo', 'n', 'tree', AMB),
  sea: a('blue', ['home', 'water', 'nature'], 'morze', 'n', 'sea', AMB),
  hutch: a('brown', ['home'], 'klatka', 'f', 'hutch', AMB),
  kennel_bowl: a('blue', ['kitchen', 'pet'], 'miseczka', 'f', 'dog bowl', AMB),
  // ── things ────────────────────────────────────────────────────────────────────────────────
  ball: a('blue', ['toy'], 'piłka', 'f', 'ball', { outline: 'circle' }),
  sun: a('yellow', ['weather', 'sky', 'summer'], 'słoneczko', 'n', 'sun', { outline: 'circle', shapeAmbiguous: true, gen: 'słoneczka' }),
  moon: a('yellow', ['sky', 'night'], 'księżyc', 'm', 'moon', { outline: 'crescent', gen: 'księżyca' }),
  star: a('yellow', ['sky', 'night'], 'gwiazdka', 'f', 'star', { outline: 'star', gen: 'gwiazdki' }),
  cloud: a('white', ['weather', 'sky', 'rain'], 'chmurka', 'f', 'cloud', AMB),
  umbrella: a('purple', ['rain', 'clothing'], 'parasolka', 'f', 'umbrella', { shapeAmbiguous: true, gen: 'parasolki' }),
  raindrop: a('blue', ['weather', 'rain'], 'kropelka', 'f', 'raindrop', { gen: 'kropelki' }),
  snowflake: a('blue', ['weather', 'cold'], 'śnieżynka', 'f', 'snowflake', AMB),
  snowman: a('white', ['cold', 'toy'], 'bałwanek', 'm', 'snowman', AMB),
  scarf: a('red', ['clothing', 'cold'], 'szalik', 'm', 'scarf', { gen: 'szalika' }),
  sunglasses: a('black', ['clothing', 'summer'], 'okulary', 'pl', 'sunglasses', { shapeAmbiguous: true, gen: 'okularów' }),
  boot: a('yellow', ['clothing', 'rain'], 'kalosz', 'm', 'wellie', { gen: 'kalosza' }),
  hat: a('blue', ['clothing', 'cold'], 'czapka', 'f', 'hat', { shapeAmbiguous: true, gen: 'czapki' }),
  mitten: a('purple', ['clothing', 'cold'], 'rękawiczka', 'f', 'mitten', { gen: 'rękawiczki' }),
  cup: a('blue', ['kitchen'], 'kubeczek', 'm', 'cup', { shapeAmbiguous: true, gen: 'kubeczka' }),
  spoon: a('grey', ['kitchen'], 'łyżeczka', 'f', 'spoon', { shapeAmbiguous: true, gen: 'łyżeczki' }),
  toothbrush: a('green', ['bath'], 'szczoteczka', 'f', 'toothbrush', { gen: 'szczoteczki' }),
  soap: a('pink', ['bath'], 'mydełko', 'n', 'soap', { outline: 'rectangle', gen: 'mydełka' }),
  bed: a('blue', ['bedtime', 'household'], 'łóżeczko', 'n', 'bed', { shapeAmbiguous: true, gen: 'łóżeczka' }),
  pillow: a('white', ['bedtime', 'household'], 'poduszka', 'f', 'pillow', { shapeAmbiguous: true, gen: 'poduszki' }),
  car: a('red', ['vehicle', 'toy'], 'autko', 'n', 'car'),
  boat: a('orange', ['vehicle', 'water'], 'łódka', 'f', 'boat', AMB),
  airplane: a('blue', ['vehicle', 'sky'], 'samolot', 'm', 'aeroplane'),
  train: a('green', ['vehicle', 'toy'], 'pociąg', 'm', 'train', AMB),
  bicycle: a('green', ['vehicle'], 'rowerek', 'm', 'bike', AMB),
  flower: a('pink', ['nature'], 'kwiatek', 'm', 'flower', { shapeAmbiguous: true, gen: 'kwiatka', acc: 'kwiatek' }),
  house: a('yellow', ['home', 'household'], 'domek', 'm', 'house', { colorFair: false, color2: 'brown', shapeAmbiguous: true, gen: 'domku' }),
  key: a('grey', ['household'], 'kluczyk', 'm', 'key', { gen: 'kluczyka' }),
  drum: a('red', ['toy', 'music'], 'bębenek', 'm', 'drum', { shapeAmbiguous: true, acc: 'bębenek' }),
  balloon: a('red', ['toy'], 'balonik', 'm', 'balloon', { outline: 'oval', gen: 'balonika', acc: 'balonik' }),
  book: a('green', ['toy', 'drawing'], 'książeczka', 'f', 'book', { shapeAmbiguous: true, gen: 'książeczki' }),
  crayon: a('purple', ['toy', 'drawing'], 'kredka', 'f', 'crayon', { gen: 'kredki' }),
  sock: a('green', ['clothing'], 'skarpetka', 'f', 'sock', { gen: 'skarpetki' }),
  shoe: a('blue', ['clothing'], 'bucik', 'm', 'shoe', { gen: 'bucika' }),
  teddy: a('brown', ['toy', 'bedtime'], 'pluszowy miś', 'm', 'teddy bear', { gen: 'pluszowego misia', acc: 'pluszowego misia' }),
  clock: a('blue', ['household'], 'zegar', 'm', 'clock', { outline: 'circle' }),
  lamp: a('orange', ['household', 'night'], 'lampka', 'f', 'lamp', { shapeAmbiguous: true, gen: 'lampki' }),
  tomato: a('red', ['food', 'vegetable'], 'pomidorek', 'm', 'tomato', AMB),
  pumpkin: a('orange', ['food', 'vegetable'], 'dynia', 'f', 'pumpkin', AMB),
  heart_toy: a('pink', ['toy'], 'serduszko', 'n', 'heart', { outline: 'heart', acc: 'serduszko' }),
  // ── v0.2 additions ────────────────────────────────────────────────────────────────────────
  gift: a('red', ['toy'], 'prezent', 'm', 'present', { outline: 'square', gen: 'prezentu', acc: 'prezent' }),
  block: a('blue', ['toy'], 'klocek', 'm', 'block', { outline: 'square', gen: 'klocka', acc: 'klocek' }),
  party_hat: a('purple', ['toy', 'clothing'], 'urodzinowa czapeczka', 'f', 'party hat', { outline: 'triangle', gen: 'urodzinowej czapeczki', acc: 'urodzinową czapeczkę' }),
  crow: a('black', ['animal', 'wild', 'bird'], 'wrona', 'f', 'crow'),
  hay: a('yellow', ['food', 'farm'], 'siano', 'n', 'hay', { shapeAmbiguous: true, acc: 'siano' }),
  bird: a('blue', ['animal', 'wild', 'bird'], 'ptaszek', 'm', 'bird'),
  kite: a('orange', ['toy', 'sky'], 'latawiec', 'm', 'kite', { shapeAmbiguous: true, gen: 'latawca', acc: 'latawiec' }),
  rainbow: a('red', ['weather', 'sky'], 'tęcza', 'f', 'rainbow', { colorFair: false, color2: 'blue', shapeAmbiguous: true, acc: 'tęczę' }),
  sandwich: a('brown', ['food'], 'kanapka', 'f', 'sandwich', { shapeAmbiguous: true, gen: 'kanapki', acc: 'kanapkę' }),
  cake: a('pink', ['food', 'toy'], 'torcik', 'm', 'cake', { shapeAmbiguous: true, gen: 'torcika', acc: 'torcik' }),
  bucket: a('yellow', ['toy'], 'wiaderko', 'n', 'bucket', { shapeAmbiguous: true, gen: 'wiaderka', acc: 'wiaderko' }),
  shovel: a('red', ['toy'], 'łopatka', 'f', 'spade', { gen: 'łopatki', acc: 'łopatkę' }),
  mushroom: a('brown', ['nature', 'food'], 'grzybek', 'm', 'mushroom', { shapeAmbiguous: true, acc: 'grzybka' }),
  cherry: a('red', ['food', 'fruit'], 'wisienka', 'f', 'cherry', { shapeAmbiguous: true, acc: 'wisienkę' }),
  plum: a('purple', ['food', 'fruit'], 'śliwka', 'f', 'plum', { shapeAmbiguous: true, acc: 'śliwkę' }),
  peas: a('green', ['food', 'vegetable'], 'groszek', 'm', 'peas', { shapeAmbiguous: true, acc: 'groszek' }),
  fox: a('orange', ['animal', 'wild'], 'lisek', 'm', 'fox'),
  hedgehog: a('brown', ['animal', 'wild'], 'jeżyk', 'm', 'hedgehog', AMB),
  octopus: a('purple', ['animal', 'wild', 'water'], 'ośmiornica', 'f', 'octopus'),
  dinosaur: a('green', ['animal', 'wild', 'toy'], 'dinozaur', 'm', 'dinosaur'),
};

// ── relation maps ─────────────────────────────────────────────────────────────────────────────
// Lists are deliberately GENEROUS (every plausible answer is listed), because they are also used
// to keep distractors unambiguous: an item that plausibly fits can never be a "wrong" corner.

/** animal → foods it plausibly eats. */
export const EATS: Partial<Record<ItemId, ItemId[]>> = {
  // No cow's milk for grown cats (parents and vets object); kittens drink milk.
  cat: ['fish'],
  kitten: ['milk', 'fish'],
  dog: ['bone', 'kennel_bowl', 'cheese', 'sandwich', 'cake'],
  puppy: ['bone', 'milk', 'kennel_bowl'],
  rabbit: ['carrot', 'leaf', 'apple', 'pear', 'hay', 'peas'],
  horse: ['carrot', 'apple', 'pear', 'corn', 'hay'],
  pig: ['apple', 'corn', 'pear', 'carrot', 'pumpkin', 'bread', 'tomato', 'watermelon', 'cheese', 'milk', 'banana', 'acorn', 'blueberries', 'cherry', 'plum', 'peas', 'mushroom', 'hay'],
  cow: ['leaf', 'hay'],
  sheep: ['leaf', 'hay'],
  mouse: ['cheese', 'corn', 'bread', 'acorn', 'sandwich', 'cake', 'peas'],
  monkey: ['banana', 'orange', 'grapes', 'apple', 'pear', 'leaf', 'cherry', 'plum'],
  bear: ['honey', 'fish', 'blueberries', 'apple', 'cherry', 'plum'],
  bee: ['flower', 'honey'],
  butterfly: ['flower'],
  squirrel: ['acorn', 'corn', 'mushroom'],
  hen: ['corn', 'worm', 'bread', 'peas'],
  chick: ['corn', 'worm', 'peas'],
  duck: ['bread', 'corn', 'worm', 'peas'],
  duckling: ['bread', 'corn', 'worm', 'peas'],
  giraffe: ['leaf', 'hay'],
  zebra: ['hay', 'leaf', 'carrot', 'apple'],
  elephant: ['banana', 'leaf', 'watermelon', 'apple', 'hay'],
  penguin: ['fish'],
  whale: ['fish'],
  octopus: ['fish'],
  bird: ['worm', 'blueberries', 'bread', 'corn', 'cherry'],
  crow: ['corn', 'bread', 'worm', 'cheese', 'egg'],
  hedgehog: ['apple', 'mushroom', 'worm', 'pear'],
  fox: ['egg', 'grapes', 'mouse', 'hen', 'chick', 'cheese'],
  dinosaur: ['leaf'],
  owl: ['mouse', 'worm'],
  snail: ['leaf', 'strawberry'],
  turtle: ['leaf', 'strawberry', 'worm'],
  parrot: ['grapes', 'apple', 'corn', 'banana', 'orange', 'pear', 'carrot', 'cherry', 'plum', 'peas'],
  frog: ['worm'],
  fish: ['worm'],
  flamingo: ['worm'],
  lion: [],
  tiger: [],
  ladybug: ['leaf'],
  lamb: ['milk', 'leaf'],
  calf: ['milk', 'leaf'],
};

/** animal → homes. */
export const LIVES_IN: Partial<Record<ItemId, ItemId[]>> = {
  dog: ['doghouse', 'house'],
  puppy: ['doghouse', 'house'],
  cat: ['house', 'barn'],
  kitten: ['house', 'barn'],
  bee: ['beehive', 'flower'],
  hen: ['barn', 'nest'],
  chick: ['nest', 'barn'],
  cow: ['barn'],
  calf: ['barn'],
  horse: ['barn'],
  pig: ['barn'],
  sheep: ['barn'],
  lamb: ['barn'],
  duck: ['pond', 'barn', 'nest'],
  duckling: ['pond', 'barn', 'nest'],
  fish: ['pond', 'sea'],
  frog: ['pond'],
  turtle: ['pond', 'sea'],
  whale: ['sea'],
  penguin: ['iceberg', 'sea', 'nest'],
  squirrel: ['tree'],
  owl: ['tree', 'nest'],
  monkey: ['tree'],
  parrot: ['tree', 'nest'],
  rabbit: ['hutch'],
  mouse: ['house', 'barn'],
  flamingo: ['pond', 'nest'],
  ladybug: ['tree', 'flower'],
  butterfly: ['flower', 'tree'],
  snail: ['tree'],
  bear: ['tree'],
  bird: ['nest', 'tree'],
  crow: ['tree', 'nest'],
  octopus: ['sea'],
  hedgehog: ['tree'],
  fox: ['tree'],
  dinosaur: [],
};

/** baby → mother. */
export const BABY_OF: Partial<Record<ItemId, ItemId>> = {
  chick: 'hen',
  kitten: 'cat',
  puppy: 'dog',
  lamb: 'sheep',
  calf: 'cow',
  duckling: 'duck',
};

/** Texture → items it belongs to (valid answers) and items that also plausibly have it (never distractors). */
export const TEXTURE_OF: Record<TextureId, { owners: ItemId[]; alsoHas: ItemId[] }> = {
  stripes_bw: { owners: ['zebra'], alsoHas: ['bee', 'tiger', 'penguin', 'cow', 'calf'] },
  stripes_orange: { owners: ['tiger'], alsoHas: ['bee', 'fish', 'cat', 'kitten', 'zebra', 'fox'] },
  spots_red_black: { owners: ['ladybug'], alsoHas: ['strawberry', 'watermelon', 'cow', 'calf', 'giraffe'] },
  spots_giraffe: { owners: ['giraffe'], alsoHas: ['cow', 'calf', 'ladybug', 'lion', 'tiger'] },
  wool: { owners: ['sheep', 'lamb'], alsoHas: ['cloud', 'snowman', 'scarf', 'mitten', 'hat', 'sock', 'teddy'] },
  feathers: { owners: ['hen', 'duck', 'owl', 'parrot', 'flamingo', 'chick', 'duckling', 'penguin', 'crow', 'bird'], alsoHas: ['nest', 'pillow', 'party_hat'] },
  scales: { owners: ['fish'], alsoHas: ['turtle', 'whale', 'snail', 'frog', 'pumpkin', 'dinosaur', 'octopus'] },
  honeycomb: { owners: ['beehive'], alsoHas: ['bee', 'honey', 'flower', 'cake'] },
  wood: { owners: ['tree', 'doghouse', 'hutch', 'barn'], alsoHas: ['bed', 'house', 'boat', 'nest', 'acorn', 'drum', 'crayon', 'leaf', 'block', 'shovel', 'bucket', 'kite'] },
  waves: { owners: ['sea'], alsoHas: ['pond', 'whale', 'boat', 'fish', 'raindrop', 'turtle', 'penguin', 'octopus', 'bucket', 'shovel', 'rainbow'] },
  bricks: { owners: ['house'], alsoHas: ['barn', 'doghouse', 'block'] },
  ice: { owners: ['iceberg'], alsoHas: ['snowman', 'snowflake', 'penguin', 'raindrop', 'sea'] },
  fur_brown: {
    owners: ['bear', 'teddy', 'dog', 'puppy', 'monkey', 'horse'],
    alsoHas: ['squirrel', 'calf', 'cow', 'mouse', 'rabbit', 'cat', 'kitten', 'lion', 'tiger', 'owl', 'hutch', 'nest', 'hedgehog', 'fox', 'sandwich', 'bread'],
  },
  // only used in the abstract world (no owner); alsoHas keeps those rounds truly "nothing fits"
  polka: { owners: [], alsoHas: ['ladybug', 'giraffe', 'cow', 'calf', 'strawberry', 'dog', 'puppy', 'ball', 'gift', 'cake', 'party_hat'] },
  checks: { owners: [], alsoHas: ['scarf', 'gift'] },
  grass: { owners: [], alsoHas: ['cow', 'calf', 'sheep', 'lamb', 'horse', 'rabbit', 'snail', 'frog', 'ladybug', 'giraffe', 'turtle', 'pond', 'leaf', 'tree', 'hay', 'dinosaur', 'hedgehog', 'mushroom'] },
};

/** Weather → things you need. */
export const WEATHER_NEEDS: Partial<Record<ItemId, ItemId[]>> = {
  sun: ['sunglasses'],
  raindrop: ['umbrella', 'boot'],
  cloud: ['umbrella', 'boot'],
  snowflake: ['scarf', 'mitten', 'hat', 'snowman'],
};
/** Things that may LOOK relevant to a weather (e.g. a hat in the sun). Never distractors for that weather. */
export const WEATHER_MAYBE: Partial<Record<ItemId, ItemId[]>> = {
  sun: ['hat', 'umbrella', 'flower', 'watermelon', 'boat', 'ball', 'cup', 'bucket', 'shovel', 'kite', 'rainbow', 'party_hat'],
  raindrop: ['cloud', 'pond', 'sea', 'hat', 'boat', 'flower', 'snail', 'worm', 'frog', 'duck', 'rainbow', 'mushroom', 'bucket', 'party_hat'],
  cloud: ['raindrop', 'airplane', 'sun', 'hat', 'pond', 'snail', 'worm', 'flower', 'rainbow', 'kite', 'mushroom', 'party_hat'],
  snowflake: ['boot', 'iceberg', 'cloud', 'penguin', 'sock', 'cup', 'milk', 'gift', 'party_hat', 'shovel', 'bucket'],
};

/** Things that go together. Symmetric (a ↔ b); groups are listed as all mutual pairs. */
const PAIR_LIST: [ItemId, ItemId][] = [
  ['sock', 'shoe'], ['sock', 'boot'],
  ['scarf', 'mitten'], ['scarf', 'hat'], ['hat', 'mitten'],
  ['bed', 'pillow'], ['bed', 'teddy'], ['pillow', 'teddy'],
  ['spoon', 'cup'], ['toothbrush', 'cup'], ['milk', 'cup'],
  ['key', 'house'], ['lamp', 'house'], ['crayon', 'book'], ['lamp', 'book'], ['lamp', 'bed'],
  ['moon', 'star'], ['moon', 'sun'], ['sun', 'star'],
  ['bee', 'flower'], ['bee', 'honey'], ['umbrella', 'raindrop'], ['umbrella', 'boot'], ['umbrella', 'cloud'],
  ['dog', 'bone'], ['dog', 'kennel_bowl'], ['bone', 'kennel_bowl'],
  ['boat', 'sea'], ['egg', 'hen'], ['egg', 'nest'], ['snowman', 'scarf'], ['snowman', 'hat'],
  ['drum', 'teddy'], ['ball', 'shoe'], ['spoon', 'kennel_bowl'],
  ['bucket', 'shovel'], ['bucket', 'sea'], ['shovel', 'sea'],
  ['cake', 'party_hat'], ['gift', 'party_hat'], ['cake', 'gift'], ['balloon', 'cake'], ['balloon', 'party_hat'], ['balloon', 'gift'],
  ['sandwich', 'cheese'], ['sandwich', 'bread'], ['bread', 'cheese'],
  ['rainbow', 'raindrop'], ['rainbow', 'sun'], ['rainbow', 'cloud'], ['kite', 'cloud'],
  ['block', 'teddy'], ['block', 'ball'], ['ball', 'teddy'], ['snowman', 'carrot'],
];
export const PAIRS: Partial<Record<ItemId, ItemId[]>> = (() => {
  const m: Partial<Record<ItemId, ItemId[]>> = {};
  for (const [x, y] of PAIR_LIST) {
    (m[x] ??= []).push(y);
    (m[y] ??= []).push(x);
  }
  return m;
})();

/**
 * Silhouette families for 'shadow' rounds. Items in the same family have SIMILAR outlines (used as
 * lures in harder levels); items in a twin set are NEAR-IDENTICAL in silhouette (never together).
 */
export const SIL_FAMILY: Partial<Record<ItemId, string>> = {};
const fam = (name: string, ids: ItemId[]) => ids.forEach((i) => (SIL_FAMILY[i] = name));
fam('fourlegs', ['cat', 'dog', 'cow', 'pig', 'horse', 'lion', 'tiger', 'zebra', 'bear', 'fox', 'sheep', 'elephant', 'giraffe', 'kitten', 'puppy', 'lamb', 'calf', 'hedgehog', 'mouse', 'rabbit', 'squirrel', 'monkey', 'dinosaur']);
fam('bird', ['hen', 'duck', 'owl', 'penguin', 'parrot', 'flamingo', 'crow', 'bird', 'chick', 'duckling']);
fam('water', ['fish', 'whale', 'octopus', 'turtle', 'frog']);
fam('bug', ['ladybug', 'bee', 'butterfly', 'snail', 'worm']);
fam('round', ['ball', 'orange', 'apple', 'tomato', 'pumpkin', 'sun', 'clock', 'cherry', 'plum', 'blueberries', 'grapes', 'egg', 'lemon', 'balloon']);
fam('fruitveg', ['banana', 'pear', 'strawberry', 'carrot', 'corn', 'peas', 'watermelon', 'mushroom', 'acorn', 'leaf']);
fam('food', ['cheese', 'bone', 'honey', 'milk', 'bread', 'sandwich', 'cake', 'hay']);
fam('vehicle', ['car', 'boat', 'airplane', 'train', 'bicycle']);
fam('clothing', ['sock', 'shoe', 'boot', 'mitten', 'hat', 'scarf', 'sunglasses', 'party_hat']);
fam('building', ['doghouse', 'beehive', 'barn', 'house', 'hutch', 'iceberg', 'tree', 'nest', 'pond', 'sea']);
fam('sky', ['moon', 'star', 'cloud', 'raindrop', 'snowflake', 'rainbow', 'kite', 'heart_toy']);
fam('thing', ['umbrella', 'snowman', 'cup', 'spoon', 'toothbrush', 'soap', 'bed', 'pillow', 'flower', 'key', 'drum', 'book', 'crayon', 'teddy', 'lamp', 'gift', 'block', 'bucket', 'shovel', 'kennel_bowl']);

const SIL_TWINS: ItemId[][] = [
  ['ball', 'orange', 'clock', 'sun', 'blueberries'], ['apple', 'tomato', 'cherry', 'plum', 'pumpkin', 'orange', 'pear'],
  ['egg', 'lemon', 'balloon', 'plum'], ['gift', 'block', 'book', 'pillow', 'soap'], ['bird', 'parrot', 'crow', 'chick', 'duckling'],
  ['duck', 'duckling', 'hen'], ['bear', 'teddy'], ['sock', 'boot', 'shoe'], ['cup', 'bucket', 'kennel_bowl'], ['moon', 'banana'],
  ['star', 'snowflake'], ['hat', 'party_hat'], ['cat', 'fox', 'kitten'], ['dog', 'puppy', 'fox'], ['sheep', 'lamb', 'cloud'],
  ['cow', 'calf', 'horse'], ['tiger', 'lion', 'cat'], ['mouse', 'rabbit'], ['house', 'doghouse', 'barn', 'hutch'],
  ['pond', 'sea'], ['tree', 'leaf', 'flower'], ['mushroom', 'umbrella'], ['hedgehog', 'mouse'], ['snail', 'turtle'],
  ['raindrop', 'leaf'], ['heart_toy', 'strawberry'], ['mushroom', 'tree'], ['carrot', 'party_hat'], ['spoon', 'shovel'], ['grapes', 'blueberries'],
];
/** Are the silhouettes of a and b too alike to tell apart? */
export function silhouetteTwins(a: ItemId, b: ItemId): boolean {
  return a !== b && SIL_TWINS.some((g) => g.includes(a) && g.includes(b));
}

// ── rule evaluation ───────────────────────────────────────────────────────────────────────────

const rel = (m: Partial<Record<ItemId, ItemId[]>>, x: ItemId, y: ItemId) =>
  (m[x]?.includes(y) ?? false) || (m[y]?.includes(x) ?? false);

/** Does `item` correctly answer `prompt` under `rule`? (the strict, intended answer) */
export function satisfies(rule: MatchRule, prompt: Prompt, item: ItemId): boolean {
  const at = ITEM_ATTRS[item];
  switch (rule) {
    case 'same':
      return prompt.kind === 'item' && prompt.id === item;
    case 'color':
      return prompt.kind === 'color' && at.colorFair && at.color === prompt.id;
    case 'shape':
      return prompt.kind === 'shape' && at.outline === prompt.id;
    case 'texture':
      return prompt.kind === 'texture' && TEXTURE_OF[prompt.id].owners.includes(item);
    case 'food':
      return prompt.kind === 'item' && rel(EATS, prompt.id, item);
    case 'home':
      return prompt.kind === 'item' && rel(LIVES_IN, prompt.id, item);
    case 'baby':
      return prompt.kind === 'item' && (BABY_OF[prompt.id] === item || BABY_OF[item] === prompt.id);
    case 'weather':
      return prompt.kind === 'item' && (WEATHER_NEEDS[prompt.id]?.includes(item) ?? false);
    case 'pair':
      return prompt.kind === 'item' && rel(PAIRS, prompt.id, item);
    case 'shadow':
      return prompt.kind === 'shadow' && prompt.id === item;
    case 'free':
      return false;
  }
}

/**
 * Could a child reasonably think `item` answers `prompt` under `rule`? True for the real answer AND for
 * look-alikes (two-tone items in colour rounds, roundish items in shape rounds, "also has" textures…).
 * A distractor must never be plausible.
 */
export function plausible(rule: MatchRule, prompt: Prompt, item: ItemId): boolean {
  if (satisfies(rule, prompt, item)) return true;
  const at = ITEM_ATTRS[item];
  switch (rule) {
    case 'color':
      return prompt.kind === 'color' && (at.color === prompt.id || at.color2 === prompt.id); // two-tone item
    case 'shape':
      return at.shapeAmbiguous;
    case 'texture':
      return prompt.kind === 'texture' && TEXTURE_OF[prompt.id].alsoHas.includes(item);
    case 'weather':
      return prompt.kind === 'item' && (WEATHER_MAYBE[prompt.id]?.includes(item) ?? false);
    case 'same':
      // the same animal at a different age (cat vs kitten) is too close for "identical picture"
      return prompt.kind === 'item' && (BABY_OF[prompt.id] === item || BABY_OF[item] === prompt.id);
    case 'shadow':
      // near-identical outline (ball vs orange) or the same animal at another age
      return (
        prompt.kind === 'shadow' &&
        (silhouetteTwins(prompt.id, item) || BABY_OF[prompt.id] === item || BABY_OF[item] === prompt.id)
      );
    default:
      return false;
  }
}

/** For the abstract world: does the prompt relate to the item under ANY rule? (then it's not "nothing fits") */
export function relatesUnderAnyRule(prompt: Prompt, item: ItemId): boolean {
  const rules: MatchRule[] = ['same', 'color', 'shape', 'texture', 'food', 'home', 'baby', 'weather', 'pair'];
  return rules.some((r) => {
    if (r === 'shape') return prompt.kind === 'shape' && ITEM_ATTRS[item].outline === prompt.id;
    return plausible(r, prompt, item);
  });
}
