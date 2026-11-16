import { Rect } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Gingham checks: soft blue picnic cloth (overlapping translucent bands). */
export default function Checks({ size }: { size: number }) {
  const band = tone(COLORS.blue, 0.25);
  const bands = [0, 25, 50, 75];
  return (
    <Tile id="checks" size={size} bg={COLORS.white}>
      {bands.map((p) => (
        <Rect key={`v${p}`} x={p} y={0} width={12.5} height={100} fill={band} opacity={0.5} />
      ))}
      {bands.map((p) => (
        <Rect key={`h${p}`} x={0} y={p} width={100} height={12.5} fill={band} opacity={0.5} />
      ))}
    </Tile>
  );
}
