import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Egg({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 8 C70 8 82 42 82 62 C82 80 68 92 50 92 C32 92 18 80 18 62 C18 42 30 8 50 8 Z" fill={C} {...S} />
      <Ellipse cx={36} cy={44} rx={6} ry={11} fill="#FFFFFF" transform="rotate(20 36 44)" />
      <Path d="M70 54 C72 64 70 74 62 82" fill="none" stroke={tone('#E8DCC4', -0.05)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
