# Pasujki: library survey (animation, graphics, colour, sound)

Author: research agent (design and tech), 2026-11-16. Baseline: **Expo SDK 58.0.25, React Native 0.88.1 (New Architecture only), Reanimated 4.7.1 + react-native-worklets 0.13.0, Gesture Handler 3.3, react-native-svg 15.16, expo-audio 58**. The project uses **npm** (`package-lock.json`), so commands use `npx`. Versions were checked against the npm registry and `node_modules/expo/bundledNativeModules.json` on 2026-11-16. Nothing was installed.

> An `ios/` folder exists in the project (a prebuild has been run). Any library with native code requires a fresh native build (`npx expo run:ios|android` or `npx eas-cli@latest build --profile development`). "In Expo Go" below means the module ships inside the SDK 58 Expo Go client.

## TL;DR recommendation

| Decision | Library | One-line reason |
|---|---|---|
| **Adopt now** | **Reanimated 4 CSS animations and transitions** (already installed) | Declarative keyframes cover breathing, glow and fade with fewer bugs than hand-rolled `withRepeat`. `useReducedMotion` and `ReduceMotion.System` give OS reduce-motion for free. No new dependency. |
| **Adopt now** | **`@shopify/react-native-skia` 2.14.0** | Native blur, radial gradients and particles, for the soft success glow and ≤ 5 drifting stars. It is in Expo's bundled list and in Expo Go, and takes Reanimated shared values directly. |
| **Adopt now** | **`expo-haptics`, `expo-audio`, `expo-image`** (already installed) | Soft haptics, preloaded SFX, music with ducking, and pre-recorded voice prompts. No new native code needed. |
| **Adopt now (dev-only)** | **`culori` 4.0.2** | A tools script validates the palette (saturation ≤ limits, contrast against bg, WCAG red-flash test). It adds zero bytes to the app bundle. |
| Later / optional | `@rive-app/react-native` 0.5.15 | Best tool for a gentle, state-driven mascot, but it needs a human artist working in the Rive editor, a dev build, and a pinned Nitro version. |
| Later / optional | `react-native-audio-api` 1.0.0 | Web Audio on native, which could generate soft, never-repeating music. Overkill for v1, not in Expo Go, and 1.0 is only 2 weeks old. |
| Fallback only | `expo-speech` 58.0.4 | Polish TTS works offline on iOS when a voice is present, but quality and offline availability vary on Android. Prefer recorded voice clips. |
| Avoid in child area | `expo-glass-effect`, `@expo/ui`, animated `expo-mesh-gradient`, `moti`, `@gorhom/portal`, LottieFiles marketplace animations | See the per-library notes below. |

---

## 1. Animation

### 1.1 react-native-reanimated 4 (installed: 4.7.1). **Use the CSS API and explicit springs**
- Peer deps: `react-native 0.86 – 0.88`, `react-native-worklets 0.13.x`. This matches the project exactly. New Architecture only (Reanimated 4 dropped the old arch). In Expo Go. MIT.
- **CSS animations** (`animationName` keyframes, `animationDuration`, `animationIterationCount`, `animationDirection`, `animationTimingFunction` including `cubicBezier()`, `linear()` and `steps()`) and **CSS transitions** (`transitionProperty`, `transitionDuration`, `transitionTimingFunction`) work on `Animated.View` styles. They are ideal for the idle breathing, hint glow and fade-ins, and run entirely on the UI thread. Docs: https://docs.swmansion.com/react-native-reanimated/docs/css-animations/animation-timing-function
- Use worklet APIs (`useSharedValue`, `withSpring`, `withTiming`) for the drag, which needs to follow the finger.
- `useReducedMotion()` and the `reduceMotion: ReduceMotion.System` config respect the OS setting (rule R1 in CALM_DESIGN_RESEARCH.md).
- **Gotcha:** the plain `withSpring(v)` default is bouncy. Always pass `{ duration, dampingRatio }`.
- JS→RN callbacks from worklets: `scheduleOnRN` from `react-native-worklets` (`runOnJS` still exists but the worklets API is the forward path).

