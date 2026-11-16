import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L, S, S3, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.orange;
const B = tone(COLORS.yellow, 0.45);

export default function Snail({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* body */}
      <Path d="M14 86 C10 86 8 82 10 78 C12 74 14 60 16 52 C18 40 36 40 36 52 L36 72 L90 76 C94 78 94 86 90 86 Z" fill={B} {...S} />
      {/* eye stalks */}
      <Path d="M20 44 L14 28 M30 44 L34 28" {...L} />
      <Circle cx={14} cy={26} r={4} fill={B} {...S3} />
      <Circle cx={34} cy={26} r={4} fill={B} {...S3} />
      <Cheeks x1={17} x2={33} y={60} r={2.6} />
      <Eyes x1={20} x2={30} y={53} r={3} />
      <Smile cx={25} cy={60} w={3} />
      {/* shell */}
      <Circle cx={62} cy={52} r={28} fill={C} {...S} />
      <Path d="M62 52 C62 46 70 46 70 52 C70 60 56 62 54 52 C52 40 72 38 76 50 C80 64 62 74 50 66" {...L} stroke={tone(C, -0.3)} />
      <Path d="M44 36 C48 30 54 28 58 28" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
