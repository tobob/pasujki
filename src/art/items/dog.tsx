import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Dog({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M72 78 C86 74 88 62 84 56" fill="none" stroke={OUT} strokeWidth={11} strokeLinecap="round" />
      <Path d="M72 78 C86 74 88 62 84 56" fill="none" stroke={C} strokeWidth={4} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={50} cy={78} rx={24} ry={15} fill={C} {...S} />
      <Ellipse cx={50} cy={82} rx={11} ry={8} fill={tone(C, 0.45)} />
      {/* collar */}
      <Path d="M32 64 Q50 74 68 64" fill="none" stroke={OUT} strokeWidth={10} strokeLinecap="round" />
      <Path d="M32 64 Q50 74 68 64" fill="none" stroke={COLORS.red} strokeWidth={4} strokeLinecap="round" />
      {/* head */}
      <Ellipse cx={50} cy={42} rx={26} ry={25} fill={C} {...S} />
      {/* floppy ears */}
      <Path d="M28 26 C18 26 12 40 14 54 C16 62 24 62 28 54 C31 46 32 34 28 26 Z" fill={tone(C, -0.3)} {...S} />
      <Path d="M72 26 C82 26 88 40 86 54 C84 62 76 62 72 54 C69 46 68 34 72 26 Z" fill={tone(C, -0.3)} {...S} />
      {/* muzzle */}
      <Ellipse cx={50} cy={54} rx={13} ry={10} fill={tone(C, 0.45)} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={49} rx={5} ry={3.6} fill={OUT} />
      <Face cx={50} cy={38} gap={20} mouthDy={17} cheeks={false} />
    </Art>
  );
}
