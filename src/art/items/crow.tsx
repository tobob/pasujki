import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.black;
const BEAK = COLORS.orange;

/** Friendly crow: round body, big soft eyes, orange beak. */
export default function Crow({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M24 66 L8 76 L12 62 Z" fill={C} {...S} />
      {/* feet */}
      <Path d="M44 84 V92 M56 84 V92 M40 92 H48 M52 92 H60" {...L3} stroke={BEAK} strokeWidth={4} />
      {/* body */}
      <Ellipse cx={48} cy={60} rx={28} ry={26} fill={C} {...S} />
      {/* head */}
      <Ellipse cx={54} cy={34} rx={24} ry={22} fill={C} {...S} />
      <Path d="M46 14 C48 8 54 8 54 13" {...L3} />
      {/* wing */}
      <Path d="M30 58 C34 72 46 78 58 74 C50 68 40 60 30 58 Z" fill={tone(C, 0.2)} {...S} strokeWidth={3} />
      {/* eyes: white discs so they read on black */}
      <Ellipse cx={46} cy={32} rx={7} ry={7.5} fill={COLORS.white} />
      <Ellipse cx={64} cy={32} rx={7} ry={7.5} fill={COLORS.white} />
      <Eyes x1={47} x2={65} y={33} r={3.8} />
      {/* beak */}
      <Path d="M70 38 L92 44 L70 52 C64 50 64 40 70 38 Z" fill={BEAK} {...S} />
      <Ellipse cx={40} cy={44} rx={4} ry={2.6} fill="#F4A3B4" opacity={0.7} />
    </Art>
  );
}
