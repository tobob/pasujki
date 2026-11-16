import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, S, S3, tone, type ArtProps } from '../kit';

const C = COLORS.yellow;

/** Duck: chunky rubber-duck shape, big round head, orange bill. */
export default function Duck({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet */}
      <Path d="M38 84 L31 92 H47 Z M58 84 L51 92 H67 Z" fill={COLORS.orange} {...S3} />
      {/* body with tail */}
      <Path d="M8 50 C16 54 22 52 30 50 L58 50 C80 50 88 62 84 72 C78 86 60 89 44 87 C24 85 10 72 8 50 Z" fill={C} {...S} />
      <Path d="M18 72 C26 82 40 86 54 85" fill="none" stroke={tone(C, -0.1)} strokeWidth={5} strokeLinecap="round" />
      {/* wing */}
      <Path d="M30 60 C40 76 60 76 66 62 C54 65 42 64 30 60 Z" {...S3} fill={tone(C, -0.12)} />
      {/* head */}
      <Ellipse cx={60} cy={32} rx={21} ry={20} fill={C} {...S} />
      <Path d="M46 26 C47 21 50 18 54 16" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" />
      {/* bill */}
      <Path d="M76 33 C84 30 95 32 95 38 C95 44 84 45 76 42 Z" fill={COLORS.orange} {...S} />
      <Cheeks x1={68} x2={68} y={42} r={3.6} />
      <Eyes x1={66} x2={66} y={29} r={4.2} />
    </Art>
  );
}
