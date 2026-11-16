import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GameBoard } from '@/components/game-board';
import { Icon } from '@/components/icons';
import { Screen } from '@/components/screen';
import { SoftButton } from '@/components/soft-button';
import { TONE } from '@/constants/ui';
import { findLevel, findWorld, starsFor } from '@/game/engine/progression';
import { useMusic } from '@/hooks/use-music';
import { saveLevelResult, useSettings } from '@/storage/store';

export default function PlayScreen() {
  const { levelId } = useLocalSearchParams<{ levelId: string }>();
  const level = findLevel(levelId);
  const settings = useSettings();
  // Youngest levels get the calm loop; later ones the (still soft) bouncy loop.
  useMusic(level?.age === '2+' ? 'play_loop_calm' : 'play_loop_bouncy');

  if (!level || level.rounds.length === 0) return <Redirect href="/map" />;
  const tint = findWorld(level.world)?.tint ?? TONE.bg;

  const finish = (mistakes: number) => {
    const stars = starsFor(level, mistakes);
    saveLevelResult(level.id, stars);
    router.replace({ pathname: '/complete', params: { levelId: level.id, stars: String(stars) } });
  };

  return (
    <Screen tint={tint}>
      <View style={styles.wrap}>
        <View style={styles.back}>
          {/* One tap always leaves, no confirmation (R7). */}
          <SoftButton size={64} onPress={() => router.back()} accessibilityLabel="Wyjdź" color="rgba(255,255,255,0.75)">
            <Icon name="home" size={30} color={TONE.muted} />
          </SoftButton>
        </View>
        {/* key → a fresh board (and fresh state) if the level changes */}
        <GameBoard key={level.id} level={level} showHints={settings.showHints} onFinished={finish} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 20, paddingTop: 6, paddingBottom: 16 },
  back: { position: 'absolute', left: 20, top: 6, zIndex: 2 },
});
