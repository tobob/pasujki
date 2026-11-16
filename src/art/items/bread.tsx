import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

/** A round, chunky loaf with a soft golden top and three score marks. */
export default function Bread({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M8 60 C8 36 28 24 50 24 C72 24 92 36 92 60 C92 72 86 80 76 80 L24 80 C14 80 8 72 8 60 Z" fill={C} {...S} />
      <Path d="M16 66 C30 72 70 72 84 66" fill="none" stroke={tone(C, -0.15)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M22 44 C28 36 36 32 44 31" fill="none" stroke={tone(C, 0.35)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M32 46 L40 56 M48 42 L56 54 M64 44 L72 54" {...L} stroke={tone(C, 0.5)} strokeWidth={5} />
    </Art>
  );
}
