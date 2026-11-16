import { Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Honeycomb: rounded hexagon cells, honey yellow. */
export default function Honeycomb({ size }: { size: number }) {
  const r = 12;
  const w = r * Math.sqrt(3);
  const cells = [];
  for (let row = 0, y = 0; y < 115; y += r * 1.5, row++) {
    for (let x = row % 2 ? w / 2 : 0; x < 115; x += w) {
      const pts = Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        return `${(x + Math.cos(a) * (r - 1.5)).toFixed(1)} ${(y + Math.sin(a) * (r - 1.5)).toFixed(1)}`;
      });
      cells.push(
        <Path
          key={`${row}-${x.toFixed(0)}`}
          d={`M${pts.join(' L')} Z`}
          fill={(row + Math.round(x / w)) % 4 === 0 ? tone(COLORS.yellow, 0.35) : COLORS.yellow}
          stroke={tone(COLORS.orange, 0.1)}
          strokeWidth={3}
          strokeLinejoin="round"
        />,
      );
    }
  }
  return (
    <Tile id="honeycomb" size={size} bg={tone(COLORS.orange, 0.3)}>
      {cells}
    </Tile>
  );
}
