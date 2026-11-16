import { Path } from 'react-native-svg';

import { COLORS } from '../kit';
import { Tile } from '../tile';

/** Zebra: soft wavy charcoal stripes on warm white. */
export default function StripesBw({ size }: { size: number }) {
  const ys = [8, 30, 52, 74, 96];
  return (
    <Tile id="stripes_bw" size={size} bg={COLORS.white}>
      {ys.map((y, i) => (
        <Path
          key={i}
          d={`M-5 ${y} C15 ${y - 7} 30 ${y + 7} 50 ${y} C70 ${y - 7} 85 ${y + 7} 105 ${y} L105 ${y + 10} C85 ${y + 16} 70 ${y + 4} 50 ${y + 10} C30 ${y + 16} 15 ${y + 4} -5 ${y + 10} Z`}
          fill={COLORS.black}
        />
      ))}
    </Tile>
  );
}
