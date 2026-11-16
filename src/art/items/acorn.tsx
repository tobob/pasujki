import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Acorn({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* nut */}
      <Path d="M26 44 C24 66 36 86 50 92 C64 86 76 66 74 44 Z" fill={tone(C, 0.25)} {...S} />
      <Ellipse cx={38} cy={60} rx={4} ry={9} fill={tone(C, 0.5)} />
      {/* cap — dominant brown */}
      <Path d="M16 46 C16 28 32 18 50 18 C68 18 84 28 84 46 C84 50 80 52 76 52 L24 52 C20 52 16 50 16 46 Z" fill={C} {...S} />
      <Path d="M28 32 L36 40 M42 26 L48 34 M56 26 L62 34 M70 32 L74 38 M24 42 L28 46 M50 38 L54 44" {...L3} stroke={tone(C, -0.25)} />
      <Path d="M50 18 C50 12 52 8 56 6" {...L} />
    </Art>
  );
}
