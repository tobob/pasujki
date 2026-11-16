import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const FACE = tone(COLORS.brown, 0.72);
const LEG = tone(COLORS.black, 0.15);
const PUFFS: [number, number, number][] = [
  [30, 70, 10], [42, 64, 10], [58, 64, 10], [70, 70, 10], [64, 82, 9], [36, 82, 9], [50, 84, 9],
];

/** Lamb: the sheep's baby — big face and woolly cap, small fluffy body. */
export default function Lamb({ size }: ArtProps) {
  return (
    <Art size={size}>
      {[38, 62].map((x) => (
        <Path key={x} d={`M${x} 86 V92`} stroke={OUT} strokeWidth={10} strokeLinecap="round" />
      ))}
      {[38, 62].map((x) => (
        <Path key={`l${x}`} d={`M${x} 86 V92`} stroke={LEG} strokeWidth={4} strokeLinecap="round" />
      ))}
      {/* fluffy body */}
      {PUFFS.map(([x, y, r], i) => (
        <Circle key={i} cx={x} cy={y} r={r} fill={C} {...S} />
      ))}
      {PUFFS.map(([x, y, r], i) => (
        <Circle key={`f${i}`} cx={x} cy={y} r={r - 2} fill={C} />
      ))}
      <Ellipse cx={50} cy={74} rx={20} ry={9} fill={C} />
      {/* ears */}
      <Ellipse cx={20} cy={40} rx={12} ry={6} fill={FACE} {...S} transform="rotate(20 20 40)" />
      <Ellipse cx={80} cy={40} rx={12} ry={6} fill={FACE} {...S} transform="rotate(-20 80 40)" />
      {/* big face */}
      <Ellipse cx={50} cy={44} rx={24} ry={22} fill={FACE} {...S} />
      {/* woolly cap */}
      {[[34, 26, 9], [44, 20, 10], [56, 20, 10], [66, 26, 9]].map(([x, y, r], i) => (
        <Circle key={`c${i}`} cx={x} cy={y} r={r} fill={C} {...S} />
      ))}
      {[[34, 26, 9], [44, 20, 10], [56, 20, 10], [66, 26, 9]].map(([x, y, r], i) => (
        <Circle key={`cf${i}`} cx={x} cy={y} r={r - 2} fill={C} />
      ))}
      <Ellipse cx={50} cy={27} rx={18} ry={6} fill={C} />
      <Path d="M36 22 C38 18 41 16 44 15" fill="none" stroke={tone(COLORS.grey, 0.55)} strokeWidth={3} strokeLinecap="round" />
      <Cheeks x1={34} x2={66} y={52} r={4} />
      <Eyes x1={41} x2={59} y={43} r={4.6} />
      <Smile cx={50} cy={53} w={4.5} d={2.4} />
    </Art>
  );
}
