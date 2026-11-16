import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;
const PEAS = [26, 42, 58, 74];

export default function Peas({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* open pod (inside shown lighter) */}
      <Path d="M6 50 C16 28 62 22 94 36 C92 60 72 78 46 78 C24 78 10 66 6 50 Z" fill={C} {...S} />
      <Path d="M14 50 C26 36 60 32 86 40 C82 56 68 66 48 66 C30 66 18 60 14 50 Z" fill={tone(C, 0.45)} />
      {/* peas */}
      {PEAS.map((x, i) => (
        <Circle key={i} cx={x} cy={52 - i * 1.2} r={9} fill={C} {...S} />
      ))}
      {PEAS.map((x, i) => (
        <Circle key={`h${i}`} cx={x - 3} cy={49 - i * 1.2} r={2.6} fill={tone(C, 0.55)} />
      ))}
      {/* stem */}
      <Path d="M94 36 C96 30 94 24 90 20" fill="none" stroke={tone(C, -0.25)} strokeWidth={4} strokeLinecap="round" />
    </Art>
  );
}
