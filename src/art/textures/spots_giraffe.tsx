import { Path } from 'react-native-svg';

import { COLORS } from '../kit';
import { Tile } from '../tile';

/** Giraffe: rounded brown patches on yellow with clear yellow gaps. */
const CENTRES: [number, number, number][] = [
  [16, 16, 0], [46, 12, 1], [78, 18, 2], [28, 42, 3], [62, 42, 4], [92, 46, 5],
  [12, 70, 6], [44, 72, 7], [76, 70, 8], [28, 98, 9], [60, 98, 10], [92, 96, 11],
];
function patch(cx: number, cy: number, seed: number) {
  const n = 5 + (seed % 2);
  const pts = Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2 + seed;
    const r = 9 + ((seed * 7 + k * 3) % 4);
    return `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  });
  return `M${pts.join(' L')} Z`;
}
export default function SpotsGiraffe({ size }: { size: number }) {
  return (
    <Tile id="spots_giraffe" size={size} bg={COLORS.yellow}>
      {CENTRES.map(([x, y, s]) => (
        <Path key={s} d={patch(x, y, s)} fill={COLORS.brown} stroke={COLORS.brown} strokeWidth={5} strokeLinejoin="round" />
      ))}
    </Tile>
  );
}
