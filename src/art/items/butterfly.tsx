import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, Cheeks, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;
const K = COLORS.black;

/** Butterfly: big rounded purple wings, chubby body, big friendly head. */
export default function Butterfly({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* upper wings */}
      <Path d="M47 50 C40 26 26 14 14 18 C4 22 6 44 20 54 C30 60 42 58 47 56 Z" fill={C} {...S} />
      <Path d="M53 50 C60 26 74 14 86 18 C96 22 94 44 80 54 C70 60 58 58 53 56 Z" fill={C} {...S} />
      {/* lower wings */}
      <Path d="M47 58 C36 60 22 66 22 79 C22 91 38 91 47 74 Z" fill={tone(C, 0.25)} {...S} />
      <Path d="M53 58 C64 60 78 66 78 79 C78 91 62 91 53 74 Z" fill={tone(C, 0.25)} {...S} />
      {/* soft wing spots */}
      <Circle cx={24} cy={34} r={6} fill={tone(C, 0.5)} />
      <Circle cx={76} cy={34} r={6} fill={tone(C, 0.5)} />
      {/* body */}
      <Ellipse cx={50} cy={64} rx={7} ry={22} fill={K} {...S} />
      {/* antennae */}
      <Path d="M45 20 C42 12 38 8 34 7 M55 20 C58 12 62 8 66 7" {...L} strokeWidth={3} />
      <Circle cx={34} cy={7} r={3} fill={K} />
      <Circle cx={66} cy={7} r={3} fill={K} />
      {/* big head */}
      <Circle cx={50} cy={32} r={14} fill={K} {...S} />
      <Circle cx={44.5} cy={30} r={4.4} fill={COLORS.white} />
      <Circle cx={55.5} cy={30} r={4.4} fill={COLORS.white} />
      <Circle cx={45.2} cy={30.8} r={2.6} fill={K} />
      <Circle cx={56.2} cy={30.8} r={2.6} fill={K} />
      <Circle cx={46} cy={30} r={0.9} fill="#FFFFFF" />
      <Circle cx={57} cy={30} r={0.9} fill="#FFFFFF" />
      <Cheeks x1={41} x2={59} y={38} r={2.6} />
      <Path d="M47 38 Q50 40.5 53 38" fill="none" stroke={COLORS.white} strokeWidth={2} strokeLinecap="round" />
    </Art>
  );
}
