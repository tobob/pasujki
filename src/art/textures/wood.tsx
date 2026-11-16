import { Ellipse, Path } from 'react-native-svg';

import { COLORS, tone } from '../kit';
import { Tile } from '../tile';

/** Wood: three planks with gentle grain and a knot. */
export default function Wood({ size }: { size: number }) {
  const grain = tone(COLORS.brown, -0.2);
  return (
    <Tile id="wood" size={size} bg={COLORS.brown}>
      <Path d="M36 0 V100 M66 0 V100" stroke={grain} strokeWidth={3} />
      <Path d="M14 4 C20 30 10 60 18 96 M26 4 C30 26 24 50 28 70" fill="none" stroke={tone(COLORS.brown, 0.2)} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M46 4 C52 20 44 40 50 52 C56 64 48 80 52 98 M58 10 C60 30 56 44 60 60" fill="none" stroke={tone(COLORS.brown, 0.2)} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M76 2 C82 30 74 50 80 98 M88 20 C90 40 86 60 90 80" fill="none" stroke={tone(COLORS.brown, 0.2)} strokeWidth={2.5} strokeLinecap="round" />
      <Ellipse cx={50} cy={56} rx={5} ry={7} fill={tone(COLORS.brown, -0.15)} stroke={grain} strokeWidth={2} />
    </Tile>
  );
}
