import { Circle, Rect } from 'react-native-svg';

import { Art, COLORS, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.pink;
const B = tone(COLORS.blue, 0.8);

export default function Soap({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={10} y={44} width={80} height={44} rx={18} fill={C} {...S} />
      <Rect x={20} y={52} width={60} height={14} rx={7} fill={tone(C, 0.4)} />
      <Circle cx={36} cy={30} r={12} fill={B} {...S3} />
      <Circle cx={60} cy={22} r={8} fill={B} {...S3} />
      <Circle cx={74} cy={36} r={6} fill={B} {...S3} />
      <Circle cx={32} cy={26} r={3} fill="#FFFFFF" />
    </Art>
  );
}
