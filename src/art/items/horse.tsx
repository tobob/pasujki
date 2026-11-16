import { Ellipse, Path, Rect } from 'react-native-svg';

import { Art, COLORS, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;
const MANE = tone(C, -0.35);

export default function Horse({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M24 50 C10 52 8 68 12 78 C18 72 22 62 26 56 Z" fill={MANE} {...S} />
      {/* legs */}
      <Rect x={26} y={60} width={9} height={30} rx={4} fill={C} {...S} />
      <Rect x={38} y={60} width={9} height={30} rx={4} fill={tone(C, -0.12)} {...S} />
      <Rect x={56} y={60} width={9} height={30} rx={4} fill={C} {...S} />
      <Rect x={66} y={60} width={9} height={30} rx={4} fill={tone(C, -0.12)} {...S} />
      {/* body */}
      <Ellipse cx={48} cy={56} rx={28} ry={15} fill={C} {...S} />
      {/* neck + head */}
      <Path d="M58 50 C60 38 62 26 66 16 C70 10 80 10 84 16 C88 22 94 30 94 36 C94 42 88 44 82 40 L76 36 C74 44 74 52 72 58 Z" fill={C} {...S} />
      {/* ear */}
      <Path d="M68 16 L68 6 L76 13 Z" fill={C} {...S} />
      {/* mane */}
      <Path d="M66 14 C58 20 56 30 54 46 C60 44 62 32 66 24 Z" fill={MANE} {...S} />
      {/* muzzle */}
      <Ellipse cx={89} cy={36} rx={6} ry={6} fill={tone(C, 0.4)} />
      <Ellipse cx={90} cy={33} rx={1.5} ry={2} fill={OUT} />
      <Eyes x1={77} x2={77} y={24} r={3.4} />
      <Smile cx={86} cy={41} w={3} d={2} />
      {/* hooves */}
      <Path d="M27 88 H34 M39 88 H46 M57 88 H64 M67 88 H74" stroke={OUT} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
