import { Circle, Path } from 'react-native-svg';

import { Art, Cheeks, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const K = COLORS.black;

/** Ladybug: round red shell, big friendly black head with white eyes. */
export default function Ladybug({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* antennae */}
      <Path d="M40 14 C36 8 30 6 26 8 M60 14 C64 8 70 6 74 8" {...L} strokeWidth={3} />
      <Circle cx={26} cy={8} r={3.5} fill={K} />
      <Circle cx={74} cy={8} r={3.5} fill={K} />
      {/* stubby legs */}
      <Path d="M16 56 H10 M18 72 L11 77 M84 56 H90 M82 72 L89 77" {...L} />
      {/* shell */}
      <Circle cx={50} cy={60} r={35} fill={C} {...S} />
      <Path d="M50 40 V95" {...L} />
      <Circle cx={32} cy={62} r={6.5} fill={K} />
      <Circle cx={68} cy={62} r={6.5} fill={K} />
      <Circle cx={38} cy={81} r={5} fill={K} />
      <Circle cx={62} cy={81} r={5} fill={K} />
      <Path d="M22 50 C24 44 28 40 32 38" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      {/* big head */}
      <Path d="M24 38 C24 18 76 18 76 38 C76 48 24 48 24 38 Z" fill={K} {...S} />
      {/* white eyes on the dark head */}
      <Circle cx={40} cy={31} r={6} fill={COLORS.white} />
      <Circle cx={60} cy={31} r={6} fill={COLORS.white} />
      <Circle cx={41} cy={32} r={3.4} fill={K} />
      <Circle cx={61} cy={32} r={3.4} fill={K} />
      <Circle cx={42.2} cy={30.8} r={1.1} fill="#FFFFFF" />
      <Circle cx={62.2} cy={30.8} r={1.1} fill="#FFFFFF" />
      <Cheeks x1={31} x2={69} y={39} r={3.2} />
      <Path d="M46 40 Q50 43 54 40" fill="none" stroke={COLORS.white} strokeWidth={2.5} strokeLinecap="round" />
    </Art>
  );
}
