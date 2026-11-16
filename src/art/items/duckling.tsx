import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Duckling({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet */}
      <Path d="M36 84 L31 92 H43 Z M54 84 L49 92 H61 Z" fill={COLORS.orange} {...S} strokeWidth={3} />
      {/* small round body */}
      <Path d="M14 60 C20 62 22 58 28 58 L52 58 C68 58 74 68 70 76 C66 86 54 88 42 87 C26 86 16 76 14 60 Z" fill={C} {...S} />
      {/* big head */}
      <Ellipse cx={50} cy={38} rx={24} ry={23} fill={C} {...S} />
      {/* fluffy tuft */}
      <Path d="M44 16 C42 8 48 6 50 12 C52 6 58 8 54 16" fill={C} {...S} />
      {/* bill */}
      <Path d="M70 38 C78 36 88 38 88 43 C88 48 78 49 70 47 Z" fill={COLORS.orange} {...S} />
      {/* wing */}
      <Path d="M28 70 C34 78 46 78 50 70" fill={tone(C, -0.12)} {...S} strokeWidth={3} />
      <Cheeks x1={44} x2={66} y={46} r={3.8} />
      <Eyes x1={50} x2={62} y={34} r={4.2} />
    </Art>
  );
}
