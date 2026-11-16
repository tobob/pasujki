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
      <Circle cx={44} cy={30} r={19} fill={C} {...S} />
      <Path d="M32 18 C35 14 40 12 45 12" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* beak */}
      <Path d="M28 26 C18 26 14 34 16 43 C21 41 26 39 31 38 Z" fill={tone(COLORS.yellow, 0.3)} {...S} />
      {/* white eye patch */}
      <Circle cx={45} cy={28} r={8} fill={COLORS.white} />
      <Cheeks x1={54} x2={54} y={38} r={3.2} />
      <Eyes x1={45} x2={45} y={28} r={4.2} />
      {/* feet */}
      <Path d="M44 80 V84 M54 80 V84" {...L} stroke={COLORS.grey} strokeWidth={4} />
    </Art>
  );
}
