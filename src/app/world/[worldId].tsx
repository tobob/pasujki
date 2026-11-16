import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ItemArt } from '@/art';
import { Icon, StarIcon } from '@/components/icons';
import { Screen } from '@/components/screen';
import { TopBar } from '@/components/top-bar';
import { SHADOW, TONE } from '@/constants/ui';
import { findWorld, isLevelUnlocked, levelPicture } from '@/game/engine/progression';
import { playSfx } from '@/game/engine/sound';
import { useMusic } from '@/hooks/use-music';
import { useProgress, useSettings } from '@/storage/store';

export default function WorldScreen() {
  useMusic('menu_loop');
  const { worldId } = useLocalSearchParams<{ worldId: string }>();
  const world = findWorld(Number(worldId));
  const progress = useProgress();
  const settings = useSettings();
  if (!world) return <Redirect href="/map" />;

  return (
    <Screen tint={world.tint}>
      <TopBar onBack={() => router.back()} title={world.title_pl} />
      <ScrollView contentContainerStyle={styles.grid}>
        {world.levels.map((level) => {
          const open = isLevelUnlocked(level, progress, settings);
          const stars = progress.stars[level.id] ?? 0;
          return (
            <Pressable
              key={level.id}
              accessibilityRole="button"
              accessibilityLabel={level.title_pl}
              disabled={!open}
              onPress={() => {
                playSfx('tap');
                router.push({ pathname: '/play/[levelId]', params: { levelId: level.id } });
              }}
              style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
            >
              <View style={[styles.bubble, !open && styles.locked]}>
                <ItemArt id={levelPicture(level)} size={88} />
                {!open && (
                  <View style={styles.lock}>
                    <Icon name="lock" size={26} color={TONE.muted} />
                  </View>
                )}
              </View>
              <View style={styles.stars}>
                {[0, 1, 2].map((i) => (
                  <StarIcon key={i} size={20} color={i < stars ? TONE.star : TONE.dot} />
                ))}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 22,
    padding: 20,
    maxWidth: 720,
    alignSelf: 'center',
  },
  cell: { alignItems: 'center', gap: 8, width: 132 },
  pressed: { transform: [{ scale: 0.96 }] },
  bubble: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: TONE.card,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: SHADOW.soft,
  },
  locked: { opacity: 0.45, boxShadow: 'none' },
  lock: { position: 'absolute', bottom: 4, right: 4 },
  stars: { flexDirection: 'row', gap: 4 },
});
