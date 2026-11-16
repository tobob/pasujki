import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Kitten({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail curled round */}
      <Path d="M66 86 C84 88 90 74 82 68" fill="none" stroke={OUT} strokeWidth={10} strokeLinecap="round" />
      <Path d="M66 86 C84 88 90 74 82 68" fill="none" stroke={C} strokeWidth={3.5} strokeLinecap="round" />
      {/* small sitting body */}
      <Ellipse cx={50} cy={80} rx={18} ry={13} fill={C} {...S} />
      <Ellipse cx={42} cy={90} rx={6} ry={4} fill={tone(C, 0.45)} {...S} strokeWidth={3} />
      <Ellipse cx={58} cy={90} rx={6} ry={4} fill={tone(C, 0.45)} {...S} strokeWidth={3} />
      {/* big head with small ears */}
      <Path
        d="M18 46 C18 34 20 24 24 14 C30 18 36 22 40 24 C46 23 54 23 60 24 C64 22 70 18 76 14 C80 24 82 34 82 46 C82 62 68 70 50 70 C32 70 18 62 18 46 Z"
        fill={C}
        {...S}
      />
      <Path d="M26 21 L28 29 L34 26 Z" fill={tone(C, 0.45)} />
      <Path d="M74 21 L72 29 L66 26 Z" fill={tone(C, 0.45)} />
      <Path d="M50 28 V33" {...L3} stroke={tone(C, -0.25)} />
      <Face cx={50} cy={44} gap={22} eyeR={4.4} mouthDy={10} />
      <Path d="M47.5 50 H52.5 L50 52.5 Z" {...L3} fill={OUT} />
      <Path d="M28 52 H18 M29 57 L20 60 M72 52 H82 M71 57 L80 60" {...L3} strokeWidth={2} />
    </Art>
  );
}
