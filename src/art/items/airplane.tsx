import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Airplane({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M40 44 L56 10 H66 L62 46 Z" fill={tone(C, -0.15)} {...S} />
      <Path d="M8 40 L14 22 H22 L28 40 Z" fill={tone(C, -0.15)} {...S} />
      <Path d="M8 42 C8 36 12 34 20 34 H76 C88 34 94 40 94 46 C94 52 88 56 78 56 H18 C12 56 8 50 8 42 Z" fill={C} {...S} />
      <Path d="M40 50 L58 86 H68 L62 50 Z" fill={tone(C, -0.15)} {...S} />
      <Circle cx={50} cy={44} r={3.5} fill={tone(C, 0.7)} />
      <Circle cx={62} cy={44} r={3.5} fill={tone(C, 0.7)} />
      <Circle cx={74} cy={44} r={3.5} fill={tone(C, 0.7)} />
      <Path d="M84 38 C88 40 90 42 91 45 H82 Z" fill={tone(C, 0.7)} />
    </Art>
  );
}
