import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Raindrop({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 6 C60 24 80 44 80 64 C80 82 66 94 50 94 C34 94 20 82 20 64 C20 44 40 24 50 6 Z" fill={C} {...S} />
      <Path d="M34 62 C34 70 38 76 44 79" fill="none" stroke={tone(C, 0.5)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
