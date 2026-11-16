import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.white;

export default function Hen({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs */}
      <Path d="M42 80 V92 M36 92 H48 M58 80 V92 M52 92 H64" stroke={COLORS.orange} strokeWidth={4} strokeLinecap="round" />
      {/* tail feathers */}
      <Path d="M24 54 C12 46 10 30 16 22 C22 30 26 34 30 36 C28 28 30 22 34 18 C38 30 40 40 40 50 Z" fill={C} {...S} />
      {/* body + head in one round shape */}
      <Path d="M26 60 C24 46 32 40 44 42 C46 32 44 24 50 18 C56 12 70 14 72 24 C74 32 70 36 70 42 C82 48 84 62 76 72 C68 82 50 84 38 80 C30 76 26 68 26 60 Z" fill={C} {...S} />
      {/* wing */}
      <Path d="M40 58 C46 70 60 72 66 62 C58 64 50 62 40 58 Z" {...L3} fill={tone(C, -0.1)} />
      {/* comb */}
      <Path d="M52 18 C50 10 56 8 58 13 C60 6 67 7 66 14 C70 12 74 16 70 20 Z" fill={COLORS.red} {...S} />
      {/* beak + wattle */}
      <Path d="M72 26 L82 30 L71 34 Z" fill={COLORS.yellow} {...S} strokeWidth={3} />
      <Ellipse cx={70} cy={38} rx={3} ry={4.5} fill={COLORS.red} stroke={OUT} strokeWidth={2.5} />
      <Cheeks x1={58} x2={58} y={32} r={3} />
      <Eyes x1={62} x2={62} y={26} r={3.4} />
    </Art>
  );
}
