/**
 * Parental gate: (1) press and hold for 3 s, then (2) answer a multiplication written out in
 * words (Polish or English, by device language), using large number buttons. Pre-readers can't decode the words; the task is new every time.
 * A wrong answer leaves the gate (back to the game) with no hint.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { AppText } from '@/components/app-text';
import { devGate } from '@/game/engine/dev';
import { RADIUS, SHADOW, TONE } from '@/constants/ui';
import { numberWord, t } from '@/i18n';

const HOLD_MS = 3000;

type Question = { a: number; b: number; answer: number; options: number[] };

export function makeQuestion(): Question {
  const a = 3 + Math.floor(Math.random() * 7); // 3..9
  const b = 2 + Math.floor(Math.random() * 8); // 2..9
  const answer = a * b;
  // Distractors are plausible neighbours (a×(b±1), (a±1)×b) so guessing rarely works.
  const near = [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, answer + 2, answer - 2].filter((n) => n > 0 && n !== answer);
  const options = new Set<number>([answer]);
  for (const n of near.sort(() => Math.random() - 0.5)) {
    if (options.size >= 4) break;
    options.add(n);
  }
  return { a, b, answer, options: [...options].sort(() => Math.random() - 0.5) };
}

export function ParentalGate({ onPass, onFail }: { onPass: () => void; onFail: () => void }) {
  const [stage, setStage] = useState<'hold' | 'question'>(devGate() === 'question' ? 'question' : 'hold');
  const [question] = useState<Question>(makeQuestion);
  const hold = useSharedValue(0);

  const startHold = () => {
    hold.set(
      withTiming(1, { duration: HOLD_MS * (1 - hold.get()), easing: Easing.linear }, (finished) => {
        if (finished) scheduleOnRN(setStage, 'question');
      }),
    );
  };
  const stopHold = () => {
    if (hold.get() >= 1) return;
    cancelAnimation(hold);
    hold.set(withTiming(0, { duration: 300 }));
  };
  const fillStyle = useAnimatedStyle(() => ({ width: `${hold.value * 100}%` }));

  const choose = (n: number) => {
    // The question is a MULTIPLICATION; compare with the stored product (was a + b → never passed).
    if (n === question.answer) {
      onPass();
      return;
    }
    onFail();
  };

  if (stage === 'hold') {
    return (
      <View style={styles.box}>
        <AppText style={styles.title}>{t.gateTitle}</AppText>
        <AppText style={styles.body}>{t.gateHold}</AppText>
        <Pressable onPressIn={startHold} onPressOut={stopHold} accessibilityRole="button" accessibilityLabel={t.gateHoldButton}>
          <View style={styles.holdButton}>
            <Animated.View style={[styles.holdFill, fillStyle]} />
            <AppText style={styles.holdText}>{t.gateHoldButton}</AppText>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <AppText style={styles.title}>{t.gateTitle}</AppText>
      <AppText style={styles.body}>{t.gateQuestion(numberWord(question.a), numberWord(question.b))}</AppText>
      <View style={styles.options}>
        {question.options.map((n) => (
          <Pressable
            key={`${question.a}-${question.b}-${n}`}
            onPress={() => choose(n)}
            accessibilityRole="button"
            accessibilityLabel={String(n)}
            style={({ pressed }) => [styles.option, pressed && styles.pressed]}
          >
            <AppText style={styles.optionText}>{n}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', gap: 22, paddingHorizontal: 24, width: '100%', maxWidth: 520, alignSelf: 'center' },
  title: { fontSize: 28, fontWeight: '700' },
  body: { fontSize: 20, textAlign: 'center', lineHeight: 28 },
  holdButton: {
    width: 260,
    height: 76,
    borderRadius: RADIUS.pill,
    backgroundColor: TONE.card,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: SHADOW.soft,
  },
  holdFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: TONE.play, opacity: 0.55 },
  holdText: { fontSize: 20, fontWeight: '600' },
  options: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  option: {
    width: 78,
    height: 88,
    borderRadius: 28,
    backgroundColor: TONE.card,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: SHADOW.soft,
  },
  pressed: { transform: [{ scale: 0.96 }] },
  optionText: { fontSize: 34, fontWeight: '700' },
});
