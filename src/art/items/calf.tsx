import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const SPOT = COLORS.black;

/** Calf: the cow's baby — no horns, huge round head, tiny body lying down. */
export default function Calf({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* small body lying down */}
      <Path d="M22 92 C18 80 26 72 40 72 L62 72 C76 72 84 80 80 92 Z" fill={C} {...S} />
      <Path d="M60 74 C67 73 72 78 70 84 C65 87 59 82 60 74 Z" fill={SPOT} />
      <Ellipse cx={34} cy={91} rx={7} ry={3.5} fill={tone(SPOT, 0.25)} {...S} strokeWidth={2.5} />
      <Ellipse cx={66} cy={91} rx={7} ry={3.5} fill={tone(SPOT, 0.25)} {...S} strokeWidth={2.5} />
      {/* ears */}
      <Ellipse cx={15} cy={32} rx={12} ry={7} fill={C} {...S} transform="rotate(-25 15 32)" />
      <Ellipse cx={85} cy={32} rx={12} ry={7} fill={C} {...S} transform="rotate(25 85 32)" />
      <Ellipse cx={15} cy={32} rx={6} ry={3} fill={tone(COLORS.pink, 0.45)} transform="rotate(-25 15 32)" />
      <Ellipse cx={85} cy={32} rx={6} ry={3} fill={tone(COLORS.pink, 0.45)} transform="rotate(25 85 32)" />
      {/* big round head */}
      <Ellipse cx={50} cy={40} rx={30} ry={28} fill={C} {...S} />
      <Path d="M61 14 C70 16 77 24 77 32 C69 32 60 25 61 14 Z" fill={SPOT} />
      {/* muzzle */}
      <Ellipse cx={50} cy={60} rx={18} ry={11} fill={tone(COLORS.pink, 0.45)} {...S} />
      <Ellipse cx={43} cy={59} rx={2.4} ry={3} fill={OUT} />
      <Ellipse cx={57} cy={59} rx={2.4} ry={3} fill={OUT} />
      <Smile cx={50} cy={65} w={5} d={2.2} />
      <Cheeks x1={29} x2={71} y={47} r={4} />
      <Eyes x1={39} x2={61} y={38} r={5} />
    </Art>
  );
}
