import { Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.white;

/** Hen: chunky round hen, red comb, three soft tail scallops. */
export default function Hen({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs */}
      <Path d="M44 80 V90 M39 90 H49 M58 80 V90 M53 90 H63" {...L3} stroke={COLORS.orange} strokeWidth={4} />
      {/* tail: three rounded scallops */}
      <Path d="M42 46 C30 50 16 48 12 40 A8 8 0 0 1 16 28 A8 8 0 0 1 25 17 A8 8 0 0 1 38 14 Z" fill={C} {...S} />
      {/* comb (behind head) */}
      <Path d="M56 18 C54 10 60 6 64 10 C66 4 74 5 73 12 C79 11 81 18 76 21 Z" fill={COLORS.red} {...S} />
      {/* body + head in one round shape */}
      <Path d="M22 56 C22 42 32 36 44 38 C44 26 52 17 63 17 C74 17 82 26 82 36 C82 42 80 46 82 54 C84 72 70 84 52 84 C34 84 22 72 22 56 Z" fill={C} {...S} />
      <Path d="M28 66 C34 78 44 82 54 82" fill="none" stroke={tone(COLORS.grey, 0.55)} strokeWidth={5} strokeLinecap="round" />
      {/* wing */}
      <Path d="M36 58 C42 50 58 50 62 58 C60 68 44 72 36 58 Z" {...S3} fill={tone(COLORS.grey, 0.6)} />
      {/* beak + wattle */}
      <Path d="M81 30 L91 34 L81 38 Z" fill={COLORS.yellow} {...S3} />
      <Path d="M78 40 C82 40 84 44 82 47 C79 49 76 46 78 40 Z" fill={COLORS.red} {...S3} />
      <Cheeks x1={72} x2={72} y={38} r={3.6} />
      <Eyes x1={70} x2={70} y={29} r={4} />
    </Art>
  );
}
