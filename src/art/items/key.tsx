import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;

export default function Key({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M44 42 H88 C90 42 92 44 92 46 V52 C92 54 90 56 88 56 H82 V68 H72 V56 H66 V64 H56 V56 H44 Z" fill={C} {...S} />
      <Circle cx={28} cy={49} r={21} fill={C} {...S} />
      <Circle cx={26} cy={49} r={7} fill={COLORS.white} {...S} />
      <Path d="M16 38 C18 34 22 32 26 32" fill="none" stroke={tone(C, 0.5)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
