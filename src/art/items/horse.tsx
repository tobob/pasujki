import { Ellipse, Path, Rect } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;
const MANE = tone(C, -0.22);

/** Horse: a chunky little pony — big head with a long soft snout, short legs, mane and tail. */
export default function Horse({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M20 54 C8 54 4 66 8 82 C14 78 20 72 24 64 Z" fill={MANE} {...S} />
      {/* legs */}
      {[20, 31, 48, 59].map((x) => (
        <Rect key={x} x={x} y={66} width={9} height={24} rx={5} fill={C} {...S} />
      ))}
      {[20, 31, 48, 59].map((x) => (
        <Rect key={`h${x}`} x={x + 1.5} y={83} width={6} height={5} rx={2} fill={MANE} />
      ))}
      {/* body */}
      <Ellipse cx={41} cy={62} rx={25} ry={15} fill={C} {...S} />
      <Path d="M24 70 C32 75 48 77 58 72" fill="none" stroke={tone(C, -0.12)} strokeWidth={5} strokeLinecap="round" />
      {/* neck */}
      <Path d="M48 58 C48 46 52 36 58 30 L72 38 C68 46 66 54 64 62 Z" fill={C} {...S} />
      <Ellipse cx={54} cy={58} rx={10} ry={8} fill={C} />
      {/* mane (behind head) */}
      <Path d="M58 8 C48 10 44 22 46 32 C44 40 46 48 50 56 L60 50 C58 40 60 26 66 16 Z" fill={MANE} {...S} />
      {/* ears */}
      <Path d="M62 14 L60 2 L70 10 Z" fill={C} {...S} />
      <Path d="M74 12 L78 2 L82 13 Z" fill={C} {...S} />
      {/* big head with long snout */}
      <Path d="M54 28 C54 15 63 8 73 8 C84 8 90 17 92 30 C94 44 90 54 80 54 C70 54 61 48 57 40 C55 36 54 32 54 28 Z" fill={C} {...S} />
      <Ellipse cx={80} cy={44} rx={11} ry={8.5} fill={tone(C, 0.45)} />
      <Ellipse cx={86} cy={42} rx={1.8} ry={2.6} fill={OUT} />
      <Ellipse cx={77} cy={43} rx={1.8} ry={2.6} fill={OUT} />
      <Path d="M60 22 C62 17 66 14 70 13" fill="none" stroke={tone(C, 0.35)} strokeWidth={3.5} strokeLinecap="round" />
      <Cheeks x1={66} x2={66} y={38} r={3.8} />
      <Eyes x1={68} x2={80} y={27} r={4.4} />
      <Smile cx={81} cy={49} w={4} d={1.8} />
    </Art>
  );
}
