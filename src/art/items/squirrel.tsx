import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

/** Squirrel: huge fluffy tail, chubby body, big head, holding an acorn. */
export default function Squirrel({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* big fluffy tail */}
      <Path d="M60 88 C86 88 95 70 91 50 C89 36 93 24 83 12 C73 4 58 10 62 22 C66 32 76 34 74 48 C72 62 62 66 58 76 Z" fill={C} {...S} />
      <Path d="M75 17 C81 21 83 29 83 37" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={42} cy={76} rx={19} ry={17} fill={C} {...S} />
      <Ellipse cx={42} cy={80} rx={10} ry={10} fill={tone(C, 0.55)} />
      {/* acorn in paws */}
      <Ellipse cx={42} cy={72} rx={6} ry={7} fill={tone(COLORS.brown, 0.15)} {...S} strokeWidth={3} />
      <Path d="M35 68 C35 62 49 62 49 68 Z" fill={tone(COLORS.brown, -0.2)} {...S} strokeWidth={3} />
      {/* ears */}
      <Path d="M20 24 L18 8 L32 17 Z" fill={C} {...S} />
      <Path d="M52 17 L60 6 L62 24 Z" fill={C} {...S} />
      {/* big head */}
      <Ellipse cx={40} cy={38} rx={23} ry={21} fill={C} {...S} />
      <Path d="M22 32 C24 26 28 22 33 20" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Ellipse cx={40} cy={48} rx={11} ry={7} fill={tone(C, 0.55)} />
      <Face cx={40} cy={39} gap={17} eyeR={4.2} mouthDy={9} />
    </Art>
  );
}
