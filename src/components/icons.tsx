/** Simple rounded UI glyphs drawn in the same soft charcoal as the illustrations. */
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { TONE } from '@/constants/ui';

export type IconName = 'play' | 'map' | 'home' | 'back' | 'next' | 'lock' | 'parents' | 'replay';

type Props = { name: IconName; size?: number; color?: string };

export function Icon({ name, size = 32, color = TONE.outline }: Props) {
  const s = { stroke: color, strokeWidth: 8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {name === 'play' && <Path d="M36 24 L76 50 L36 76 Z" fill={color} stroke={color} strokeWidth={10} strokeLinejoin="round" />}
      {name === 'map' && (
        <>
          <Rect x={18} y={18} width={26} height={26} rx={8} fill={color} />
          <Rect x={56} y={18} width={26} height={26} rx={8} fill={color} />
          <Rect x={18} y={56} width={26} height={26} rx={8} fill={color} />
          <Rect x={56} y={56} width={26} height={26} rx={8} fill={color} />
        </>
      )}
      {name === 'home' && <Path d="M20 50 L50 24 L80 50 M30 44 V78 H70 V44" {...s} />}
      {name === 'back' && <Path d="M60 22 L32 50 L60 78" {...s} strokeWidth={10} />}
      {name === 'next' && <Path d="M40 22 L68 50 L40 78" {...s} strokeWidth={10} />}
      {name === 'replay' && <Path d="M72 40 A26 26 0 1 0 74 60 M72 22 V40 H54" {...s} />}
      {name === 'lock' && (
        <>
          <Path d="M34 46 V36 A16 16 0 0 1 66 36 V46" {...s} />
          <Rect x={24} y={46} width={52} height={36} rx={10} fill={color} />
        </>
      )}
      {name === 'parents' && (
        <>
          <Circle cx={38} cy={34} r={11} fill={color} />
          <Circle cx={66} cy={40} r={9} fill={color} />
          <Path d="M20 78 C20 58 56 58 56 78 Z M54 78 C54 62 82 62 82 78 Z" fill={color} />
        </>
      )}
    </Svg>
  );
}

/** Rounded five-point star. */
export function StarIcon({ size = 24, color = TONE.star }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 8 L61 36 L91 38 L68 57 L76 87 L50 70 L24 87 L32 57 L9 38 L39 36 Z"
        fill={color}
        stroke={TONE.outline}
        strokeOpacity={0.25}
        strokeWidth={5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** A dozing star for empty corners: closed eyes, calm, muted. */
export function SleepingStar({ size = 64 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 10 L60 37 L89 39 L67 57 L74 86 L50 70 L26 86 L33 57 L11 39 L40 37 Z"
        fill={TONE.card}
        stroke={TONE.sleeping}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M38 52 Q42 56 46 52 M54 52 Q58 56 62 52" stroke={TONE.sleeping} strokeWidth={4} strokeLinecap="round" fill="none" />
    </Svg>
  );
}
