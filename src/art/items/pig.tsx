import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, OUT, S, Smile, Cheeks, tone, type ArtProps } from '../kit';

const C = COLORS.pink;

/** Pig: round chubby pig standing on four stubby legs, curly tail, big snout. */
export default function Pig({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* curly tail */}
      <Path d="M84 58 C92 56 94 48 88 46 C84 45 84 51 88 51" fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
      {/* legs */}
      <Ellipse cx={30} cy={84} rx={7} ry={8} fill={tone(C, -0.12)} {...S} />
      <Ellipse cx={70} cy={84} rx={7} ry={8} fill={tone(C, -0.12)} {...S} />
      {/* ears */}
      <Path d="M24 30 L18 8 L42 20 Z" fill={C} {...S} />
      <Path d="M76 30 L82 8 L58 20 Z" fill={C} {...S} />
      <Path d="M23 15 L26 24 L32 21 Z" fill={tone(C, -0.15)} />
      <Path d="M77 15 L74 24 L68 21 Z" fill={tone(C, -0.15)} />
      {/* round head-body */}
      <Ellipse cx={50} cy={52} rx={36} ry={32} fill={C} {...S} />
      <Path d="M22 62 C28 76 40 82 50 82 C60 82 72 76 78 62" fill="none" stroke={tone(C, -0.08)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M24 44 C25 38 29 32 34 29" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Cheeks x1={26} x2={74} y={58} r={5} />
      <Eyes x1={37} x2={63} y={42} r={4.4} />
      {/* snout */}
      <Ellipse cx={50} cy={60} rx={15} ry={10.5} fill={tone(C, -0.15)} {...S} />
      <Ellipse cx={44.5} cy={60} rx={2.8} ry={4} fill={OUT} />
      <Ellipse cx={55.5} cy={60} rx={2.8} ry={4} fill={OUT} />
      <Smile cx={50} cy={74} w={5} d={2.4} />
    </Art>
  );
}
