import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Frog({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* back legs */}
      <Path d="M22 70 C8 72 8 88 22 88 H36" fill={C} {...S} />
      <Path d="M78 70 C92 72 92 88 78 88 H64" fill={C} {...S} />
      {/* body */}
      <Ellipse cx={50} cy={72} rx={26} ry={18} fill={C} {...S} />
      <Ellipse cx={50} cy={76} rx={15} ry={10} fill={tone(C, 0.45)} />
      {/* front feet */}
      <Ellipse cx={38} cy={88} rx={7} ry={4} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={62} cy={88} rx={7} ry={4} fill={C} {...S} strokeWidth={3} />
      {/* head */}
      <Ellipse cx={50} cy={46} rx={36} ry={22} fill={C} {...S} />
      {/* eye bumps */}
      <Circle cx={32} cy={26} r={12} fill={C} {...S} />
      <Circle cx={68} cy={26} r={12} fill={C} {...S} />
      <Ellipse cx={50} cy={44} rx={34} ry={20} fill={C} />
      <Circle cx={32} cy={26} r={7} fill="#FFFFFF" />
      <Circle cx={68} cy={26} r={7} fill="#FFFFFF" />
      <Circle cx={33} cy={27} r={4} fill={OUT} />
      <Circle cx={67} cy={27} r={4} fill={OUT} />
      <Circle cx={34.5} cy={25.5} r={1.3} fill="#FFFFFF" />
      <Circle cx={68.5} cy={25.5} r={1.3} fill="#FFFFFF" />
      <Cheeks x1={26} x2={74} y={50} r={4.5} />
      {/* wide smile */}
      <Path d="M32 48 Q50 62 68 48" {...L3} />
      <Circle cx={46} cy={40} r={1.3} fill={OUT} />
      <Circle cx={54} cy={40} r={1.3} fill={OUT} />
    </Art>
  );
}
