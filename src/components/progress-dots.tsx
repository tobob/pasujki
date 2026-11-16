import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { MOTION, TONE } from '@/constants/ui';

function Dot({ state }: { state: 'done' | 'current' | 'todo' }) {
  const style = useAnimatedStyle(() => ({
    backgroundColor: withTiming(state === 'done' ? TONE.play : state === 'current' ? TONE.card : TONE.dot, {
      duration: MOTION.slow,
    }),
    transform: [{ scale: withTiming(state === 'current' ? 1.2 : 1, { duration: MOTION.slow, easing: MOTION.easing }) }],
  }));
  return <Animated.View style={[styles.dot, state === 'current' && styles.current, style]} />;
}

/** Quiet "how far along" indicator. Not a timer, never counts down. */
export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={styles.row} accessibilityLabel={`${current + 1} / ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <Dot key={i} state={i < current ? 'done' : i === current ? 'current' : 'todo'} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6 },
  current: { borderWidth: 2, borderColor: TONE.play },
});
