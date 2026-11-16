import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

export default function Crayon({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M24 92 L8 76 L62 22 L78 38 Z" fill={C} {...S} />
      <Path d="M62 22 L90 10 L78 38 Z" fill={tone(C, 0.5)} {...S} />
      <Path d="M84 13 L90 10 L87 16 Z" fill={C} />
      <Path d="M20 70 L30 80 M50 40 L60 50" stroke={tone(C, -0.25)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M26 64 L46 44" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
