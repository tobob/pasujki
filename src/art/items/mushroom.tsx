import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const STEM = tone(COLORS.yellow, 0.75);

export default function Mushroom({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* stem */}
      <Path d="M38 56 H62 C64 68 66 80 64 88 C63 92 60 94 56 94 H44 C40 94 37 92 36 88 C34 80 36 68 38 56 Z" fill={STEM} {...S} />
      <Path d="M56 62 C58 72 58 82 56 90" fill="none" stroke={tone(STEM, -0.1)} strokeWidth={4} strokeLinecap="round" />
      {/* cap */}
      <Path d="M8 56 C8 28 28 8 50 8 C72 8 92 28 92 56 C92 62 88 64 82 64 H18 C12 64 8 62 8 56 Z" fill={C} {...S} />
      <Path d="M20 40 C24 28 32 20 42 16" fill="none" stroke={tone(C, 0.35)} strokeWidth={5} strokeLinecap="round" />
      <Circle cx={50} cy={26} r={7} fill={COLORS.white} />
      <Circle cx={28} cy={48} r={6} fill={COLORS.white} />
      <Circle cx={72} cy={44} r={7.5} fill={COLORS.white} />
      <Ellipse cx={50} cy={52} rx={5} ry={4} fill={COLORS.white} />
    </Art>
  );
}
