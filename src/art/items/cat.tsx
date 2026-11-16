import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, L3, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.orange;

export default function Cat({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* tail */}
      <Path d="M74 80 C92 78 94 60 84 54" {...S} fill="none" stroke={OUT} strokeWidth={11} />
      <Path d="M74 80 C92 78 94 60 84 54" fill="none" stroke={C} strokeWidth={4} strokeLinecap="round" />
      {/* body */}
      <Ellipse cx={52} cy={76} rx={24} ry={17} fill={C} {...S} />
      <Ellipse cx={52} cy={80} rx={12} ry={9} fill={tone(C, 0.45)} />
      {/* head with ears */}
      <Path
        d="M22 50 C20 38 22 26 26 14 C32 18 38 24 41 28 C46 27 54 27 59 28 C62 24 68 18 74 14 C78 26 80 38 78 50 C76 62 64 68 50 68 C36 68 24 62 22 50 Z"
        fill={C}
        {...S}
      />
      <Path d="M28 22 L30 31 L36 28 Z" fill={tone(C, 0.45)} />
      <Path d="M72 22 L70 31 L64 28 Z" fill={tone(C, 0.45)} />
      {/* stripes on forehead */}
      <Path d="M50 30 V36 M43 31 L44 36 M57 31 L56 36" {...L3} stroke={tone(C, -0.25)} />
      <Face cx={50} cy={46} gap={18} mouthDy={9} />
      {/* nose + whiskers */}
      <Path d="M47.5 51 H52.5 L50 53.5 Z" {...L3} fill={OUT} />
      <Path d="M30 52 H20 M31 57 L22 60 M70 52 H80 M69 57 L78 60" {...L3} strokeWidth={2} />
    </Art>
  );
}
