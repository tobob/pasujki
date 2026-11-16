import { Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Fish scales: rows of soft scallops. */
export default function Scales({ size }: { size: number }) {
  const line = tone(COLORS.orange, -0.2);
  const out = [];
  for (let r = 0, y = -4; y < 110; y += 14, r++) {
    for (let x = -16 + (r % 2 ? 9 : 0); x < 110; x += 18) {
      out.push(
        <Path
          key={`${r}-${x}`}
          d={`M${x} ${y} A9 9 0 0 0 ${x + 18} ${y}`}
          fill={r % 2 ? tone(COLORS.orange, 0.2) : COLORS.orange}
          stroke={line}
          strokeWidth={2.5}
          strokeLinecap="round"
        />,
      );
    }
  }
  return (
    <Tile id="scales" size={size} bg={COLORS.orange}>
      {out}
    </Tile>
  );
}
