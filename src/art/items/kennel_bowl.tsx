import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function KennelBowl({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* food */}
      <Path d="M22 44 C24 32 36 28 42 34 C46 26 58 26 62 34 C68 28 78 34 78 44 Z" fill={COLORS.brown} {...S} />
      {/* bowl */}
      <Path d="M8 44 H92 L82 82 C80 88 74 90 68 90 H32 C26 90 20 88 18 82 Z" fill={C} {...S} />
      <Ellipse cx={50} cy={44} rx={42} ry={6} fill={tone(C, 0.3)} {...S} />
      {/* bone motif */}
      <Path
        d="M40 62 C38 58 32 58 32 63 C32 66 34 67 36 67 C34 67 32 68 32 71 C32 76 38 76 40 72 L60 72 C62 76 68 76 68 71 C68 68 66 67 64 67 C66 67 68 66 68 63 C68 58 62 58 60 62 Z"
        fill={COLORS.white}
        {...S}
        strokeWidth={3}
      />
    </Art>
  );
}
