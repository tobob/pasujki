import { Path } from 'react-native-svg';

import { Art, COLORS, Cheeks, Eyes, L, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

export default function Whale({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* spout */}
      <Path d="M36 26 V14 M36 16 C32 10 26 10 24 14 M36 16 C40 10 46 10 48 14" {...L} stroke={tone(C, 0.2)} />
      {/* body + tail */}
      <Path
        d="M8 60 C8 42 22 30 40 30 C60 30 72 44 78 54 C82 48 84 40 92 36 C94 44 92 52 88 56 C94 60 96 68 94 74 C86 70 82 66 80 64 C74 76 60 84 42 84 C22 84 8 76 8 60 Z"
        fill={C}
        {...S}
      />
      {/* belly */}
      <Path d="M14 68 C22 78 40 80 56 76 C46 72 28 70 14 68 Z" fill={tone(C, 0.55)} />
      <Path d="M16 46 C20 40 26 36 32 35" fill="none" stroke={tone(C, 0.35)} strokeWidth={4} strokeLinecap="round" />
      <Cheeks x1={18} x2={44} y={62} r={4} />
      <Eyes x1={23} x2={39} y={54} r={4.3} />
      <Smile cx={31} cy={62} w={5} />
    </Art>
  );
}
