import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.purple;

/** Party hat: a clear triangle cone with a pompom and soft dots. */
export default function PartyHat({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M50 18 C52 18 53 19 54 21 L82 84 C83 88 81 90 77 90 L23 90 C19 90 17 88 18 84 L46 21 C47 19 48 18 50 18 Z" fill={C} {...S} />
      <Path d="M44 36 L34 60" fill="none" stroke={tone(C, 0.35)} strokeWidth={5} strokeLinecap="round" />
      <Circle cx={56} cy={46} r={3.5} fill={tone(C, 0.55)} />
      <Circle cx={44} cy={70} r={3.5} fill={tone(C, 0.55)} />
      <Circle cx={64} cy={72} r={3.5} fill={tone(C, 0.55)} />
      <Path d="M20 86 C40 92 60 92 80 86" fill="none" stroke={tone(C, -0.2)} strokeWidth={4} strokeLinecap="round" />
      <Circle cx={50} cy={14} r={8} fill={COLORS.pink} {...S} />
    </Art>
  );
}
