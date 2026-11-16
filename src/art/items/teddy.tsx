import { Circle, Ellipse } from 'react-native-svg';

import { Art, COLORS, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;
const Lt = tone(C, 0.45);

export default function Teddy({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Ellipse cx={24} cy={66} rx={9} ry={12} fill={C} {...S} transform="rotate(30 24 66)" />
      <Ellipse cx={76} cy={66} rx={9} ry={12} fill={C} {...S} transform="rotate(-30 76 66)" />
      <Ellipse cx={34} cy={88} rx={11} ry={8} fill={C} {...S} />
      <Ellipse cx={66} cy={88} rx={11} ry={8} fill={C} {...S} />
      <Ellipse cx={50} cy={72} rx={22} ry={20} fill={C} {...S} />
      <Ellipse cx={50} cy={75} rx={12} ry={11} fill={Lt} />
      <Circle cx={26} cy={18} r={10} fill={C} {...S} />
      <Circle cx={74} cy={18} r={10} fill={C} {...S} />
      <Circle cx={26} cy={18} r={4.5} fill={Lt} />
      <Circle cx={74} cy={18} r={4.5} fill={Lt} />
      <Circle cx={50} cy={36} r={25} fill={C} {...S} />
      <Ellipse cx={50} cy={45} rx={11} ry={8} fill={Lt} />
      <Ellipse cx={50} cy={41} rx={3.5} ry={2.6} fill={OUT} />
      <Smile cx={50} cy={46} w={3.5} d={2.5} />
      <Eyes x1={41} x2={59} y={32} r={3.2} />
    </Art>
  );
}
