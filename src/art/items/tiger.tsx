import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.orange;
const K = COLORS.black;
const W = COLORS.white;

export default function Tiger({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* ears */}
      <Circle cx={24} cy={26} r={11} fill={C} {...S} />
      <Circle cx={76} cy={26} r={11} fill={C} {...S} />
      <Circle cx={24} cy={26} r={5} fill={W} />
      <Circle cx={76} cy={26} r={5} fill={W} />
      {/* head */}
      <Path d="M50 18 C26 18 12 34 12 54 C12 76 30 88 50 88 C70 88 88 76 88 54 C88 34 74 18 50 18 Z" fill={C} {...S} />
      {/* stripes */}
      <Path d="M44 20 L46 30 M50 19 V32 M56 20 L54 30" fill="none" stroke={K} strokeWidth={4} strokeLinecap="round" />
      <Path d="M13 50 C18 50 22 48 24 45 M14 62 C19 62 22 60 24 57" fill="none" stroke={K} strokeWidth={4} strokeLinecap="round" />
      <Path d="M87 50 C82 50 78 48 76 45 M86 62 C81 62 78 60 76 57" fill="none" stroke={K} strokeWidth={4} strokeLinecap="round" />
      {/* white muzzle */}
      <Ellipse cx={41} cy={68} rx={12} ry={10} fill={W} />
      <Ellipse cx={59} cy={68} rx={12} ry={10} fill={W} />
      <Cheeks x1={27} x2={73} y={60} />
      <Eyes x1={37} x2={63} y={49} r={4.6} />
      <Path d="M22 40 C26 32 32 27 40 25" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M45 60 H55 L50 65 Z" fill={tone(COLORS.pink, -0.1)} {...S3} />
      <Path d="M50 65 V68 M44 70 Q50 74 50 68 Q50 74 56 70" {...L3} />
    </Art>
  );
}
