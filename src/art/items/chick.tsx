import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

/** Chick: a round fluffy ball with tiny wings, beak and feet. */
export default function Chick({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet */}
      <Path d="M40 84 V91 M34 91 H46 M60 84 V91 M54 91 H66" {...L3} stroke={COLORS.orange} strokeWidth={4} />
      {/* wings */}
      <Ellipse cx={18} cy={58} rx={8} ry={12} fill={C} {...S} transform="rotate(25 18 58)" />
      <Ellipse cx={82} cy={58} rx={8} ry={12} fill={C} {...S} transform="rotate(-25 82 58)" />
      {/* round body */}
      <Circle cx={50} cy={52} r={34} fill={C} {...S} />
      <Path d="M24 66 C30 80 42 84 50 84 C58 84 70 80 76 66" fill="none" stroke={tone(C, -0.1)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M28 36 C30 30 35 25 41 23" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      {/* tuft */}
      <Path d="M48 18 C46 11 50 8 52 9 M52 18 C54 12 58 12 59 14" {...L3} />
      <Cheeks x1={32} x2={68} y={56} r={4.5} />
      <Eyes x1={39} x2={61} y={46} r={4.8} />
      {/* beak */}
      <Path d="M44 54 L56 54 L50 63 Z" fill={COLORS.orange} {...S3} />
    </Art>
  );
}
