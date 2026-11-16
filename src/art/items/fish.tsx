import { Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;
const D = tone(C, -0.12);

/** Goldfish: round chubby body, soft tail, friendly face. */
export default function Fish({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M70 50 C78 38 86 30 93 30 C96 42 96 58 93 70 C86 70 78 62 70 50 Z" fill={D} {...S} />
      {/* top + bottom fins */}
      <Path d="M30 26 C34 10 52 6 62 24 Z" fill={D} {...S} />
      <Path d="M40 76 C42 84 50 86 54 78 Z" fill={D} {...S} />
      {/* body */}
      <Path d="M8 52 C8 32 24 20 42 20 C60 20 74 34 76 50 C74 68 60 82 42 82 C24 82 8 72 8 52 Z" fill={C} {...S} />
      {/* shade + highlight */}
      <Path d="M20 70 C28 77 44 79 58 74" fill="none" stroke={D} strokeWidth={4} strokeLinecap="round" />
      <Path d="M24 30 C30 25 36 24 42 24" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M56 36 C62 44 62 58 56 66" fill="none" stroke={D} strokeWidth={3} strokeLinecap="round" />
      <Face cx={32} cy={48} gap={17} eyeR={4.2} mouthDy={10} />
    </Art>
  );
}