```tsx
// Breathing prompt: 1.00 ↔ 1.03, 3.6 s period, off under Reduce Motion (R1)
import Animated, { useReducedMotion } from 'react-native-reanimated';

const breathe = { from: { transform: [{ scale: 1 }] }, to: { transform: [{ scale: 1.03 }] } };

export function BreathingPrompt({ dragging, children }: { dragging: boolean; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const on = !reduce && !dragging;
  return (
    <Animated.View
      style={on ? {
        animationName: breathe,
        animationDuration: '1800ms',
        animationDirection: 'alternate',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      } : { transform: [{ scale: 1 }], transitionProperty: 'transform', transitionDuration: 300 }}
    >
      {children}
    </Animated.View>
  );
}

// Hint glow on correct quadrant: max 2 pulses ≥1.5 s each, then steady (R2)
const hintPulse = {
  '0%': { opacity: 0 }, '50%': { opacity: 0.45 }, '100%': { opacity: 0.3 },
};
// style={{ animationName: hintPulse, animationDuration: '1600ms', animationIterationCount: 2,
//          animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
```

### 1.2 react-native-gesture-handler 3 (installed: 3.3). **Use the v3 hook API for drag**
- v3 exposes hooks: `usePanGesture`, `useTapGesture`, `useExclusiveGestures`, `useSimultaneousGestures`, plus `GestureDetector`. Callbacks are `onBegin`, `onActivate`, `onUpdate`, `onDeactivate`, `onFinalize`. The old `Gesture.Pan()` builder still exists but is now typed as `Legacy*`. MIT, in Expo Go.
- Drag-and-drop needs no extra library. Render the dragged prompt as the **last child** of the game screen's root view (absolute positioned), so it is already drawn above the quadrants. A portal is not needed.

```tsx
import { GestureDetector, usePanGesture, useTapGesture, useExclusiveGestures } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, ReduceMotion } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const SNAP = { duration: 400, dampingRatio: 0.9, reduceMotion: ReduceMotion.System };
const BACK = { duration: 550, dampingRatio: 1, reduceMotion: ReduceMotion.System };

function DraggablePrompt({ onDrop }: { onDrop: (x: number, y: number) => 'ok' | 'miss' }) {
  const tx = useSharedValue(0), ty = useSharedValue(0), s = useSharedValue(1);

  const pan = usePanGesture({
    maxPointers: 1,           // ignore resting palm / second finger (R5)
    minDistance: 6,
    onBegin: () => { 'worklet'; s.value = withTiming(1.08, { duration: 120 }); }, // ≤100 ms ack (R1)
    onUpdate: (e) => { 'worklet'; tx.value = e.translationX; ty.value = e.translationY; },
    onDeactivate: (e) => {
      'worklet';
      scheduleOnRN(handleDrop, e.absoluteX, e.absoluteY); // finger-lift point decides (R5)
    },
    onFinalize: () => { 'worklet'; s.value = withTiming(1, { duration: 200 }); },
  });

  function handleDrop(x: number, y: number) {
    if (onDrop(x, y) === 'miss') { tx.value = withSpring(0, BACK); ty.value = withSpring(0, BACK); }
    // on 'ok' the engine animates to the quadrant centre with SNAP
  }

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: s.value }],
  }));
  return (
    <GestureDetector gesture={pan}>
      <Animated.View hitSlop={24} style={style} />
    </GestureDetector>
  );
}
```

### 1.3 @shopify/react-native-skia 2.14.0. **Adopt** (soft glow, stars, gentle gradients)
- `npx expo install @shopify/react-native-skia` resolves **2.14.0**, which is the version pinned in SDK 58's `bundledNativeModules.json`. **Included in Expo Go**, so no dev build is needed to try it. Platforms: iOS, Android, Web (web needs CanvasKit WASM loading). MIT.
- Peers: `react >= 19`, `react-native >= 0.78`, `reanimated >= 4`, `worklets >= 0.7`. All satisfied. Fabric/New Arch native.
- Perf and size: GPU-rendered and very cheap for a single small canvas. The cost is **binary size** (the npm package is about 10 MB unpacked; expect roughly several MB added per platform in the store binary, so measure with an EAS build) and some JS. Use **one `<Canvas>` per effect layer** (e.g. one per quadrant glow) rather than a full-screen canvas re-rendering every frame. Shared values can be passed directly as Skia props, so there are no React re-renders.
- What it gives Pasujki that SVG cannot do cheaply: **real Gaussian blur** (`<BlurMask>`, `<Blur>`) for a soft halo, **radial gradients** for a warm glow, **shaders** (`RuntimeEffect`) for a very slow background shimmer if ever wanted (respect R3: menus only), and particles.

