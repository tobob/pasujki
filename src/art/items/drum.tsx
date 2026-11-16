import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Drum({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M12 44 V78 C12 86 30 92 50 92 C70 92 88 86 88 78 V44 Z" fill={C} {...S} />
      <Path d="M14 50 L32 84 L50 52 L68 84 L86 50" fill="none" stroke={COLORS.yellow} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <Ellipse cx={50} cy={44} rx={38} ry={12} fill={COLORS.white} {...S} />
      <Path d="M58 30 L84 6" {...L} strokeWidth={6} />
      <Path d="M42 30 L20 8" {...L} strokeWidth={6} />
      <Ellipse cx={86} cy={6} rx={5} ry={5} fill={tone(C, 0.4)} {...S} strokeWidth={3} />
      <Ellipse cx={18} cy={7} rx={5} ry={5} fill={tone(C, 0.4)} {...S} strokeWidth={3} />
    </Art>
  );
}
