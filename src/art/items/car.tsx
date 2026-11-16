import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.red;
const G = tone(COLORS.blue, 0.65);

export default function Car({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M8 70 V56 C8 50 12 48 18 47 L28 46 L36 30 C38 27 41 26 44 26 H62 C66 26 69 28 71 31 L80 46 C88 47 92 51 92 58 V70 Z" fill={C} {...S} />
      <Path d="M40 32 H52 V45 H33 Z" fill={G} {...S} strokeWidth={3} />
      <Path d="M58 32 H64 C66 32 67 33 68 35 L74 45 H58 Z" fill={G} {...S} strokeWidth={3} />
      <Path d="M14 56 H22" stroke={COLORS.yellow} strokeWidth={5} strokeLinecap="round" />
      <Circle cx={28} cy={72} r={11} fill={COLORS.black} {...S} />
      <Circle cx={72} cy={72} r={11} fill={COLORS.black} {...S} />
      <Circle cx={28} cy={72} r={4} fill={COLORS.grey} />
      <Circle cx={72} cy={72} r={4} fill={COLORS.grey} />
    </Art>
  );
}