```tsx
// Soft success glow behind the winning picture (R1/R2: 300 in, 400 hold, 600 out, alpha ≤ 0.45)
import { Canvas, Circle, RadialGradient, vec, BlurMask, Group } from '@shopify/react-native-skia';
import { useSharedValue, withSequence, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

const ease = Easing.inOut(Easing.quad);

export function SoftGlow({ size, color = '#F6C945', play }: { size: number; color?: string; play: number }) {
  const opacity = useSharedValue(0);
  useEffect(() => {
    if (!play) return;
    opacity.value = withSequence(
      withTiming(0.45, { duration: 300, easing: ease }),
      withDelay(400, withTiming(0, { duration: 600, easing: ease })),
    );
  }, [play]);
  const c = size / 2;
  return (
    <Canvas style={{ position: 'absolute', width: size, height: size }} pointerEvents="none">
      <Group opacity={opacity}>
        <Circle cx={c} cy={c} r={c * 0.8}>
          <RadialGradient c={vec(c, c)} r={c * 0.8} colors={[color, `${color}00`]} />
          <BlurMask blur={24} style="normal" />
        </Circle>
      </Group>
    </Canvas>
  );
}
```

```tsx
// ≤5 stars drifting up 60 pt over 1.4 s, inside the winning quadrant only (R3)
import { Canvas, Path, Skia, Group } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
const star = Skia.Path.MakeFromSVGString('M10 0 L12.9 6.9 L20 7.6 L14.6 12.3 L16.2 19.5 L10 15.8 L3.8 19.5 L5.4 12.3 L0 7.6 L7.1 6.9 Z')!;
function Star({ x, y, t }: { x: number; y: number; t: { value: number } }) {
  const transform = useDerivedValue(() => [{ translateX: x }, { translateY: y - 60 * t.value }, { scale: 1.1 }]);
  const opacity = useDerivedValue(() => 0.8 * (1 - t.value));
  return <Group transform={transform} opacity={opacity}><Path path={star} color="#F6C945" /></Group>;
}
// const t = useSharedValue(0); t.value = withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) });
```

### 1.4 moti 0.30.0. **Avoid**
- Last release was January 2025, with peer `react-native-reanimated: *`. It is not tested against Reanimated 4.7 and worklets 0.13. Everything it offered (declarative `from`/`animate`, mount/unmount transitions) is now covered natively by Reanimated 4's CSS animations, transitions and layout animations. No reason to add it.

### 1.5 Lottie: `lottie-react-native` 7.5.x / `@lottiefiles/dotlottie-react-native` 0.13.0. **Not now**
- `lottie-react-native ~7.5.0` is in SDK 58's bundled list (`npx expo install lottie-react-native`). Apache-2.0. Peers: `react >= 19.2`, `react-native >= 0.84`, and `@lottiefiles/dotlottie-react ^0.13.5` (used for web). Native module, so it needs a dev build unless the Expo Go client includes it (check the client; the bundled list only guarantees a compatible version).
- `@lottiefiles/dotlottie-react-native` 0.13.0 (MIT): the `.lottie` (zipped) format with state machines. Not in Expo's bundled list, so it needs a dev build. Young and fast-moving API.
- **Why not now:** our art is code-generated SVG (`src/art/**`). Lottie needs After Effects or LottieFiles-authored JSON, and **most marketplace kids animations are exactly the busy, bouncy, confetti style we are avoiding**. If a designer later produces a calm Lottie (e.g. a sticker reveal), `lottie-react-native` is the stable choice. Keep files < 100 KB, ≤ 30 fps, one at a time.

