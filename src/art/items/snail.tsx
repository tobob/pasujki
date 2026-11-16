import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Face, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;
const B = tone(COLORS.yellow, 0.45);

/** Snail: big round swirl shell, chubby soft body with a big head. */
export default function Snail({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* eye stalks */}
      <Path d="M20 34 L14 18 M32 34 L36 18" {...L} />
      <Circle cx={14} cy={16} r={4.2} fill={B} {...S} strokeWidth={3} />
      <Circle cx={36} cy={16} r={4.2} fill={B} {...S} strokeWidth={3} />
      {/* body */}
      <Path d="M12 86 C7 86 6 80 8 74 C10 66 10 56 12 46 C14 30 40 30 40 46 L40 70 L88 74 C94 76 94 86 88 86 Z" fill={B} {...S} />
      <Face cx={25} cy={50} gap={13} eyeR={3.6} mouthDy={8} />
      {/* shell */}
      <Circle cx={64} cy={50} r={28} fill={C} {...S} />
      <Path d="M64 50 C64 44 72 44 72 50 C72 58 58 60 56 50 C54 38 74 36 78 48 C82 62 64 72 52 64" {...L} stroke={tone(C, -0.25)} />
      <Path d="M46 34 C50 28 56 26 60 26" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
