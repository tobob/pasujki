import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Parrot({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M52 78 L46 96 L56 94 L62 78 Z" fill={COLORS.blue} {...S} />
      {/* perch */}
      <Path d="M24 80 H80" {...L} stroke={COLORS.brown} strokeWidth={6} />
      {/* body */}
      <Path d="M44 20 C62 18 72 34 70 52 C68 68 62 80 50 80 C38 80 32 70 32 56 C32 46 34 36 40 30 Z" fill={C} {...S} />
      {/* wing */}
      <Path d="M54 44 C66 46 70 62 64 74 C58 78 50 72 50 62 Z" fill={COLORS.yellow} {...S} />
      <Path d="M56 64 C58 70 62 72 64 72" {...L} strokeWidth={3} stroke={COLORS.blue} />
      {/* head */}
      <Circle cx={42} cy={30} r={16} fill={C} {...S} />
      <Path d="M34 18 C36 14 40 12 44 12" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* beak */}
      <Path d="M28 28 C20 28 16 34 18 42 C22 40 26 38 30 38 Z" fill={tone(COLORS.yellow, 0.3)} {...S} />
      {/* white eye patch */}
      <Circle cx={42} cy={28} r={7} fill={COLORS.white} />
      <Cheeks x1={50} x2={50} y={36} r={2.6} />
      <Eyes x1={42} x2={42} y={28} r={3.4} />
      {/* feet */}
      <Path d="M44 80 V84 M54 80 V84" {...L} stroke={COLORS.grey} strokeWidth={4} />
    </Art>
  );
}