### 1.6 Rive: `@rive-app/react-native` 0.5.15 (new) vs `rive-react-native` 9.8.6 (legacy). **Optional, for a mascot**
- Rive's docs now call **`@rive-app/react-native`** (built on Nitro Modules, new Apple and Compose runtimes since 0.5.0) the recommended runtime replacing `rive-react-native`. MIT. Requirements: RN ≥ 0.78, Expo SDK ≥ 53, **iOS 15.1+**, Android SDK 24+. **Not in Expo Go, so a dev build is required.** Docs: https://rive.app/docs/runtimes/react-native/react-native , migration: https://rive.app/docs/runtimes/react-native/migration-guide
- **Version trap (verified on npm today):** `@rive-app/react-native@0.5.15` declares peer `react-native-nitro-modules >=0.35.10 <0.37`, but the latest Nitro is **0.37.2**. Rive's docs require ≥ 0.36.2 on RN 0.87+. So pin: `npx expo install @rive-app/react-native react-native-nitro-modules@0.36.5`.
- Why it is attractive: a **state machine** lets one small `.riv` file (often 20–80 KB) hold a mascot with idle → happy → encourage → sleepy states. Data binding (`useViewModelInstance`, `useRiveTrigger`) is driven from the engine, and `frameRate` can be capped (e.g. 30) to save battery.
- **Why not now:** a `.riv` file must be made by a human in the Rive editor. Our agents can't author it like they author SVG components. Add Rive only when a mascot is actually designed. Until then, a mascot can be an SVG component plus Reanimated CSS keyframes (blink every 5 s, slow sway).

```tsx
// Gentle mascot: idle loop, 'happy' trigger after a level, 'sleepy' at the end of a session (R3/R7/R8)
import { RiveView, useRiveFile, useViewModelInstance, useRiveTrigger, Fit } from '@rive-app/react-native';

export function Mascot({ mood }: { mood: 'idle' | 'happy' | 'sleepy' }) {
  const { riveFile } = useRiveFile(require('@/../assets/rive/mascot.riv'));
  const { instance } = useViewModelInstance(riveFile, { async: true });
  const { trigger: happy } = useRiveTrigger('happy', instance);
  const { trigger: sleepy } = useRiveTrigger('sleepy', instance);
  React.useEffect(() => { if (mood === 'happy') happy?.(); if (mood === 'sleepy') sleepy?.(); }, [mood]);
  if (!riveFile || !instance) return null;
  return <RiveView file={riveFile} dataBind={instance} fit={Fit.Contain} frameRate={30}
                   style={{ width: 160, height: 160 }} pointerEvents="none" />;
}
// Design rules for the .riv: idle cycle ≥ 4 s, blink every 4–6 s, never a sad/begging state (R7).
```

---

## 2. Graphics, colour and UI

### 2.1 react-native-svg 15.16 (installed). **Keep for all illustrations**
- Already the contract for `ItemArt`, `TextureArt` and `ShapeArt`. Cheap for static art. Don't animate SVG paths per frame (it re-renders through React). Animate the wrapping `Animated.View` transform or opacity instead.

### 2.2 expo-image (installed ~58.0.18)
- SDK 58 added an **`svgVariables` prop** (substitutes CSS custom properties in SVG files) and `transition.skipOnCacheHit`. Useful if illustrations ever move to `.svg` asset files: one file could be tinted from `COLORS` via variables. Use `transition={{ duration: 300, effect: 'cross-dissolve' }}` for calm image swaps. In Expo Go. MIT.

### 2.3 expo-linear-gradient 58.0.4 / expo-mesh-gradient 58.0.4
- `npx expo install expo-linear-gradient` / `npx expo install expo-mesh-gradient`. Both are in Expo Go, MIT.
- Linear gradient: fine for a very subtle vertical background wash (two pastels within ΔL < 5%). Static only.
- Mesh gradient (`columns`, `rows`, `points`, `colors`, `smoothsColors`; Android uses `resolution`): pretty, but **an animated mesh is a full-screen ambient motion and breaks R3**. If used, keep it static. In practice Skia can do the same, so there's no need to add both. **Skip.**

### 2.4 expo-glass-effect (installed ~58.0.5). **Not in the child area**
- iOS Liquid Glass. `isLiquidGlassAvailable` is `true` only when built with the iOS 27 SDK (SDK 58 changelog). Refraction and specular highlights shift with content and motion. That is decorative motion, low contrast, and iOS-only, so the look would differ between platforms. Acceptable at most for parents' area chrome. **Recommend removing it from the child UI entirely.**

