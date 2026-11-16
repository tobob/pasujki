import { Ellipse, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;

export default function Spoon({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={44} y={40} width={12} height={54} rx={6} fill={C} {...S} transform="rotate(30 50 50)" />
      <Ellipse cx={50} cy={28} rx={19} ry={24} fill={C} {...S} transform="rotate(30 50 50)" />
      <Ellipse cx={46} cy={25} rx={7} ry={12} fill={tone(C, 0.55)} transform="rotate(30 50 50)" />
      <Rect x={47} y={58} width={4} height={28} rx={2} fill={tone(C, 0.45)} transform="rotate(30 50 50)" />
    </Art>
  );
}
