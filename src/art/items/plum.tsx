import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

export default function Plum({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 30 C50 22 52 16 56 10" {...L} stroke={OUTLINE} />
      <Path d="M54 18 C60 8 74 6 82 12 C76 22 62 24 54 18 Z" fill={COLORS.green} {...S} />
      <Ellipse cx={50} cy={60} rx={32} ry={34} fill={C} {...S} />
      {/* soft crease */}
      <Path d="M50 30 C42 44 42 72 50 90" fill="none" stroke={tone(C, -0.15)} strokeWidth={4} strokeLinecap="round" />
      {/* bloom highlight */}
      <Ellipse cx={34} cy={50} rx={6} ry={10} fill={tone(C, 0.4)} transform="rotate(20 34 50)" />
    </Art>
  );
}

const OUTLINE = '#4B4453';
