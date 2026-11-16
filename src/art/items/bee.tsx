import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;
const K = COLORS.black;

/** Bee: chubby round striped body, little wings, big friendly face. */
export default function Bee({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* wings */}
      <Ellipse cx={46} cy={26} rx={12} ry={16} fill="#E6F2FB" {...S} transform="rotate(-20 46 26)" />
      <Ellipse cx={68} cy={28} rx={11} ry={15} fill="#E6F2FB" {...S} transform="rotate(25 68 28)" />
      {/* stinger */}
      <Path d="M86 62 L95 64 L86 68 Z" fill={OUT} {...S} strokeWidth={2} />
      {/* body */}
      <Ellipse cx={50} cy={62} rx={38} ry={30} fill={C} {...S} />
      <Path d="M58 33 C64 46 64 78 58 91" fill="none" stroke={K} strokeWidth={9} />
      <Path d="M75 40 C80 50 80 74 75 84" fill="none" stroke={K} strokeWidth={8} />
      <Ellipse cx={50} cy={62} rx={38} ry={30} fill="none" {...S} />
      <Path d="M20 46 C24 40 30 36 36 35" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={32} cy={60} gap={17} eyeR={4.4} mouthDy={10} />
      {/* antennae */}
      <Path d="M26 38 C22 30 18 26 13 26" {...L} strokeWidth={3} />
      <Circle cx={12} cy={26} r={3.2} fill={K} />
    </Art>
  );
}
