/**
 * Type-level completeness check for the art registry: `npx tsc --noEmit` fails if any ItemId,
 * TextureId or ShapeId lacks a drawing, or if a drawing has an id not in the contract.
 * Runtime check (+ dominant-colour check + contact sheet): tools/art/render.mjs.
 */
import { ITEM_DOMINANT } from '@/art/dominant';
import { ITEMS, TEXTURES } from '@/art/registry';
import { SHAPE_ART_IDS } from '@/art/shapes';
import type { ItemId, ShapeId, TextureId } from '@/game/types';

type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

export const ART_COMPLETE: [
  Exact<keyof typeof ITEMS, ItemId>,
  Exact<keyof typeof TEXTURES, TextureId>,
  Exact<keyof typeof ITEM_DOMINANT, ItemId>,
  Exact<(typeof SHAPE_ART_IDS)[number], ShapeId>,
] = [true, true, true, true];
