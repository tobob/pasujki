# Pasujki — design brief (read before working on anything)

## The game
A matching game for children aged **2–4** (playable up to ~5). The screen is split into **four quadrants** (corners), each holding a picture: an animal or an object. In the **centre** appears a prompt: a colour, a texture, a shape or a picture. The child **drags** it to the matching quadrant (and a **tap** on a quadrant also counts, for the youngest). Goals: association, categorisation, fine motor skills (dragging), visual discrimination.

Progression: from "identical picture, only 2 corners active" (2-year-olds) → colour → shape → texture → food / home / baby → weather / pairs (4–5). Plus an **abstract** world: nothing really fits, every choice is good and gets a celebration. It is about imagination ("which animal likes this colour?").

## Hard rules: CALM (Bob's request)
Kids' apps today overstimulate. Pasujki is meant to be the opposite: calm, warm, interesting, with no visual jitter.

- **Colours:** pastel backgrounds, softened but nameable content colours (`src/game/palette.ts`). No neon, no high-contrast stripes across the whole screen, no saturated full-screen flashes.
- **Animation:**
  - Slow and soft: 250–600 ms, easing `ease-in-out` or a soft spring (high damping).
  - No flashing and no strobing (nothing above 3 Hz, WCAG 2.3.1).
  - No shaking of the screen and no fast confetti across the whole screen.
  - At most one moving thing that draws attention at a time.
  - Idle animation, if any, is a slow "breathing" scale of 1.0–1.03 over about 2–3 s.
- **Reward:** short and quiet. A soft glow, a gentle bounce of the picture, a few slowly drifting stars and a pleasant sound. A level ends with a calm "well done" and a sticker. No slot-machine rewards, no loot boxes, no countdown timers, no pressure, no streaks.
- **Mistake:** nothing negative. No red X and no "buzzer" sound. The prompt gently drifts back to the centre, the correct corner glows softly after the 2nd attempt, and the try-again sound is warm.
- **Sound:** music is bouncy but soft: about 90–110 BPM, quiet in the mix, warm timbres (marimba, xylophone, soft pads, ukulele-like plucks), no harsh high frequencies. Music and sound effects can be toggled separately.
- **Touch:** targets at least about 120 pt, a large dragged object, tolerant drop detection (drop anywhere in the quadrant). No multi-tap and no precise gestures.
- **No text** needed to play (children can't read). Text appears only in the parents' area.

## Store / child privacy (Kids Category, Designed for Families)
- No ads, no in-app purchases (for now), no analytics or tracking SDKs, no network requests at all, no external links in the child area.
- Settings / info / anything leading outside sits behind a **parental gate** (e.g. "hold for 3 s" plus a simple multiplication-style task with text the child can't read).
- Everything is offline; progress is stored locally (`expo-sqlite/kv-store`).

## Visual style
- Flat, rounded, friendly illustrations.
- A consistent soft charcoal outline `#4B4453` (`UI.outline`) with stroke width ≈4 on a 100×100 viewBox.
- Big simple shapes, cute faces (dot eyes, small smile), no detail noise.
- Each picture has ONE clearly dominant colour from `COLORS` (so colour rounds are fair).

## Code map and ownership (parallel agents: edit ONLY your own files)

| Area | Owner | Files |
|---|---|---|
| Contract | coordinator | `src/game/types.ts`, `src/game/palette.ts`, `docs/DESIGN.md` |
| Levels | levels | `src/game/levels.ts`, `src/game/item-attributes.ts`, `scripts/validate-levels.ts`, `docs/LEVELS.md` |
| Illustrations | art | `src/art/**`, `assets/images/icon*.png`, `assets/images/splash*.png`, `assets/images/android-icon-*.png`, `tools/art/**` |
| Audio | audio | `assets/audio/**`, `src/audio/index.ts`, `tools/audio/**` |
| Engine / UI | engine | `src/app/**`, `src/components/**`, `src/game/engine/**`, `src/hooks/**`, `src/storage/**`, `app.json` |
| Research | research-* | `docs/STORE_COMPLIANCE.md`, `docs/CALM_DESIGN_RESEARCH.md`, `docs/LIBRARIES.md` |

Interfaces that stay stable: `ItemArt`, `TextureArt`, `ShapeArt` from `@/art`; `SFX` and `MUSIC` from `@/audio`; `WORLDS` from `@/game/levels`. Don't commit: the coordinator commits.
