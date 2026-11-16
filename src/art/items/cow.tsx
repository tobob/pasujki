import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const SPOT = COLORS.black;

/** Cow: big round friendly head, little horns, black spots, soft muzzle. */
export default function Cow({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* horns */}
      <Path d="M32 24 C26 18 26 10 30 6 C34 11 38 15 40 20 Z" fill={tone(COLORS.yellow, 0.35)} {...S} />
      <Path d="M68 24 C74 18 74 10 70 6 C66 11 62 15 60 20 Z" fill={tone(COLORS.yellow, 0.35)} {...S} />
      {/* ears */}
      <Ellipse cx={15} cy={38} rx={12} ry={7} fill={C} {...S} transform="rotate(-20 15 38)" />
      <Ellipse cx={85} cy={38} rx={12} ry={7} fill={C} {...S} transform="rotate(20 85 38)" />
      <Ellipse cx={15} cy={38} rx={6} ry={3} fill={tone(COLORS.pink, 0.45)} transform="rotate(-20 15 38)" />
      <Ellipse cx={85} cy={38} rx={6} ry={3} fill={tone(COLORS.pink, 0.45)} transform="rotate(20 85 38)" />
      {/* head */}
      <Path d="M22 44 C22 26 34 16 50 16 C66 16 78 26 78 44 C78 56 76 62 74 68 L26 68 C24 62 22 56 22 44 Z" fill={C} {...S} />
      {/* spots */}
      <Path d="M26 34 C30 26 40 26 40 34 C40 41 30 44 25 41 Z" fill={SPOT} />
      <Path d="M64 19 C71 21 76 28 76 34 C69 34 62 28 64 19 Z" fill={SPOT} />
      {/* muzzle */}
      <Ellipse cx={50} cy={72} rx={24} ry={16} fill={tone(COLORS.pink, 0.45)} {...S} />
      <Path d="M32 66 C36 62 42 61 46 61" fill="none" stroke={tone(COLORS.pink, 0.7)} strokeWidth={3.5} strokeLinecap="round" />
      <Ellipse cx={41} cy={70} rx={3} ry={4} fill={OUT} />
      <Ellipse cx={59} cy={70} rx={3} ry={4} fill={OUT} />
      <Smile cx={50} cy={79} w={6} d={2.6} />
      <Cheeks x1={29} x2={71} y={54} r={4.2} />
      <Eyes x1={39} x2={61} y={46} r={4.6} />
    </Art>
  );
}
