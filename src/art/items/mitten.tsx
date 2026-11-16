import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

export default function Mitten({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M30 74 V30 C30 16 40 8 52 8 C64 8 74 16 74 30 V74 Z" fill={C} {...S} />
      <Path d="M31 50 C24 46 16 40 14 32 C12 24 20 20 26 24 C30 28 31 34 31 40" fill={C} {...S} />
      <Path d="M40 40 L46 46 L52 40 L58 46 L64 40" fill="none" stroke={tone(C, 0.5)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x={26} y={70} width={52} height={20} rx={8} fill={tone(C, 0.5)} {...S} />
    </Art>
  );
}
