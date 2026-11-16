import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Sock({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M30 14 H64 V56 L80 70 C88 78 82 92 70 90 C64 90 60 88 54 82 L36 66 C32 62 30 58 30 52 Z" fill={C} {...S} />
      <Rect x={26} y={8} width={42} height={14} rx={6} fill={tone(C, 0.5)} {...S} />
      <Path d="M32 34 H62 M32 46 H62" stroke={tone(C, 0.5)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M64 76 C68 72 74 72 78 76" fill="none" stroke={tone(C, -0.2)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
