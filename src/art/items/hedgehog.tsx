import { Circle, Ellipse, G, Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.brown;
const FACE = tone(COLORS.brown, 0.6);

/** Side view: a round spiky back (soft rounded spikes) and a light pointed face on the left. */
const SPIKES =
  'M29.1 50.8 L24.1 44.7 L32.5 43.6 L29.6 36.6 L38.1 37.6 L37.5 30.1 L45.3 33.1 L47.1 25.8 L53.7 30.5 L57.7 23.9 L62.5 30.1 L68.4 24.6 L71.2 31.8 L78.6 28.0 L79.0 35.5 L87.3 33.6 L85.3 40.9 L93.9 41.0 L89.7 47.6 L97.9 49.8 L91.8 55.1 L99.0 59.2 L91.5 62.9 L86 80 L40 82 Z';

export default function Hedgehog({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* feet */}
      <Ellipse cx={44} cy={84} rx={7} ry={5} fill={FACE} {...S} />
      <Ellipse cx={70} cy={84} rx={7} ry={5} fill={FACE} {...S} />
      {/* spiky back */}
      <Path d={SPIKES} fill={C} {...S} strokeWidth={3.5} />
      <Path d="M58 40 C66 37 74 38 80 42 M66 54 C72 52 78 54 82 58" fill="none" stroke={tone(C, -0.2)} strokeWidth={3.5} strokeLinecap="round" />
      <Path d="M46 40 C50 36 54 34 58 34" fill="none" stroke={tone(C, 0.3)} strokeWidth={4} strokeLinecap="round" />
      {/* face + snout */}
      <G transform="translate(8 12) scale(0.86)">
      <Path d="M52 44 C40 38 26 44 18 56 C12 60 6 62 6 66 C6 70 12 72 18 72 C28 82 44 84 56 78 C64 68 62 52 52 44 Z" fill={FACE} {...S} />
      <Circle cx={8} cy={66} r={3.8} fill={OUT} />
      <Cheeks x1={38} x2={38} y={66} />
      <Eyes x1={30} x2={30} y={55} r={3.6} />
      <Smile cx={22} cy={70} w={4} />
      </G>
    </Art>
  );
}
