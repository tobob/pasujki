import { Path } from 'react-native-svg';

import { Art, COLORS, L, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Leaf({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M22 80 C10 52 26 18 86 12 C88 62 60 92 22 80 Z" fill={C} {...S} />
      <Path d="M14 90 L24 78 C40 58 56 40 74 26" {...L} />
      <Path d="M40 58 L36 40 M52 46 L52 30 M40 58 L58 62 M54 44 L72 46" {...L3} stroke={tone(C, -0.25)} />
    </Art>
  );
}
