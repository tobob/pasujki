import { Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const D = tone(C, 0.5);

export default function Scarf({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* back tail */}
      <Path d="M52 48 L72 44 L80 82 L62 86 Z" fill={C} {...S} />
      <Path d="M58 62 L75 58 M60 72 L77 69" fill="none" stroke={D} strokeWidth={5} strokeLinecap="round" />
      <Path d="M65 87 L66 93 M71 86 L72 92 M77 84 L78 90" {...L3} />
      {/* band around the neck */}
      <Path d="M10 16 C18 40 82 40 90 16 L90 30 C82 58 18 58 10 30 Z" fill={C} {...S} />
      <Path d="M30 38 L30 46 M50 41 L50 50 M70 38 L70 46" fill="none" stroke={D} strokeWidth={5} strokeLinecap="round" />
      {/* front tail */}
      <Path d="M36 44 L54 46 L46 88 L28 84 Z" fill={C} {...S} />
      <Path d="M34 62 L51 65 M32 74 L49 77" fill="none" stroke={D} strokeWidth={5} strokeLinecap="round" />
      <Path d="M30 85 L29 91 M36 87 L35 93 M42 88 L41 94" {...L3} />
    </Art>
  );
}
