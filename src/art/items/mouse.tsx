import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;

export default function Mouse({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M70 84 C86 86 92 74 86 66 C82 60 88 54 92 56" {...L3} stroke={tone(COLORS.pink, -0.1)} strokeWidth={4} />
      {/* body */}
      <Ellipse cx={50} cy={78} rx={20} ry={14} fill={C} {...S} />
      <Ellipse cx={50} cy={81} rx={10} ry={8} fill={tone(C, 0.5)} />
      {/* big round ears */}
      <Circle cx={24} cy={30} r={17} fill={C} {...S} />
      <Circle cx={76} cy={30} r={17} fill={C} {...S} />
      <Circle cx={24} cy={30} r={10} fill={tone(COLORS.pink, 0.3)} />
      <Circle cx={76} cy={30} r={10} fill={tone(COLORS.pink, 0.3)} />
      {/* head */}
      <Path d="M28 46 C28 32 38 28 50 28 C62 28 72 32 72 46 C72 58 60 66 50 68 C40 66 28 58 28 46 Z" fill={C} {...S} />
      <Face cx={50} cy={45} gap={16} mouthDy={13} />
      <Circle cx={50} cy={54} r={3.4} fill={COLORS.pink} stroke={OUT} strokeWidth={2.5} />
      <Path d="M36 54 H24 M37 59 L26 62 M64 54 H76 M63 59 L74 62" {...L3} strokeWidth={2} />
    </Art>
  );
}
