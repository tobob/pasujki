import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.grey;
const PINK = tone(COLORS.pink, 0.3);

/** Mouse: huge round ears, little body, long curly pink tail. */
export default function Mouse({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M66 84 C80 88 90 82 88 72 C86 64 78 66 80 72" fill="none" stroke={OUT} strokeWidth={9} strokeLinecap="round" />
      <Path d="M66 84 C80 88 90 82 88 72 C86 64 78 66 80 72" fill="none" stroke={PINK} strokeWidth={3.5} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={50} cy={80} rx={20} ry={13} fill={C} {...S} />
      <Ellipse cx={50} cy={82} rx={10} ry={8} fill={tone(C, 0.5)} />
      <Ellipse cx={42} cy={91} rx={6} ry={3.6} fill={PINK} {...S} strokeWidth={3} />
      <Ellipse cx={58} cy={91} rx={6} ry={3.6} fill={PINK} {...S} strokeWidth={3} />
      {/* ears */}
      <Circle cx={24} cy={26} r={17} fill={C} {...S} />
      <Circle cx={76} cy={26} r={17} fill={C} {...S} />
      <Circle cx={24} cy={27} r={10} fill={PINK} />
      <Circle cx={76} cy={27} r={10} fill={PINK} />
      {/* head */}
      <Ellipse cx={50} cy={48} rx={25} ry={22} fill={C} {...S} />
      <Path d="M32 42 C33 37 36 33 40 31" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={50} cy={46} gap={20} eyeR={4.4} mouthDy={10} />
      <Circle cx={50} cy={53} r={3.4} fill={COLORS.pink} {...S} strokeWidth={2} />
      <Path d="M32 54 H22 M33 59 L24 62 M68 54 H78 M67 59 L76 62" {...L3} strokeWidth={2} />
    </Art>
  );
}
