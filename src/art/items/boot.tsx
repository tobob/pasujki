import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Boot({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M24 10 H60 V58 C74 60 88 66 90 78 V86 H24 Z" fill={C} {...S} />
      <Rect x={20} y={8} width={44} height={12} rx={5} fill={tone(C, -0.15)} {...S} />
      <Path d="M24 80 H90 V88 C90 90 88 92 86 92 H28 C26 92 24 90 24 88 Z" fill={tone(C, -0.25)} {...S} />
      <Path d="M32 28 V64" stroke={tone(C, 0.5)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
