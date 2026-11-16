import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Pear({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 18 C40 18 36 26 36 36 C36 46 20 54 20 70 C20 84 34 92 50 92 C66 92 80 84 80 70 C80 54 64 46 64 36 C64 26 60 18 50 18 Z" fill={C} {...S} />
      <Ellipse cx={34} cy={68} rx={5} ry={10} fill={tone(C, 0.35)} transform="rotate(15 34 68)" />
      <Path d="M50 18 C50 14 51 10 54 6" {...L} />
      <Path d="M53 12 C58 4 68 4 72 7 C67 14 59 15 53 12 Z" fill={tone(C, -0.15)} {...S} />
    </Art>
  );
}
