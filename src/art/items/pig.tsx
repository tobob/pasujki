import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, OUT, S, Smile, Cheeks, tone, type ArtProps } from '../kit';

const C = COLORS.pink;

export default function Pig({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* ears */}
      <Path d="M22 34 L16 10 L40 22 Z" fill={C} {...S} />
      <Path d="M78 34 L84 10 L60 22 Z" fill={C} {...S} />
      {/* head */}
      <Ellipse cx={50} cy={54} rx={38} ry={34} fill={C} {...S} />
      <Path d="M22 18 L26 26 L32 23 Z" fill={tone(C, -0.15)} />
      <Path d="M78 18 L74 26 L68 23 Z" fill={tone(C, -0.15)} />
      <Ellipse cx={34} cy={34} rx={7} ry={4} fill={tone(C, 0.35)} transform="rotate(-25 34 34)" />
      <Cheeks x1={24} x2={76} y={62} r={5} />
      <Eyes x1={36} x2={64} y={46} r={4} />
      {/* snout */}
      <Ellipse cx={50} cy={64} rx={16} ry={11} fill={tone(C, -0.15)} {...S} />
      <Ellipse cx={44} cy={64} rx={3} ry={4.2} fill={OUT} />
      <Ellipse cx={56} cy={64} rx={3} ry={4.2} fill={OUT} />
      <Smile cx={50} cy={80} w={6} />
    </Art>
  );
}
