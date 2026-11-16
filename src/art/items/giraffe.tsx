import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;
const P = COLORS.brown;
const HI = tone(C, 0.45);
const LEGS = [46, 57, 68, 79];

/** Giraffe: big round head on a sturdy neck, small chunky body. Spots stay inside the outline and off the face. */
export default function Giraffe({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* stubby legs */}
      {LEGS.map((x) => (
        <Path key={x} d={`M${x} 80 V90`} stroke={OUT} strokeWidth={12} strokeLinecap="round" />
      ))}
      {LEGS.map((x) => (
        <Path key={`f${x}`} d={`M${x} 80 V90`} stroke={C} strokeWidth={4.5} strokeLinecap="round" />
      ))}
      {/* tail */}
      <Path d="M84 70 C90 72 92 78 90 83" fill="none" {...S3} />
      {/* long neck, under body and head */}
      <Path d="M33 76 C31 62 28 50 26 38 L47 36 C47 48 50 58 57 68 Z" fill={C} {...S} />
      {/* body */}
      <Ellipse cx={62} cy={73} rx={24} ry={13} fill={C} {...S} />
      <Path d="M44 80 C52 85 70 86 80 80" fill="none" stroke={tone(C, -0.1)} strokeWidth={4} strokeLinecap="round" />
      {/* cover the neck/body join so it reads as one animal */}
      <Path d="M36.5 72 C40 64 49 61 55 65 L52 78 L38 78 Z" fill={C} />
      {/* spots */}
      <Circle cx={37} cy={52} r={3.8} fill={P} />
      <Circle cx={42} cy={64} r={3.4} fill={P} />
      <Circle cx={62} cy={70} r={4.4} fill={P} />
      <Circle cx={75} cy={74} r={3.4} fill={P} />
      {/* ossicones */}
      <Path d="M27 17 V9 M41 17 V9" fill="none" {...S} />
      <Circle cx={27} cy={8} r={3.8} fill={P} {...S3} />
      <Circle cx={41} cy={8} r={3.8} fill={P} {...S3} />
      {/* ears */}
      <Ellipse cx={12} cy={25} rx={8} ry={4.5} fill={C} {...S} transform="rotate(-20 12 25)" />
      <Ellipse cx={56} cy={25} rx={8} ry={4.5} fill={C} {...S} transform="rotate(20 56 25)" />
      {/* big round head */}
      <Ellipse cx={34} cy={31} rx={20} ry={17} fill={C} {...S} />
      <Path d="M21 24 C23 19 27 16 32 15" fill="none" stroke={HI} strokeWidth={4} strokeLinecap="round" />
      <Ellipse cx={34} cy={40} rx={11} ry={6.5} fill={tone(C, 0.4)} />
      <Face cx={34} cy={30} gap={15} eyeR={3.7} mouthDy={10} />
    </Art>
  );
}
