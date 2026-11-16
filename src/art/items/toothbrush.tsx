import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;
const T = 'rotate(35 50 50)';

export default function Toothbrush({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={39} y={40} width={22} height={58} rx={11} fill={C} {...S} transform={T} />
      <Rect x={41} y={4} width={18} height={44} rx={8} fill={C} {...S} transform={T} />
      <Path d="M46 52 V88" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" transform={T} />
      <Rect x={57} y={4} width={22} height={30} rx={5} fill={COLORS.white} {...S} transform={T} />
      <Path d="M63 12 H73 M63 19 H73 M63 26 H73" stroke={tone(COLORS.blue, 0.55)} strokeWidth={3} strokeLinecap="round" transform={T} />
    </Art>
  );
}
