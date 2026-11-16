import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Lamp({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={45} y={50} width={10} height={32} rx={3} fill={COLORS.brown} {...S} />
      <Rect x={26} y={80} width={48} height={12} rx={6} fill={COLORS.brown} {...S} />
      <Path d="M32 10 H68 L86 56 H14 Z" fill={C} {...S} />
      <Path d="M30 46 L40 20" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
