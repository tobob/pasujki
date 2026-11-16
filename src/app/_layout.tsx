import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { TONE } from '@/constants/ui';
import { takeDevScript } from '@/game/engine/dev';
import { initSound } from '@/game/engine/sound';
import { resetProgress } from '@/storage/store';

SplashScreen.preventAutoHideAsync().catch(() => {});
SplashScreen.setOptions({ duration: 500, fade: true });

export default function RootLayout() {
  useEffect(() => {
    initSound();
    SplashScreen.hideAsync().catch(() => {});
    if (__DEV__) {
      const script = takeDevScript();
      if (script?.reset) resetProgress();
      const route = script?.route;
      if (route) setTimeout(() => router.push(route as never), 600);
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 400,
          contentStyle: { backgroundColor: TONE.bg },
        }}
      >
        <Stack.Screen name="play/[levelId]" options={{ gestureEnabled: false }} />
        <Stack.Screen name="complete" options={{ gestureEnabled: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: TONE.bg },
});
