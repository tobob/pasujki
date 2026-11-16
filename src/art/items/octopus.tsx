import { Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

/** Chunky short legs with curled tips: [x, curl direction]. */
const LEGS: [number, number][] = [[20, -1], [36, -1], [64, 1], [80, 1], [50, 1]];

export default function Octopus({ size }: ArtProps) {
  return (
    <Art size={size}>
      {LEGS.map(([x, d], i) => (
        <Path
          key={i}
          d={`M${x - 8} 56 C${x - 8} 72 ${x - 4} 82 ${x + d * 4} 88 C${x + d * 10} 93 ${x + d * 16} 86 ${x + d * 10} 82 C${x + d * 6} 80 ${x + 8} 74 ${x + 8} 56 Z`}
          fill={C}
          {...S}
        />
      ))}
      {/* head */}
      <Path d="M14 46 C14 24 30 8 50 8 C70 8 86 24 86 46 C86 64 70 74 50 74 C30 74 14 64 14 46 Z" fill={C} {...S} />
      <Path d="M24 34 C26 24 32 18 40 15" fill="none" stroke={tone(C, 0.35)} strokeWidth={5} strokeLinecap="round" />
      <Face cx={50} cy={46} gap={22} eyeR={4.2} mouthDy={10} />
    </Art>
  );
}
