import { Circle, Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { grid, Tile } from '../tile';

/** Sheep wool: big soft cream curls, light lines. */
export default function Wool({ size }: { size: number }) {
  const line = tone(COLORS.grey, 0.45);
  const pts = grid(26);
  return (
    <Tile id="wool" size={size} bg={tone(COLORS.white, -0.04)}>
      {pts.map(([x, y, i]) => (
        <Circle key={i} cx={x} cy={y} r={13} fill={COLORS.white} stroke={line} strokeWidth={3} />
      ))}
      {pts.map(([x, y, i]) => (
        <Path key={`c${i}`} d={`M${x - 5} ${y + 2} C${x - 5} ${y - 4} ${x + 3} ${y - 6} ${x + 5} ${y - 1}`} fill="none" stroke={line} strokeWidth={3} strokeLinecap="round" />
      ))}
    </Tile>
  );
}
