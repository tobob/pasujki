import { Path } from 'react-native-svg';

import { COLORS } from '../kit';
import { Tile } from '../tile';

/** Tiger: a few bold, soft-edged tapered stripes on orange. */
export default function StripesOrange({ size }: { size: number }) {
  const xs = [18, 50, 82];
  const dark = COLORS.black;
  return (
    <Tile id="stripes_orange" size={size} bg={COLORS.orange}>
      {xs.map((x, i) => (
        <Path key={`t${i}`} d={`M${x - 9} -2 C${x - 6} 16 ${x + 6} 26 ${x + 2} 44 C${x - 6} 30 ${x - 14} 16 ${x - 9} -2 Z`} fill={dark} stroke={dark} strokeWidth={2} strokeLinejoin="round" />
      ))}
      {xs.map((x, i) => (
        <Path key={`b${i}`} d={`M${x + 7} 102 C${x + 4} 84 ${x - 8} 74 ${x - 2} 56 C${x + 6} 70 ${x + 12} 84 ${x + 7} 102 Z`} fill={dark} stroke={dark} strokeWidth={2} strokeLinejoin="round" />
      ))}
      {[34, 66].map((x, i) => (
        <Path key={`m${i}`} d={`M${x} 34 C${x + 8} 42 ${x + 8} 58 ${x} 66 C${x + 2} 56 ${x + 2} 44 ${x} 34 Z`} fill={dark} stroke={dark} strokeWidth={2} strokeLinejoin="round" />
      ))}
    </Tile>
  );
}
