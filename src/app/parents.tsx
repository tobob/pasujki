import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ParentalGate } from '@/components/parental-gate';
import { Screen } from '@/components/screen';
import { TopBar } from '@/components/top-bar';
import { RADIUS, TONE } from '@/constants/ui';
import { devGate } from '@/game/engine/dev';
import { useMusic } from '@/hooks/use-music';
import { PRIVACY_ALL, t } from '@/i18n';
import { resetProgress, updateSettings, useSettings, type Settings } from '@/storage/store';

function Row({ label, detail, k }: { label: string; detail?: string; k: keyof Settings }) {
  const settings = useSettings();
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <AppText style={styles.rowLabel}>{label}</AppText>
        {detail ? <AppText style={styles.rowDetail}>{detail}</AppText> : null}
      </View>
      <Switch value={settings[k]} onValueChange={(v) => updateSettings({ [k]: v })} trackColor={{ true: TONE.play }} />
    </View>
  );
}

export default function Parents() {
  useMusic(null);
  const [passed, setPassed] = useState(devGate() === 'open');

  const confirmReset = () =>
    Alert.alert(t.resetTitle, t.resetBody, [
      { text: t.cancel, style: 'cancel' },
      { text: t.resetConfirm, style: 'destructive', onPress: resetProgress },
    ]);

  return (
    <Screen tint={TONE.bgAlt}>
      <TopBar onBack={() => router.back()} icon="home" backLabel={t.start} />
      {!passed ? (
        <View style={styles.gate}>
          <ParentalGate onPass={() => setPassed(true)} onFail={() => router.back()} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <AppText style={styles.h1}>{t.parents}</AppText>

          <View style={styles.card}>
            <Row label={t.music} k="music" />
            <Row label={t.sounds} k="sounds" />
            <Row label={t.hints} detail={t.hintsDetail} k="showHints" />
            <Row label={t.unlockAll} detail={t.unlockAllDetail} k="unlockAll" />
          </View>

          <View style={styles.card}>
            <AppText style={styles.resetText} onPress={confirmReset} accessibilityRole="button">
              {t.reset}
            </AppText>
          </View>

          <View style={styles.card}>
            <AppText style={styles.h2}>{t.aboutTitle}</AppText>
            <AppText style={styles.p}>{t.about}</AppText>
            <AppText style={styles.h3}>{t.worldsTitle}</AppText>
            <AppText style={styles.p}>{t.worlds}</AppText>
            <AppText style={styles.h3}>{t.soundTitle}</AppText>
            <AppText style={styles.p}>{t.soundNote}</AppText>
            <AppText style={styles.h3}>{t.safetyTitle}</AppText>
            <AppText style={styles.p}>{t.safety}</AppText>
            <AppText style={styles.version}>
              {t.version} {Constants.expoConfig?.version ?? '1.0.0'}
            </AppText>
          </View>

          {PRIVACY_ALL.map((policy) => (
            <View key={policy.title} style={styles.card}>
              <AppText style={styles.h2}>{policy.title}</AppText>
              {policy.sections.map((sec, i) => (
                <View key={i} style={styles.section}>
                  {sec.heading ? <AppText style={styles.h3}>{sec.heading}</AppText> : null}
                  <AppText style={styles.p}>{sec.body}</AppText>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  gate: { flex: 1, justifyContent: 'center', paddingBottom: 60 },
  content: { padding: 20, gap: 16, width: '100%', maxWidth: 640, alignSelf: 'center' },
  h1: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  h2: { fontSize: 19, fontWeight: '700', marginTop: 4 },
  h3: { fontSize: 16, fontWeight: '700' },
  section: { gap: 4 },
  p: { fontSize: 16, lineHeight: 23, color: TONE.text },
  card: { backgroundColor: TONE.card, borderRadius: RADIUS.card, padding: 18, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48 },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 18 },
  rowDetail: { fontSize: 14, color: TONE.muted },
  resetText: { fontSize: 18, color: '#B5654A', textAlign: 'center', paddingVertical: 6 },
  version: { fontSize: 14, color: TONE.muted, marginTop: 6 },
});
