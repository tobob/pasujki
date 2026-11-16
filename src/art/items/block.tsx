import { Path, Rect } from 'react-native-svg';

import { Art, COLORS, S, tone, type ArtProps } from '../kit';

const C = COLORS.blue;

function star(cx: number, cy: number, R: number, r: number) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    return `${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)}`;
  });
  return `M${pts.join(' L')} Z`;
}

/** Toy block: a clear square front face with a soft embossed star. */
export default function Block({ size }: ArtProps) {
  return (
    <Art size={size}>
      <Rect x={12} y={12} width={76} height={76} rx={12} fill={C} {...S} />
      <Rect x={22} y={22} width={56} height={56} rx={8} fill={tone(C, 0.15)} stroke={tone(C, -0.15)} strokeWidth={3} />
      <Path d={star(50, 52, 19, 9)} fill={tone(C, 0.5)} stroke={tone(C, 0.5)} strokeWidth={3} strokeLinejoin="round" />
      <Path d="M20 30 V20 H30" fill="none" stroke={tone(C, 0.45)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </Art>
  );
}
