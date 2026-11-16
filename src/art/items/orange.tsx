import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Orange({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Circle cx={50} cy={56} r={36} fill={C} {...S} />
      <Circle cx={37} cy={42} r={7} fill={tone(C, 0.4)} />
      <Circle cx={60} cy={64} r={1.4} fill={tone(C, -0.2)} />
      <Circle cx={66} cy={52} r={1.4} fill={tone(C, -0.2)} />
      <Circle cx={52} cy={74} r={1.4} fill={tone(C, -0.2)} />
      <Circle cx={36} cy={66} r={1.4} fill={tone(C, -0.2)} />
      <Path d="M50 20 V14" {...S} fill="none" />
      <Path d="M50 18 C56 8 68 8 74 12 C68 20 58 22 50 18 Z" fill={COLORS.green} {...S} />
    </Art>
  );
}
