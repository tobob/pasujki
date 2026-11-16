import { Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, tone, type ArtProps } from '../kit';

const C = COLORS.pink;
const BODY = 'M14 80 C22 62 36 62 42 72 C48 82 58 82 62 68 C64 60 64 52 66 46';

/** Worm: chunky wiggly body, big round head. */
export default function Worm({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d={BODY} fill="none" stroke={OUT} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={BODY} fill="none" stroke={C} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28 66 L30 74 M48 76 L45 84" stroke={tone(C, -0.15)} strokeWidth={3} strokeLinecap="round" />
      {/* big head */}
      <Path d="M68 10 C82 10 92 20 92 32 C92 44 82 52 68 52 C54 52 46 44 46 32 C46 20 54 10 68 10 Z" fill={C} stroke={OUT} strokeWidth={4} />
      <Path d="M53 24 C56 18 60 15 65 14" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={69} cy={30} gap={15} eyeR={3.8} mouthDy={9} />
    </Art>
  );
}
