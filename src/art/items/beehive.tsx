import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Beehive({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 8 C76 8 88 40 88 70 C88 82 80 88 70 88 L30 88 C20 88 12 82 12 70 C12 40 24 8 50 8 Z" fill={C} {...S} />
      <Path d="M30 24 H70 M20 40 H80 M14 56 H86 M13 72 H87" {...L3} stroke={tone(C, -0.25)} />
      <Path d="M38 88 V76 C38 66 62 66 62 76 V88 Z" fill={OUT} {...S} />
      <Rect x={8} y={86} width={84} height={6} rx={3} fill={COLORS.brown} {...S} strokeWidth={3} />
    </Art>
  );
}
