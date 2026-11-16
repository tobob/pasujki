import { Ellipse, Path } from 'react-native-svg';

import { Art, Cheeks, COLORS, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const K = COLORS.black;
const st = { fill: 'none', stroke: K, strokeWidth: 5, strokeLinecap: 'round' as const };

/** Zebra: round friendly head, soft stripes, mane tuft. */
export default function Zebra({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* ears */}
      <Path d="M28 32 C20 20 22 8 27 6 C34 10 39 20 39 28 Z" fill={C} {...S} />
      <Path d="M72 32 C80 20 78 8 73 6 C66 10 61 20 61 28 Z" fill={C} {...S} />
      <Path d="M28 24 C27 18 27 14 28 12" fill="none" stroke={tone(K, 0.5)} strokeWidth={3} strokeLinecap="round" />
      <Path d="M72 24 C73 18 73 14 72 12" fill="none" stroke={tone(K, 0.5)} strokeWidth={3} strokeLinecap="round" />
      {/* mane */}
      <Path d="M40 20 C40 12 44 8 50 8 C56 8 60 12 60 20 Z" fill={K} {...S} />
      {/* head */}
      <Path d="M50 16 C30 16 20 30 22 48 C23 60 26 68 28 76 C31 90 69 90 72 76 C74 68 77 60 78 48 C80 30 70 16 50 16 Z" fill={C} {...S} />
      {/* soft stripes */}
      <Path d="M23 36 C29 36 33 33 35 29" {...st} />
      <Path d="M77 36 C71 36 67 33 65 29" {...st} />
      <Path d="M24 52 C30 52 33 50 34 46" {...st} />
      <Path d="M76 52 C70 52 67 50 66 46" {...st} />
      <Path d="M44 22 C47 26 53 26 56 22" {...st} />
      {/* muzzle */}
      <Ellipse cx={50} cy={74} rx={20} ry={13} fill={tone(K, 0.65)} {...S} />
      <Ellipse cx={43} cy={72} rx={2.4} ry={3} fill={OUT} />
      <Ellipse cx={57} cy={72} rx={2.4} ry={3} fill={OUT} />
      <Smile cx={50} cy={79} w={5} />
      <Cheeks x1={30} x2={70} y={60} r={4} />
      <Eyes x1={39} x2={61} y={46} r={4.4} />
    </Art>
  );
}
