import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Doghouse({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={18} y={42} width={64} height={48} rx={4} fill={C} {...S} />
      <Path d="M18 56 H82 M18 72 H82" {...L3} stroke={tone(C, -0.2)} />
      {/* roof */}
      <Path d="M8 48 L50 12 L92 48 Z" fill={COLORS.brown} {...S} />
      {/* door */}
      <Path d="M36 90 V66 C36 56 64 56 64 66 V90 Z" fill={OUT} {...S} />
    </Art>
  );
}
