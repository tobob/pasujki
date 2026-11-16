import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const SEEDS = [
  [36, 48], [50, 44], [64, 48], [30, 60], [70, 60], [42, 72], [58, 72], [50, 84],
];

export default function Strawberry({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 94 C32 88 16 70 16 52 C16 40 26 33 38 34 C44 34 47 36 50 36 C53 36 56 34 62 34 C74 33 84 40 84 52 C84 70 68 88 50 94 Z" fill={C} {...S} />
      <Path d="M24 50 C24 44 28 40 34 40" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {SEEDS.map(([x, y], i) => (
        <Ellipse key={i} cx={x} cy={y} rx={1.6} ry={2.4} fill={COLORS.yellow} />
      ))}
      {/* leaves */}
      <Path d="M50 36 L36 30 L42 24 L34 16 L46 18 L50 8 L54 18 L66 16 L58 24 L64 30 Z" fill={COLORS.green} {...S} />
    </Art>
  );
}
