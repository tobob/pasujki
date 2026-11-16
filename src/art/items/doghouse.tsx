import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const BONE = COLORS.white;

/** Doghouse: small red kennel with a dark arched door and a bone waiting in front. */
export default function Doghouse({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={10} y={40} width={60} height={46} rx={4} fill={C} {...S} />
      <Path d="M10 54 H70 M10 70 H70" {...L3} stroke={tone(C, -0.2)} />
      {/* roof */}
      <Path d="M4 46 L40 12 L76 46 Z" fill={COLORS.brown} {...S} />
      <Path d="M16 38 L40 17" fill="none" stroke={tone(COLORS.brown, 0.3)} strokeWidth={3.5} strokeLinecap="round" />
      {/* door */}
      <Path d="M27 86 V64 C27 54 53 54 53 64 V86 Z" fill={OUT} {...S} />
      {/* bone in front */}
      <Path
        d="M60 84 C56 80 58 75 62 77 C63 73 68 73 68 78 L80 78 C80 73 85 73 86 77 C90 75 92 80 89 84 C92 88 90 93 86 91 C85 95 80 95 80 90 L68 90 C68 95 63 95 62 91 C58 93 56 88 60 84 Z"
        fill={BONE}
        {...S}
      />
    </Art>
  );
}
