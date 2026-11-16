import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.black;

export default function Sunglasses({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M8 40 L4 32 M92 40 L96 32" {...L} strokeWidth={6} />
      <Path d="M44 44 C47 40 53 40 56 44" {...L} strokeWidth={6} />
      <Path d="M8 38 H44 V50 C44 64 36 70 26 70 C16 70 8 64 8 50 Z" fill={C} {...S} />
      <Path d="M56 38 H92 V50 C92 64 84 70 74 70 C64 70 56 64 56 50 Z" fill={C} {...S} />
      <Path d="M16 46 L24 46 M64 46 L72 46" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
