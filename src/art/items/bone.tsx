import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Bone({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path
        d="M30 38 C26 28 14 26 10 34 C6 42 12 48 18 50 C12 52 6 58 10 66 C14 74 26 72 30 62 L70 62 C74 72 86 74 90 66 C94 58 88 52 82 50 C88 48 94 42 90 34 C86 26 74 28 70 38 Z"
        fill={C}
        {...S}
      />
      <Path d="M32 56 L68 56" stroke={tone('#A3A7AE', 0.4)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
