import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;

export default function Tree({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M42 92 L44 62 L56 62 L58 92 Z" fill={COLORS.brown} {...S} />
      <Path
        d="M30 70 C14 70 8 56 14 46 C8 34 18 20 30 22 C34 10 46 6 56 10 C66 6 80 12 80 24 C92 28 94 44 86 52 C92 64 80 72 70 70 C62 76 40 76 30 70 Z"
        fill={C}
        {...S}
      />
      <Circle cx={34} cy={36} r={7} fill={tone(C, 0.3)} />
      <Circle cx={60} cy={30} r={4} fill={tone(C, 0.3)} />
      <Circle cx={64} cy={54} r={4.5} fill={COLORS.red} {...S} strokeWidth={2.5} />
      <Circle cx={40} cy={56} r={4.5} fill={COLORS.red} {...S} strokeWidth={2.5} />
    </Art>
  );
}
