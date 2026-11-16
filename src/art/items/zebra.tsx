import { Ellipse, Path } from 'react-native-svg';

import { Art, COLORS, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const K = COLORS.black;

export default function Zebra({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* ears */}
      <Path d="M30 30 C24 18 26 8 30 6 C36 10 40 18 40 26 Z" fill={C} {...S} />
      <Path d="M70 30 C76 18 74 8 70 6 C64 10 60 18 60 26 Z" fill={C} {...S} />
      {/* mane */}
      <Path d="M42 18 L46 8 L50 16 L54 8 L58 18 Z" fill={K} {...S} />
      {/* head */}
      <Path d="M50 16 C34 16 26 28 28 44 C30 56 32 66 32 74 C32 88 68 88 68 74 C68 66 70 56 72 44 C74 28 66 16 50 16 Z" fill={C} {...S} />
      {/* soft wavy stripes */}
      <Path d="M29 32 C34 32 38 30 40 26" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M71 32 C66 32 62 30 60 26" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M30 46 C36 46 39 44 40 40" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M70 46 C64 46 61 44 60 40" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M44 22 C47 26 53 26 56 22" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M31 58 C35 58 37 56 38 53" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M69 58 C65 58 63 56 62 53" fill="none" stroke={K} strokeWidth={4.5} strokeLinecap="round" />
      {/* muzzle */}
      <Ellipse cx={50} cy={74} rx={17} ry={12} fill={tone(K, 0.45)} {...S} />
      <Ellipse cx={44} cy={72} rx={2.4} ry={3.2} fill={OUT} />
      <Ellipse cx={56} cy={72} rx={2.4} ry={3.2} fill={OUT} />
      <Smile cx={50} cy={79} w={5} />
      <Eyes x1={40} x2={60} y={44} r={3.8} />
    </Art>
  );
}
