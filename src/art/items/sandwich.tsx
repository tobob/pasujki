import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

/** Sandwich: two chunky bread slices with wavy lettuce and a cheese layer between. */
export default function Sandwich({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* bottom slice */}
      <Path d="M12 72 C12 68 15 66 19 66 L81 66 C85 66 88 68 88 72 L88 80 C88 85 85 88 80 88 L20 88 C15 88 12 85 12 80 Z" fill={C} {...S} />
      {/* top slice: toast shape (crust + lighter crumb) */}
      <Path d="M14 50 V32 C14 22 22 17 30 19 C38 12 62 12 70 19 C78 17 86 22 86 32 V50 C86 53 84 54 81 54 L19 54 C16 54 14 53 14 50 Z" fill={C} {...S} />
      <Path d="M22 46 V34 C22 28 26 25 32 26 C40 20 60 20 68 26 C74 25 78 28 78 34 V46 Z" fill={tone(C, 0.4)} />
      <Path d="M30 34 C32 31 36 30 40 30" fill="none" stroke={tone(C, 0.7)} strokeWidth={4} strokeLinecap="round" />
      {/* lettuce + cheese between the slices */}
      <Path d="M8 56 C14 50 18 62 26 56 C32 50 36 62 44 56 C50 50 54 62 62 56 C68 50 72 62 80 56 C86 50 92 58 92 58 L90 62 L10 62 Z" fill={COLORS.green} {...S} strokeWidth={3} />
      <Path d="M10 61 L90 61 L90 66 L74 66 L66 76 L60 66 L10 66 Z" fill={COLORS.yellow} {...S} strokeWidth={3} />
      <Path d="M20 80 H80" fill="none" stroke={tone(C, -0.15)} strokeWidth={3} strokeLinecap="round" />
    </Art>
  );
}
