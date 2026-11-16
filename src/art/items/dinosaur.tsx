import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;
const PLATE = tone(COLORS.green, -0.2);

export default function Dinosaur({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* back plates */}
      <Path d="M46 50 L54 38 L62 48 Z M62 48 L70 38 L76 50 Z M76 52 L86 46 L86 60 Z" fill={PLATE} {...S} />
      {/* tail */}
      <Path d="M78 66 C88 68 94 74 95 84 C86 84 78 80 70 76 Z" fill={C} {...S} />
      {/* legs */}
      <Path d="M40 76 V86 C40 90 42 92 46 92 H50 C54 92 56 90 56 86 V76 Z" fill={C} {...S} />
      <Path d="M64 76 V86 C64 90 66 92 70 92 H74 C78 92 80 90 80 86 V76 Z" fill={C} {...S} />
      {/* body */}
      <Ellipse cx={60} cy={66} rx={24} ry={17} fill={C} {...S} />
      <Ellipse cx={56} cy={72} rx={12} ry={7} fill={tone(C, 0.4)} />
      {/* neck joins body (stroke only on the sides) */}
      <Path d="M24 40 C24 50 30 62 40 68 L52 58 C44 54 40 46 40 38 Z" fill={C} />
      <Path d="M24 40 C24 50 30 62 40 68 M52 56 C44 52 40 46 40 38" fill="none" {...S} />
      {/* big head */}
      <Path d="M6 28 C6 15 16 8 28 8 C40 8 48 16 48 27 C48 39 40 46 28 46 C16 46 6 41 6 28 Z" fill={C} {...S} />
      <Path d="M14 20 C16 16 20 13 25 12" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={28} cy={26} gap={16} eyeR={3.6} mouthDy={8} />
    </Art>
  );
}
