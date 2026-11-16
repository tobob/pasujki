import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Iceberg({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={6} y={70} width={88} height={22} rx={11} fill={COLORS.blue} {...S} />
      <Path d="M14 76 L28 40 L40 48 L54 14 L68 38 L76 32 L88 76 Z" fill={C} {...S} />
      <Path d="M54 14 L50 34 L58 46 L54 76 L88 76 L76 32 L68 38 Z" fill={tone(COLORS.blue, 0.75)} />
      <Path d="M14 76 L28 40 L40 48 L54 14 L68 38 L76 32 L88 76 Z" fill="none" {...S} />
      <Path d="M20 82 C26 78 32 78 38 82 M60 84 C66 80 72 80 78 84" {...L3} stroke={tone(COLORS.blue, 0.45)} />
    </Art>
  );
}
