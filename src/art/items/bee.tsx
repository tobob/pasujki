import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L, OUT, S, type ArtProps } from '../kit';

const C = COLORS.yellow;
const K = COLORS.black;

export default function Bee({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* wings */}
      <Ellipse cx={36} cy={26} rx={13} ry={17} fill="#E6F2FB" {...S} transform="rotate(-25 36 26)" />
      <Ellipse cx={64} cy={26} rx={13} ry={17} fill="#E6F2FB" {...S} transform="rotate(25 64 26)" />
      {/* stinger */}
      <Path d="M86 60 L96 62 L86 66 Z" fill={OUT} {...S} strokeWidth={2} />
      {/* body */}
      <Ellipse cx={52} cy={62} rx={36} ry={28} fill={C} {...S} />
      <Path d="M56 35 C62 46 62 78 56 89" fill="none" stroke={K} strokeWidth={8} />
      <Path d="M72 40 C77 50 77 74 72 84" fill="none" stroke={K} strokeWidth={8} />
      <Ellipse cx={52} cy={62} rx={36} ry={28} fill="none" {...S} />
      {/* face area */}
      <Face cx={34} cy={58} gap={14} mouthDy={8} />
      {/* antennae */}
      <Path d="M30 36 C26 28 22 26 18 26" {...L} strokeWidth={3} />
      <Circle cx={17} cy={26} r={3} fill={K} />
    </Art>
  );
}
