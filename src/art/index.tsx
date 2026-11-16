/**
 * STUB — replaced by the art agent. Keep these three exports and their props stable:
 *   <ItemArt id size />  <TextureArt id size />  <ShapeArt id size color? />
 * Each renders a square `size`×`size` illustration (react-native-svg).
 */
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

import { COLORS, UI } from '@/game/palette';
import type { ColorId, ItemId, ShapeId, TextureId } from '@/game/types';

type P = { size: number };

function Placeholder({ size, label, fill }: P & { label: string; fill: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={44} fill={fill} stroke={UI.outline} strokeWidth={4} />
      <SvgText x={50} y={56} fontSize={14} textAnchor="middle" fill={UI.outline}>{label}</SvgText>
    </Svg>
  );
}

export function ItemArt({ id, size }: P & { id: ItemId }) {
  return <Placeholder size={size} label={id} fill={UI.card} />;
}
export function TextureArt({ id, size }: P & { id: TextureId }) {
  return <Placeholder size={size} label={id} fill={UI.bgAlt} />;
}
export function ShapeArt({ id, size, color = 'blue' }: P & { id: ShapeId; color?: ColorId }) {
  return <Placeholder size={size} label={id} fill={COLORS[color]} />;
}
