import { Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Carrot({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M54 30 C46 14 36 10 30 12 C36 18 42 26 48 32 Z" fill={COLORS.green} {...S} />
      <Path d="M58 28 C58 14 62 6 68 6 C68 14 66 22 62 30 Z" fill={COLORS.green} {...S} />
      <Path d="M62 32 C70 22 80 20 88 24 C82 30 74 34 66 36 Z" fill={COLORS.green} {...S} />
      <Path d="M44 34 C54 26 70 30 72 42 C74 52 50 76 22 92 C16 94 14 90 16 86 C28 62 36 42 44 34 Z" fill={C} {...S} />
      <Path d="M44 48 L52 52 M36 62 L44 66 M54 60 L60 62 M30 76 L36 78" {...L3} stroke={tone(C, -0.25)} />
    </Art>
  );
}
