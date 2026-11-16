import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Duck({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet */}
      <Path d="M38 84 L32 92 H46 Z M56 84 L50 92 H64 Z" fill={COLORS.orange} {...S} strokeWidth={3} />
      {/* body with tail */}
      <Path d="M10 52 C18 54 22 50 30 50 L60 50 C80 50 86 62 82 72 C76 84 60 88 44 86 C26 84 14 72 10 52 Z" fill={C} {...S} />
      {/* head */}
      <Ellipse cx={62} cy={32} rx={18} ry={18} fill={C} {...S} />
      {/* bill */}
      <Path d="M76 32 C84 30 94 32 94 37 C94 42 84 43 76 41 Z" fill={COLORS.orange} {...S} />
      {/* wing */}
      <Path d="M30 62 C40 76 60 76 66 64 C54 66 42 64 30 62 Z" {...L3} fill={tone(C, -0.12)} />
      <Cheeks x1={66} x2={66} y={40} r={3.4} />
      <Eyes x1={66} x2={66} y={28} r={3.6} />
    </Art>
  );
}
