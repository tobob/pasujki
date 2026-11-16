import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { StarIcon } from '@/components/icons';

// R3: 3–5 particles, 16–28 pt, opacity ≤ 0.8, drift up 40–80 pt over 1.2–1.6 s, rotation ≤ 30°.
const STARS = [
  { dx: -0.3, dy: 0.0, delay: 0, size: 28, rot: -12 },
  { dx: 0.3, dy: -0.06, delay: 160, size: 22, rot: 15 },
  { dx: 0.04, dy: -0.3, delay: 320, size: 18, rot: -8 },
];
const RISE = 56;

function DriftingStar({ area, dx, dy, delay, size, rot, reduceMotion }: { area: number; reduceMotion: boolean } & (typeof STARS)[number]) {
  const t = useSharedValue(0);
  useEffect(() => {
    // One slow rise-and-fade (≈1.4 s): never repeats, never flashes.
    t.set(withDelay(delay, withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) })));
  }, [delay, t]);
  const style = useAnimatedStyle(() => {
    const fadeIn = Math.min(1, t.value * 4);
    const fadeOut = 1 - Math.max(0, (t.value - 0.55) / 0.45);
    return {
      opacity: 0.8 * fadeIn * fadeOut,
      transform: [
        { translateY: reduceMotion ? 0 : -t.value * RISE },
        { rotate: `${reduceMotion ? 0 : rot * t.value}deg` },
      ],
    };
  });
  const px = size;
  return (
    <Animated.View style={[styles.star, { left: area / 2 + dx * area - px / 2, top: area / 2 + dy * area - px / 2 }, style]}>
      <StarIcon size={px} />
    </Animated.View>
  );
}

/** A few slow stars, local to one quadrant. `area` = side of the square they live in. */
export function DriftingStars({ area, reduceMotion }: { area: number; reduceMotion: boolean }) {
  return (
    <View pointerEvents="none" style={[styles.wrap, { width: area, height: area }]}>
      {STARS.map((s, i) => (
        <DriftingStar key={i} area={area} reduceMotion={reduceMotion} {...s} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute' },
  star: { position: 'absolute' },
});