### 2.5 @expo/ui (installed ~58.0.28). **Parents' area only**
- Native SwiftUI and Jetpack Compose components (Toggle, Slider, Picker, BottomSheet, iOS `NavigationStack` in SDK 58). Good for the **parents' settings screen** (music, SFX and voice toggles, timer picker), which then feels native and accessible. Not suitable for game visuals. Note that SDK 58 made `@expo/ui` an *optional* peer of expo-router, so it can be dropped if the parents' area uses plain RN components.

### 2.6 Colour libraries: `culori` 4.0.2 (MIT) vs `chroma-js` 3.3.0 (BSD-3/Apache-2.0)
- **Recommend `culori` as a devDependency** for a palette check script in `tools/` (owner: coordinator or art). It is ESM, tree-shakeable, and supports OKLCH/OKLab (perceptually uniform, which is good for generating pastel variants with equal lightness), with WCAG contrast and many colour spaces. chroma-js is fine too but less modern. Neither is needed at runtime: `palette.ts` holds fixed hex values.
- Install (dev only): `npx expo install culori -- --save-dev` and `npx expo install @types/culori -- --save-dev`.

```ts
// tools/check-palette.ts: enforce R4 numerically (run with: npx tsx tools/check-palette.ts)
import { converter, wcagContrast } from 'culori';
import { COLORS, UI, WORLD_TINTS } from '../src/game/palette';
const hsv = converter('hsv');
let fail = 0;
for (const [k, v] of Object.entries(COLORS)) {
  const { s = 0, v: val } = hsv(v)!;
  if (!['white', 'black', 'grey'].includes(k) && (s < 0.35 || s > 0.78 || val > 0.96)) { console.error(`COLORS.${k} ${v} s=${s.toFixed(2)} v=${val.toFixed(2)}`); fail++; }
  const rgb = converter('rgb')(v)!; // WCAG 2.3.1 "saturated red" test
  if (rgb.r / (rgb.r + rgb.g + rgb.b) >= 0.8) { console.error(`COLORS.${k} is saturated red`); fail++; }
  console.log(`${k.padEnd(7)} contrast vs bg ${wcagContrast(v, UI.bg).toFixed(2)}  vs outline ${wcagContrast(v, UI.outline).toFixed(2)}`);
}
for (const t of [UI.bg, ...WORLD_TINTS]) { const { s = 0, v } = hsv(t)!; if (s > 0.12 || v < 0.93) { console.error(`bg ${t} too saturated/dark`); fail++; } }
process.exit(fail ? 1 : 0);
```

### 2.7 Portals: `react-native-teleport` 1.2.4 / `@gorhom/portal` 1.0.14. **Not needed**
- `react-native-teleport` (MIT, active, Fabric-native) can move a mounted view to another host without remounting. It works, but our drag layer can simply be the topmost absolute child of the game screen. `@gorhom/portal` hasn't been updated since 2022 (JS-only, remounts children). **Skip both** unless the dragged prompt must escape a navigator or modal.

---

## 3. Sound, voice and haptics

### 3.1 expo-audio (installed ~58.0.12). **Primary audio engine**
- In Expo Go. MIT. SDK 58 added lock-screen playlists and WAV recording (not needed; recording is already disabled in `app.json`).
- What we need: `Audio.preload(require(...))` at module scope for **near-instant SFX**, `useAudioPlayer` (auto-released) for music, `player.volume` for fades and ducking, `player.loop = true` for the music bed.
- Audio session: `setAudioModeAsync({ interruptionMode: 'mixWithOthers', playsInSilentMode: false, shouldPlayInBackground: false })`. `mixWithOthers` is the default and right for short UI clips. Consider **`playsInSilentMode: false`** so that a parent who has the phone on silent isn't surprised. The default is `true`, so this is a coordinator decision; offer it as a parents' area toggle.
- The docs themselves point to `react-native-audio-api` for low-latency or advanced control. For us, preloading is enough.

```ts
// Ducking + fade-in (R9). Simple JS-timer fades are fine at this granularity.
import { setAudioModeAsync, createAudioPlayer, type AudioPlayer } from 'expo-audio';
export const fadeTo = (p: AudioPlayer, to: number, ms = 500) => {
  const from = p.volume, steps = Math.max(1, Math.round(ms / 50)); let i = 0;
  const id = setInterval(() => { i++; p.volume = from + (to - from) * (i / steps); if (i >= steps) clearInterval(id); }, 50);
};
// music: p.volume = 0; p.play(); fadeTo(p, 0.35, 2000);
// on voice/success: fadeTo(music, 0.175, 150); ...play clip...; on finish fadeTo(music, 0.35, 500);
```

