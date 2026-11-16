import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, OUT, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;
const P = COLORS.brown;
const HI = tone(C, 0.45);
const LEGS = [46, 57, 68, 79];

/** Giraffe: big round head on a long neck, small chunky body. */
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
      <Path d="M36 74 C34 62 30 50 26 40 L44 36 C46 48 50 58 56 68 Z" fill={C} {...S} />
      {/* body */}
      <Ellipse cx={62} cy={73} rx={24} ry={13} fill={C} {...S} />
      <Path d="M44 80 C52 85 70 86 80 80" fill="none" stroke={tone(C, -0.1)} strokeWidth={4} strokeLinecap="round" />
      {/* cover the neck/body join so it reads as one animal */}
      <Path d="M38 70 C42 64 50 62 54 66 L50 76 L40 76 Z" fill={C} />
      {/* spots */}
      <Circle cx={36} cy={52} r={3.6} fill={P} />
      <Circle cx={43} cy={63} r={3.4} fill={P} />
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
