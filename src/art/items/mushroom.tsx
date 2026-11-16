import { Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

/**
 * A friendly brown cep (prawdziwek, an edible mushroom), deliberately NOT a red-and-white fly
 * agaric: the hedgehog/squirrel "who eats this?" rounds must never present a poisonous mushroom as food.
 */
const C = COLORS.brown;
const STEM = '#F1E6D2';

export default function Mushroom({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* chubby stem */}
      <Path d="M34 54 H66 C72 66 72 82 66 90 C63 94 58 95 50 95 C42 95 37 94 34 90 C28 82 28 66 34 54 Z" fill={STEM} {...S} />
      <Path d="M60 62 C63 72 63 82 60 89" fill="none" stroke={tone(STEM, -0.12)} strokeWidth={4} strokeLinecap="round" />
      {/* round cap */}
      <Path d="M10 56 C10 30 28 12 50 12 C72 12 90 30 90 56 C90 62 86 64 80 64 H20 C14 64 10 62 10 56 Z" fill={C} {...S} />
      <Path d="M22 40 C26 29 34 22 44 19" fill="none" stroke={tone(C, 0.35)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