### 3.2 react-native-audio-api 1.0.0 (Software Mansion). **Later, maybe**
- Web Audio API on native: `AudioContext`, `OscillatorNode`, `GainNode`, `BiquadFilterNode`, buffers and sample-accurate scheduling. 1.0.0 was released **2026-11-03**, with nightlies for 1.1 daily. It has an optional Expo config plugin (`plugins: ['react-native-audio-api']`) for background and permission options. MIT. **Not in Expo Go, dev build required.** About 9 MB unpacked (it ships optional FFmpeg; the plugin can disable it). No RN peer range is declared, so verify on an RN 0.88 dev build before relying on it.
- Interesting idea: **generative calm music** (pentatonic marimba-like plucks, sine or triangle with a low-pass filter around 3–4 kHz and soft envelopes, 80–96 BPM). It never loops identically and stays tiny on disk, and SFX could be pitched to the item (higher for small animals). But it is more engineering and harder to master for loudness than pre-rendered files. **Recommendation:** ship v1 with pre-rendered OGG/M4A from `tools/audio/**` through expo-audio. Revisit when the 1.x line has settled.

```ts
// sketch: a soft marimba-ish pluck (if adopted later)
import { AudioContext } from 'react-native-audio-api';
const ctx = new AudioContext();
export function pluck(freq: number, t = ctx.currentTime) {
  const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
  o.type = 'triangle'; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = 3500;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.18, t + 0.012); // soft attack, low level
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
  o.connect(f).connect(g).connect(ctx.destination); o.start(t); o.stop(t + 1);
}
```

### 3.3 expo-speech 58.0.4. **Fallback only; prefer recorded Polish voice**
- `npx expo install expo-speech`. In Expo Go. MIT. API: `speak(text, { language: 'pl-PL', voice, rate, pitch, volume, onDone })`, `getAvailableVoicesAsync()` (returns `identifier`, `language`, `name`, `quality: Default | Enhanced`), `stop()`. **On iOS it is silent when the hardware silent switch is on.** Docs: https://docs.expo.dev/versions/v58.0.0/sdk/speech/
- **iOS:** uses `AVSpeechSynthesizer`, a system framework, on-device, with no third-party SDK. A Polish voice has historically been available (Zosia), but Apple forum reports say the set of preinstalled voices changed around iOS 18.6/26, and Enhanced voices must be downloaded by the user in Settings. **Availability must be checked at runtime.**
- **Android:** uses the device's default TTS engine (usually Google Speech Services, sometimes Samsung TTS). The Polish voice data may need a download, and **if no offline pack is installed the engine may use a network voice**, meaning the system engine (not our app) sends text to Google. That conflicts with the spirit of DESIGN.md's "no network requests at all", even though the text is a static prompt and not personal data.
- **Kids Category:** expo-speech adds no third-party SDK, analytics or ads, so it does not by itself violate Apple 1.3 or Google Families rules. The risks are UX (robotic voice, inconsistent across devices, sometimes missing) and the Android network fallback above.
- **Recommendation:** record about 40 short Polish clips with a warm human voice ("Gdzie jest czerwony?", "Co pasuje do kotka?", "Brawo!", "Spróbuj jeszcze raz") and play them through expo-audio. This is consistent, warm (the Ms Rachel lesson), offline, and on-brand. Use expo-speech only in development for prototyping prompts, or as a fallback behind a check:

```ts
import * as Speech from 'expo-speech';
let plVoice: string | null | undefined;
async function polishVoice() {
  if (plVoice !== undefined) return plVoice;
  const voices = await Speech.getAvailableVoicesAsync();
  const pl = voices.filter(v => v.language?.toLowerCase().startsWith('pl'));
  plVoice = (pl.find(v => v.quality === Speech.VoiceQuality.Enhanced) ?? pl[0])?.identifier ?? null;
  return plVoice;
}
export async function sayHint(text: string) {           // e.g. sayHint('Gdzie jest czerwony?')
  const voice = await polishVoice();
  if (!voice) return;                                    // no Polish voice → stay silent, never fall back to English
  Speech.stop();
  Speech.speak(text, { voice, language: 'pl-PL', rate: 0.85, pitch: 1.05, volume: 0.8 }); // R10
}
```

