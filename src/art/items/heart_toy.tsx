import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.pink;

export default function HeartToy({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 90 C30 76 8 60 8 38 C8 22 20 12 32 12 C40 12 46 16 50 24 C54 16 60 12 68 12 C80 12 92 22 92 38 C92 60 70 76 50 90 Z" fill={C} {...S} />
      <Path d="M50 80 C34 68 18 56 18 38 C18 28 26 22 33 22 C40 22 46 28 50 34 C54 28 60 22 67 22 C74 22 82 28 82 38 C82 56 66 68 50 80 Z" fill="none" stroke={tone(C, -0.25)} strokeWidth={2.5} strokeDasharray="4 5" strokeLinecap="round" />
      <Path d="M24 34 C26 28 30 26 34 26" fill="none" stroke={tone(C, 0.5)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
