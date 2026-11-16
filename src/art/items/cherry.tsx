import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;

export default function Cherry({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* stems */}
      <Path d="M30 64 C32 44 44 24 60 12 M70 66 C68 46 64 28 60 12" {...L} stroke={COLORS.brown} strokeWidth={5} />
      <Path d="M30 64 C32 44 44 24 60 12 M70 66 C68 46 64 28 60 12" fill="none" stroke={COLORS.green} strokeWidth={0} />
      {/* leaf */}
      <Path d="M60 12 C68 4 82 4 90 10 C84 20 70 22 60 12 Z" fill={COLORS.green} {...S} />
      {/* cherries */}
      <Circle cx={29} cy={72} r={20} fill={C} {...S} />
      <Circle cx={71} cy={74} r={20} fill={C} {...S} />
      <Path d="M18 68 C18 62 22 58 27 57" fill="none" stroke={tone(C, 0.4)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M60 70 C60 64 64 60 69 59" fill="none" stroke={tone(C, 0.4)} strokeWidth={5} strokeLinecap="round" />
    </Art>
  );
}
