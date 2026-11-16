import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;

/** Elephant: big round head, huge soft ears, short curled trunk. */
export default function Elephant({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* big ears */}
      <Path d="M30 30 C14 14 2 26 4 46 C6 64 20 72 32 62 Z" fill={C} {...S} />
      <Path d="M70 30 C86 14 98 26 96 46 C94 64 80 72 68 62 Z" fill={C} {...S} />
      <Path d="M25 34 C14 28 10 38 11 48 C12 58 19 62 26 57 Z" fill={tone(COLORS.pink, 0.4)} />
      <Path d="M75 34 C86 28 90 38 89 48 C88 58 81 62 74 57 Z" fill={tone(COLORS.pink, 0.4)} />
      {/* head + trunk */}
      <Path
        d="M50 14 C33 14 24 27 24 42 C24 55 32 62 41 65 L41 78 C41 88 51 93 59 89 C63 87 63 81 59 81 C54 83 51 81 51 77 L59 65 C68 62 76 55 76 42 C76 27 67 14 50 14 Z"
        fill={C}
        {...S}
      />
      <Path d="M32 54 C36 60 42 63 48 64" fill="none" stroke={tone(C, -0.12)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M44 72 H48 M44 78 H48" fill="none" stroke={tone(C, -0.25)} strokeWidth={3} strokeLinecap="round" />
      <Ellipse cx={40} cy={24} rx={7} ry={4} fill={tone(C, 0.4)} />
      <Cheeks x1={33} x2={67} y={52} r={4} />
      <Eyes x1={39} x2={61} y={44} r={4.4} />
    </Art>
  );
}
