/**
 * Pasujki illustrations. Stable API:
 *   <ItemArt id size />  <TextureArt id size />  <ShapeArt id size color? />
 * Each renders a square `size`×`size` react-native-svg drawing (viewBox 0 0 100 100).
 */
import { SilhouetteContext } from './kit';
import { libraryArt } from './library';
import { ITEMS, TEXTURES } from './registry';
import type { ItemId, TextureId } from '@/game/types';

export { ShapeArt, SHAPE_ART_IDS } from './shapes';
export { ITEM_DOMINANT } from './dominant';
export { SILHOUETTE_CLEAR } from './silhouette-ok';

type P = { size: number };

/** `silhouette`: flat soft-charcoal shadow of the item (no face/details) for shadow rounds. */
export function ItemArt({ id, size, silhouette = false }: P & { id: ItemId; silhouette?: boolean }) {
  const synced = libraryArt(id, size, silhouette);
  if (synced) return synced;
  const C = ITEMS[id];
  if (!silhouette) return <C size={size} />;
  return (
    <SilhouetteContext.Provider value>
      <C size={size} />
    </SilhouetteContext.Provider>
  );
}

export function TextureArt({ id, size }: P & { id: TextureId }) {
  const C = TEXTURES[id];
  return <C size={size} />;
}

/** Ids that have a drawing (for completeness checks). */
export const ITEM_ART_IDS = Object.keys(ITEMS) as ItemId[];
export const TEXTURE_ART_IDS = Object.keys(TEXTURES) as TextureId[];
