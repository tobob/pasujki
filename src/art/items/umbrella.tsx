import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

export default function Umbrella({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 54 V80 C50 90 36 90 36 80" {...L} strokeWidth={5} />
      <Path d="M50 8 V14" {...L} strokeWidth={5} />
      <Path d="M8 54 C8 30 28 14 50 14 C72 14 92 30 92 54 C86 48 78 48 71 54 C64 48 56 48 50 54 C44 48 36 48 29 54 C22 48 14 48 8 54 Z" fill={C} {...S} />
      <Path d="M50 14 C40 26 36 40 36 51 M50 14 C60 26 64 40 64 51" fill="none" stroke={tone(C, -0.2)} strokeWidth={3} strokeLinecap="round" />
      <Path d="M22 34 C26 28 32 24 38 22" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
