import { Ellipse, Path, Rect } from 'react-native-svg';

import { Art, COLORS, Eyes, S, Smile, Cheeks, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const FACE = tone(COLORS.black, 0.25);

/** Fluffy cloud of wool made of overlapping bumps. */
export const WOOL_BODY =
  'M22 50 C14 46 14 34 24 32 C24 22 36 18 42 24 C46 16 60 16 62 24 C70 18 82 24 78 34 C88 36 88 50 80 52 C86 60 80 72 70 70 C66 78 54 80 48 74 C40 80 28 76 28 68 C18 68 14 56 22 50 Z';

export default function Sheep({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs */}
      <Rect x={30} y={70} width={8} height={20} rx={4} fill={FACE} {...S} />
      <Rect x={62} y={70} width={8} height={20} rx={4} fill={FACE} {...S} />
      {/* wool */}
      <Path d={WOOL_BODY} fill={C} {...S} transform="translate(0 6)" />
      <Path d="M30 46 C30 42 34 40 36 42 M66 62 C70 62 72 58 70 56" fill="none" stroke={tone(C, -0.12)} strokeWidth={3} strokeLinecap="round" />
      {/* face */}
      <Ellipse cx={20} cy={48} rx={9} ry={5} fill={FACE} {...S} transform="rotate(-25 20 48)" />
      <Ellipse cx={80} cy={48} rx={9} ry={5} fill={FACE} {...S} transform="rotate(25 80 48)" />
      <Ellipse cx={50} cy={52} rx={18} ry={20} fill={FACE} {...S} />
      {/* wool tuft on top of head */}
      <Path d="M36 38 C34 30 42 26 46 30 C48 24 56 24 56 30 C62 26 68 32 64 38 Z" fill={C} {...S} />
      <Cheeks x1={39} x2={61} y={60} r={3.2} />
      <Eyes x1={43} x2={57} y={50} r={3.6} />
      <Smile cx={50} cy={62} w={4} />
    </Art>
  );
}
