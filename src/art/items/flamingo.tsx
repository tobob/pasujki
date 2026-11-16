import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Face, L, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.pink;
const LEG = tone(C, -0.25);

/** Flamingo: round fluffy body on one leg, curvy neck, big round head. */
export default function Flamingo({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* one leg + tucked leg */}
      <Path d="M56 66 V93 M50 93 H62" {...L} stroke={LEG} strokeWidth={5} />
      <Path d="M60 66 L70 75 L60 79" {...L} stroke={LEG} strokeWidth={5} />
      {/* body */}
      <Path d="M32 50 C32 36 46 32 62 34 C80 36 92 44 90 54 C86 68 66 72 52 68 C40 66 32 62 32 50 Z" fill={C} {...S} />
      <Path d="M52 46 C60 43 72 45 78 51" fill="none" stroke={tone(C, -0.15)} strokeWidth={3} strokeLinecap="round" />
      <Path d="M44 40 C50 37 56 36 62 37" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      {/* S-neck */}
      <Path d="M38 48 C28 40 24 34 28 26" fill="none" stroke={OUT} strokeWidth={15} strokeLinecap="round" />
      <Path d="M38 48 C28 40 24 34 28 26" fill="none" stroke={C} strokeWidth={7} strokeLinecap="round" />
      {/* beak */}
      <Path d="M14 18 C7 20 6 26 8 31 L16 24 Z" fill={COLORS.black} {...S} strokeWidth={3} />
      {/* big head */}
      <Circle cx={26} cy={18} r={13} fill={C} {...S} />
      <Face cx={28} cy={17} gap={10} eyeR={3.2} mouthDy={6} />
    </Art>
  );
}
