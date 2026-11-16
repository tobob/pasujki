import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { MOTION, SHADOW, TONE } from '@/constants/ui';
import { playSfx } from '@/game/engine/sound';

type Props = {
  onPress?: () => void;
  children: ReactNode;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  accessibilityLabel: string;
  /** Round by default; pass a width to get a pill. */
  width?: number;
  silent?: boolean;
};

/** Big, soft, round button. Pressing gently sinks it (no flashing highlight). */
export function SoftButton({ onPress, children, size = 64, color = TONE.card, style, disabled, accessibilityLabel, width, silent }: Props) {
  const pressed = useSharedValue(0);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: 1 - pressed.value * 0.05 }] }));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPressIn={() => pressed.set(withTiming(1, { duration: 120, easing: MOTION.easing }))}
      onPressOut={() => pressed.set(withTiming(0, { duration: MOTION.fast, easing: MOTION.easing }))}
      onPress={() => {
        if (!silent) playSfx('tap');
        onPress?.();
      }}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.base,
          { width: width ?? size, height: size, borderRadius: size / 2, backgroundColor: color },
          disabled && styles.disabled,
          anim,
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', boxShadow: SHADOW.soft, flexDirection: 'row', gap: 10 },
  disabled: { opacity: 0.45 },
});
