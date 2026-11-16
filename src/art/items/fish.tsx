import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, S3, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Fish({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M70 50 L92 30 C96 42 96 58 92 70 Z" fill={tone(C, -0.12)} {...S} />
      {/* top fin */}
      <Path d="M36 30 C42 18 58 16 64 30 Z" fill={tone(C, -0.12)} {...S} />
      {/* body */}
      <Path d="M8 50 C8 34 26 24 44 24 C62 24 74 38 76 50 C74 62 62 76 44 76 C26 76 8 66 8 50 Z" fill={C} {...S} />
      <Path d="M48 34 C56 40 56 60 48 66" {...L3} stroke={tone(C, -0.25)} />
      <Path d="M42 62 C46 68 54 68 56 64" {...L3} stroke={tone(C, 0.4)} strokeWidth={4} />
      <Cheeks x1={22} x2={22} y={56} />
      <Eyes x1={26} x2={26} y={44} r={4.2} />
      <Smile cx={17} cy={56} w={4} />
      {/* bubbles */}
      <Circle cx={10} cy={20} r={4} fill="#FFFFFF" {...S3} strokeWidth={2.5} />
      <Circle cx={18} cy={10} r={2.6} fill="#FFFFFF" {...S3} strokeWidth={2.5} />
    </Art>
  );
}
