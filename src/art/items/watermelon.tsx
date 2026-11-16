import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, type ArtProps } from '../kit';

const C = COLORS.red;
const SEEDS = [[34, 44], [50, 40], [66, 44], [42, 56], [58, 56], [50, 68]];

export default function Watermelon({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* rind */}
      <Path d="M6 30 C6 64 26 86 50 86 C74 86 94 64 94 30 Z" fill={COLORS.green} {...S} />
      <Path d="M14 30 C16 58 32 76 50 76 C68 76 84 58 86 30" fill="none" stroke={COLORS.white} strokeWidth={6} />
      {/* flesh */}
      <Path d="M16 30 C18 56 32 72 50 72 C68 72 82 56 84 30 Z" fill={C} />
      <Path d="M6 30 L94 30" {...S} />
      {SEEDS.map(([x, y], i) => (
        <Ellipse key={i} cx={x} cy={y} rx={2} ry={3.2} fill="#3A3A44" />
      ))}
    </Art>
  );
}
