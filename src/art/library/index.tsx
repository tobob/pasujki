import { SvgXml } from 'react-native-svg';

import { LIBRARY_SVGS } from './svgs';
import type { ItemId } from '@/game/types';

/** The Pastelki drawing for `id`, if one was synced (tools/pastelki/sync.ts); otherwise null. */
export function libraryArt(id: ItemId, size: number, silhouette: boolean) {
  const e = LIBRARY_SVGS[id];
  if (!e) return null;
  return <SvgXml xml={silhouette ? e.silhouette : e.svg} width={size} height={size} />;
}
