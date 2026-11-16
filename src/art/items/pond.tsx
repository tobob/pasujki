import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Pond({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* reeds */}
      <Path d="M16 52 C14 36 14 26 18 16 M24 52 C24 40 26 32 30 24" {...S} fill="none" stroke={COLORS.green} strokeWidth={5} />
      <Ellipse cx={18} cy={20} rx={3.5} ry={7} fill={COLORS.brown} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={64} rx={44} ry={26} fill={C} {...S} />
      <Path d="M22 62 C28 58 34 58 40 62 M56 78 C62 74 68 74 74 78" {...L3} stroke={tone(C, 0.45)} />
      {/* lily pad */}
      <Path d="M66 60 C54 60 50 54 54 48 C58 42 74 42 78 48 C80 52 76 56 70 54 Z" fill={COLORS.green} {...S} strokeWidth={3.5} />
      <Path d="M70 46 C68 40 72 36 76 38 C80 36 82 40 78 44 Z" fill={COLORS.pink} {...S} strokeWidth={3} />
    </Art>
  );
}
