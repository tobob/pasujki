import { Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Grass: rows of soft rounded blades. */
export default function Grass({ size }: { size: number }) {
  const blades = [];
  for (let r = 0, base = 32; base <= 112; base += 26, r++) {
    for (let x = -4 + (r % 2) * 7; x < 106; x += 14) {
      blades.push(
        <Path
          key={`${r}-${x}`}
          d={`M${x - 5} ${base} C${x - 4} ${base - 14} ${x} ${base - 22} ${x + 4} ${base - 28} C${x + 4} ${base - 18} ${x + 6} ${base - 10} ${x + 6} ${base} Z`}
          fill={(r + Math.round(x / 14)) % 2 ? COLORS.green : tone(COLORS.green, -0.12)}
        />,
      );
    }
  }
  return (
    <Tile id="grass" size={size} bg={tone(COLORS.green, 0.45)}>
      {blades}
    </Tile>
  );
}
