import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, L, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

export default function Butterfly({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* upper wings */}
      <Path d="M48 46 C40 22 26 10 14 14 C4 18 6 40 20 50 C30 56 42 54 48 52 Z" fill={C} {...S} />
      <Path d="M52 46 C60 22 74 10 86 14 C96 18 94 40 80 50 C70 56 58 54 52 52 Z" fill={C} {...S} />
      {/* lower wings */}
      <Path d="M48 54 C36 56 22 62 22 76 C22 88 38 88 48 70 Z" fill={tone(C, 0.25)} {...S} />
      <Path d="M52 54 C64 56 78 62 78 76 C78 88 62 88 52 70 Z" fill={tone(C, 0.25)} {...S} />
      {/* wing dots */}
      <Circle cx={24} cy={30} r={6} fill={tone(C, 0.55)} />
      <Circle cx={76} cy={30} r={6} fill={tone(C, 0.55)} />
      <Circle cx={34} cy={74} r={4} fill={COLORS.yellow} />
      <Circle cx={66} cy={74} r={4} fill={COLORS.yellow} />
      {/* body */}
      <Ellipse cx={50} cy={58} rx={6} ry={24} fill={COLORS.black} {...S} />
      {/* head */}
      <Path d="M46 28 C42 18 38 14 34 12 M54 28 C58 18 62 14 66 12" {...L} strokeWidth={3} />
      <Circle cx={50} cy={30} r={9} fill={COLORS.black} {...S} />
      <Eyes x1={46.5} x2={53.5} y={29} r={1.8} />
      <Smile cx={50} cy={33} w={2.5} d={2} />
    </Art>
  );
}
