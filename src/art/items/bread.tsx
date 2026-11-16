import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Bread({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M8 58 C8 36 28 26 50 26 C72 26 92 36 92 58 C92 70 86 78 76 78 L24 78 C14 78 8 70 8 58 Z" fill={C} {...S} />
      <Path d="M20 50 C30 40 70 40 80 50" fill="none" stroke={tone(C, 0.3)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M30 40 L38 50 M46 36 L54 48 M62 38 L70 48" {...L} stroke={tone(C, 0.5)} strokeWidth={5} />
    </Art>
  );
}
