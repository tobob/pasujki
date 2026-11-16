import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

/** Cat: chunky sitting kitty, big head, pointed ears, curly tail. */
export default function Cat({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M68 84 C86 84 92 70 86 60" fill="none" stroke={OUT} strokeWidth={12} strokeLinecap="round" />
      <Path d="M68 84 C86 84 92 70 86 60" fill="none" stroke={C} strokeWidth={5} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={50} cy={78} rx={22} ry={15} fill={C} {...S} />
      <Ellipse cx={50} cy={80} rx={11} ry={9} fill={tone(C, 0.5)} />
      {/* paws */}
      <Ellipse cx={41} cy={90} rx={7} ry={4.5} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={59} cy={90} rx={7} ry={4.5} fill={C} {...S} strokeWidth={3} />
      {/* head + ears */}
      <Path
        d="M16 44 C16 32 19 20 24 10 C31 13 37 18 41 23 C47 22 53 22 59 23 C63 18 69 13 76 10 C81 20 84 32 84 44 C84 59 70 67 50 67 C30 67 16 59 16 44 Z"
        fill={C}
        {...S}
      />
      <Path d="M26 19 L28 29 L35 25 Z" fill={tone(C, 0.5)} />
      <Path d="M74 19 L72 29 L65 25 Z" fill={tone(C, 0.5)} />
      {/* soft shade + highlight */}
      <Path d="M22 50 C26 60 38 64 50 64 C62 64 74 60 78 50" fill="none" stroke={tone(C, -0.1)} strokeWidth={5} strokeLinecap="round" />
      <Path d="M24 36 C25 31 27 28 30 26" fill="none" stroke={tone(C, 0.4)} strokeWidth={4} strokeLinecap="round" />
      {/* forehead stripes */}
      <Path d="M50 27 V33 M43 28 L44 33 M57 28 L56 33" {...L3} stroke={tone(C, -0.22)} />
      <Face cx={50} cy={44} gap={22} eyeR={4.4} mouthDy={9} />
      {/* nose + whiskers */}
      <Path d="M47.5 49 H52.5 L50 51.5 Z" {...L3} fill={OUT} strokeWidth={2} />
      <Path d="M26 50 H17 M27 55 L19 58 M74 50 H83 M73 55 L81 58" {...L3} strokeWidth={2} />
    </Art>
  );
}
