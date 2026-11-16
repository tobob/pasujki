import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, type ArtProps } from '../kit';

const C = COLORS.black;
const W = COLORS.white;
const O = COLORS.orange;

export default function Penguin({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet */}
      <Ellipse cx={38} cy={90} rx={10} ry={5} fill={O} {...S} />
      <Ellipse cx={62} cy={90} rx={10} ry={5} fill={O} {...S} />
      {/* flippers */}
      <Path d="M24 46 C12 54 10 68 14 74 C20 70 24 62 26 56 Z" fill={C} {...S} />
      <Path d="M76 46 C88 54 90 68 86 74 C80 70 76 62 74 56 Z" fill={C} {...S} />
      {/* body */}
      <Path d="M50 8 C30 8 22 24 22 44 C22 70 30 88 50 88 C70 88 78 70 78 44 C78 24 70 8 50 8 Z" fill={C} {...S} />
      {/* white face + belly */}
      <Path d="M50 26 C45 20 35 22 35 31 C35 36 38 40 40 44 C36 58 38 80 50 80 C62 80 64 58 60 44 C62 40 65 36 65 31 C65 22 55 20 50 26 Z" fill={W} />
      <Cheeks x1={37} x2={63} y={40} />
      <Eyes x1={42} x2={58} y={32} r={3.6} />
      {/* beak */}
      <Path d="M44 40 L56 40 L50 47 Z" fill={O} {...S} strokeWidth={3} />
    </Art>
  );
}
