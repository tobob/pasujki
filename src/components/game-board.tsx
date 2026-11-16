/**
 * The play surface: four quadrant tiles + the draggable, gently breathing prompt in the centre.
 * Tap a quadrant (primary input for 2-year-olds) or drag the prompt and lift anywhere in a quadrant.
 *
 * Calm rules (docs/CALM_DESIGN_RESEARCH.md): only the prompt moves while the child chooses;
 * celebration ≤ 1.5 s inside the winning quadrant; mistakes follow an errorless ladder:
 *   1st miss → drift back · 2nd → right corner glows · 3rd → prompt glides there by itself.
 * Inactivity: 8 s → one slightly deeper breath · 15 s → the hint glow.
 */
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { AppText } from '@/components/app-text';
import { PromptArt } from '@/components/prompt-art';
import { ProgressDots } from '@/components/progress-dots';
import { Quadrant, type Rect } from '@/components/quadrant';
import { MOTION, SHADOW, TONE } from '@/constants/ui';
import { devDemo } from '@/game/engine/dev';
import { isCorrect } from '@/game/engine/progression';
import { playSfx, softHaptic } from '@/game/engine/sound';
import { UI } from '@/game/palette';
import type { Level } from '@/game/types';

type Geometry = { w: number; h: number; rects: Rect[]; card: number; art: number };

/** Orientation-agnostic: works for tall phones, iPads and landscape Android tablets alike. */
function computeGeometry(w: number, h: number): Geometry {
  const gap = Math.min(20, Math.max(10, Math.min(w, h) * 0.03));
  const qw = (w - gap) / 2;
  const qh = (h - gap) / 2;
  const rects = [0, 1, 2, 3].map((i) => ({ x: (i % 2) * (qw + gap), y: Math.floor(i / 2) * (qh + gap), w: qw, h: qh }));
  const card = Math.min(260, Math.max(120, Math.min(w, h) * 0.34));
  const art = Math.min(300, Math.max(96, Math.min(qw, qh) * 0.7));
  return { w, h, rects, card, art };
}

/** Lifting the finger within this radius of the centre = no choice, just drift back (R5). */
const DEAD_ZONE = 60;

type Props = {
  level: Level;
  showHints: boolean;
  /** Called after the last round's celebration, with the number of gentle misses. */
  onFinished: (mistakes: number) => void;
};

