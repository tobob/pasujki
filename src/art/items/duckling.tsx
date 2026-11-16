import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

/** Duckling: the duck's baby — head almost as big as the body, little tuft. */
export default function Duckling({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M40 84 L34 92 H48 Z M58 84 L52 92 H66 Z" fill={COLORS.orange} {...S3} />
      {/* body */}
      <Path d="M14 60 C20 64 24 62 30 62 L56 62 C74 62 82 70 78 78 C74 88 58 89 46 88 C28 87 16 78 14 60 Z" fill={C} {...S} />
      <Path d="M32 70 C40 80 54 80 60 72 C50 74 42 73 32 70 Z" {...S3} fill={tone(C, -0.12)} />
      {/* big head */}
      <Ellipse cx={54} cy={38} rx={25} ry={24} fill={C} {...S} />
      <Path d="M38 30 C39 25 43 21 47 19" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      {/* tuft */}
      <Path d="M52 14 C50 8 54 5 56 6 M56 14 C58 8 62 8 63 10" {...L3} />
      {/* bill */}
      <Path d="M74 40 C82 37 92 39 92 44 C92 49 82 50 74 47 Z" fill={COLORS.orange} {...S} />
      <Cheeks x1={64} x2={64} y={48} r={3.8} />
      <Eyes x1={62} x2={62} y={34} r={4.8} />
    </Art>
  );
}
