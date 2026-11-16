import { Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;
const pts = Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 5;
  const r = i % 2 === 0 ? 44 : 21;
  return `${(50 + Math.cos(a) * r).toFixed(1)} ${(54 + Math.sin(a) * r).toFixed(1)}`;
});

export default function Star({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d={`M${pts.join(' L')} Z`} fill={C} {...S} strokeWidth={5} />
      <Path d="M44 26 L40 36" stroke={tone(C, 0.5)} strokeWidth={4} strokeLinecap="round" />
      <Face cx={50} cy={54} gap={14} eyeR={3.2} mouthDy={7} />
    </Art>
  );
}
