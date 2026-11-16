import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;
const D = tone(C, -0.15);

export default function Pumpkin({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M48 28 C48 20 50 14 56 10 L62 14 C58 18 56 22 56 28 Z" fill={COLORS.green} {...S} />
      <Ellipse cx={30} cy={60} rx={22} ry={30} fill={C} {...S} />
      <Ellipse cx={70} cy={60} rx={22} ry={30} fill={C} {...S} />
      <Ellipse cx={50} cy={60} rx={20} ry={32} fill={C} {...S} />
      <Path d="M18 50 C18 42 22 38 26 36" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M40 40 C38 52 38 70 40 82 M60 40 C62 52 62 70 60 82" fill="none" stroke={D} strokeWidth={3} strokeLinecap="round" />
    </Art>
  );
}
