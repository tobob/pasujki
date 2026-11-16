import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L3, S, S3, Smile, type ArtProps } from '../kit';

const C = COLORS.yellow;
const P = COLORS.brown;

export default function Giraffe({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* body + legs */}
      <Path d="M38 94 V78 M70 94 V78" {...S} strokeWidth={11} fill="none" />
      <Path d="M38 94 V78 M70 94 V78" stroke={C} strokeWidth={4} strokeLinecap="round" fill="none" />
      <Ellipse cx={56} cy={72} rx={26} ry={13} fill={C} {...S} />
      {/* neck */}
      <Path d="M34 70 L30 34 L46 34 L52 66 Z" fill={C} {...S} />
      {/* spots */}
      <Circle cx={50} cy={70} r={4.5} fill={P} />
      <Circle cx={64} cy={68} r={4} fill={P} />
      <Circle cx={74} cy={75} r={3.2} fill={P} />
      <Circle cx={40} cy={58} r={3.5} fill={P} />
      <Circle cx={37} cy={45} r={3} fill={P} />
      {/* horns */}
      <Path d="M30 20 V10 M42 20 V10" {...L3} />
      <Circle cx={30} cy={9} r={3.5} fill={P} {...S3} />
      <Circle cx={42} cy={9} r={3.5} fill={P} {...S3} />
      {/* ears */}
      <Ellipse cx={22} cy={22} rx={7} ry={4} fill={C} {...S} transform="rotate(-25 22 22)" />
      <Ellipse cx={50} cy={22} rx={7} ry={4} fill={C} {...S} transform="rotate(25 50 22)" />
      {/* head */}
      <Path d="M24 28 C24 18 48 18 48 28 C48 34 46 44 36 44 C26 44 24 34 24 28 Z" fill={C} {...S} />
      <Cheeks x1={27} x2={45} y={34} r={2.8} />
      <Eyes x1={31} x2={41} y={28} r={3} />
      <Smile cx={36} cy={37} w={3.5} />
    </Art>
  );
}
