import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, L, OUT, type ArtProps } from '../kit';

const C = COLORS.green;
const frame = 'M26 68 L42 42 H70 L74 68 M42 42 L54 68 H26 M54 68 L70 42';

export default function Bicycle({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Circle cx={24} cy={68} r={17} fill="none" stroke={OUT} strokeWidth={6} />
      <Circle cx={76} cy={68} r={17} fill="none" stroke={OUT} strokeWidth={6} />
      <Circle cx={24} cy={68} r={13} fill={COLORS.white} opacity={0.6} />
      <Circle cx={76} cy={68} r={13} fill={COLORS.white} opacity={0.6} />
      <Path d={frame} fill="none" stroke={OUT} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={frame} fill="none" stroke={C} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M42 42 L38 32" fill="none" stroke={OUT} strokeWidth={5} strokeLinecap="round" />
      <Path d="M30 30 H44" {...L} strokeWidth={7} />
      <Path d="M70 42 L66 28 H76" {...L} strokeWidth={5} />
      <Circle cx={54} cy={68} r={7} fill={C} stroke={OUT} strokeWidth={3} />
      <Circle cx={24} cy={68} r={3.5} fill={OUT} />
      <Circle cx={76} cy={68} r={3.5} fill={OUT} />
    </Art>
  );
}
