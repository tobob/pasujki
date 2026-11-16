import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Ball({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Circle cx={50} cy={50} r={40} fill={C} {...S} />
      <Path d="M12 44 C30 54 70 54 88 44 L87 58 C70 66 30 66 13 58 Z" fill={tone(C, 0.45)} />
      <Circle cx={50} cy={50} r={40} fill="none" {...S} />
      <Circle cx={34} cy={28} r={6} fill={tone(C, 0.6)} />
    </Art>
  );
}
