import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, L3, OUT, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Owl({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* body with ear tufts */}
      <Path d="M22 14 L36 24 C44 22 56 22 64 24 L78 14 C82 28 84 40 84 54 C84 76 70 92 50 92 C30 92 16 76 16 54 C16 40 18 28 22 14 Z" fill={C} {...S} />
      {/* belly */}
      <Ellipse cx={50} cy={72} rx={20} ry={17} fill={tone(C, 0.5)} />
      <Path d="M42 66 Q45 69 48 66 M52 66 Q55 69 58 66 M46 76 Q49 79 52 76 M40 76 Q42 78 44 76 M56 76 Q58 78 60 76" {...L3} strokeWidth={2.5} stroke={tone(C, 0.1)} />
      {/* wings */}
      <Path d="M18 52 C10 62 14 76 24 80" {...L3} strokeWidth={4} />
      <Path d="M82 52 C90 62 86 76 76 80" {...L3} strokeWidth={4} />
      {/* big eyes */}
      <Circle cx={37} cy={42} r={12} fill={COLORS.white} {...S} />
      <Circle cx={63} cy={42} r={12} fill={COLORS.white} {...S} />
      <Circle cx={38} cy={43} r={5.5} fill={OUT} />
      <Circle cx={62} cy={43} r={5.5} fill={OUT} />
      <Circle cx={40} cy={41} r={1.8} fill="#FFFFFF" />
      <Circle cx={64} cy={41} r={1.8} fill="#FFFFFF" />
      <Cheeks x1={28} x2={72} y={58} />
      {/* beak */}
      <Path d="M45 52 L55 52 L50 60 Z" fill={COLORS.orange} {...S3} />
      {/* feet */}
      <Path d="M40 92 V96 M60 92 V96" {...L3} stroke={COLORS.orange} strokeWidth={5} />
    </Art>
  );
}
