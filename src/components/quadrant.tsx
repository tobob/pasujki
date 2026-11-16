import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ItemArt } from '@/art';
import { DriftingStars } from '@/components/drifting-stars';
import { SleepingStar } from '@/components/icons';
import { MOTION, RADIUS, TONE } from '@/constants/ui';
import type { Target } from '@/game/types';

const HINT_PEAK = 0.45;

export type Rect = { x: number; y: number; w: number; h: number };

type Props = {
  index: number;
  target: Target;
  rect: Rect;
  artSize: number;
  color: string;
  /** Increments on every success in this quadrant → bounce + glow + drifting stars. */
  celebrateKey: number;
  /** Soft breathing glow showing the right answer after the 2nd gentle miss. */
  hint: boolean;
  reduceMotion: boolean;
  onPress: (index: number) => void;
};

export function Quadrant({ index, target, rect, artSize, color, celebrateKey, hint, reduceMotion, onPress }: Props) {
  const bounce = useSharedValue(1);
  const glow = useSharedValue(0);
  const hintGlow = useSharedValue(0);

  useEffect(() => {
    if (celebrateKey === 0) return;
    if (!reduceMotion) {
      // One happy bounce (peak 1.10), then settle. Never loops.
      bounce.set(withSequence(withTiming(1.1, { duration: MOTION.fast, easing: MOTION.easeOut }), withSpring(1, MOTION.happy)));
    }
    // Glow: in 300 ms, hold 400 ms, out 600 ms — one cycle only.
    glow.set(
      withSequence(
        withTiming(1, { duration: 300, easing: MOTION.easing }),
        withDelay(400, withTiming(0, { duration: MOTION.slow, easing: MOTION.easing })),
      ),
    );
  }, [celebrateKey, reduceMotion, bounce, glow]);

  useEffect(() => {
    if (hint) {
      // Max 2 slow pulses (period 1.6 s, peak alpha 0.45), then a steady soft glow (R2).
      hintGlow.set(
        reduceMotion
          ? withTiming(HINT_PEAK, { duration: MOTION.slow })
          : withSequence(
              withTiming(HINT_PEAK, { duration: 800, easing: MOTION.easing }),
              withTiming(0.15, { duration: 800, easing: MOTION.easing }),
              withTiming(HINT_PEAK, { duration: 800, easing: MOTION.easing }),
              withTiming(0.15, { duration: 800, easing: MOTION.easing }),
              withTiming(HINT_PEAK * 0.8, { duration: 800, easing: MOTION.easing }),
            ),
      );
    } else {
      cancelAnimation(hintGlow);
      hintGlow.set(withTiming(0, { duration: MOTION.fast }));
    }
  }, [hint, reduceMotion, hintGlow]);

  const artStyle = useAnimatedStyle(() => ({ transform: [{ scale: bounce.value }] }));
  const haloStyle = useAnimatedStyle(() => ({ opacity: Math.max(glow.value * 0.8, hintGlow.value) }));
  const borderStyle = useAnimatedStyle(() => ({ opacity: Math.max(glow.value * 0.7, hintGlow.value) }));

  const halo = artSize * 1.25;
  const area = Math.min(rect.w, rect.h);

  return (
    <Pressable
      accessibilityRole={target ? 'button' : undefined}
      accessibilityLabel={target ? target.id : 'empty'}
      disabled={!target}
      onPress={() => onPress(index)}
      style={[styles.tile, { left: rect.x, top: rect.y, width: rect.w, height: rect.h, backgroundColor: color }, !target && styles.sleeping]}
    >
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.border, borderStyle]} />
      {target ? (
        <>
          <Animated.View
            pointerEvents="none"
            style={[styles.halo, { width: halo, height: halo, borderRadius: halo / 2 }, haloStyle]}
          />
          <Animated.View style={artStyle}>
            <ItemArt id={target.id} size={artSize} />
          </Animated.View>
          {celebrateKey > 0 && !reduceMotion && (
            <View pointerEvents="none" style={[styles.starsWrap, { width: area, height: area }]}>
              <DriftingStars key={celebrateKey} area={area} reduceMotion={reduceMotion} />
            </View>
          )}
        </>
      ) : (
        <SleepingStar size={artSize * 0.45} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    borderRadius: RADIUS.tile,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: TONE.quadrantBorder,
  },
  sleeping: { opacity: 0.6, backgroundColor: 'transparent', borderStyle: 'dashed' },
  border: { borderRadius: RADIUS.tile, borderWidth: 5, borderColor: TONE.star, margin: -2 },
  halo: { position: 'absolute', backgroundColor: TONE.halo },
  starsWrap: { position: 'absolute' },
});
