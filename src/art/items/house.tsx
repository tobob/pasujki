import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function House({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={64} y={14} width={10} height={20} rx={2} fill={COLORS.red} {...S} />
      <Rect x={18} y={44} width={64} height={46} rx={4} fill={C} {...S} />
      <Path d="M8 48 L50 12 L92 48 Z" fill={COLORS.brown} {...S} />
      <Rect x={42} y={62} width={16} height={28} rx={6} fill={COLORS.red} {...S} />
      <Rect x={24} y={56} width={13} height={13} rx={2} fill={tone(COLORS.blue, 0.65)} {...S} strokeWidth={3} />
      <Rect x={63} y={56} width={13} height={13} rx={2} fill={tone(COLORS.blue, 0.65)} {...S} strokeWidth={3} />
      <Path d="M24 78 H34" stroke={tone(C, -0.15)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
