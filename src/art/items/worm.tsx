import { Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, tone, type ArtProps } from '../kit';

const C = COLORS.pink;
const BODY = 'M14 78 C22 58 36 58 42 70 C48 82 60 82 64 66 C66 56 66 46 70 40';

export default function Worm({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d={BODY} fill="none" stroke={OUT} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={BODY} fill="none" stroke={C} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28 64 L30 72 M50 74 L46 82" stroke={tone(C, -0.2)} strokeWidth={3} strokeLinecap="round" />
      {/* head */}
      <Path d="M70 16 C82 16 90 24 90 34 C90 44 82 50 70 50 C58 50 52 44 52 34 C52 24 58 16 70 16 Z" fill={C} stroke={OUT} strokeWidth={4} />
      <Face cx={71} cy={32} gap={12} eyeR={3} mouthDy={7} />
    </Art>
  );
}
