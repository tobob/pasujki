import { Circle, Path, Rect } from 'react-native-svg';

import { Art, COLORS, L3, S, tone, type ArtProps } from '../kit';

const C = COLORS.pink;

/** Cake: a round pink frosted cake with drips and a cherry on top. */
export default function Cake({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* plate */}
      <Rect x={8} y={84} width={84} height={8} rx={4} fill={COLORS.white} {...S} />
      {/* sponge */}
      <Path d="M16 48 L16 80 C16 84 20 86 24 86 L76 86 C80 86 84 84 84 80 L84 48 Z" fill={tone(C, 0.35)} {...S} />
      {/* frosting top with drips */}
      <Path
        d="M14 46 C14 36 30 32 50 32 C70 32 86 36 86 46 L86 56 C86 62 78 62 78 56 L78 54 C78 66 66 66 66 56 C66 62 56 62 56 56 C56 70 42 70 42 58 C42 62 32 62 32 56 C32 64 20 64 20 56 C20 60 14 60 14 54 Z"
        fill={C}
        {...S}
      />
      <Path d="M24 42 C30 38 38 37 44 37" fill="none" stroke={tone(C, 0.5)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M16 76 H84" fill="none" stroke={tone(C, 0.1)} strokeWidth={4} />
      {/* cherry */}
      <Path d="M52 22 C54 14 60 10 64 10" {...L3} />
      <Circle cx={50} cy={24} r={8} fill={COLORS.red} {...S} />
      <Circle cx={47} cy={21} r={2} fill={tone(COLORS.red, 0.5)} />
    </Art>
  );
}
