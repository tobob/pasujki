import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;
const B = [
  [36, 34], [50, 34], [64, 34], [43, 47], [57, 47], [30, 47], [70, 47], [36, 60], [50, 60], [64, 60], [43, 73], [57, 73], [50, 86],
];

export default function Grapes({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 26 C50 18 52 12 56 8" {...L} />
      <Path d="M52 18 C44 8 30 10 26 16 C34 24 46 24 52 18 Z" fill={COLORS.green} {...S} />
      {B.map(([x, y], i) => (
        <Circle key={i} cx={x} cy={y} r={8.5} fill={C} {...S} strokeWidth={3.5} />
      ))}
      {B.map(([x, y], i) => (
        <Circle key={`h${i}`} cx={x - 3} cy={y - 3} r={2} fill={tone(C, 0.45)} />
      ))}
    </Art>
  );
}
