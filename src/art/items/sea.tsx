import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

/** The sea: one big friendly curling wave over rolling water. */
export default function Sea({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* small wave behind, left */}
      <Path d="M8 66 C8 52 16 44 26 44 C34 44 40 50 40 58 C34 54 28 56 28 62 L28 72 L8 72 Z" fill={tone(C, 0.45)} {...S} />
      {/* big curling wave + water body */}
      <Path
        d="M8 88 L8 74 C8 66 14 62 22 64 C26 44 38 24 58 20 C76 17 90 28 90 42 C82 36 70 38 68 48 C66 58 76 64 84 60 C88 58 92 62 92 68 L92 82 C92 86 89 89 85 89 L14 89 C10 89 8 87 8 88 Z"
        fill={C}
        {...S}
      />
      {/* foam inside the curl */}
      <Path d="M44 32 C52 26 64 24 74 28" fill="none" stroke={tone(C, 0.6)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M20 78 C26 74 32 74 38 78 M52 80 C58 76 64 76 70 80" fill="none" stroke={tone(C, 0.45)} strokeWidth={3.5} strokeLinecap="round" />
    </Art>
  );
}
