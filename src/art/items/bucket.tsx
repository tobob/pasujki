import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Bucket({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* handle */}
      <Path d="M22 40 C22 12 78 12 78 40" {...L} strokeWidth={5} />
      {/* body */}
      <Path d="M16 38 H84 L76 86 C75 91 71 94 66 94 H34 C29 94 25 91 24 86 Z" fill={C} {...S} />
      <Path d="M22 50 L28 84" fill="none" stroke={tone(C, 0.45)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M70 48 L64 88 H58 L63 48 Z" fill={tone(C, -0.12)} />
      {/* rim */}
      <Ellipse cx={50} cy={38} rx={36} ry={7} fill={tone(C, -0.12)} {...S} />
    </Art>
  );
}
