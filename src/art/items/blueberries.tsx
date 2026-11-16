import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;
const B: [number, number, number][] = [
  [32, 66, 19], [68, 66, 19], [50, 38, 19],
];

export default function Blueberries({ size }: ArtProps) {
  return (
    <Art size={size}>
      {B.map(([x, y, r], i) => (
        <Circle key={i} cx={x} cy={y} r={r} fill={C} {...S} />
      ))}
      {B.map(([x, y], i) => (
        <Circle key={`h${i}`} cx={x - 8} cy={y - 8} r={4} fill={tone(C, 0.45)} />
      ))}
      {/* little crowns */}
      {B.map(([x, y], i) => (
        <Path key={`c${i}`} d={`M${x - 5} ${y - 3} L${x} ${y + 1} L${x + 5} ${y - 3} M${x} ${y + 1} L${x} ${y - 5}`} {...L3} stroke={tone(C, -0.4)} />
      ))}
      <Path d="M62 22 C66 12 76 10 82 12 C78 20 70 24 62 22 Z" fill={COLORS.green} {...S} />
    </Art>
  );
}
