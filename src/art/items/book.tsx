import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Book({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={20} y={14} width={66} height={76} rx={6} fill={COLORS.white} {...S} />
      <Rect x={14} y={10} width={64} height={76} rx={6} fill={C} {...S} />
      <Path d="M26 12 V84" stroke={tone(C, -0.2)} strokeWidth={4} strokeLinecap="round" />
      <Rect x={36} y={28} width={30} height={16} rx={4} fill={tone(C, 0.5)} />
      <Path d="M40 36 H62" stroke={tone(C, -0.1)} strokeWidth={3} strokeLinecap="round" />
    </Art>
  );
}
