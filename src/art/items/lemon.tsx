import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

export default function Lemon({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Path d="M10 54 C10 52 12 50 16 48 C22 30 36 22 52 22 C68 22 80 32 84 46 C88 48 90 50 90 52 C90 54 88 56 84 58 C80 74 66 82 50 82 C34 82 20 74 16 60 C12 58 10 56 10 54 Z" fill={C} {...S} />
      <Ellipse cx={38} cy={38} rx={9} ry={5} fill={tone(C, 0.45)} transform="rotate(-20 38 38)" />
      <Path d="M52 22 C54 14 62 10 70 12 C66 20 60 22 52 22 Z" fill={COLORS.green} {...S} />
    </Art>
  );
}
