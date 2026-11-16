import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, OUT, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;
const MANE = '#F2A93F'; // amber, halfway between COLORS.yellow and COLORS.orange
const N = 12;
const tufts = Array.from({ length: N }, (_, i) => (i * 2 * Math.PI) / N);

export default function Lion({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* mane: scalloped ring */}
      {tufts.map((a, i) => (
        <Circle key={i} cx={50 + Math.cos(a) * 31} cy={52 + Math.sin(a) * 31} r={10} fill={MANE} {...S} />
      ))}
      <Circle cx={50} cy={52} r={32} fill={MANE} />
      {/* ears */}
      <Circle cx={28} cy={30} r={9} fill={C} {...S} />
      <Circle cx={72} cy={30} r={9} fill={C} {...S} />
      {/* face */}
      <Circle cx={50} cy={54} r={30} fill={C} {...S} />
      <Path d="M30 42 C33 34 39 29 46 28" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Ellipse cx={50} cy={64} rx={11} ry={8} fill={tone(C, 0.5)} />
      <Cheeks x1={32} x2={68} y={61} r={4} />
      <Eyes x1={40} x2={60} y={49} r={4.4} />
      <Path d="M46 58 H54 L50 62 Z" fill={OUT} {...S3} />
      <Path d="M50 62 V65 M45 67 Q50 70 50 65 Q50 70 55 67" {...L3} />
    </Art>
  );
}
