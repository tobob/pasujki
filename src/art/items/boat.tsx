import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Boat({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 12 V54" {...L} strokeWidth={4} />
      <Path d="M54 16 C64 26 70 38 72 50 H54 Z" fill={COLORS.white} {...S} />
      <Path d="M6 54 H94 L80 84 C79 86 77 88 74 88 H26 C23 88 21 86 20 84 Z" fill={C} {...S} />
      <Path d="M18 64 H82" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
