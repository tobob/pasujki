import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Shoe({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M10 72 V36 C10 32 13 30 17 30 H36 C38 30 40 32 40 34 V40 C48 44 58 48 70 52 C84 56 92 62 92 70 V72 Z" fill={C} {...S} />
      <Path d="M8 70 H94 V76 C94 80 91 82 88 82 H14 C10 82 8 80 8 76 Z" fill={COLORS.white} {...S} />
      <Path d="M42 44 L38 52 M50 47 L46 56 M58 50 L55 58" {...L3} stroke={COLORS.white} strokeWidth={4} />
      <Path d="M14 40 V60" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Circle cx={76} cy={62} r={4} fill={tone(C, 0.45)} />
    </Art>
  );
}
