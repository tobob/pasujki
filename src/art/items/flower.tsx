import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, L, S, tone, type ArtProps } from '../kit';

const C = COLORS.pink;
const petals = [0, 72, 144, 216, 288];

export default function Flower({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 50 V94" {...L} strokeWidth={10} />
      <Path d="M50 50 V94" stroke={COLORS.green} strokeWidth={4} strokeLinecap="round" />
      <Path d="M50 82 C40 70 28 72 24 76 C30 84 42 86 50 82 Z" fill={COLORS.green} {...S} />
      {petals.map((a) => (
        <Ellipse key={a} cx={50} cy={22} rx={14} ry={17} fill={C} {...S} transform={`rotate(${a} 50 40)`} />
      ))}
      <Circle cx={50} cy={40} r={12} fill={COLORS.yellow} {...S} />
      <Circle cx={46} cy={36} r={3.5} fill={tone(COLORS.yellow, 0.5)} />
    </Art>
  );
}
