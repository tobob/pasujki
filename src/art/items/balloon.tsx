import { Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Balloon({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 72 C46 78 56 82 50 88 C46 92 52 94 52 96" {...L3} />
      <Path d="M50 70 C30 66 18 50 18 34 C18 18 32 6 50 6 C68 6 82 18 82 34 C82 50 70 66 50 70 Z" fill={C} {...S} />
      <Path d="M45 76 L50 69 L55 76 Z" fill={C} {...S} strokeWidth={3} />
      <Path d="M32 24 C34 18 40 14 46 14" fill="none" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
