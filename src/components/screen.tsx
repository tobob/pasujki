import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TONE } from '@/constants/ui';

/** Calm full-screen surface with safe-area padding and an optional world tint. */
export function Screen({ children, tint = TONE.bg, style }: { children: ReactNode; tint?: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.fill, { backgroundColor: tint }]}>
      <SafeAreaView style={[styles.fill, style]}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
