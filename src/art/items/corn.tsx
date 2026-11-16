import { Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Corn({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* cob */}
      <Path d="M50 8 C64 8 70 24 70 46 C70 66 62 80 50 80 C38 80 30 66 30 46 C30 24 36 8 50 8 Z" fill={C} {...S} />
      <Path d="M40 16 V72 M50 10 V78 M60 16 V72 M32 30 H68 M31 44 H69 M32 58 H68" {...L3} stroke={tone(C, -0.22)} />
      {/* husk leaves */}
      <Path d="M50 94 C34 92 22 76 20 50 C30 58 38 70 46 78 Z" fill={COLORS.green} {...S} />
      <Path d="M50 94 C66 92 78 76 80 50 C70 58 62 70 54 78 Z" fill={COLORS.green} {...S} />
    </Art>
  );
}
