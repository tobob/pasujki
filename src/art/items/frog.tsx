import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

/** Frog: squat and round, big bulgy eyes, wide happy smile. */
export default function Frog({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* back legs */}
      <Path d="M24 68 C8 70 8 90 24 90 H38" fill={C} {...S} />
      <Path d="M76 68 C92 70 92 90 76 90 H62" fill={C} {...S} />
      {/* body */}
      <Ellipse cx={50} cy={72} rx={26} ry={19} fill={C} {...S} />
      <Ellipse cx={50} cy={76} rx={15} ry={11} fill={tone(C, 0.5)} />
      <Ellipse cx={38} cy={90} rx={8} ry={4.5} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={62} cy={90} rx={8} ry={4.5} fill={C} {...S} strokeWidth={3} />
      {/* head + eye bumps */}
      <Ellipse cx={50} cy={48} rx={37} ry={22} fill={C} {...S} />
      <Circle cx={31} cy={28} r={13} fill={C} {...S} />
      <Circle cx={69} cy={28} r={13} fill={C} {...S} />
      <Ellipse cx={50} cy={46} rx={35} ry={20} fill={C} />
      <Path d="M20 40 C22 34 26 30 30 29" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Circle cx={31} cy={28} r={8} fill="#FFFFFF" />
      <Circle cx={69} cy={28} r={8} fill="#FFFFFF" />
      <Circle cx={32} cy={29} r={4.6} fill={OUT} />
      <Circle cx={68} cy={29} r={4.6} fill={OUT} />
      <Circle cx={33.6} cy={27.4} r={1.5} fill="#FFFFFF" />
      <Circle cx={69.6} cy={27.4} r={1.5} fill="#FFFFFF" />
      <Cheeks x1={24} x2={76} y={52} r={5} />
      <Path d="M34 50 Q50 62 66 50" {...L3} />
      <Circle cx={46} cy={42} r={1.3} fill={OUT} />
      <Circle cx={54} cy={42} r={1.3} fill={OUT} />
    </Art>
  );
}
