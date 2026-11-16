import type { ColorId } from './types';

/**
 * Calm, toddler-friendly palette. Colours must still be clearly NAMEABLE ("czerwony" must read as red),
 * but slightly softened: no neon, no pure #FF0000, no pure black/white flashing. Every illustration
 * that represents a colour uses EXACTLY these values for its dominant fill, so colour rounds are fair.
 */
export const COLORS: Record<ColorId, string> = {
  red: '#E5534B',
  yellow: '#F6C945',
  blue: '#4A90D9',
  green: '#5BB36A',
  orange: '#F28C38',
  purple: '#9B6BC9',
  pink: '#F29BB8',
  brown: '#9A6B4A',
  white: '#FAF7F0',
  black: '#3A3A44',
  grey: '#A3A7AE',
};

/** UI surfaces (backgrounds, cards, outlines). Low contrast backgrounds, high-contrast content. */
export const UI = {
  bg: '#FFF8EC',          // warm cream
  bgAlt: '#F3EEFF',       // soft lavender
  card: '#FFFFFF',
  outline: '#4B4453',     // soft charcoal outline used by every illustration (stroke 3–4 at 100px)
  text: '#4B4453',
  muted: '#9C94A3',
  success: '#7BC47F',
  gentleNo: '#F2B880',    // "try again" — warm, never red
  quadrant: ['#FDE7E4', '#E3F1FB', '#E6F5E4', '#FFF2D6'] as const, // TL, TR, BL, BR pastel tiles
};

/** World background tints (pastel). */
export const WORLD_TINTS = ['#FFF4D6', '#E4F4E8', '#E6EEFB', '#FBE8EF', '#EFE7FA', '#E8F6F6'] as const;
