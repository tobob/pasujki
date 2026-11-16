import { Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Boat({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M46 10 V54" {...L} strokeWidth={4} />
      <Path d="M50 12 C64 22 74 36 76 48 H50 Z" fill={COLORS.white} {...S} />
      {/* chunky rounded hull */}
      <Path d="M8 56 C8 54 10 52 12 52 H88 C90 52 92 54 92 56 L82 80 C80 84 77 86 73 86 H27 C23 86 20 84 18 80 Z" fill={C} {...S} />
      <Path d="M20 62 H80" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M30 78 H70" fill="none" stroke={tone(C, -0.12)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
