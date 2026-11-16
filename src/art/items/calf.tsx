import { Ellipse, Path, Rect } from 'react-native-svg';

import { Art, COLORS, Eyes, OUT, S, Smile, Cheeks, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const SPOT = COLORS.black;

export default function Calf({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* small body lying down */}
      <Rect x={24} y={70} width={52} height={22} rx={11} fill={C} {...S} />
      <Path d="M58 72 C64 70 70 74 68 80 C64 84 58 80 58 72 Z" fill={SPOT} />
      <Ellipse cx={34} cy={92} rx={7} ry={3.5} fill={tone(SPOT, 0.2)} />
      <Ellipse cx={66} cy={92} rx={7} ry={3.5} fill={tone(SPOT, 0.2)} />
      {/* ears */}
      <Ellipse cx={20} cy={30} rx={11} ry={6} fill={C} {...S} transform="rotate(-25 20 30)" />
      <Ellipse cx={80} cy={30} rx={11} ry={6} fill={C} {...S} transform="rotate(25 80 30)" />
      {/* big round head, no horns */}
      <Path d="M26 36 C26 20 38 12 50 12 C62 12 74 20 74 36 C74 46 72 52 70 58 L30 58 C28 52 26 46 26 36 Z" fill={C} {...S} />
      <Path d="M60 15 C68 16 73 24 72 30 C66 30 58 24 60 15 Z" fill={SPOT} />
      {/* muzzle */}
      <Ellipse cx={50} cy={62} rx={18} ry={12} fill={tone(COLORS.pink, 0.5)} {...S} />
      <Ellipse cx={43} cy={60} rx={2.4} ry={3} fill={OUT} />
      <Ellipse cx={57} cy={60} rx={2.4} ry={3} fill={OUT} />
      <Smile cx={50} cy={67} w={5} />
      <Cheeks x1={32} x2={68} y={46} r={3.6} />
      <Eyes x1={40} x2={60} y={38} r={4.4} />
    </Art>
  );
}
