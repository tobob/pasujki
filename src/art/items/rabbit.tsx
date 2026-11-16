import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;
const PINK = tone(COLORS.pink, 0.3);

/** Rabbit: long upright ears, round head, fluffy tail peeking out. */
export default function Rabbit({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* fluffy tail */}
      <Circle cx={72} cy={84} r={7} fill={tone(C, 0.6)} {...S} strokeWidth={3} />
      {/* body */}
      <Ellipse cx={50} cy={80} rx={20} ry={13} fill={C} {...S} />
      <Ellipse cx={50} cy={82} rx={10} ry={8} fill={tone(C, 0.55)} />
      <Ellipse cx={41} cy={91} rx={7} ry={4} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={59} cy={91} rx={7} ry={4} fill={C} {...S} strokeWidth={3} />
      {/* ears */}
      <Ellipse cx={38} cy={24} rx={8} ry={19} fill={C} {...S} transform="rotate(-8 38 24)" />
      <Ellipse cx={62} cy={24} rx={8} ry={19} fill={C} {...S} transform="rotate(8 62 24)" />
      <Ellipse cx={38} cy={25} rx={3.6} ry={13} fill={PINK} transform="rotate(-8 38 25)" />
      <Ellipse cx={62} cy={25} rx={3.6} ry={13} fill={PINK} transform="rotate(8 62 25)" />
      {/* head */}
      <Ellipse cx={50} cy={52} rx={24} ry={20} fill={C} {...S} />
      <Path d="M32 46 C33 41 36 38 40 36" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={50} cy={50} gap={20} eyeR={4.4} mouthDy={9} />
      <Path d="M47.5 55 H52.5 L50 57.5 Z" fill={COLORS.pink} stroke={OUT} strokeWidth={2} strokeLinejoin="round" />
    </Art>
  );
}
