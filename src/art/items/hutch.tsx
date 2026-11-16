import { Ellipse, Path, Rect } from 'react-native-svg';

import { Art, COLORS, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Hutch({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs */}
      <Rect x={18} y={78} width={8} height={14} rx={2} fill={tone(C, -0.2)} {...S} strokeWidth={3} />
      <Rect x={74} y={78} width={8} height={14} rx={2} fill={tone(C, -0.2)} {...S} strokeWidth={3} />
      {/* box */}
      <Rect x={10} y={32} width={80} height={50} rx={4} fill={C} {...S} />
      {/* roof */}
      <Path d="M7 36 L50 12 L93 36 Z" fill={tone(C, -0.2)} {...S} />
      {/* mesh window */}
      <Rect x={18} y={42} width={36} height={32} rx={3} fill={tone(C, 0.6)} {...S} strokeWidth={3} />
      <Path d="M27 42 V74 M36 42 V74 M45 42 V74 M18 52 H54 M18 63 H54" stroke={tone(OUT, 0.35)} strokeWidth={1.8} />
      {/* solid door */}
      <Rect x={60} y={42} width={22} height={32} rx={3} fill={tone(C, 0.15)} {...S} strokeWidth={3} />
      <Ellipse cx={77} cy={58} rx={2} ry={2} fill={OUT} />
      <Path d="M62 50 H80" {...L3} stroke={tone(C, -0.2)} />
    </Art>
  );
}
