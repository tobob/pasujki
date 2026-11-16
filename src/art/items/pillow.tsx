import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Pillow({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M10 26 C30 32 70 32 90 26 C86 42 86 58 90 74 C70 68 30 68 10 74 C14 58 14 42 10 26 Z" fill={C} {...S} />
      <Path d="M30 40 C40 44 60 44 70 40" fill="none" stroke={tone(COLORS.blue, 0.75)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M30 60 C40 56 60 56 70 60" fill="none" stroke={tone(COLORS.blue, 0.75)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
