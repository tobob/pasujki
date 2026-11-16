import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Tomato({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 28 C70 22 92 34 92 56 C92 78 72 92 50 92 C28 92 8 78 8 56 C8 34 30 22 50 28 Z" fill={C} {...S} />
      <Path d="M22 52 C22 44 28 38 36 37" fill="none" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M50 30 L36 22 L44 22 L40 14 L50 20 L60 14 L56 22 L64 22 Z" fill={COLORS.green} {...S} />
      <Path d="M50 20 C50 14 52 10 55 8" fill="none" stroke={S.stroke} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
