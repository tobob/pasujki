import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, Cheeks, COLORS, Eyes, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.black;
const BEAK = COLORS.orange;

/**
 * Friendly crow: round body with a big head on top, white eye discs so the eyes read on black.
 * The beak grows out of the head (drawn first, the head outline covers its base) and replaces the
 * mouth: no smile on beaked animals (docs/ART_STYLE.md).
 */
export default function Crow({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M26 66 L10 74 L14 60 Z" fill={C} {...S} />
      {/* feet */}
      <Path d="M44 84 V91 M39 91 H49 M56 84 V91 M51 91 H61" {...L3} stroke={BEAK} strokeWidth={4} />
      {/* body */}
      <Ellipse cx={48} cy={63} rx={27} ry={23} fill={C} {...S} />
      {/* wing */}
      <Path d="M30 60 C33 73 45 79 57 75 C50 68 40 61 30 60 Z" fill={tone(C, 0.22)} {...S} strokeWidth={3} />
      {/* beak: base hidden under the head */}
      <Path d="M68 33 C76 32 85 34 91 38 C85 42 76 45 68 44 Z" fill={BEAK} {...S} strokeWidth={3.5} />
      <Path d="M72 38.5 H86" stroke={tone(BEAK, -0.25)} strokeWidth={2} strokeLinecap="round" />
      {/* head */}
      <Circle cx={56} cy={36} r={21} fill={C} {...S} />
      <Path d="M44 22 C47 18 51 16 55 16" fill="none" stroke={tone(C, 0.3)} strokeWidth={4} strokeLinecap="round" />
      {/* eyes on white discs */}
      <Ellipse cx={50} cy={34} rx={6.5} ry={7} fill={COLORS.white} />
      <Ellipse cx={65} cy={34} rx={6.5} ry={7} fill={COLORS.white} />
      <Eyes x1={51} x2={66} y={35} r={3.6} />
      <Cheeks x1={44} x2={44} y={45} r={3.4} />
    </Art>
  );
}
