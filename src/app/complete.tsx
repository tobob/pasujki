import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ItemArt } from '@/art';
import { AppText } from '@/components/app-text';
import { Icon, StarIcon } from '@/components/icons';
import { Screen } from '@/components/screen';
import { SoftButton } from '@/components/soft-button';
import { MOTION, SHADOW, TONE } from '@/constants/ui';
import { findLevel, findWorld, nextLevelId, stickerPicture } from '@/game/engine/progression';
import { playSfx } from '@/game/engine/sound';
import { useMusic } from '@/hooks/use-music';
import { t } from '@/i18n';

function EarnedStar({ index, reduceMotion }: { index: number; reduceMotion: boolean }) {
  const t = useSharedValue(0);
  useEffect(() => {
    // Stars appear one by one, slowly (≈450 ms apart).
    t.set(withDelay(700 + index * 450, withTiming(1, { duration: MOTION.slow, easing: MOTION.easing })));
  }, [index, t]);
  const style = useAnimatedStyle(() => ({
    opacity: t.value,
    transform: [{ scale: reduceMotion ? 1 : 0.7 + 0.3 * t.value }],
  }));
  return (
    <Animated.View style={style}>
      <StarIcon size={52} />
    </Animated.View>
  );
}

export default function Complete() {
  useMusic('menu_loop');
  const { levelId, stars } = useLocalSearchParams<{ levelId: string; stars: string }>();
  const level = findLevel(levelId);
  const earned = Math.min(3, Math.max(1, Number(stars) || 1));
  const next = level ? nextLevelId(level.id) : undefined;
  const nextLevel = findLevel(next);
  const worldDone = !nextLevel || nextLevel.world !== level?.world;
  const tint = (level && findWorld(level.world)?.tint) || TONE.bg;
  const reduceMotion = useReducedMotion();

  const sticker = useSharedValue(0);
  useEffect(() => {
    playSfx(worldDone ? 'world_complete' : 'level_complete');
    sticker.set(
      reduceMotion
        ? withTiming(1, { duration: MOTION.slow })
        : withSpring(1, { damping: 18, stiffness: 120, mass: 1 }),
    );
  }, [reduceMotion, sticker, worldDone]);
  const stickerStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, sticker.value * 1.5),
    transform: [{ scale: reduceMotion ? 1 : 0.85 + 0.15 * sticker.value }, { rotate: '-5deg' }],
  }));

  return (
    <Screen tint={tint}>
      <View style={styles.center}>
        <AppText style={styles.bravo}>{t.bravo}</AppText>
        <Animated.View style={[styles.sticker, stickerStyle]}>
          <ItemArt id={stickerPicture(level)} size={170} />
        </Animated.View>
        <View style={styles.stars}>
          {Array.from({ length: earned }, (_, i) => (
            <EarnedStar key={i} index={i} reduceMotion={reduceMotion} />
          ))}
        </View>
      </View>
      {/* Never auto-advance (R7): a calm stop with the map as the clear main choice. */}
      <View style={styles.buttons}>
        {next && (
          <SoftButton
            size={84}
            onPress={() => router.replace({ pathname: '/play/[levelId]', params: { levelId: next } })}
            accessibilityLabel={t.next}
          >
            <View style={styles.nudge}>
              <Icon name="next" size={40} color={TONE.muted} />
            </View>
          </SoftButton>
        )}
        <SoftButton size={120} color={TONE.play} onPress={() => router.dismissTo('/map')} accessibilityLabel={t.map}>
          <Icon name="map" size={52} color={TONE.card} />
        </SoftButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  bravo: { fontSize: 48, fontWeight: '700' },
  sticker: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: TONE.card,
    borderWidth: 8,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: SHADOW.lifted,
  },
  stars: { flexDirection: 'row', gap: 12, minHeight: 56 },
  buttons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40, paddingBottom: 36 },
  nudge: { marginLeft: 6 },
});
