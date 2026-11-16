import { Circle, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

/** A clear triangular cheese wedge (side view), soft holes. */
export default function Cheese({ size }: ArtProps) {
  const hole = tone(C, -0.16);
  return (
    <Art size={size}>
      <Path d="M12 84 L85 22 C88 20 92 22 92 26 L92 80 C92 82 90 84 88 84 Z" fill={C} {...S} />
      {/* soft highlight along the top edge */}
      <Path d="M30 72 L80 30" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      <Circle cx={74} cy={64} r={7} fill={hole} />
      <Circle cx={56} cy={74} r={4.5} fill={hole} />
      <Circle cx={80} cy={44} r={4} fill={hole} />
      <Circle cx={38} cy={78} r={3} fill={hole} />
    </Art>
  );
}
