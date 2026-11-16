import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

/** Hay bale: a rounded yellow block with two ties and soft straw lines. */
export default function Hay({ size }: ArtProps) {
  const dark = tone(C, -0.22);
  return (
    <Art size={size}>
      <Rect x={10} y={26} width={80} height={60} rx={14} fill={C} {...S} />
      <Path d="M18 36 C30 34 40 38 52 36 M50 48 C62 46 72 50 82 48 M18 62 C28 60 36 64 46 62 M56 74 C66 72 74 76 82 74" fill="none" stroke={dark} strokeWidth={3} strokeLinecap="round" />
      <Path d="M18 30 C24 28 30 30 34 28" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Rect x={28} y={24} width={7} height={64} rx={3} fill={COLORS.brown} {...S} strokeWidth={3} />
      <Rect x={65} y={24} width={7} height={64} rx={3} fill={COLORS.brown} {...S} strokeWidth={3} />
      {/* stray straws on top */}
      <Path d="M44 26 L40 16 M52 26 L54 14 M58 26 L64 18" fill="none" stroke={dark} strokeWidth={3} strokeLinecap="round" />
    </Art>
  );
}
