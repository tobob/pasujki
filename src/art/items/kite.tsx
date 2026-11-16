import { Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

/** Kite: orange diamond with cross spars and a tail of little bows. */
export default function Kite({ size }: ArtProps) {
  const bow = (x: number, y: number, k: number) => (
    <Path key={k} d={`M${x} ${y} L${x - 9} ${y - 6} L${x - 9} ${y + 6} Z M${x} ${y} L${x + 9} ${y - 6} L${x + 9} ${y + 6} Z`} fill={k % 2 ? COLORS.yellow : COLORS.blue} {...S} strokeWidth={3} />
  );
  return (
    <Art size={size}>
      <Path d="M58 64 C54 72 62 76 56 82 C50 88 44 88 40 92" {...L3} />
      {bow(58, 73, 0)}
      {bow(48, 87, 1)}
      <Path d="M58 6 L86 34 L58 64 L30 34 Z" fill={C} {...S} />
      <Path d="M58 6 L58 64 M30 34 L86 34" {...L3} stroke={tone(C, -0.25)} />
      <Path d="M56 12 L36 35" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M58 6 L86 34 L58 64 L30 34 Z" fill="none" {...S} />
    </Art>
  );
}
