import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;
const W = COLORS.brown;

export default function Bed({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={8} y={22} width={14} height={70} rx={5} fill={W} {...S} />
      <Rect x={80} y={46} width={12} height={46} rx={5} fill={W} {...S} />
      <Rect x={20} y={36} width={26} height={18} rx={8} fill={COLORS.white} {...S} />
      <Path d="M18 56 C30 48 40 50 48 50 H86 V78 H18 Z" fill={C} {...S} />
      <Path d="M30 62 H80" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
