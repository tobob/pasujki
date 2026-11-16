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
      <Circle cx={50} cy={54} r={29} fill={C} {...S} />
      <Ellipse cx={50} cy={64} rx={11} ry={8} fill={tone(C, 0.5)} />
      <Cheeks x1={33} x2={67} y={60} />
      <Eyes x1={41} x2={59} y={48} r={3.8} />
      <Path d="M46 58 H54 L50 62 Z" fill={OUT} {...S3} />
      <Path d="M50 62 V65 M45 67 Q50 70 50 65 Q50 70 55 67" {...L3} />
    </Art>
  );
}
