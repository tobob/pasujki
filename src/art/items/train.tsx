import { Circle, Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Train({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M24 20 H36 V40 H24 Z" fill={COLORS.black} {...S} />
      <Rect x={50} y={22} width={38} height={28} rx={5} fill={C} {...S} />
      <Rect x={58} y={28} width={22} height={14} rx={3} fill={tone(COLORS.blue, 0.65)} {...S} strokeWidth={3} />
      <Rect x={10} y={40} width={80} height={36} rx={6} fill={C} {...S} />
      <Rect x={46} y={18} width={46} height={8} rx={4} fill={COLORS.red} {...S} strokeWidth={3} />
      <Path d="M18 52 H40" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
      <Circle cx={10} cy={58} r={4} fill={COLORS.yellow} {...S} strokeWidth={3} />
      <Circle cx={26} cy={80} r={10} fill={COLORS.red} {...S} />
      <Circle cx={50} cy={80} r={10} fill={COLORS.red} {...S} />
      <Circle cx={74} cy={80} r={10} fill={COLORS.red} {...S} />
      <Circle cx={26} cy={80} r={3} fill={COLORS.black} />
      <Circle cx={50} cy={80} r={3} fill={COLORS.black} />
      <Circle cx={74} cy={80} r={3} fill={COLORS.black} />
    </Art>
  );
}
