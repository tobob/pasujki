import { Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Ice: pale icy blue with soft facets, gentle cracks and shine. */
export default function Ice({ size }: { size: number }) {
  const line = tone(COLORS.blue, 0.45);
  return (
    <Tile id="ice" size={size} bg={tone(COLORS.blue, 0.72)}>
      <Path d="M0 0 L60 0 L36 40 L0 30 Z" fill={tone(COLORS.blue, 0.82)} />
      <Path d="M100 60 L100 100 L50 100 L70 64 Z" fill={tone(COLORS.blue, 0.62)} />
      <Path d="M36 40 L60 56 L70 64 M60 56 L52 80 M36 40 L20 64 M60 0 L72 28 L100 34" fill="none" stroke={line} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M18 14 L34 14 M74 76 L86 70 M80 84 L88 80" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.9} />
    </Tile>
  );
}