export function GameBoard({ level, showHints, onFinished }: Props) {
  const reduceMotion = useReducedMotion();
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [misses, setMisses] = useState(0);
  const [idleHint, setIdleHint] = useState(false);
  const [celebrating, setCelebrating] = useState<number | null>(null);
  const [touchTick, setTouchTick] = useState(0);
  const mistakes = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const locked = useSharedValue(false);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const scale = useSharedValue(1);
  const lift = useSharedValue(0);
  const promptOpacity = useSharedValue(1);
  const boardOpacity = useSharedValue(1);
  const breath = useSharedValue(1);

  const round = level.rounds[roundIndex];
  const answer = round.rule !== 'free' && round.answer !== null ? round.answer : null;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const startBreathing = () => {
    if (reduceMotion) {
      breath.set(1);
      return;
    }
    breath.set(withRepeat(withTiming(MOTION.breathScale, { duration: MOTION.breathHalf, easing: MOTION.easing }), -1, true));
  };

  useEffect(() => {
    startBreathing();
    return () => cancelAnimation(breath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // Inactivity ladder, restarted by every touch and every new round.
  useEffect(() => {
    if (celebrating !== null) return;
    const t1 = setTimeout(() => {
      if (reduceMotion) return;
      // One slightly deeper breath (1.06), then back to the normal calm breathing.
      breath.set(
        withSequence(
          withTiming(1.06, { duration: MOTION.breathHalf, easing: MOTION.easing }),
          withTiming(1, { duration: MOTION.breathHalf, easing: MOTION.easing }, (done) => {
            if (done) breath.set(withRepeat(withTiming(MOTION.breathScale, { duration: MOTION.breathHalf, easing: MOTION.easing }), -1, true));
          }),
        ),
      );
    }, MOTION.idleBreathAfter);
    const t2 = setTimeout(() => setIdleHint(true), MOTION.idleHintAfter);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [roundIndex, touchTick, celebrating, reduceMotion, breath]);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const touched = () => setTouchTick((t) => t + 1);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (!geo || Math.abs(geo.w - width) > 1 || Math.abs(geo.h - height) > 1) setGeo(computeGeometry(width, height));
  };

  const driftHome = () => {
    if (reduceMotion) {
      // Replace movement with a soft fade: vanish, reappear in the centre.
      promptOpacity.set(
        withTiming(0, { duration: MOTION.fast }, (done) => {
          if (!done) return;
          tx.set(0);
          ty.set(0);
          promptOpacity.set(withTiming(1, { duration: MOTION.base }));
        }),
      );
      return;
    }
    tx.set(withSpring(0, MOTION.driftBack));
    ty.set(withSpring(0, MOTION.driftBack));
  };

  const nextRound = () => {
    boardOpacity.set(withTiming(0, { duration: MOTION.roundFadeOut, easing: MOTION.easing }));
    later(MOTION.roundFadeOut + MOTION.roundPause, () => {
      if (roundIndex + 1 >= level.rounds.length) {
        onFinished(mistakes.current);
        return;
      }
      tx.set(0);
      ty.set(0);
      promptOpacity.set(1);
      scale.set(reduceMotion ? 1 : 0.9);
      setCelebrating(null);
      setMisses(0);
      setIdleHint(false);
      setRoundIndex(roundIndex + 1);
      locked.set(false);
      boardOpacity.set(withTiming(1, { duration: MOTION.roundFadeIn, easing: MOTION.easeOut }));
      scale.set(withTiming(1, { duration: MOTION.roundFadeIn, easing: MOTION.easeOut }));
    });
  };

  /** Success in quadrant `index`: the prompt settles into it and the picture celebrates. */
  const succeed = (index: number, guided: boolean) => {
    if (!geo) return;
    locked.set(true);
    playSfx('correct');
    softHaptic();
    const r = geo.rects[index];
    const dx = r.x + r.w / 2 - geo.w / 2;
    const dy = r.y + r.h / 2 - geo.h / 2;
    const travel = guided ? MOTION.guideGlide : 400;
    if (reduceMotion) {
      promptOpacity.set(withTiming(0, { duration: MOTION.base }));
    } else {
      const glide = guided
        ? (v: number) => withTiming(v, { duration: travel, easing: MOTION.easing })
        : (v: number) => withSpring(v, MOTION.snap);
      tx.set(glide(dx));
      ty.set(glide(dy));
      scale.set(withTiming(0.35, { duration: travel, easing: MOTION.easing }));
      promptOpacity.set(withSequence(withTiming(1, { duration: travel * 0.6 }), withTiming(0, { duration: travel * 0.4 })));
    }
    const settleAt = reduceMotion ? 150 : travel * 0.8;
    later(settleAt, () => setCelebrating(index));
    later(settleAt + MOTION.celebrateHold, nextRound);
  };

  const attempt = (index: number) => {
    touched();
    if (!geo || locked.get()) return;
    if (!round.targets[index]) {
      // Sleeping corner: not a choice at all, just float home.
      driftHome();
      return;
    }
    if (isCorrect(round, index)) {
      succeed(index, false);
      return;
    }
    mistakes.current += 1;
    const n = misses + 1;
    setMisses(n);
    playSfx('try_again');
    if (n >= 3 && answer !== null) {
      // Errorless ladder: after a short drift back, the prompt shows the way by itself.
      locked.set(true);
      driftHome();
      later(650, () => succeed(answer, true));
      return;
    }
    driftHome();
  };

  const handleDrop = (dx: number, dy: number) => {
    if (!geo) return;
    if (Math.hypot(dx, dy) < DEAD_ZONE) {
      driftHome();
      return;
    }
    attempt((dy > 0 ? 2 : 0) + (dx > 0 ? 1 : 0));
  };

  // DEV-only scripted play for simulator screenshots (see src/game/engine/dev.ts).
  useEffect(() => {
    const mode = devDemo();
    if (!__DEV__ || !mode || !geo) return;
    const right = answer ?? round.targets.findIndex((t) => t !== null);
    const wrong = round.targets.findIndex((t, i) => t !== null && i !== right);
    const t = setTimeout(() => {
      if (mode === 'tap') attempt(right);
      if (mode === 'miss') attempt(misses < 3 && wrong >= 0 ? wrong : right);
      if (mode === 'drag') {
        const r = geo.rects[right];
        const dx = r.x + r.w / 2 - geo.w / 2;
        const dy = r.y + r.h / 2 - geo.h / 2;
        lift.set(1);
        tx.set(withTiming(dx * 0.8, { duration: 900 }));
        ty.set(withTiming(dy * 0.8, { duration: 900 }, () => scheduleOnRN(handleDrop, dx * 0.8, dy * 0.8)));
      }
    }, mode === 'miss' ? 3500 : 2500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, roundIndex, misses]);

  const onPickup = () => {
    touched();
    playSfx('pickup');
    softHaptic();
  };

  const pan = usePanGesture({
    maxPointers: 1, // ignore a resting palm or a second finger
    minDistance: 6,
    hitSlop: 16,
    onBegin: () => {
      'worklet';
      if (locked.value) return;
      lift.set(withTiming(1, { duration: MOTION.touch, easing: MOTION.easeOut }));
      scheduleOnRN(onPickup);
    },
    onUpdate: (e) => {
      'worklet';
      if (locked.value) return;
      tx.set(e.translationX);
      ty.set(e.translationY);
    },
    onFinalize: () => {
      'worklet';
      lift.set(withTiming(0, { duration: MOTION.fast, easing: MOTION.easing }));
      if (locked.value) return;
      scheduleOnRN(handleDrop, tx.value, ty.value);
    },
  });

  const promptStyle = useAnimatedStyle(() => ({
    opacity: promptOpacity.value,
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      // Breathing pauses while the prompt is held.
      { scale: scale.value * (1 + lift.value * 0.08) * (lift.value > 0 ? 1 : breath.value) },
    ],
    boxShadow: lift.value > 0.5 ? SHADOW.lifted : SHADOW.soft,
  }));
  const boardStyle = useAnimatedStyle(() => ({ opacity: boardOpacity.value }));

  const hintIndex = answer !== null && (misses >= 2 || idleHint) ? answer : -1;

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <ProgressDots total={level.rounds.length} current={roundIndex} />
        {showHints && (
          <AppText style={styles.hint} numberOfLines={2}>
            {round.hint_pl}
          </AppText>
        )}
      </View>
      <Animated.View style={[styles.board, boardStyle]} onLayout={onLayout}>
        {geo && (
          <>
            {round.targets.map((target, i) => (
              <Quadrant
                key={`${roundIndex}-${i}`}
                index={i}
                target={target}
                rect={geo.rects[i]}
                artSize={geo.art}
                color={UI.quadrant[i]}
                celebrateKey={celebrating === i ? 1 : 0}
                hint={hintIndex === i && celebrating === null}
                reduceMotion={reduceMotion}
                onPress={attempt}
              />
            ))}
            <GestureDetector gesture={pan}>
              <Animated.View
                accessibilityLabel="prompt"
                style={[
                  styles.card,
                  {
                    left: geo.w / 2 - geo.card / 2,
                    top: geo.h / 2 - geo.card / 2,
                    width: geo.card,
                    height: geo.card,
                    borderRadius: geo.card / 2,
                  },
                  promptStyle,
                ]}
              >
                <PromptArt key={roundIndex} prompt={round.prompt} size={geo.card * 0.72} />
              </Animated.View>
            </GestureDetector>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, gap: 12 },
  top: { alignItems: 'center', gap: 6, minHeight: 64, justifyContent: 'center', paddingHorizontal: 80 },
  hint: { fontSize: 15, color: TONE.muted, textAlign: 'center' },
  board: { flex: 1 },
  card: {
    position: 'absolute',
    backgroundColor: TONE.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(75, 68, 83, 0.08)',
  },
});
