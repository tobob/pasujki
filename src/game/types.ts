/**
 * Pasujki — SHARED CONTRACT between the level designer, the illustrator, the audio designer and the
 * game engine. Change ids here only (and then in every place that uses them); never invent an id
 * elsewhere. The catalog is the single list of things that can appear on screen.
 */

/** Pictures drawn as SVG components in src/art/items/<id>.tsx (registry: src/art/index.ts). */
export const ITEM_IDS = [
  // animals
  'cat', 'dog', 'cow', 'pig', 'sheep', 'horse', 'hen', 'duck', 'frog', 'fish', 'elephant', 'lion',
  'giraffe', 'zebra', 'tiger', 'ladybug', 'bee', 'butterfly', 'bear', 'rabbit', 'mouse', 'owl',
  'penguin', 'monkey', 'snail', 'turtle', 'squirrel', 'flamingo', 'whale', 'parrot',
  // baby animals (mother → baby pairs: hen→chick, cat→kitten, dog→puppy, sheep→lamb, cow→calf, duck→duckling)
  'chick', 'kitten', 'puppy', 'lamb', 'calf', 'duckling',
  // food
  'strawberry', 'banana', 'lemon', 'orange', 'apple', 'pear', 'grapes', 'carrot', 'cheese', 'bone',
  'honey', 'leaf', 'acorn', 'milk', 'watermelon', 'blueberries', 'corn', 'bread', 'egg', 'worm',
  // homes / places
  'doghouse', 'beehive', 'nest', 'pond', 'barn', 'iceberg', 'tree', 'sea', 'hutch', 'kennel_bowl',
  // things
  'ball', 'sun', 'moon', 'star', 'cloud', 'umbrella', 'raindrop', 'snowflake', 'snowman', 'scarf',
  'sunglasses', 'boot', 'hat', 'mitten', 'cup', 'spoon', 'toothbrush', 'soap', 'bed', 'pillow',
  'car', 'boat', 'airplane', 'train', 'bicycle', 'flower', 'house', 'key', 'drum', 'balloon',
  'book', 'crayon', 'sock', 'shoe', 'teddy', 'clock', 'lamp', 'tomato', 'pumpkin', 'heart_toy',
] as const;
export type ItemId = (typeof ITEM_IDS)[number];

/** Flat colour prompts. The engine draws them as a soft blob; hex values live in src/game/palette.ts. */
export const COLOR_IDS = ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'pink', 'brown', 'white', 'black', 'grey'] as const;
export type ColorId = (typeof COLOR_IDS)[number];

/** Texture / pattern prompts drawn as SVG components in src/art/textures/<id>.tsx. */
export const TEXTURE_IDS = [
  'stripes_bw', 'stripes_orange', 'spots_red_black', 'spots_giraffe', 'wool', 'feathers', 'scales',
  'honeycomb', 'wood', 'waves', 'polka', 'checks', 'bricks', 'grass', 'ice', 'fur_brown',
] as const;
export type TextureId = (typeof TEXTURE_IDS)[number];

/** Simple shape prompts drawn by src/art/shapes.tsx. */
export const SHAPE_IDS = ['circle', 'square', 'triangle', 'star', 'heart', 'oval', 'rectangle', 'crescent'] as const;
export type ShapeId = (typeof SHAPE_IDS)[number];

/** What appears in the middle (the thing the child moves). */
export type Prompt =
  | { kind: 'item'; id: ItemId }
  | { kind: 'color'; id: ColorId }
  | { kind: 'texture'; id: TextureId }
  | { kind: 'shape'; id: ShapeId; color?: ColorId };

/** One quadrant target. `null` = an empty, sleeping corner (used in the easiest levels: fewer choices). */
export type Target = { id: ItemId } | null;

/** How a round is judged. */
export type MatchRule =
  | 'same'        // identical picture
  | 'color'       // prompt colour = dominant colour of the target
  | 'shape'       // prompt shape ≈ target outline (ball = circle)
  | 'texture'     // pattern belongs to the target (stripes → zebra)
  | 'food'        // what does this animal eat
  | 'home'        // where does it live
  | 'baby'        // mother → baby
  | 'weather'     // weather → thing you need (rain → umbrella)
  | 'pair'        // things that go together (toothbrush → cup, sock → shoe)
  | 'free';       // ABSTRACT: no right answer — every choice is celebrated

export type Round = {
  prompt: Prompt;
  /** Exactly 4 entries: top-left, top-right, bottom-left, bottom-right. */
  targets: [Target, Target, Target, Target];
  /** Index 0..3 of the correct quadrant; ignored when rule === 'free'. */
  answer: 0 | 1 | 2 | 3 | null;
  rule: MatchRule;
  /** Short Polish line the narrator would say (e.g. "Co jest czerwone?"), shown as a hint for parents. */
  hint_pl: string;
  hint_en: string;
};

export type Level = {
  id: string;               // 'w1-l1'
  world: number;            // 1..N, grouping on the map
  title_pl: string;
  title_en: string;
  /** Target age band the level was designed for. */
  age: '2+' | '3+' | '4+' | '5+';
  rounds: Round[];          // 5–8 rounds; one level ≈ 1–2 min
};

export type World = {
  id: number;
  title_pl: string;
  title_en: string;
  /** Background tint for the world (calm pastel, hex). */
  tint: string;
  levels: Level[];
};

/** Sounds the engine can play — files in assets/audio/<id>.m4a (registry: src/audio/index.ts). */
export const SFX_IDS = ['tap', 'pickup', 'drop', 'correct', 'try_again', 'level_complete', 'world_complete', 'pop', 'whoosh', 'sparkle'] as const;
export type SfxId = (typeof SFX_IDS)[number];
export const MUSIC_IDS = ['menu_loop', 'play_loop_calm', 'play_loop_bouncy'] as const;
export type MusicId = (typeof MUSIC_IDS)[number];
