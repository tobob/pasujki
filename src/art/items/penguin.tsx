import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.black;
const W = COLORS.white;
const O = COLORS.orange;

/** Penguin: chubby egg-shaped body, little flippers, big face. */
export default function Penguin({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Ellipse cx={38} cy={90} rx={10} ry={5} fill={O} {...S} />
      <Ellipse cx={62} cy={90} rx={10} ry={5} fill={O} {...S} />
      <Path d="M22 50 C10 58 9 72 13 77 C19 73 23 65 25 59 Z" fill={C} {...S} />
      <Path d="M78 50 C90 58 91 72 87 77 C81 73 77 65 75 59 Z" fill={C} {...S} />
      <Path d="M50 8 C28 8 20 26 20 48 C20 74 30 88 50 88 C70 88 80 74 80 48 C80 26 72 8 50 8 Z" fill={C} {...S} />
      <Path d="M30 22 C34 16 40 13 46 12" fill="none" stroke={tone(C, 0.3)} strokeWidth={4} strokeLinecap="round" />
      {/* white face mask + small belly */}
      <Path d="M50 28 C44 21 32 23 32 34 C32 40 36 44 40 48 C38 62 41 78 50 78 C59 78 62 62 60 48 C64 44 68 40 68 34 C68 23 56 21 50 28 Z" fill={W} />
      <Face cx={50} cy={36} gap={18} eyeR={4.4} mouthDy={11} mouth={false} />
      <Path d="M45 42 L55 42 L50 48 Z" fill={O} {...S} strokeWidth={3} />
    </Art>
  );
}
