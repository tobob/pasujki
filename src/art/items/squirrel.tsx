import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Squirrel({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* big fluffy tail */}
      <Path d="M60 88 C84 88 94 70 90 50 C88 36 92 24 82 12 C72 4 58 10 62 22 C66 32 76 34 74 48 C72 62 62 66 58 76 Z" fill={C} {...S} />
      <Path d="M74 18 C80 22 82 30 82 38" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={42} cy={72} rx={20} ry={20} fill={C} {...S} />
      <Ellipse cx={40} cy={76} rx={11} ry={13} fill={tone(C, 0.55)} />
      {/* acorn in paws */}
      <Ellipse cx={40} cy={70} rx={6} ry={7} fill={tone(COLORS.brown, 0.15)} {...S} strokeWidth={3} />
      <Path d="M33 66 C33 60 47 60 47 66 Z" fill={tone(COLORS.brown, -0.2)} {...S} strokeWidth={3} />
      {/* ears */}
      <Path d="M24 26 L22 10 L34 20 Z" fill={C} {...S} />
      <Path d="M48 22 L54 8 L58 24 Z" fill={C} {...S} />
      {/* head */}
      <Circle cx={40} cy={36} r={18} fill={C} {...S} />
      <Ellipse cx={36} cy={44} rx={9} ry={6} fill={tone(C, 0.55)} />
      <Cheeks x1={28} x2={50} y={42} r={3} />
      <Eyes x1={33} x2={46} y={34} r={3.4} />
      <Smile cx={39} cy={43} w={3} />
    </Art>
  );
}
