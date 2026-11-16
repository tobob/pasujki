import { useId } from 'react';
import { ClipPath, Defs, Ellipse, G, Path } from 'react-native-svg';

import { Art, Cheeks, COLORS, Eyes, OUT, S, Smile, tone, type ArtProps } from '../kit';

const C = COLORS.white;
const K = COLORS.black;
const HEAD = 'M50 18 C30 18 21 31 22 48 C23 60 26 68 28 76 C31 90 69 90 72 76 C74 68 77 60 78 48 C79 31 70 18 50 18 Z';

/**
 * Zebra: round friendly head. Stripes are clipped to the head and stay on the forehead and the outer
 * edges, so the eyes, cheeks and muzzle sit on clear white (docs/ART_STYLE.md, "clear face zone").
 */
export default function Zebra({ size }: ArtProps) {
  const clip = 'pasujki-zebra-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <Art size={size}>
      <Defs>
        <ClipPath id={clip}>
          <Path d={HEAD} />
        </ClipPath>
      </Defs>
      {/* ears */}
      <Path d="M29 34 C21 22 22 10 27 7 C34 10 40 20 40 29 Z" fill={C} {...S} />
      <Path d="M71 34 C79 22 78 10 73 7 C66 10 60 20 60 29 Z" fill={C} {...S} />
      <Path d="M29 25 C28 19 28 15 29 13" fill="none" stroke={tone(K, 0.55)} strokeWidth={3.5} strokeLinecap="round" />
      <Path d="M71 25 C72 19 72 15 71 13" fill="none" stroke={tone(K, 0.55)} strokeWidth={3.5} strokeLinecap="round" />
      {/* spiky mane behind the head */}
      <Path d="M40 22 L41 9 L46 15 L50 6 L54 15 L59 9 L60 22 Z" fill={K} {...S} strokeWidth={3} />
      {/* head */}
      <Path d={HEAD} fill={C} />
      <G clipPath={`url(#${clip})`}>
        {/* forehead: two curved bands, the lower one ends ~6 units above the eyes */}
        <Path d="M30 21 Q50 31 70 21" fill="none" stroke={K} strokeWidth={5.5} strokeLinecap="round" />
        <Path d="M27 30 Q50 41 73 30" fill="none" stroke={K} strokeWidth={5.5} strokeLinecap="round" />
        {/* outer edges: wedges that taper off before the eyes, cheeks and muzzle */}
        <Path d="M16 39 C23 38 28 40 31 43 C27 46 22 47 16 47 Z" fill={K} />
        <Path d="M84 39 C77 38 72 40 69 43 C73 46 78 47 84 47 Z" fill={K} />
        <Path d="M16 53 C22 52 26 54 28 57 C25 60 21 61 16 61 Z" fill={K} />
        <Path d="M84 53 C78 52 74 54 72 57 C75 60 79 61 84 61 Z" fill={K} />
        <Path d="M18 67 C23 66 27 68 29 70 C26 73 22 74 18 74 Z" fill={K} />
        <Path d="M82 67 C77 66 73 68 71 70 C74 73 78 74 82 74 Z" fill={K} />
      </G>
      <Path d={HEAD} fill="none" {...S} />
      {/* muzzle */}
      <Ellipse cx={50} cy={73} rx={19} ry={13} fill={tone(K, 0.7)} {...S} />
      <Ellipse cx={43} cy={70} rx={2.4} ry={3} fill={OUT} />
      <Ellipse cx={57} cy={70} rx={2.4} ry={3} fill={OUT} />
      <Smile cx={50} cy={78} w={5} />
      <Cheeks x1={35} x2={65} y={57} r={3.6} />
      <Eyes x1={39} x2={61} y={46} r={4.6} />
    </Art>
  );
}
