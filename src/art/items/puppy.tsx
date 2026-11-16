import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.brown;

export default function Puppy({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* small sitting body */}
      <Ellipse cx={50} cy={82} rx={17} ry={11} fill={C} {...S} />
      <Ellipse cx={42} cy={90} rx={6} ry={4} fill={tone(C, 0.45)} {...S} strokeWidth={3} />
      <Ellipse cx={58} cy={90} rx={6} ry={4} fill={tone(C, 0.45)} {...S} strokeWidth={3} />
      {/* big round head */}
      <Ellipse cx={50} cy={46} rx={30} ry={28} fill={C} {...S} />
      {/* patch over eye */}
      <Ellipse cx={61} cy={40} rx={9} ry={8} fill={tone(C, -0.25)} />
      {/* floppy ears */}
      <Path d="M26 26 C14 24 8 38 10 50 C12 58 20 58 24 50 C27 42 29 32 26 26 Z" fill={tone(C, -0.3)} {...S} />
      <Path d="M74 26 C86 24 92 38 90 50 C88 58 80 58 76 50 C73 42 71 32 74 26 Z" fill={tone(C, -0.3)} {...S} />
      <Ellipse cx={50} cy={58} rx={12} ry={9} fill={tone(C, 0.45)} {...S} strokeWidth={3} />
      <Ellipse cx={50} cy={53.5} rx={4.5} ry={3.2} fill={OUT} />
      <Face cx={50} cy={41} gap={22} eyeR={4.2} mouthDy={18} cheeks />
      <Path d="M47.5 63 Q50 70 52.5 63" fill="#E98A9B" stroke={OUT} strokeWidth={2.5} strokeLinejoin="round" />
    </Art>
  );
}
