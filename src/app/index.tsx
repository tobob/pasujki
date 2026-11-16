import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { ItemArt } from '@/art';
import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icons';
import { Screen } from '@/components/screen';
import { SoftButton } from '@/components/soft-button';
import { MOTION, TONE } from '@/constants/ui';
import { continueLevelId } from '@/game/engine/progression';
import { UI } from '@/game/palette';
import type { ItemId } from '@/game/types';
import { useMusic } from '@/hooks/use-music';
import { useProgress, useSettings } from '@/storage/store';

const FRIENDS: ItemId[] = ['cat', 'sun', 'strawberry', 'duck'];

export default function Home() {
  useMusic('menu_loop');
  const progress = useProgress();
  const settings = useSettings();
  const reduceMotion = useReducedMotion();
  const breath = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) return;
    breath.set(withRepeat(withTiming(MOTION.breathScale, { duration: MOTION.breathHalf, easing: MOTION.easing }), -1, true));
    return () => cancelAnimation(breath);
  }, [reduceMotion, breath]);
  const breathStyle = useAnimatedStyle(() => ({ transform: [{ scale: breath.value }] }));

  const play = () => {
    const id = continueLevelId(progress, settings);
    if (id) router.push({ pathname: '/play/[levelId]', params: { levelId: id } });
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.corner}>
        <SoftButton size={48} onPress={() => router.push('/parents')} accessibilityLabel="Dla rodziców" color={TONE.bgAlt}>
          <Icon name="parents" size={26} color={TONE.muted} />
        </SoftButton>
      </View>

      <View style={styles.center}>
        <AppText style={styles.title}>Pasujki</AppText>
        <View style={styles.friends}>
          {FRIENDS.map((id, i) => (
            <View key={id} style={[styles.friend, { backgroundColor: UI.quadrant[i] }]}>
              <ItemArt id={id} size={56} />
            </View>
          ))}
        </View>

        <Animated.View style={breathStyle}>
          <SoftButton size={168} color={TONE.play} onPress={play} accessibilityLabel="Graj">
            <View style={styles.playNudge}>
              <Icon name="play" size={84} color={TONE.card} />
            </View>
          </SoftButton>
        </Animated.View>

        <SoftButton size={84} onPress={() => router.push('/map')} accessibilityLabel="Mapa światów">
          <Icon name="map" size={40} color={TONE.muted} />
        </SoftButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 16 },
  corner: { alignItems: 'flex-end', paddingTop: 8, paddingRight: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 36 },
  title: { fontSize: 44, fontWeight: '700', letterSpacing: 0.5, color: TONE.text },
  friends: { flexDirection: 'row', gap: 12 },
  friend: { width: 72, height: 72, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  playNudge: { marginLeft: 10 },
});
