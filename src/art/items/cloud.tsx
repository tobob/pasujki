import { Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Cloud({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M24 76 C12 76 6 68 6 60 C6 50 14 44 22 45 C22 32 32 24 44 26 C50 16 66 16 72 28 C84 28 94 38 92 52 C96 58 94 76 78 76 Z" fill={C} {...S} />
      <Path d="M20 70 C40 74 64 74 82 70" fill="none" stroke={tone(COLORS.blue, 0.75)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={50} cy={52} gap={18} mouthDy={8} />
    </Art>
  );
}
