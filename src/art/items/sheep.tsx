import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const FACE = tone(COLORS.brown, 0.72);
const LEG = tone(COLORS.black, 0.15);
/** Puffs around the fleece edge (cx, cy, r). */
const PUFFS: [number, number, number][] = [
  [24, 46, 12], [36, 34, 13], [52, 30, 13], [68, 34, 13], [80, 46, 12],
  [82, 62, 12], [70, 74, 12], [52, 77, 12], [34, 74, 12], [20, 62, 12],
];

/** Sheep: a cloud of wool on four short legs, soft cream face. */
export default function Sheep({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* legs */}
      {[32, 44, 58, 70].map((x) => (
        <Path key={x} d={`M${x} 80 V90`} stroke={OUT} strokeWidth={10} strokeLinecap="round" />
      ))}
      {[32, 44, 58, 70].map((x) => (
        <Path key={`l${x}`} d={`M${x} 80 V90`} stroke={LEG} strokeWidth={4} strokeLinecap="round" />
      ))}
      {/* fleece: outlined puffs, then fill over the inner lines */}
      {PUFFS.map(([x, y, r], i) => (
        <Circle key={i} cx={x} cy={y} r={r} fill={C} {...S} />
      ))}
      {PUFFS.map(([x, y, r], i) => (
        <Circle key={`f${i}`} cx={x} cy={y} r={r - 2} fill={C} />
      ))}
      <Ellipse cx={51} cy={55} rx={30} ry={22} fill={C} />
      <Path d="M28 42 C30 37 34 33 39 31" fill="none" stroke={tone(COLORS.grey, 0.55)} strokeWidth={3.5} strokeLinecap="round" />
      {/* ears */}
      <Ellipse cx={30} cy={50} rx={9} ry={5} fill={FACE} {...S} transform="rotate(25 30 50)" />
      <Ellipse cx={72} cy={50} rx={9} ry={5} fill={FACE} {...S} transform="rotate(-25 72 50)" />
      {/* face */}
      <Ellipse cx={51} cy={56} rx={15} ry={17} fill={FACE} {...S} />
      {/* wool tuft on head */}
      <Circle cx={45} cy={40} r={6} fill={C} {...S} strokeWidth={3} />
      <Circle cx={51} cy={38} r={6.5} fill={C} {...S} strokeWidth={3} />
      <Circle cx={57} cy={40} r={6} fill={C} {...S} strokeWidth={3} />
      <Ellipse cx={51} cy={43} rx={9} ry={3} fill={C} />
      <Cheeks x1={42} x2={60} y={62} r={3.2} />
      <Eyes x1={45} x2={57} y={54} r={3.6} />
      <Smile cx={51} cy={64} w={3.6} d={2.2} />
    </Art>
  );
}
