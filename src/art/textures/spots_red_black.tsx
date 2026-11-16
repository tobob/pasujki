import { Circle } from 'react-native-svg';

import { COLORS } from '../kit';
import { Tile } from '../tile';

/** Ladybug: round black spots on red. */
export default function SpotsRedBlack({ size }: { size: number }) {
  const spots: [number, number, number][] = [
    [24, 24, 9], [62, 20, 7], [86, 44, 8], [42, 50, 10], [16, 74, 8], [70, 74, 10], [44, 90, 6],
  ];
  return (
    <Tile id="spots_red_black" size={size} bg={COLORS.red}>
      {spots.map(([x, y, r], i) => (
        <Circle key={i} cx={x} cy={y} r={r} fill={COLORS.black} />
      ))}
    </Tile>
  );
}
