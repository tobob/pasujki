import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Snowman({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Circle cx={50} cy={70} r={24} fill={C} {...S} />
      <Path d="M34 82 C42 88 58 88 66 82" fill="none" stroke={tone(COLORS.blue, 0.7)} strokeWidth={4} strokeLinecap="round" />
      <Circle cx={50} cy={64} r={2.6} fill={OUT} />
      <Circle cx={50} cy={74} r={2.6} fill={OUT} />
      <Circle cx={50} cy={32} r={18} fill={C} {...S} />
      <Path d="M30 46 C42 52 58 52 70 46 L70 52 C58 58 42 58 30 52 Z" fill={COLORS.red} {...S} strokeWidth={3} />
      <Path d="M34 22 C32 14 40 8 50 8 C60 8 68 14 66 22 Z" fill={COLORS.black} {...S} strokeWidth={3} />
      <Face cx={50} cy={30} gap={12} eyeR={2.8} mouthDy={8} cheeks={false} />
      <Path d="M50 34 L58 36 L50 38 Z" fill={COLORS.orange} stroke={OUT} strokeWidth={2} strokeLinejoin="round" />
    </Art>
  );
}
