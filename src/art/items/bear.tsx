import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, Cheeks, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

/** Bear: round and cuddly, sitting with paws out. */
export default function Bear({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* body */}
      <Ellipse cx={50} cy={78} rx={25} ry={16} fill={C} {...S} />
      <Ellipse cx={50} cy={80} rx={13} ry={10} fill={tone(C, 0.5)} />
      <Ellipse cx={36} cy={90} rx={8} ry={5} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={64} cy={90} rx={8} ry={5} fill={C} {...S} strokeWidth={3} />
      {/* ears */}
      <Circle cx={25} cy={20} r={11} fill={C} {...S} />
      <Circle cx={75} cy={20} r={11} fill={C} {...S} />
      <Circle cx={25} cy={20} r={5.5} fill={tone(C, 0.45)} />
      <Circle cx={75} cy={20} r={5.5} fill={tone(C, 0.45)} />
      {/* head */}
      <Ellipse cx={50} cy={42} rx={30} ry={27} fill={C} {...S} />
      <Path d="M28 34 C29 28 33 23 38 21" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* muzzle */}
      <Ellipse cx={50} cy={53} rx={13} ry={10} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={49} rx={4.8} ry={3.4} fill={OUT} />
      <Smile cx={50} cy={55} w={4.5} d={2.4} />
      <Cheeks x1={30} x2={70} y={50} r={4.2} />
      <Eyes x1={38} x2={62} y={38} r={4.4} />
    </Art>
  );
}
