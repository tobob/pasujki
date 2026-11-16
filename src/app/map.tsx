import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ItemArt } from '@/art';
import { AppText } from '@/components/app-text';
import { Icon, StarIcon } from '@/components/icons';
import { Screen } from '@/components/screen';
import { TopBar } from '@/components/top-bar';
import { RADIUS, SHADOW, TONE } from '@/constants/ui';
import { isWorldUnlocked, worldPicture, worldStars } from '@/game/engine/progression';
import { WORLDS } from '@/game/levels';
import { playSfx } from '@/game/engine/sound';
import { useMusic } from '@/hooks/use-music';
import { useProgress, useSettings } from '@/storage/store';

export default function WorldMap() {
  useMusic('menu_loop');
  const progress = useProgress();
  const settings = useSettings();

  return (
    <Screen>
      <TopBar onBack={() => router.back()} icon="home" backLabel="Start" />
      <ScrollView contentContainerStyle={styles.list}>
        {WORLDS.map((world) => {
          const open = isWorldUnlocked(world, progress, settings);
          const { earned, max } = worldStars(world, progress);
          return (
            <Pressable
              key={world.id}
              accessibilityRole="button"
              accessibilityLabel={world.title_pl}
              accessibilityState={{ disabled: !open }}
              disabled={!open}
              onPress={() => {
                playSfx('tap');
                router.push({ pathname: '/world/[worldId]', params: { worldId: String(world.id) } });
              }}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: world.tint },
                !open && styles.locked,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.art}>
                <ItemArt id={worldPicture(world)} size={84} />
              </View>
              <View style={styles.info}>
                <AppText style={styles.name} numberOfLines={1}>
                  {world.title_pl}
                </AppText>
                <View style={styles.stars}>
                  <StarIcon size={22} color={earned > 0 ? TONE.star : TONE.dot} />
                  <AppText style={styles.count}>
                    {earned} / {max}
                  </AppText>
                </View>
              </View>
              {!open && <Icon name="lock" size={30} color={TONE.muted} />}
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, gap: 18, width: '100%', maxWidth: 640, alignSelf: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    padding: 18,
    minHeight: 132,
    borderRadius: RADIUS.card,
    boxShadow: SHADOW.soft,
  },
  locked: { opacity: 0.5, boxShadow: 'none' },
  pressed: { transform: [{ scale: 0.98 }] },
  art: { width: 100, height: 100, borderRadius: 50, backgroundColor: TONE.card, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, gap: 8 },
  name: { fontSize: 22, fontWeight: '600' },
  stars: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  count: { fontSize: 17, color: TONE.muted },
});
