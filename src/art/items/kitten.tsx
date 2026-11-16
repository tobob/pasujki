import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

/** Kitten: like the cat but rounder, with an even bigger head and tiny body. */
export default function Kitten({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M64 86 C80 88 86 78 82 70" fill="none" stroke={OUT} strokeWidth={11} strokeLinecap="round" />
      <Path d="M64 86 C80 88 86 78 82 70" fill="none" stroke={C} strokeWidth={4} strokeLinecap="round" />
      {/* tiny body */}
      <Ellipse cx={50} cy={82} rx={17} ry={11} fill={C} {...S} />
      <Ellipse cx={42} cy={91} rx={6} ry={4} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={58} cy={91} rx={6} ry={4} fill={C} {...S} strokeWidth={3} />
      {/* big round head, small rounded ears */}
      <Path
        d="M12 46 C12 34 16 24 22 16 C29 17 35 21 39 25 C46 23 54 23 61 25 C65 21 71 17 78 16 C84 24 88 34 88 46 C88 62 72 72 50 72 C28 72 12 62 12 46 Z"
        fill={C}
        {...S}
      />
      <Path d="M23 23 L26 31 L32 27 Z" fill={tone(C, 0.5)} />
      <Path d="M77 23 L74 31 L68 27 Z" fill={tone(C, 0.5)} />
      <Path d="M18 54 C22 64 36 69 50 69 C64 69 78 64 82 54" fill="none" stroke={tone(C, -0.1)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M20 38 C21 33 23 30 26 28" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M50 29 V34 M44 30 L45 34 M56 30 L55 34" {...L3} stroke={tone(C, -0.22)} />
      <Face cx={50} cy={47} gap={24} eyeR={5} mouthDy={9} />
      <Path d="M47.5 52 H52.5 L50 54.5 Z" {...L3} fill={OUT} strokeWidth={2} />
      <Path d="M24 54 H16 M25 59 L18 62 M76 54 H84 M75 59 L82 62" {...L3} strokeWidth={2} />
    </Art>
  );
}
