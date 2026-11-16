import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Honey({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* pot */}
      <Path d="M24 34 C12 46 12 76 26 86 C34 92 66 92 74 86 C88 76 88 46 76 34 Z" fill={C} {...S} />
      {/* drips from the rim */}
      <Path d="M26 34 L74 34 L74 42 C74 48 68 48 68 42 C68 54 58 54 58 44 C58 48 50 48 50 42 L42 42 C42 52 32 52 32 42 C32 46 26 46 26 40 Z" fill={tone(C, -0.15)} />
      <Path d="M24 50 C22 60 24 70 28 76" fill="none" stroke={tone(C, 0.4)} strokeWidth={5} strokeLinecap="round" />
      {/* lid with cloth */}
      <Rect x={20} y={24} width={60} height={12} rx={6} fill={COLORS.white} {...S} />
      <Rect x={36} y={14} width={28} height={12} rx={6} fill={COLORS.white} {...S} />
      {/* label */}
      <Rect x={36} y={56} width={28} height={20} rx={8} fill={COLORS.yellow} {...S} strokeWidth={3} />
      <Path d="M44 66 C44 62 50 62 50 66 C50 62 56 62 56 66 C56 70 50 73 50 73 C50 73 44 70 44 66 Z" fill={C} />
    </Art>
  );
}
