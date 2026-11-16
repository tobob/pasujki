// Maps react-native-svg primitives to plain DOM SVG elements so drawings can be rendered to
// standalone SVG strings with react-dom/server (used only by tools/art/render.mjs).
import { createElement } from 'react';
const el = (tag) => {
  const C = (props) => createElement(tag, props);
  C.displayName = tag;
  return C;
};
const Svg = ({ children, ...p }) => createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', ...p }, children);
export default Svg;
export { Svg };
export const Circle = el('circle');
export const Ellipse = el('ellipse');
export const Rect = el('rect');
export const Path = el('path');
export const G = el('g');
export const Line = el('line');
export const Polygon = el('polygon');
export const Polyline = el('polyline');
export const Defs = el('defs');
export const ClipPath = el('clipPath');
export const LinearGradient = el('linearGradient');
export const RadialGradient = el('radialGradient');
export const Stop = el('stop');
export const Mask = el('mask');
export const Text = el('text');
