/**
 * Shared drawing kit for Pasujki illustrations (viewBox 0 0 100 100).
 * Every item uses the same outline colour/width and round caps so the set feels consistent.
 */
import { createContext, useContext, useId, type ReactNode } from 'react';
import Svg, { Circle, Defs, Ellipse, Mask, Path, Rect } from 'react-native-svg';

import { COLORS, UI } from '@/game/palette';

export { COLORS, UI };
export const OUT = UI.outline;

/** Standard outline props: spread onto any filled primitive. */
export const S = {
  stroke: UI.outline,
  strokeWidth: 4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
/** Thinner outline for small inner details. */
export const S3 = { ...S, strokeWidth: 3 };
/** Stroke-only line (no fill). */
export const L = { ...S, fill: 'none' };
export const L3 = { ...S3, fill: 'none' };

export type ArtProps = { size: number };

/** When true, every <Art> below renders as a flat soft-charcoal silhouette (shadow rounds). */
export const SilhouetteContext = createContext(false);
export const SILHOUETTE_FILL = UI.outline;
export const SILHOUETTE_OPACITY = 0.85;

export function Art({ size, children }: { size: number; children: ReactNode }) {
  const silhouette = useContext(SilhouetteContext);
  const maskId = 'pasujki-sil-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  if (!silhouette) {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {children}
      </Svg>
    );
  }
  // Alpha mask: the drawing's coverage (fills + outlines) cuts a single flat shape out of one Rect,
  // so faces and inner details vanish. style.maskType covers react-native-web (CSS mask-type).
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <Mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={100} height={100} maskType="alpha" style={{ maskType: 'alpha' }}>
          {children}
        </Mask>
      </Defs>
      <Rect x={0} y={0} width={100} height={100} fill={SILHOUETTE_FILL} opacity={SILHOUETTE_OPACITY} mask={`url(#${maskId})`} />
    </Svg>
  );
}

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}
/** Mix a hex colour with white (amt > 0) or black (amt < 0). amt in -1..1. */
export function tone(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const t = amt > 0 ? 255 : 0;
  const a = Math.abs(amt);
  const m = (c: number) => clamp(c + (t - c) * a);
  return '#' + ((1 << 24) | (m(r) << 16) | (m(g) << 8) | m(b)).toString(16).slice(1).toUpperCase();
}

/** Two dot eyes with a tiny white highlight. */
export function Eyes({ x1, x2, y, r = 3.4 }: { x1: number; x2: number; y: number; r?: number }) {
  return (
    <>
      <Circle cx={x1} cy={y} r={r} fill={OUT} />
      <Circle cx={x2} cy={y} r={r} fill={OUT} />
      <Circle cx={x1 + r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#FFFFFF" />
      <Circle cx={x2 + r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#FFFFFF" />
    </>
  );
}

/** Small smile centred at (cx, cy), half-width w. */
export function Smile({ cx, cy, w = 4, d = 3 }: { cx: number; cy: number; w?: number; d?: number }) {
  return <Path d={`M${cx - w} ${cy} Q${cx} ${cy + d * 1.6} ${cx + w} ${cy}`} {...L3} />;
}

/** Soft blush cheeks. */
export function Cheeks({ x1, x2, y, r = 3.6 }: { x1: number; x2: number; y: number; r?: number }) {
  return (
    <>
      <Ellipse cx={x1} cy={y} rx={r} ry={r * 0.7} fill="#F4A3B4" opacity={0.7} />
      <Ellipse cx={x2} cy={y} rx={r} ry={r * 0.7} fill="#F4A3B4" opacity={0.7} />
    </>
  );
}

/**
 * A friendly face: eyes, smile, optional cheeks.
 * Pass `mouth={false}` for animals with a beak: the beak IS the mouth, never draw both (docs/ART_STYLE.md).
 */
export function Face({
  cx,
  cy,
  gap = 14,
  eyeR = 3.4,
  mouthDy = 8,
  cheeks = true,
  mouth = true,
}: {
  cx: number;
  cy: number;
  gap?: number;
  eyeR?: number;
  mouthDy?: number;
  cheeks?: boolean;
  mouth?: boolean;
}) {
  return (
    <>
      {cheeks && <Cheeks x1={cx - gap * 0.85} x2={cx + gap * 0.85} y={cy + mouthDy * 0.6} />}
      <Eyes x1={cx - gap / 2} x2={cx + gap / 2} y={cy} r={eyeR} />
      {mouth && <Smile cx={cx} cy={cy + mouthDy} />}
    </>
  );
}
