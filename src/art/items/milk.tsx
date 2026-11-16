import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Milk({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* carton */}
      <Rect x={24} y={38} width={52} height={54} rx={6} fill={C} {...S} />
      <Path d="M24 40 L34 22 L66 22 L76 40 Z" fill={tone('#A3A7AE', 0.6)} {...S} />
      <Rect x={34} y={10} width={32} height={12} rx={3} fill={C} {...S} />
      {/* blue label with drop */}
      <Rect x={32} y={52} width={36} height={28} rx={8} fill={COLORS.blue} {...S} strokeWidth={3} />
      <Path d="M50 58 C46 64 44 67 44 70 C44 73.5 46.7 76 50 76 C53.3 76 56 73.5 56 70 C56 67 54 64 50 58 Z" fill={C} />
    </Art>
  );
}
