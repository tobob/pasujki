import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, Cheeks, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

/** Puppy: the dog's baby — bigger head, eye patch, tongue out, tiny body. */
export default function Puppy({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M64 84 C76 84 82 76 80 68" fill="none" stroke={OUT} strokeWidth={11} strokeLinecap="round" />
      <Path d="M64 84 C76 84 82 76 80 68" fill="none" stroke={C} strokeWidth={4} strokeLinecap="round" />
      <Ellipse cx={50} cy={82} rx={17} ry={11} fill={C} {...S} />
      <Ellipse cx={42} cy={91} rx={6} ry={4} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      <Ellipse cx={58} cy={91} rx={6} ry={4} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      {/* big head */}
      <Ellipse cx={50} cy={44} rx={31} ry={28} fill={C} {...S} />
      <Path d="M27 32 C29 26 33 21 39 20" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* eye patch */}
      <Ellipse cx={61} cy={40} rx={9} ry={8} fill={tone(C, -0.3)} />
      {/* floppy ears */}
      <Path d="M24 26 C12 26 6 42 8 56 C10 64 19 64 23 56 C27 47 29 34 24 26 Z" fill={tone(C, -0.3)} {...S} />
      <Path d="M76 26 C88 26 94 42 92 56 C90 64 81 64 77 56 C73 47 71 34 76 26 Z" fill={tone(C, -0.3)} {...S} />
      {/* muzzle + tongue */}
      <Path d="M47 60 C47 68 53 68 53 60 Z" fill={COLORS.pink} {...S} strokeWidth={2.5} />
      <Ellipse cx={50} cy={56} rx={13} ry={9} fill={tone(C, 0.5)} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={52} rx={4.6} ry={3.4} fill={OUT} />
      <Smile cx={50} cy={58} w={4.5} d={2.2} />
      <Cheeks x1={30} x2={70} y={52} r={4} />
      <Eyes x1={39} x2={61} y={41} r={5} />
    </Art>
  );
}
