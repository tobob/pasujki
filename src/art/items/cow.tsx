import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, L3, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const SPOT = COLORS.black;

export default function Cow({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* horns */}
      <Path d="M30 26 C24 20 24 12 28 8 C32 14 36 18 38 22 Z" fill={COLORS.yellow} {...S} />
      <Path d="M70 26 C76 20 76 12 72 8 C68 14 64 18 62 22 Z" fill={COLORS.yellow} {...S} />
      {/* ears */}
      <Ellipse cx={16} cy={36} rx={12} ry={7} fill={C} {...S} transform="rotate(-20 16 36)" />
      <Ellipse cx={84} cy={36} rx={12} ry={7} fill={C} {...S} transform="rotate(20 84 36)" />
      {/* head */}
      <Path d="M24 40 C24 24 36 18 50 18 C64 18 76 24 76 40 C76 52 74 60 72 66 L28 66 C26 60 24 52 24 40 Z" fill={C} {...S} />
      {/* spots */}
      <Path d="M28 30 C34 24 44 26 42 34 C40 40 30 42 27 38 Z" fill={SPOT} />
      <Path d="M66 22 C72 24 75 30 74 36 C68 36 62 30 66 22 Z" fill={SPOT} />
      {/* muzzle */}
      <Ellipse cx={50} cy={72} rx={24} ry={17} fill={tone(COLORS.pink, 0.35)} {...S} />
      <Ellipse cx={41} cy={70} rx={3} ry={4} fill={OUT} />
      <Ellipse cx={59} cy={70} rx={3} ry={4} fill={OUT} />
      <Smile cx={50} cy={80} w={6} />
      <Eyes x1={40} x2={60} y={44} r={3.8} />
      <Path d="M48 30 L50 26 L52 30" {...L3} stroke={C} />
    </Art>
  );
}
