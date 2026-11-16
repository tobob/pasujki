import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;
const rays = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);

export default function Sun({ size }: ArtProps) {
  return (
    <Art size={size}>
      {rays.map((a, i) => {
        const x1 = 50 + Math.cos(a) * 34;
        const y1 = 50 + Math.sin(a) * 34;
        const x2 = 50 + Math.cos(a) * 44;
        const y2 = 50 + Math.sin(a) * 44;
        return <Path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} {...S} strokeWidth={8} stroke={tone(C, -0.12)} />;
      })}
      <Circle cx={50} cy={50} r={28} fill={C} {...S} />
      <Circle cx={40} cy={38} r={6} fill={tone(C, 0.4)} />
      <Face cx={50} cy={50} gap={18} eyeR={3.8} mouthDy={9} />
    </Art>
  );
}
