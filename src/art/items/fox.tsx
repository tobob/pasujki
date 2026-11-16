import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.orange;
const W = COLORS.white;

export default function Fox({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M66 84 C86 86 96 70 92 52 C90 44 84 42 80 48 C82 62 76 72 64 74 Z" fill={C} {...S} />
      <Path d="M92 52 C90 44 84 42 80 48 C81 52 82 56 81 60 C86 60 90 57 92 52 Z" fill={W} {...S3} />
      {/* body */}
      <Ellipse cx={50} cy={78} rx={20} ry={15} fill={C} {...S} />
      <Ellipse cx={50} cy={81} rx={10} ry={10} fill={W} />
      {/* head with pointy ears */}
      <Path
        d="M16 44 C16 30 18 18 22 8 C30 12 36 18 40 24 C46 23 54 23 60 24 C64 18 70 12 78 8 C82 18 84 30 84 44 C84 58 68 68 50 68 C32 68 16 58 16 44 Z"
        fill={C}
        {...S}
      />
      <Path d="M25 18 L27 28 L34 25 Z" fill={OUT} opacity={0.75} />
      <Path d="M75 18 L73 28 L66 25 Z" fill={OUT} opacity={0.75} />
      {/* white cheeks/muzzle */}
      <Path d="M20 48 C28 48 40 52 50 60 C60 52 72 48 80 48 C76 60 64 68 50 68 C36 68 24 60 20 48 Z" fill={W} />
      <Path d="M16 44 C16 58 32 68 50 68 C68 68 84 58 84 44" fill="none" {...S} />
      <Face cx={50} cy={42} gap={20} eyeR={3.8} mouthDy={13} />
      <Ellipse cx={50} cy={53} rx={3.6} ry={2.6} fill={OUT} />
      <Path d="M38 26 C42 24 46 23 50 23" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
