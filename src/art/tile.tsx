/** Rounded-square frame shared by every texture tile (clips the pattern, adds the outline). */
import type { ReactNode } from 'react';
import Svg, { ClipPath, Defs, G, Rect } from 'react-native-svg';

import { S } from './kit';

export function Tile({ id, size, bg, children }: { id: string; size: number; bg: string; children: ReactNode }) {
  const clip = `pasujki-tx-${id}`;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <ClipPath id={clip}>
          <Rect x={6} y={6} width={88} height={88} rx={20} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${clip})`}>
        <Rect x={0} y={0} width={100} height={100} fill={bg} />
        {children}
      </G>
      <Rect x={6} y={6} width={88} height={88} rx={20} fill="none" {...S} />
    </Svg>
  );
}

/** Deterministic grid helper: [x, y, index] for a lattice (optionally offset every other row). */
export function grid(step: number, offsetOddRows = true, from = -step, to = 100 + step) {
  const pts: [number, number, number][] = [];
  let i = 0;
  for (let r = 0, y = from; y <= to; y += step, r++) {
    for (let x = from + (offsetOddRows && r % 2 ? step / 2 : 0); x <= to; x += step) pts.push([x, y, i++]);
  }
  return pts;
}
