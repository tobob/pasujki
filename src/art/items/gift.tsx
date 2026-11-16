import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const RIB = COLORS.yellow;

/** Gift: a clear square box with a ribbon cross and a bow. */
export default function Gift({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* bow loops */}
      <Path d="M50 26 C40 12 24 12 26 22 C28 30 42 28 50 26 Z" fill={RIB} {...S} />
      <Path d="M50 26 C60 12 76 12 74 22 C72 30 58 28 50 26 Z" fill={RIB} {...S} />
      {/* box */}
      <Rect x={14} y={26} width={72} height={66} rx={8} fill={C} {...S} />
      <Rect x={20} y={32} width={14} height={8} rx={4} fill={tone(C, 0.35)} />
      <Path d="M20 84 H80" stroke={tone(C, -0.12)} strokeWidth={4} strokeLinecap="round" />
      {/* ribbon */}
      <Rect x={43} y={26} width={14} height={66} fill={RIB} {...S} />
      <Rect x={14} y={52} width={72} height={13} fill={RIB} {...S} />
      <Rect x={43} y={52} width={14} height={13} fill={RIB} />
      <Rect x={14} y={26} width={72} height={66} rx={8} fill="none" {...S} />
      <Path d="M44 22 H56 V30 H44 Z" fill={tone(RIB, -0.1)} {...S} />
    </Art>
  );
}
