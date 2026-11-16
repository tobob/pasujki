import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Cheese({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* side */}
      <Path d="M10 46 L90 34 L90 74 L10 84 Z" fill={C} {...S} />
      {/* top */}
      <Path d="M10 46 L62 16 L90 34 Z" fill={tone(C, 0.4)} {...S} />
      <Circle cx={28} cy={64} r={6} fill={tone(C, -0.18)} />
      <Circle cx={52} cy={56} r={4} fill={tone(C, -0.18)} />
      <Circle cx={70} cy={66} r={7} fill={tone(C, -0.18)} />
      <Circle cx={46} cy={74} r={3} fill={tone(C, -0.18)} />
      <Circle cx={62} cy={28} r={3} fill={tone(C, -0.05)} />
    </Art>
  );
}
