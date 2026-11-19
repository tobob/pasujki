/**
 * Grown-ups' area overlays: the one-time "Do you like Pasujki?" card and the "Not really" follow-up.
 *
 * Drawn as absolutely positioned, animated overlays inside the screen (not RN <Modal>): the StoreKit
 * rating sheet, the store or the browser opens right after a tap here, and on Fabric a system sheet
 * presented while a Modal is still dismissing is silently dropped (Kolorowanki, parental-gate.tsx).
 * Render them last in the screen's root view. Android back = "Not now".
 */
import { useEffect, type ReactNode } from 'react';
import { BackHandler, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { MOTION, RADIUS, SHADOW, TONE } from '@/constants/ui';
import { STORE_NAME } from '@/feedback/review';
import { t } from '@/i18n';

function Overlay({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [onClose]);
  return (
    <Animated.View
      style={styles.overlay}
      entering={FadeIn.duration(MOTION.base)}
      exiting={FadeOut.duration(MOTION.fast)}
      accessibilityViewIsModal
      importantForAccessibility="yes"
    >
      <SafeAreaView style={styles.center}>
        <View style={styles.card}>{children}</View>
      </SafeAreaView>
    </Animated.View>
  );
}

/** Big, calm pill button (min. 56 pt high). */
export function PillButton({ label, onPress, kind = 'plain' }: { label: string; onPress: () => void; kind?: 'primary' | 'plain' | 'quiet' }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.pill, kind === 'primary' && styles.pillPrimary, kind === 'quiet' && styles.pillQuiet, pressed && styles.pressed]}
    >
      <AppText style={[styles.pillText, kind === 'quiet' && styles.pillTextQuiet]}>{label}</AppText>
    </Pressable>
  );
}

/** "Do you like Pasujki?" — Yes / Not really, plus a quiet "Not now". */
export function LikePrompt({ onYes, onNo, onLater }: { onYes: () => void; onNo: () => void; onLater: () => void }) {
  return (
    <Overlay onClose={onLater}>
      <AppText style={styles.title} accessibilityRole="header">
        {t.likeTitle}
      </AppText>
      <View style={styles.buttons}>
        <PillButton label={t.likeYes} kind="primary" onPress={onYes} />
        <PillButton label={t.likeNo} onPress={onNo} />
        <PillButton label={t.notNow} kind="quiet" onPress={onLater} />
      </View>
    </Overlay>
  );
}

/** After "Not really": the feedback page (browser) or, just as prominently offered, a store rating — no review gating. */
export function NotReallyCard({ onTellUs, onRate, onClose }: { onTellUs: () => void; onRate: () => void; onClose: () => void }) {
  return (
    <Overlay onClose={onClose}>
      <AppText style={styles.title} accessibilityRole="header">
        {t.noTitle}
      </AppText>
      <AppText style={styles.body}>{t.noBody}</AppText>
      <View style={styles.buttons}>
        <PillButton label={t.tellUs} kind="primary" onPress={onTellUs} />
        <PillButton label={t.rateShort(STORE_NAME)} onPress={onRate} />
        <PillButton label={t.notNow} kind="quiet" onPress={onClose} />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    elevation: 100,
    backgroundColor: 'rgba(75, 68, 83, 0.28)',
  },
  center: { flex: 1, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: TONE.card,
    borderRadius: RADIUS.card,
    padding: 22,
    gap: 16,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    boxShadow: SHADOW.lifted,
  },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  body: { fontSize: 17, lineHeight: 24, textAlign: 'center', color: TONE.text },
  buttons: { gap: 10 },
  pill: {
    minHeight: 56,
    borderRadius: RADIUS.pill,
    backgroundColor: TONE.bgAlt,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pillPrimary: { backgroundColor: TONE.play },
  pillQuiet: { backgroundColor: 'transparent', minHeight: 48 },
  pillText: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  pillTextQuiet: { color: TONE.muted, fontWeight: '500' },
  pressed: { transform: [{ scale: 0.97 }] },
});
