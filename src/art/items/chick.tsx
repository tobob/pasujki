import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Chick({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs */}
      <Path d="M42 82 V92 M37 92 H47 M58 82 V92 M53 92 H63" stroke={COLORS.orange} strokeWidth={4} strokeLinecap="round" />
      {/* tuft */}
      <Path d="M48 18 C44 10 48 6 52 10 C54 4 60 8 56 16" fill={C} {...S} />
      {/* round body */}
      <Ellipse cx={50} cy={52} rx={34} ry={33} fill={C} {...S} />
      <Ellipse cx={38} cy={34} rx={8} ry={5} fill={tone(C, 0.4)} transform="rotate(-30 38 34)" />
      {/* little wings */}
      <Path d="M18 52 C10 56 10 66 20 66" fill={tone(C, -0.12)} {...S} />
      <Path d="M82 52 C90 56 90 66 80 66" fill={tone(C, -0.12)} {...S} />
      <Cheeks x1={32} x2={68} y={54} r={4.5} />
      <Eyes x1={39} x2={61} y={44} r={4} />
      {/* beak */}
      <Path d="M43 52 L57 52 L50 61 Z" fill={COLORS.orange} {...S} strokeWidth={3} />
    </Art>
  );
}
