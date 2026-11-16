import { Circle, Ellipse } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Bear({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* body */}
      <Ellipse cx={50} cy={80} rx={26} ry={15} fill={C} {...S} />
      <Ellipse cx={50} cy={84} rx={13} ry={9} fill={tone(C, 0.4)} />
      {/* ears */}
      <Circle cx={24} cy={22} r={12} fill={C} {...S} />
      <Circle cx={76} cy={22} r={12} fill={C} {...S} />
      <Circle cx={24} cy={22} r={6} fill={tone(C, 0.4)} />
      <Circle cx={76} cy={22} r={6} fill={tone(C, 0.4)} />
      {/* head */}
      <Ellipse cx={50} cy={44} rx={31} ry={28} fill={C} {...S} />
      <Ellipse cx={50} cy={56} rx={14} ry={11} fill={tone(C, 0.4)} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={51} rx={5} ry={3.6} fill={OUT} />
      <Face cx={50} cy={40} gap={22} mouthDy={17} />
    </Art>
  );
}
