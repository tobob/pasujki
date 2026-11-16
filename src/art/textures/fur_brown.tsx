import { Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { grid, Tile } from '../tile';

/** Bear fur: soft brown with little curved tufts. */
export default function FurBrown({ size }: { size: number }) {
  return (
    <Tile id="fur_brown" size={size} bg={COLORS.brown}>
      {grid(20).map(([x, y, i]) => (
        <Path
          key={i}
          d={`M${x - 4} ${y + 4} C${x - 3} ${y - 2} ${x + 1} ${y - 5} ${x + 4} ${y - 6}`}
          fill="none"
          stroke={i % 2 ? tone(COLORS.brown, -0.18) : tone(COLORS.brown, 0.18)}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
    </Tile>
  );
}
