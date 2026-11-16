import Svg, { Ellipse, Path } from 'react-native-svg';

import { ItemArt, ShapeArt, TextureArt } from '@/art';
import { TONE } from '@/constants/ui';
import { COLORS } from '@/game/palette';
import type { ColorId, Prompt } from '@/game/types';

/** A soft, organic colour blob for colour prompts (fill = exact palette value). */
export function ColorBlob({ id, size }: { id: ColorId; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 10 C72 9 90 26 90 49 C91 72 74 90 51 90 C28 91 10 75 10 51 C9 28 27 11 50 10 Z"
        fill={COLORS[id]}
        stroke={TONE.outline}
        strokeWidth={4}
      />
      <Ellipse cx={36} cy={33} rx={10} ry={6} fill="#FFFFFF" opacity={0.35} transform="rotate(-25 36 33)" />
    </Svg>
  );
}

/** Renders whatever the centre prompt is, at a square `size`. */
export function PromptArt({ prompt, size }: { prompt: Prompt; size: number }) {
  switch (prompt.kind) {
    case 'item':
      return <ItemArt id={prompt.id} size={size} />;
    case 'texture':
      return <TextureArt id={prompt.id} size={size} />;
    case 'shape':
      return <ShapeArt id={prompt.id} size={size} color={prompt.color} />;
    case 'color':
      return <ColorBlob id={prompt.id} size={size} />;
  }
}
