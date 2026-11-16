import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

/** Small round songbird, side view. */
export default function Bird({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M22 56 L8 46 L10 64 Z" fill={tone(C, -0.15)} {...S} />
      {/* legs */}
      <Path d="M44 82 V90 M56 82 V90" {...L3} stroke={COLORS.orange} strokeWidth={4} />
      {/* round body+head */}
      <Ellipse cx={50} cy={56} rx={32} ry={28} fill={C} {...S} />
      {/* belly */}
      <Ellipse cx={56} cy={68} rx={18} ry={12} fill={tone(C, 0.6)} />
      {/* wing */}
      <Path d="M28 56 C30 72 44 76 52 70 C46 62 38 56 28 56 Z" fill={tone(C, -0.12)} {...S} strokeWidth={3} />
      {/* tuft */}
      <Path d="M56 28 C54 20 60 16 62 22 C64 16 70 18 66 28" fill={C} {...S} strokeWidth={3} />
      {/* beak */}
      <Path d="M80 48 L92 52 L80 57 Z" fill={COLORS.orange} {...S} strokeWidth={3} />
      <Cheeks x1={56} x2={78} y={56} r={3.2} />
      <Eyes x1={60} x2={74} y={46} r={3.4} />
      <Smile cx={67} cy={54} w={3} d={2} />
      <Path d="M36 40 C40 36 46 34 50 34" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
