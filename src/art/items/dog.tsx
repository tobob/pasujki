import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, Cheeks, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

/** Dog: chunky sitting pup-dog with floppy ears, red collar and a wagging tail. */
export default function Dog({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M68 78 C82 76 88 64 86 54" fill="none" stroke={OUT} strokeWidth={12} strokeLinecap="round" />
      <Path d="M68 78 C82 76 88 64 86 54" fill="none" stroke={C} strokeWidth={5} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={50} cy={78} rx={22} ry={15} fill={C} {...S} />
      <Ellipse cx={50} cy={81} rx={11} ry={9} fill={tone(C, 0.5)} />
      <Ellipse cx={41} cy={91} rx={7} ry={4.5} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      <Ellipse cx={59} cy={91} rx={7} ry={4.5} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      {/* collar */}
      <Path d="M34 64 Q50 73 66 64" fill="none" stroke={OUT} strokeWidth={10} strokeLinecap="round" />
      <Path d="M34 64 Q50 73 66 64" fill="none" stroke={COLORS.red} strokeWidth={4} strokeLinecap="round" />
      {/* head */}
      <Ellipse cx={50} cy={40} rx={28} ry={26} fill={C} {...S} />
      <Path d="M30 28 C32 22 36 18 41 17" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* floppy ears */}
      <Path d="M26 22 C14 22 8 38 10 52 C12 61 21 61 25 53 C29 44 31 31 26 22 Z" fill={tone(C, -0.3)} {...S} />
      <Path d="M74 22 C86 22 92 38 90 52 C88 61 79 61 75 53 C71 44 69 31 74 22 Z" fill={tone(C, -0.3)} {...S} />
      {/* muzzle */}
      <Ellipse cx={50} cy={52} rx={14} ry={10} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={47.5} rx={5} ry={3.6} fill={OUT} />
      <Smile cx={50} cy={54} w={5} d={2.6} />
      <Cheeks x1={31} x2={69} y={48} r={4} />
      <Eyes x1={39} x2={61} y={37} r={4.4} />
    </Art>
  );
}
