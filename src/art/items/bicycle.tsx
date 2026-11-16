import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, OUT, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;
const frame = 'M21 68 L40 40 H68 L79 68 M40 40 L50 68 H21 M50 68 L68 40';

export default function Bicycle({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* wheels: soft pale-green fill so the bike reads green, chunky tyres */}
      <Circle cx={21} cy={68} r={16} fill={tone(C, 0.7)} stroke={OUT} strokeWidth={6} />
      <Circle cx={79} cy={68} r={16} fill={tone(C, 0.7)} stroke={OUT} strokeWidth={6} />
      <Circle cx={21} cy={68} r={4} fill={OUT} />
      <Circle cx={79} cy={68} r={4} fill={OUT} />
      {/* thick frame */}
      <Path d={frame} fill="none" stroke={OUT} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={frame} fill="none" stroke={C} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
            {/* seat post + seat, handlebars */}
      <Path d="M40 38 L37 30" fill="none" stroke={OUT} strokeWidth={6} strokeLinecap="round" />
      <Path d="M29 28 C33 24 43 24 47 28 C43 31 33 31 29 28 Z" fill={OUT} {...S} strokeWidth={3} />
      <Path d="M67 40 L64 26 C68 23 74 23 78 26" fill="none" stroke={OUT} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={50} cy={68} r={7} fill={C} {...S} strokeWidth={3} />
    </Art>
  );
}
