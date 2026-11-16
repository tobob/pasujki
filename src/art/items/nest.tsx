import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Nest({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* eggs */}
      <Ellipse cx={38} cy={46} rx={11} ry={14} fill={tone(COLORS.blue, 0.55)} {...S} />
      <Ellipse cx={60} cy={44} rx={11} ry={14} fill={tone(COLORS.blue, 0.55)} {...S} />
      {/* nest bowl */}
      <Path d="M8 52 C8 76 26 88 50 88 C74 88 92 76 92 52 C80 60 20 60 8 52 Z" fill={C} {...S} />
      <Path d="M18 66 C30 72 46 64 60 70 C70 74 78 70 84 66 M22 78 C34 82 48 74 62 80 C68 82 74 80 78 78" {...L3} stroke={tone(C, -0.3)} />
      <Path d="M8 52 C20 60 80 60 92 52" {...L3} stroke={tone(C, 0.3)} />
      <Path d="M6 50 L14 56 M94 50 L86 56" {...L3} />
    </Art>
  );
}
