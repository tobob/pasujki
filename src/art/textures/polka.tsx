import { Circle } from 'react-native-svg';

import { COLORS } from '../kit';
import { grid, Tile } from '../tile';

/** Polka dots: white dots on soft pink. */
export default function Polka({ size }: { size: number }) {
  return (
    <Tile id="polka" size={size} bg={COLORS.pink}>
      {grid(22).map(([x, y, i]) => (
        <Circle key={i} cx={x + 6} cy={y + 6} r={5.5} fill={COLORS.white} />
      ))}
    </Tile>
  );
}
