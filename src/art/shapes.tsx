/** Big rounded shape prompts, filled with a palette colour (soft highlight, standard outline). */
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

import { COLORS, S, tone } from './kit';
import type { ColorId, ShapeId } from '@/game/types';

type ShapeProps = { fill: string; hi: string };

function starPath(cx: number, cy: number, R: number, r: number) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    return `${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)}`;
  });
  return `M${pts.join(' L')} Z`;
}

const SHAPES: Record<ShapeId, (p: ShapeProps) => React.ReactElement> = {
  circle: ({ fill, hi }) => (
    <>
      <Circle cx={50} cy={50} r={42} fill={fill} {...S} />
      <Path d="M24 40 C26 32 32 26 40 23" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
  square: ({ fill, hi }) => (
    <>
      <Rect x={10} y={10} width={80} height={80} rx={12} fill={fill} {...S} />
      <Path d="M22 36 V24 H34" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  triangle: ({ fill, hi }) => (
    <>
      <Path d="M50 10 C53 10 55 12 57 15 L91 80 C93 85 90 89 85 89 L15 89 C10 89 7 85 9 80 L43 15 C45 12 47 10 50 10 Z" fill={fill} {...S} />
      <Path d="M40 36 L30 56" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
  star: ({ fill, hi }) => (
    <>
      <Path d={starPath(50, 54, 44, 21)} fill={fill} {...S} strokeWidth={5} />
      <Path d="M34 46 L42 44" fill="none" stroke={hi} strokeWidth={5} strokeLinecap="round" />
    </>
  ),
  heart: ({ fill, hi }) => (
    <>
      <Path d="M50 88 C30 74 8 58 8 36 C8 22 18 13 30 13 C40 13 46 19 50 26 C54 19 60 13 70 13 C82 13 92 22 92 36 C92 58 70 74 50 88 Z" fill={fill} {...S} />
      <Path d="M20 34 C20 28 24 24 30 23" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
  oval: ({ fill, hi }) => (
    <>
      <Ellipse cx={50} cy={50} rx={30} ry={42} fill={fill} {...S} />
      <Path d="M30 38 C31 30 35 23 41 18" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
  rectangle: ({ fill, hi }) => (
    <>
      <Rect x={6} y={24} width={88} height={52} rx={11} fill={fill} {...S} />
      <Path d="M17 46 V35 H30" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  crescent: ({ fill, hi }) => (
    <>
      <Path d="M62 8 C38 10 18 28 18 52 C18 76 38 94 62 94 C72 94 80 91 86 86 C64 84 48 70 48 50 C48 32 60 16 78 12 C73 9 68 8 62 8 Z" fill={fill} {...S} />
      <Path d="M30 46 C31 36 36 28 43 23" fill="none" stroke={hi} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
};

export function ShapeArt({ id, size, color = 'blue' }: { id: ShapeId; size: number; color?: ColorId }) {
  const fill = COLORS[color];
  const Draw = SHAPES[id];
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Draw fill={fill} hi={tone(fill, color === 'white' ? -0.06 : 0.35)} />
    </Svg>
  );
}

export const SHAPE_ART_IDS = Object.keys(SHAPES) as ShapeId[];
