import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const K = COLORS.black;

export default function Ladybug({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* antennae */}
      <Path d="M42 18 C38 10 32 8 28 10 M58 18 C62 10 68 8 72 10" {...L} strokeWidth={3} />
      <Circle cx={28} cy={10} r={3.5} fill={K} />
      <Circle cx={72} cy={10} r={3.5} fill={K} />
      {/* legs */}
      <Path d="M18 50 H10 M18 64 L10 70 M82 50 H90 M82 64 L90 70" {...L} />
      {/* shell */}
      <Circle cx={50} cy={58} r={36} fill={C} {...S} />
      <Path d="M50 32 V94" {...L} />
      <Circle cx={33} cy={54} r={6} fill={K} />
      <Circle cx={67} cy={54} r={6} fill={K} />
      <Circle cx={36} cy={75} r={5} fill={K} />
      <Circle cx={64} cy={75} r={5} fill={K} />
      <Path d="M24 44 C26 38 30 34 34 32" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      {/* head */}
      <Path d="M28 32 C28 16 72 16 72 32 C72 38 28 38 28 32 Z" fill={K} {...S} />
      <Cheeks x1={36} x2={64} y={30} r={3} />
      <Eyes x1={42} x2={58} y={26} r={3.4} />
      <Smile cx={50} cy={31} w={3} />
    </Art>
  );
}
