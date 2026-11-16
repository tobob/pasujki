import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.pink;

export default function Flamingo({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* one leg + tucked leg */}
      <Path d="M52 64 V94 M46 94 H58" {...L} stroke={tone(C, -0.25)} />
      <Path d="M56 64 L66 74 L56 78" {...L} stroke={tone(C, -0.25)} />
      {/* body */}
      <Path d="M30 50 C30 38 44 34 60 36 C76 38 90 46 88 54 C84 66 64 70 50 66 C38 64 30 60 30 50 Z" fill={C} {...S} />
      <Path d="M50 46 C58 44 70 46 76 52" {...L} strokeWidth={3} stroke={tone(C, -0.2)} />
      {/* S-neck */}
      <Path d="M36 46 C26 38 22 30 28 22 C34 14 26 8 22 10" fill="none" stroke={OUT} strokeWidth={14} strokeLinecap="round" />
      <Path d="M36 46 C26 38 22 30 28 22 C34 14 26 8 22 10" fill="none" stroke={C} strokeWidth={6} strokeLinecap="round" />
      {/* head + beak */}
      <Circle cx={24} cy={14} r={9} fill={C} {...S} />
      <Path d="M16 12 C10 14 8 18 10 24 L16 18 Z" fill={COLORS.black} {...S} strokeWidth={3} />
      <Cheeks x1={28} x2={28} y={18} r={2.4} />
      <Eyes x1={25} x2={25} y={12} r={2.6} />
    </Art>
  );
}
