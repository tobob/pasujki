import { G, Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Bird feathers: a few big soft feathers laid diagonally (owl / hen). */
function Feather({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  const line = tone(COLORS.brown, -0.15);
  return (
    <G transform={`translate(${x} ${y}) rotate(20) scale(${s})`}>
      <Path
        d="M0 -46 C14 -36 17 -20 16 -8 L8 -6 L15 2 C13 20 7 32 0 38 C-6 32 -12 24 -14 14 L-7 10 L-15 4 C-17 -14 -14 -34 0 -46 Z"
        fill={fill}
        stroke={line}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Path d="M0 -36 V50" fill="none" stroke={line} strokeWidth={3} strokeLinecap="round" />
    </G>
  );
}
export default function Feathers({ size }: { size: number }) {
  return (
    <Tile id="feathers" size={size} bg={tone(COLORS.brown, 0.72)}>
      <Feather x={20} y={40} s={0.72} fill={tone(COLORS.brown, 0.3)} />
      <Feather x={50} y={60} s={0.72} fill={COLORS.brown} />
      <Feather x={80} y={40} s={0.72} fill={tone(COLORS.brown, 0.3)} />
      <Feather x={20} y={108} s={0.72} fill={COLORS.brown} />
      <Feather x={80} y={108} s={0.72} fill={COLORS.brown} />
      <Feather x={50} y={-8} s={0.72} fill={tone(COLORS.brown, 0.3)} />
    </Tile>
  );
}
