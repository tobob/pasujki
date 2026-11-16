import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;

export default function Elephant({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* big ears */}
      <Path d="M30 30 C14 18 4 30 6 46 C8 62 20 70 32 62 Z" fill={C} {...S} />
      <Path d="M70 30 C86 18 96 30 94 46 C92 62 80 70 68 62 Z" fill={C} {...S} />
      <Path d="M26 36 C16 32 12 40 13 48 C14 56 20 60 26 56 Z" fill={tone(COLORS.pink, 0.35)} />
      <Path d="M74 36 C84 32 88 40 87 48 C86 56 80 60 74 56 Z" fill={tone(COLORS.pink, 0.35)} />
      {/* head + trunk */}
      <Path
        d="M50 16 C34 16 26 28 26 42 C26 54 34 62 42 64 L42 80 C42 90 52 94 60 90 C64 88 64 82 60 82 C54 84 52 82 52 78 L58 64 C68 60 74 52 74 42 C74 28 66 16 50 16 Z"
        fill={C}
        {...S}
      />
      <Path d="M44 70 H50 M44 77 H50" {...L3} stroke={tone(C, -0.25)} />
      <Ellipse cx={40} cy={26} rx={6} ry={4} fill={tone(C, 0.35)} />
      <Cheeks x1={33} x2={67} y={52} />
      <Eyes x1={40} x2={60} y={42} r={3.8} />
    </Art>
  );
}
