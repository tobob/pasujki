import { Circle, Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Face, S, tone, type ArtProps } from '../kit';

const C = COLORS.green;
const SKIN = tone(COLORS.green, 0.45);

/** Turtle: tall round shell, big round head, stubby feet. */
export default function Turtle({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet + tail */}
      <Ellipse cx={40} cy={80} rx={8} ry={8} fill={SKIN} {...S} />
      <Ellipse cx={72} cy={80} rx={8} ry={8} fill={SKIN} {...S} />
      <Path d="M88 70 L95 74 L88 77 Z" fill={SKIN} {...S} />
      {/* shell */}
      <Path d="M32 74 C32 46 44 26 62 26 C80 26 92 46 92 74 Z" fill={C} {...S} />
      <Path d="M36 74 H88" stroke={tone(C, -0.2)} strokeWidth={4} strokeLinecap="round" />
      <Path d="M54 42 L70 42 L76 54 L70 66 L54 66 L48 54 Z" fill={tone(C, -0.12)} />
      <Path d="M44 40 C48 34 54 31 58 30" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      {/* big head */}
      <Circle cx={24} cy={52} r={18} fill={SKIN} {...S} />
      <Path d="M12 44 C14 40 17 37 21 36" fill="none" stroke={tone(SKIN, 0.4)} strokeWidth={3.5} strokeLinecap="round" />
      <Face cx={24} cy={51} gap={14} eyeR={3.8} mouthDy={8} />
    </Art>
  );
}
