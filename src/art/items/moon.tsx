import { Path } from 'react-native-svg';

import { Art, COLORS, Eyes, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Moon({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M60 8 C36 10 18 28 18 52 C18 76 38 94 62 92 C72 91 80 88 86 82 C64 82 46 66 46 44 C46 28 52 16 60 8 Z" fill={C} {...S} />
      <Path d="M30 40 C30 32 34 24 40 20" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Eyes x1={30} x2={44} y={60} r={3} />
      <Smile cx={37} cy={68} w={4} />
    </Art>
  );
}
