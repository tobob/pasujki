import { Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Water waves: rounded rolling lines on calm blue. */
export default function Waves({ size }: { size: number }) {
  const rows = [16, 38, 60, 82];
  return (
    <Tile id="waves" size={size} bg={COLORS.blue}>
      {rows.map((y, i) => (
        <Path
          key={i}
          d={`M${-10 + (i % 2) * 10} ${y} q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 t20 0`}
          fill="none"
          stroke={tone(COLORS.blue, 0.6)}
          strokeWidth={5}
          strokeLinecap="round"
        />
      ))}
    </Tile>
  );
}
