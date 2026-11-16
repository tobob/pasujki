import { Path } from 'react-native-svg';

import { Art, COLORS, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Banana({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M24 22 C14 46 22 76 46 86 C62 92 80 88 90 78 C86 72 80 72 74 74 C56 78 40 66 36 44 C34 34 34 28 34 22 Z" fill={C} {...S} />
      <Path d="M30 40 C32 62 46 78 66 80" {...L3} stroke={tone(C, -0.2)} />
      <Path d="M24 22 L26 12 L34 12 L34 22 Z" fill={COLORS.brown} {...S} />
      <Path d="M88 78 L92 80" {...S} stroke={OUT} strokeWidth={6} />
    </Art>
  );
}
