import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;
const F = tone(COLORS.brown, 0.6);

export default function Monkey({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* ears */}
      <Circle cx={15} cy={50} r={12} fill={C} {...S} />
      <Circle cx={85} cy={50} r={12} fill={C} {...S} />
      <Circle cx={15} cy={50} r={6} fill={F} />
      <Circle cx={85} cy={50} r={6} fill={F} />
      {/* head */}
      <Circle cx={50} cy={50} r={36} fill={C} {...S} />
      <Path d="M44 15 C46 10 52 10 54 15" {...L3} stroke={C} />
      <Path d="M22 34 C26 26 32 21 38 19" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* face: heart-shaped light area */}
      <Path d="M50 38 C44 28 26 28 26 44 C26 52 30 56 30 60 C30 76 40 82 50 82 C60 82 70 76 70 60 C70 56 74 52 74 44 C74 28 56 28 50 38 Z" fill={F} />
      <Cheeks x1={32} x2={68} y={60} r={4} />
      <Eyes x1={40} x2={60} y={47} r={4.4} />
      <Circle cx={46} cy={58} r={1.6} fill={OUT} />
      <Circle cx={54} cy={58} r={1.6} fill={OUT} />
      <Path d="M40 66 Q50 76 60 66" {...L3} />
    </Art>
  );
}
