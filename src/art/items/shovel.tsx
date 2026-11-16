import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Shovel({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* handle grip */}
      <Path d="M36 6 H64 C68 6 70 8 70 12 V16 C70 20 68 22 64 22 H36 C32 22 30 20 30 16 V12 C30 8 32 6 36 6 Z" fill={C} {...S} />
      <Rect x={44} y={20} width={12} height={30} rx={5} fill={C} {...S} />
      {/* blade */}
      <Path d="M24 50 C24 46 26 44 30 44 H70 C74 44 76 46 76 50 C76 74 64 90 50 94 C36 90 24 74 24 50 Z" fill={C} {...S} />
      <Path d="M33 54 C33 66 38 76 44 82" fill="none" stroke={tone(C, 0.4)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M50 50 V74" fill="none" stroke={tone(C, -0.15)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
