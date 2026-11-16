import { Path } from 'react-native-svg';

import { Art, COLORS, OUT, type ArtProps } from '../kit';

/** Rainbow: arcs (red outermost and thickest) resting on two little clouds. */
const BANDS: [string, number, number][] = [
  // colour, radius (centre of band), width
  [COLORS.red, 36, 10],
  [COLORS.orange, 28, 6],
  [COLORS.yellow, 22, 6],
  [COLORS.green, 16, 6],
  [COLORS.blue, 10, 6],
];
const CX = 50;
const CY = 68;

function arc(r: number) {
  return `M${CX - r} ${CY} A${r} ${r} 0 0 1 ${CX + r} ${CY}`;
}

export default function Rainbow({ size }: ArtProps) {
  return (
    <Art size={size}>
      {/* outline: one fat charcoal arc behind */}
      <Path d={arc(24)} fill="none" stroke={OUT} strokeWidth={38} />
      {BANDS.map(([c, r, w]) => (
        <Path key={c} d={arc(r)} fill="none" stroke={c} strokeWidth={w + 0.6} />
      ))}
      {/* the red band's fill so the dominance check sees it */}
      <Path d={`${arc(41)} L${CX + 31} ${CY} A31 31 0 0 0 ${CX - 31} ${CY} Z`} fill={COLORS.red} />
      {/* clouds */}
      {[20, 80].map((x) => (
        <Path
          key={x}
          d={`M${x - 15} ${CY + 14} C${x - 20} ${CY + 14} ${x - 20} ${CY + 4} ${x - 13} ${CY + 3} C${x - 12} ${CY - 5} ${x - 2} ${CY - 7} ${x + 1} ${CY - 1} C${x + 8} ${CY - 5} ${x + 17} ${CY} ${x + 14} ${CY + 6} C${x + 20} ${CY + 7} ${x + 19} ${CY + 14} ${x + 14} ${CY + 14} Z`}
          fill={COLORS.white}
          stroke={OUT}
          strokeWidth={4}
          strokeLinejoin="round"
        />
      ))}
    </Art>
  );
}
