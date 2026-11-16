import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, type ArtProps } from '../kit';

const C = COLORS.red;
const W = COLORS.white;

export default function Barn({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* body */}
      <Path d="M14 92 V46 L26 24 L50 10 L74 24 L86 46 V92 Z" fill={C} {...S} />
      {/* roof trim */}
      <Path d="M21 47 L31 29 L50 18 L69 29 L79 47" fill="none" stroke={W} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {/* hay window */}
      <Rect x={42} y={30} width={16} height={14} rx={2} fill={W} {...S} strokeWidth={3} />
      {/* door with X */}
      <Rect x={30} y={56} width={40} height={36} fill={C} {...S} />
      <Path d="M30 56 L70 92 M70 56 L30 92" stroke={W} strokeWidth={5} strokeLinecap="round" />
      <Rect x={30} y={56} width={40} height={36} fill="none" stroke={W} strokeWidth={4} />
      <Rect x={28} y={54} width={44} height={40} fill="none" {...S} />
    </Art>
  );
}
