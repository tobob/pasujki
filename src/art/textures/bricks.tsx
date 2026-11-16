import { Rect } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Brick wall: rounded bricks with soft mortar. */
export default function Bricks({ size }: { size: number }) {
  const bricks = [];
  const h = 16;
  for (let r = 0; r * (h + 4) < 104; r++) {
    for (let x = r % 2 ? -14 : 0; x < 104; x += 32) {
      bricks.push(
        <Rect key={`${r}-${x}`} x={x + 2} y={r * (h + 4) + 2} width={28} height={h} rx={4} fill={(r + x) % 3 === 0 ? tone(COLORS.red, -0.08) : tone(COLORS.red, 0.08)} />,
      );
    }
  }
  return (
    <Tile id="bricks" size={size} bg={tone(COLORS.grey, 0.55)}>
      {bricks}
    </Tile>
  );
}
