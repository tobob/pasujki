import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, S, Smile, Cheeks, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const FACE = tone(COLORS.pink, 0.72);
const HOOF = tone(COLORS.black, 0.25);

export default function Lamb({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* small woolly sitting body */}
      <Path d="M24 78 C16 74 18 62 28 62 C30 56 40 54 44 58 C50 54 60 56 62 60 C70 56 82 62 78 70 C84 76 78 88 70 86 C64 92 52 92 48 88 C40 92 28 90 28 84 C22 84 20 80 24 78 Z" fill={C} {...S} />
      <Ellipse cx={36} cy={90} rx={6} ry={4} fill={HOOF} {...S} strokeWidth={3} />
      <Ellipse cx={64} cy={90} rx={6} ry={4} fill={HOOF} {...S} strokeWidth={3} />
      {/* ears */}
      <Ellipse cx={22} cy={36} rx={11} ry={6} fill={FACE} {...S} transform="rotate(-20 22 36)" />
      <Ellipse cx={78} cy={36} rx={11} ry={6} fill={FACE} {...S} transform="rotate(20 78 36)" />
      {/* big head */}
      <Ellipse cx={50} cy={42} rx={22} ry={22} fill={FACE} {...S} />
      {/* wool cap */}
      <Path d="M30 34 C24 26 32 14 40 18 C42 8 58 8 60 18 C68 14 76 26 70 34 C62 28 38 28 30 34 Z" fill={C} {...S} />
      <Path d="M44 22 C44 20 47 19 48 21" fill="none" stroke={tone(C, -0.12)} strokeWidth={3} strokeLinecap="round" />
      <Cheeks x1={36} x2={64} y={50} r={3.6} />
      <Eyes x1={41} x2={59} y={42} r={4} />
      <Smile cx={50} cy={53} w={4} />
    </Art>
  );
}
