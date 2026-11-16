import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

/** A soft, puffy pillow. */
export default function Pillow({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path
        d="M14 24 C12 20 16 18 20 20 C38 26 62 26 80 20 C84 18 88 20 86 24 C82 40 82 60 86 76 C88 80 84 82 80 80 C62 74 38 74 20 80 C16 82 12 80 14 76 C18 60 18 40 14 24 Z"
        fill={C}
        {...S}
      />
      {/* one soft shade + one highlight for puffiness */}
      <Path d="M24 66 C40 62 60 62 76 66" fill="none" stroke={tone(COLORS.grey, 0.6)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M26 34 C34 36 42 36 50 35" fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
