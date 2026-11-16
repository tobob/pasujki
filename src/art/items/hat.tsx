import { Circle, Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Hat({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M16 72 C16 40 30 24 50 24 C70 24 84 40 84 72 Z" fill={C} {...S} />
      <Path d="M36 32 C32 42 30 56 30 70 M50 26 V70 M64 32 C68 42 70 56 70 70" fill="none" stroke={tone(C, -0.15)} strokeWidth={3} strokeLinecap="round" />
      <Rect x={10} y={66} width={80} height={22} rx={10} fill={tone(C, 0.4)} {...S} />
      <Circle cx={50} cy={18} r={11} fill={tone(C, 0.4)} {...S} />
    </Art>
  );
}
