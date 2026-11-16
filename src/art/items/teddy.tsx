import { Circle, Ellipse, Path } from 'react-native-svg';

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
      <Circle cx={50} cy={37} r={27} fill={C} {...S} />
      <Path d="M30 28 C33 21 38 17 44 15" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      <Ellipse cx={36} cy={47} rx={4} ry={2.8} fill="#F4A3B4" opacity={0.7} />
      <Ellipse cx={64} cy={47} rx={4} ry={2.8} fill="#F4A3B4" opacity={0.7} />
      <Ellipse cx={50} cy={47} rx={12} ry={8.5} fill={Lt} />
      <Ellipse cx={50} cy={43} rx={3.8} ry={2.8} fill={OUT} />
      <Smile cx={50} cy={48} w={3.5} d={2.5} />
      <Eyes x1={40} x2={60} y={35} r={4} />
    </Art>
  );
}
