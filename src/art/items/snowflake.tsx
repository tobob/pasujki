import { Circle, G, Path } from 'react-native-svg';

import { Art, COLORS, OUT, type ArtProps } from '../kit';

const C = COLORS.blue;
const arm = 'M50 50 V10 M50 24 L40 16 M50 24 L60 16';

export default function Snowflake({ size }: ArtProps) {
  const arms = [0, 60, 120, 180, 240, 300];
  return (
    <Art size={size}>
      <G>
        {arms.map((a) => (
          <Path key={`o${a}`} d={arm} fill="none" stroke={OUT} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${a} 50 50)`} />
        ))}
        {arms.map((a) => (
          <Path key={`i${a}`} d={arm} fill="none" stroke={C} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${a} 50 50)`} />
        ))}
      </G>
      <Circle cx={50} cy={50} r={9} fill={C} stroke={OUT} strokeWidth={4} />
    </Art>
  );
}