### 3.4 expo-haptics (installed ~58.0.8)
- In Expo Go. MIT. Use `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)` on pick-up and `Light` on a correct snap. No `notificationAsync(Error)` and nothing on mistakes (R11). On Android, `performAndroidHapticsAsync` is available for system-consistent feedback. Throttle to 1 per 300 ms, and gate it behind the parents' area toggle.

---

## 4. Other things checked

- **Expo SDK 55–58 changes relevant here:** SDK 58 (2026-10-15) brought RN 0.88, `expo-image` `svgVariables`, `expo-font` variable fonts (only for parents' area text), `expo-audio` lock-screen playlists and WAV recording (unused), and `@expo/ui` SwiftUI navigation and modifiers. There was no new first-party animation library. Expo's guidance remains Reanimated plus Skia for animation and graphics. Expo Go for SDK 58 supports only SDK 58. Sources: https://expo.dev/changelog/sdk-58 , https://docs.expo.dev/versions/v58.0.0/
- **react-native-worklets 0.13:** use `scheduleOnRN` / `scheduleOnUI` in new code.
- **React Native 0.88 `ImageBackground` is deprecated.** Use a `View` with an absolute `Image` for any background art.

## 5. Install commands (for whoever applies this; do not run in parallel with other agents' installs)

```bash
# adopt now
npx expo install @shopify/react-native-skia          # → 2.14.0, in Expo Go
npx expo install culori -- --save-dev                # dev-only, tools/check-palette.ts
npx expo install @types/culori -- --save-dev

# optional / later (all need a dev build)
npx expo install @rive-app/react-native react-native-nitro-modules@0.36.5   # pin Nitro <0.37 (peer range)
npx expo install react-native-audio-api              # add "react-native-audio-api" to app.json plugins
npx expo install expo-speech                         # in Expo Go; fallback only

# after any native addition
npx expo-doctor && npx expo run:ios   # or: npx eas-cli@latest build --profile development
```

## Sources
- npm registry metadata (versions, peers, licences, sizes), queried 2026-11-16. `node_modules/expo/bundledNativeModules.json` (SDK 58.0.25).
- Expo docs: [Skia v58](https://docs.expo.dev/versions/v58.0.0/sdk/skia/), [Speech v58](https://docs.expo.dev/versions/v58.0.0/sdk/speech/), [Audio v58](https://docs.expo.dev/versions/v58.0.0/sdk/audio/), [MeshGradient v58](https://docs.expo.dev/versions/v58.0.0/sdk/mesh-gradient/), [llms.txt](https://docs.expo.dev/llms.txt), [SDK 58 changelog](https://expo.dev/changelog/sdk-58)
- Reanimated CSS animations: https://docs.swmansion.com/react-native-reanimated/docs/css-animations/animation-timing-function
- Rive React Native: [runtime docs](https://rive.app/docs/runtimes/react-native/react-native), [migration guide](https://rive.app/docs/runtimes/react-native/migration-guide), [Expo guide](https://rive.app/docs/runtimes/react-native/adding-rive-to-expo)
- react-native-audio-api: [getting started](https://docs.swmansion.com/react-native-audio-api/docs/fundamentals/getting-started), [Expo plugin](https://docs.swmansion.com/react-native-audio-api/docs/other/audio-api-plugin), [OscillatorNode](https://docs.swmansion.com/react-native-audio-api/sources/oscillator-node)
- TTS voice availability (forum-level evidence, verify on devices): [Apple Developer Forums: AVSpeechSynthesis voices](https://developer.apple.com/forums/thread/829725), [Google TTS language data (Wikipedia mirror)](https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Google_Text-to-Speech), [b4x forum: offline language packs](https://www.b4x.com/android/forum/threads/offline-text-to-speech-language-pack.71889/)
- Apple Kids Category 1.3 summaries: [Apple developer news 2019](https://developer.apple.com/news/?id=06032019j), [ConductAtlas provision](https://conductatlas.com/platform/apple/apple-app-store-review-guidelines/provision/CA-P-018790/kids-category-apps-must-not-include-third-party-analytics-or-ads/). Confirm against the live guidelines at developer.apple.com/app-store/review/guidelines.
