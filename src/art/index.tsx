/**
 * Pasujki illustrations. Stable API:
 *   <ItemArt id size />  <TextureArt id size />  <ShapeArt id size color? />
 * Each renders a square `size`×`size` react-native-svg drawing (viewBox 0 0 100 100).
 */
import { ITEMS, TEXTURES } from './registry';
import type { ItemId, TextureId } from '@/game/types';

export { ShapeArt, SHAPE_ART_IDS } from './shapes';
export { ITEM_DOMINANT } from './dominant';

type P = { size: number };

export function ItemArt({ id, size }: P & { id: ItemId }) {
  const C = ITEMS[id];
  return <C size={size} />;
}

export function TextureArt({ id, size }: P & { id: TextureId }) {
  const C = TEXTURES[id];
  return <C size={size} />;
}

/** Ids that have a drawing (for completeness checks). */
export const ITEM_ART_IDS = Object.keys(ITEMS) as ItemId[];
export const TEXTURE_ART_IDS = Object.keys(TEXTURES) as TextureId[];
