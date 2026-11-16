import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, L, OUT, S, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Clock({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M28 80 L20 92 M72 80 L80 92" {...L} strokeWidth={6} />
      <Circle cx={24} cy={20} r={12} fill={C} {...S} />
      <Circle cx={76} cy={20} r={12} fill={C} {...S} />
      <Circle cx={50} cy={54} r={36} fill={C} {...S} />
      <Circle cx={50} cy={54} r={25} fill={COLORS.white} {...S} />
      <Path d="M50 54 V38 M50 54 L61 60" {...L} strokeWidth={4.5} />
      <Circle cx={50} cy={54} r={3} fill={OUT} />
      <Path d="M50 18 V12" {...L} strokeWidth={5} />
    </Art>
  );
}
