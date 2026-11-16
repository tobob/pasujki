import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.green;
const SKIN = tone(COLORS.green, 0.45);

export default function Turtle({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs + tail */}
      <Ellipse cx={30} cy={76} rx={8} ry={9} fill={SKIN} {...S} />
      <Ellipse cx={62} cy={76} rx={8} ry={9} fill={SKIN} {...S} />
      <Path d="M80 68 L92 72 L80 74 Z" fill={SKIN} {...S} />
      {/* head */}
      <Circle cx={18} cy={54} r={13} fill={SKIN} {...S} />
      <Cheeks x1={11} x2={24} y={60} r={2.6} />
      <Eyes x1={13} x2={23} y={52} r={3} />
      <Smile cx={18} cy={59} w={3.5} />
      {/* shell */}
      <Path d="M24 70 C24 44 36 28 54 28 C72 28 84 44 84 70 Z" fill={C} {...S} />
      <Path d="M28 70 H80" stroke={tone(C, -0.2)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M46 42 L62 42 L68 54 L60 66 L48 66 L40 54 Z" fill={tone(C, -0.15)} />
      <Path d="M38 40 L30 52 M70 40 L78 52 M40 54 L28 60 M68 54 L80 60" stroke={tone(C, -0.15)} strokeWidth={3} strokeLinecap="round" />
      <Path d="M36 40 C40 34 46 32 50 32" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
