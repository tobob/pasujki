import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Apple({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 30 C40 22 16 22 14 46 C12 68 28 92 42 90 C46 90 48 88 50 88 C52 88 54 90 58 90 C72 92 88 68 86 46 C84 22 60 22 50 30 Z" fill={C} {...S} />
      <Ellipse cx={30} cy={46} rx={6} ry={10} fill={tone(C, 0.35)} transform="rotate(20 30 46)" />
      <Path d="M50 30 C50 22 52 16 56 10" {...L} />
      <Path d="M54 20 C60 10 72 10 78 14 C72 22 62 24 54 20 Z" fill={COLORS.green} {...S} />
    </Art>
  );
}
