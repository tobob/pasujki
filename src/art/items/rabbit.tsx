import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;
const IN = tone(COLORS.pink, 0.3);

export default function Rabbit({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* long ears */}
      <Ellipse cx={37} cy={24} rx={9} ry={20} fill={C} {...S} transform="rotate(-10 37 24)" />
      <Ellipse cx={63} cy={24} rx={9} ry={20} fill={C} {...S} transform="rotate(10 63 24)" />
      <Ellipse cx={37} cy={25} rx={4.5} ry={14} fill={IN} transform="rotate(-10 37 25)" />
      <Ellipse cx={63} cy={25} rx={4.5} ry={14} fill={IN} transform="rotate(10 63 25)" />
      {/* body */}
      <Ellipse cx={50} cy={80} rx={22} ry={14} fill={C} {...S} />
      <Ellipse cx={50} cy={83} rx={11} ry={8} fill={tone(C, 0.55)} />
      <Ellipse cx={38} cy={92} rx={7} ry={3.5} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={62} cy={92} rx={7} ry={3.5} fill={C} {...S} strokeWidth={3} />
      {/* head */}
      <Ellipse cx={50} cy={54} rx={24} ry={20} fill={C} {...S} />
      <Face cx={50} cy={51} gap={18} mouthDy={10} />
      <Ellipse cx={50} cy={57} rx={3} ry={2.2} fill={COLORS.pink} stroke={OUT} strokeWidth={2} />
      {/* teeth */}
      <Path d="M48 62 V66 H52 V62" fill="#FFFFFF" stroke={OUT} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx={0} cy={0} r={0} fill="none" />
    </Art>
  );
}
