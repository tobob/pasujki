import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Cup({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M72 36 C88 36 90 64 70 66" {...L} strokeWidth={12} />
      <Path d="M72 36 C88 36 90 64 70 66" fill="none" stroke={C} strokeWidth={4} strokeLinecap="round" />
      <Path d="M16 24 H76 V72 C76 84 66 90 56 90 H36 C26 90 16 84 16 72 Z" fill={C} {...S} />
      <Path d="M18 24 H74" {...L} />
      <Path d="M28 36 V70" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M40 6 C36 10 44 14 40 18 M54 6 C50 10 58 14 54 18" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
