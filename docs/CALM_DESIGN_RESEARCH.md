# Pasujki: calm design research and numeric rules

Author: research agent (design and tech), 2026-11-16. Scope: what the evidence says about overstimulation in young children's media, turned into **numbers the engine, art and audio agents can apply**. Section 4 lists the changes proposed for `docs/DESIGN.md`. The coordinator decides which ones to adopt.

> TL;DR: in this game one thing moves at a time. Touches get an answer within 100 ms. Motion takes 300–600 ms. Celebrations last at most about 1.5 s and stay inside the winning quadrant. Nothing flashes or pulses faster than once per 1.5 s. Backgrounds are near-white pastels. Content colours are clear but not neon, and always outlined. Rewards are fixed and predictable. The app never pushes the child to keep playing.

---

## 1. What the research says (short, with sources)

### 1.1 Fast pacing and executive function
- **Lillard & Peterson (2011), *Pediatrics* 128(4).** 60 four-year-olds were randomly assigned to 9 minutes of a fast, fantastical cartoon (SpongeBob), a slow realistic cartoon (Caillou), or drawing. Afterwards the fast-cartoon group did significantly worse on executive-function tasks (attention, impulse control, delay of gratification). One example: 15% passed a problem-solving task, against 35% (slow cartoon) and 70% (drawing). Limitations: the sample was small, blinding was imperfect (Christakis editorial), and only the short-term effect was measured. Follow-up work by Lillard and colleagues (2015, *Developmental Psychology*) pointed more to **fantastical events plus pacing** than to cut rate alone. [UVA Magazine](https://uvamagazine.org/articles/costly_cartoons), [Medical News Today](https://www.medicalnewstoday.com/articles/234246), [EarthSky](https://earthsky.org/human-world/spongebob-may-not-be-good-for-4-year-old-thinking/)
- **What it means for Pasujki:** what matters is *how much changes per second and how surprising it is*. A matching game asks for exactly the skills that study measured: inhibiting a wrong drag, holding the prompt in mind. Screen chaos works directly against the learning goal.

### 1.2 The "Cocomelon effect" and the move to calmer shows
- The popular claim is that Cocomelon cuts every 1–3 s while Bluey holds shots for 5–10 s. These figures are **informal estimates from parenting blogs, not peer-reviewed measurements**, and no published study tests Cocomelon specifically. The defensible version is the general one above: fast pacing plus constant novelty taxes self-regulation in preschoolers. Bluey, Ms Rachel and "slow TV" are popular *because* parents report calmer children afterwards, which is anecdotal but consistent with 1.1. [Screenwise overview](https://screenwiseapp.com/guides/cocomelon-effects-on-baby-attention-span), [Stelle "what low stim really means"](https://stelleworld.com/blogs/mom-tips/low-stimulation-shows-for-toddlers)
- Useful takeaway from that debate: "low stimulation" means **pacing, colour, sound design and how many things compete for attention**. It does not mean boring. Ms Rachel is slow but warm, uses a human voice, pauses for the child to answer, and repeats things. Those are all things we can copy.

### 1.3 Visual clutter and "seductive details"
- **Fisher, Godwin & Seltman (2014), *Psychological Science*.** 24 kindergarteners learned less (42% vs 55% correct) and spent more time off task in a heavily decorated classroom than in a sparse one. [CMU news](https://www.cmu.edu/news/stories/archives/2014/may/may27_decoratedclassrooms.html), [APS](https://psychologicalscience.org/news/releases/heavily-decorated-classrooms-disrupt-attention-and-learning-in-young-children.html/comment-page-1)
- **Seductive-details research:** decoration that is interesting but unrelated to the task pulls attention away from it, and children's smaller working memory makes them more vulnerable. [Overview](https://en.wikipedia.org/wiki/Seductive_details), [PMC10176302](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10176302/)
- **For Pasujki:** while the child is choosing, only the prompt may move. Backgrounds carry no pattern and no ambient animation.

### 1.4 AAP guidance for 2–5 year olds
- AAP (2016 policy, still the basis of current guidance): **at most 1 hour a day of high-quality programming** for ages 2–5, co-viewed and co-played where possible. Avoid **fast-paced programs**, apps with distracting content, and violence. Screens should not be used to calm a child as the only strategy. [ScienceDaily (AAP release)](https://sciencedaily.com/releases/2016/10/161021121843.htm), [Healio](https://www.healio.com/pediatrics/developmental-behavioral-medicine/news/online/%7b17921555-a6d8-482c-b084-006d96b4f282%7d/aap-recommends-1-hour-limit-on-digital-media-use-for-preschoolers), [Children's Mercy 2025 clinician guide](https://www.childrensmercy.org/health-care-providers/refer-or-manage-a-patient/connect-with-childrens-mercy/newsletter-the-link/the-link-2025/the-link---july-2025/mental-health-screens-and-sanity-a-pediatricians-guide-to-managing-recreational-media/)
- **For Pasujki:** the 1 hour covers *all* screens, so a session should be **short (5–15 min)**. The app should create natural stopping points and support co-play: a parent can easily join in by saying "Gdzie jest czerwony?" together with the child.

### 1.5 What makes an app educational: the four pillars
- **Hirsh-Pasek, Zosh, Golinkoff, Gray, Robb & Kaufman (2015), *Psychological Science in the Public Interest* 16(1).** An app supports learning when it is **(1) active** (minds-on, not just tapping), **(2) engaged** (no distractions pulling attention off the learning goal), **(3) meaningful** (connected to the child's life), and **(4) socially interactive** (with people, around or through the app), and when it has a clear learning goal. [APS summary](https://www.psychologicalscience.org/publications/educational-apps.html), [New America](https://www.newamerica.org/insights/new-framework-identify-truly-educational-apps/)
- Pillar 2 says explicitly that "bells and whistles" (sounds, animations and rewards *unrelated to the task*) **break engagement**. A 2021 app-store analysis using this framework found that most top "educational" apps scored low on it. [Meyer et al. 2021 PDF](https://kathyhirshpasek.com/wp-content/uploads/sites/9/2021/03/How-educational-are-educational-apps-for-young-children-App-store-content-analysis-using-the-Four-Pillars-of-Learning-framework.pdf)
- **For Pasujki:** every animation must carry information (you grabbed it / it fits / try here) or be the reward. Use real-world items (food, home, weather) for "meaningful". For "social", add a parent tip card in the parents' area ("ask your child why the duck likes yellow"). The abstract world is an excellent conversation starter.

### 1.6 Manipulative design (dark patterns)
- **Radesky et al. (2022), *JAMA Network Open* 5(6):e2217641.** Of 160 apps used by 3–5 year olds, **about 80% contained manipulative design** and only about 20% had none. Nearly every child (about 99%) used at least one such app. Tactics found: **parasocial pressure** (a character looks sad or begs the child to keep playing or buy), **fabricated time pressure** (timers, "hurry!"), **navigation constraints** (you can't leave without watching or doing X), **lures to prolong play** (auto-start of the next level, "one more!"), and ads or purchase prompts. Lower-SES children were exposed more. [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC9206186/), [Michigan Medicine](https://www.michiganmedicine.org/health-lab/design-tricks-commonly-used-monetize-young-childrens-app-use)
- **For Pasujki:** see rule set R7. DESIGN.md already bans timers, streaks, loot boxes and IAP. Still missing: **mascot behaviour**, **no auto-advance**, and **no "come back" nudges**.

### 1.7 Toddler motor skills and touch targets
- 2-year-olds can reliably **tap**, and many can **drag**. In one compilation, roughly 71% could tap and 41% could drag. 3-year-olds add flicking and rotating, and by 4 children follow instructions such as "tap only when…" much better. In a Frontiers 2017 study (170 children aged 2–4), no single interaction style was best for learning. Dragging helped experienced children, and some young children did better just watching. [Frontiers news](https://www.frontiersin.org/news/2017/05/09/touchscreens-frontiers-psychology-how-do-toddlers-learn-best-from-touchscreens), [ScienceDaily](https://sciencedaily.com/releases/2017/05/170508112428.htm), [Nacher et al., IJHCS (pre-K gestures)](https://riunet.upv.es/bitstream/handle/10251/64752/IJHCS-Nacher.pdf?sequence=2)
- Children's touches **miss the target 46% of the time against 32% for adults**, and children's contact patches are as large as adults' because their motor control is weaker. [Anthony et al.](https://lisa-anthony.com/wp-content/uploads/2013/04/anthony-et-al-jpuc2013.pdf), [Woodward et al. CHI 2016](https://init.cise.ufl.edu/wp-content/uploads/sites/378/2017/05/Woodward-et-al-CHI2016_0.pdf)
- **Nielsen Norman Group:** touch targets for young children should be **at least 2 × 2 cm**, about 4× the adult minimum. 2 cm is about **128 pt on iPhone** (163 pt/in) and about **104 pt on iPad** (132 pt/in). [NN/g: Physical development and children's UX](https://www.nngroup.com/articles/children-ux-physical-development/)
- **For Pasujki:** tap is the primary input for 2-year-olds and drag is a bonus. Hit areas should be bigger than the visible art. Accept a drop anywhere in the quadrant. Ignore a second finger or a resting palm.

### 1.8 Photosensitivity (WCAG 2.3.1)
- Pass if there are **no more than 3 flashes in any 1 s**, or if the flashing area is small. A "general flash" is an opposing pair of relative-luminance changes of **≥10%** where the darker state is below 0.80. The small-area limit is 0.006 sr, about 25% of a 10° field (about 341×256 px at 1024×768). A **saturated red** flash, where R/(R+G+B) ≥ 0.8, has the same 3/s limit. [W3C Understanding 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)
- Our palette check (computed for this report): no `COLORS` entry is a saturated red. `red #E5534B` has R/(R+G+B) = 0.59, so red-flash risk is nil. A quadrant is about 25% of the screen, so a full-quadrant glow is close to the area limit. The fix is to **never toggle it faster than 1 cycle per 1.5 s** (R2).

### 1.9 Sound levels for children
- The **WHO–ITU H.870 "safe listening" standard** has a **children's mode of 75 dB(A) for 40 h/week**, a weekly dose, against 80 dB for adults. It recommends volume limiting and parental volume controls. Phone speakers at close range and at max volume can exceed this. [WHO–ITU standard](https://www.who.int/publications-detail/safe-listening-devices-and-systems-a-who-itu-standard), [Health Policy Watch](https://healthpolicy-watch.org/new-who-itu-standard-released-on-safe-listening-to-prevent-hearing-loss)
- An app cannot set system volume, but it **can keep its own master gain low, avoid sudden loud onsets, and duck music under feedback**.

### 1.10 Rewards without addiction loops
- **Variable-ratio rewards** (random prizes, chests, spins) are the most compulsion-forming schedule. That is the slot-machine mechanism, and Radesky's coders flagged it as manipulative. **Fixed, predictable rewards tied to effort** (one sticker per finished level) give children closure without a "one more" hook. Praise should be for effort and process ("you tried again!") and stay calm. Big celebrations for routine success make the reward the goal and push the task into the background (overjustification). See Radesky 2022 above. Mood and interactivity research: [Frontiers 2017](https://www.frontiersin.org/news/2017/05/09/touchscreens-frontiers-psychology-how-do-toddlers-learn-best-from-touchscreens).

---

## 2. Concrete numeric rules for Pasujki

The codes (R1, R2, …) let PRs and reviews refer to a rule. Values marked **(DESIGN)** already match `docs/DESIGN.md`. Values marked **(NEW)** or **(CHANGE)** are proposals.

### R1. Motion timing and easing

| Event | Duration | Easing / physics | Notes |
|---|---|---|---|
| **Touch acknowledgement** (pick-up scale 1.0 → 1.08, slight lift shadow) | **≤ 100 ms to start**, 150 ms to finish | `ease-out` | (NEW) Instant response shows the child "it worked". Below 100 ms feels like direct manipulation. |
| Item follows finger while dragging | 0 ms (1:1) | none | Never lag or smooth the finger position. |
| Drop on correct quadrant: snap into place | 300–400 ms | spring `{ duration: 400, dampingRatio: 0.85–0.95 }` | Overshoot at most 3% of travel. |
| **Wrong drop: drift back to centre** | 450–600 ms | `ease-in-out` or spring `dampingRatio ≥ 0.9` | (DESIGN) Slow and floaty, no bounce, no shake. |
| Picture "happy bounce" | 1 bounce, 500–700 ms total, scale peak ≤ **1.10** | spring `dampingRatio 0.6–0.7` | (NEW limit) A single bounce, never a loop. |
| Success glow | fade in 300 ms, hold 400 ms, fade out 600 ms | `ease-in-out` | One cycle only. |
| Whole celebration (glow + bounce + stars + chime) | **≤ 1500 ms**, then the next prompt fades in | | (NEW) Keeps rhythm calm without dead time. |
| Next prompt appears | fade + scale 0.9 → 1.0, 400 ms, **after a 300–500 ms pause** | `ease-out` | (NEW) The pause gives a "breath" between rounds. |
| Screen / level transitions | cross-fade 400–600 ms | `ease-in-out` | No slide-ins from off-screen, no zooms, no wipes. |
| Idle "breathing" of the prompt | scale 1.00 ↔ 1.03, **period 3.5–4 s** (1.75–2 s each way) | `ease-in-out`, alternate | (CHANGE: DESIGN says 2–3 s). A period of 3.5–4 s, about 0.25–0.29 Hz, is closer to calm adult breathing and reads as "alive" rather than "pulsing". Stops while dragging. |

- **Never use the default `withSpring()`.** Reanimated's default spring is under-damped. Always pass `{ duration, dampingRatio }` with dampingRatio ≥ 0.85, except for the single 0.6–0.7 "happy bounce".
- Allowed easings: `ease-in-out`, `ease-out`, `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard), `cubic-bezier(0.25, 0.1, 0.25, 1)`. **Banned:** elastic, bounce-out with more than 1 rebound, `steps()`, linear for anything except opacity.
- **Respect the OS "Reduce Motion" setting** (NEW). Use Reanimated's `useReducedMotion()` and `ReduceMotion.System`. Under reduce-motion: no idle breathing, no stars, the bounce becomes an opacity/glow change, and movement is shortened to cross-fades.

### R2. Flicker and pulse limits (photosensitivity)
- Nothing toggles brightness, opacity or colour **faster than 1 cycle per 1.5 s** (≤ 0.67 Hz). That is a wide margin under WCAG's 3 Hz.
- A hint glow on the correct quadrant: **max 2 pulses**, period ≥ 1.5 s, peak alpha ≤ 0.45. After that it stays at a steady soft glow until the drop.
- **No full-screen colour change** faster than a 400 ms cross-fade. No white flash on success.

### R3. How many things may move at once
- **While the child is choosing: exactly 1 moving element**, the prompt (breathing, or following the finger). The four quadrant pictures are **static**.
- **During a celebration: 1 focal event** (the winning picture's bounce and glow) **plus at most 5 star particles**, all confined to the winning quadrant's bounds. The other three quadrants stay completely still.
- Stars: 3–5 particles, size 16–28 pt, opacity ≤ 0.8, drift **upward 40–80 pt over 1.2–1.6 s** while fading out. Rotation at most 30° over the whole life. No rainbow colours: one warm tone (`#F6C945` at 80%) or the item's own colour.
- **Ambient motion** (clouds, leaves): none during rounds. On menus and maps, at most 1 element slower than 20 pt/s.
- Mascot (if added): idle loop ≥ 4 s, blinking ≤ once per 4–6 s, and **animates only between rounds**, never while the child is choosing.

### R4. Colour

| Token | Rule | Current status |
|---|---|---|
| Backgrounds and world tints | HSV saturation **≤ 0.12**, value **≥ 0.93** | `UI.bg #FFF8EC` S=0.07 OK. All `WORLD_TINTS` OK. |
| Content colours (`COLORS`) | HSV saturation **0.35–0.78**, value **≤ 0.96**. No pure `#FF0000`, `#00FF00`, `#0000FF`, `#FFFF00`, `#FF00FF`. | All current values pass (red S=0.67, yellow S=0.72, orange S=0.77 is the most saturated and acceptable, blue S=0.66). |
| Large areas of `#FFFFFF` or `#000000` | Not allowed as full-screen surfaces | Use `UI.card #FFFFFF` only for small cards. Consider `#FFFDF8`. |
| Outline | **Every item must have the `#4B4453` outline** | Required, because on cream bg: yellow contrast **1.49:1**, white **1.01:1**, pink **1.96:1**, grey **2.29:1**, green **2.46:1**. Without the outline these pictures blur into the background. With it (8.8:1) they read well. |
| Distinct hues on screen at once (excluding neutrals and outline) | **≤ 5** in a round (4 items plus 1 prompt). Backgrounds are neutral or pastel. | See R4a. |
| Success / hint colours | warm, low-alpha (glow ≤ 0.45 alpha). Never red for "wrong". | `UI.gentleNo #F2B880` OK. |

**R4a (CHANGE, important):** the four quadrant tiles currently each get a different pastel tint (`UI.quadrant` = pinkish, bluish, greenish, yellowish). **In colour rounds this is a confound.** A 2-year-old asked to match red may drop on the pink-tinted tile or confuse the tint with the item's colour. **Proposal:** all four quadrant tiles use one neutral card colour (e.g. `#FFFFFF` at 70% over the world tint, or `#FDFBF6`) in *all* rounds, and the world identity comes from the world background tint. If tinted tiles are kept for non-colour worlds, they must be **identical** in colour, shape and texture rounds.

### R5. Touch and input
- **Visible picture in a quadrant: ≥ 120 pt.** **Hit area: the whole quadrant** (DESIGN). The dragged prompt is drawn at **≥ 110 pt** with a **≥ 150 pt** grab area (`hitSlop`).
- 2 cm physical minimum (NN/g): 128 pt on iPhone, 104 pt on iPad. Our quadrants exceed this everywhere. Parents' area controls follow the same rule.
- Pan gesture: `maxPointers: 1`, `minDistance: 4–8 pt`. Track only the first finger and ignore palms or second fingers (toddlers rest the other hand on the screen).
- **Drop resolution:** the quadrant containing the *finger-lift point* wins. If the lift is inside a central dead zone (radius about 60 pt), drift back with no penalty and no "wrong" sound. Don't require the item's centre to be inside.
- **Tap a quadrant = answer** (DESIGN). For the 2-year-old world, show a first-time hint of a slow "ghost hand" moving from the prompt to the correct quadrant (1.5 s, once, only after 5 s of inactivity).
- Accept *any* duration of touch. No long-press semantics in the child area (the parental gate is the only hold).
- Keep interactive elements **≥ 24 pt from screen edges** to avoid system gestures (home indicator, Android back swipe). The app already sets `predictiveBackGestureEnabled: false`.

### R6. Mistakes (errorless-learning ladder)
1. **1st wrong attempt:** the prompt drifts back (450–600 ms). A warm, short, soft "hmm?" sound (≤ 400 ms, pitch going *up*, questioning, not down and sad). No glow.
2. **2nd wrong attempt:** same, then the **correct quadrant glows softly** (R2: max 2 pulses, then steady). (DESIGN)
3. **3rd wrong attempt:** (NEW) the prompt **gently travels by itself** to the correct quadrant over 900 ms, and a normal small celebration plays. The child always finishes the round successfully.
- **Inactivity:** after **8 s** with no touch, the prompt does one slow breath at 1.06 scale. After **15 s**, the hint glow plays. Nothing louder ever happens. No "are you there?" nagging.
- Never: red, an X, shaking, buzzers, a frowning mascot, a lost star or life, a visible error count. Mistakes may be logged locally only to tune difficulty, not shown to the child.

### R7. Rewards and anti-dark-pattern rules
- **Per round:** the celebration from R1 and R3 (≤ 1.5 s). Same structure every time, with small variation only in which chime or bounce plays (pick from 3–4 equivalents) so it doesn't feel robotic. **No random "big win" variants.**
- **Per level (5–6 rounds, about 2–3 min):** one calm "well done" (voice and a soft chord, ≤ 3 s) and **one deterministic sticker**. The same level always gives the same sticker. No chests, spins, mystery boxes or "rare" stickers.
- **After a level: return to the world map.** **Never auto-start the next level** (Radesky: "lures to prolong play").
- **Mascot rules:** the mascot never looks sad, begs, cries, or says "don't go" or "one more". When the child or parent leaves, it waves calmly or yawns. The mascot never mentions purchases or the parents' area.
- **No notifications** of any kind, no "come back tomorrow", no streaks, no daily rewards, no timers, no "hurry" music. (Partly DESIGN.)
- **Navigation:** the child can always leave a level with one tap on a home button (top corner, ≥ 64 pt, no confirmation). Nothing ever blocks exit.

### R8. Session length
- **Level:** 5–6 rounds, about 2–3 minutes. **World:** 4–6 levels.
- **Suggested session: 10–15 min.** (AAP: ≤ 1 h/day of *all* screen time at 2–5.)
- **(NEW) Optional parent timer** in the parents' area: off / 10 / 15 / 20 min. When it expires, the current round finishes, then a calm "sleepy" ending plays: the mascot yawns, the music fades out over 3 s, and a "see you later" screen appears. It doesn't lock harshly; a parent can continue through the gate.
- **(NEW) Natural stopping point:** after **3 completed levels in a row**, the world map shows a gentle "rest" moment (the mascot sits down, the music softens) without blocking play.

### R9. Sound

| Parameter | Rule |
|---|---|
| Music tempo | **80–100 BPM** (CHANGE: DESIGN says 90–110). 100–110 is acceptable for an occasional "bouncy" map theme. Rounds stay ≤ 100. |
| Music loudness | Mastered around **−23 LUFS integrated**, at least 6 dB below SFX. In-app music gain **0.3–0.35** (current `VOLUME.music = 0.35` OK). |
| Music start | **Fade in over 2 s**, fade out over 1–3 s. Never start at full volume. |
| Ducking | When a voice prompt or the success chime plays, **lower music by 6 dB (gain × 0.5) for its duration** and return over 500 ms. |
| SFX | Peaks ≤ **−6 dBFS**, gain 0.6–0.8. Duration: taps and pick-ups 80–200 ms, success chime 400–1200 ms, try-again 200–400 ms. |
| Spectrum | Soft attack (≥ 10 ms, no clicks). Gently roll off above about **8 kHz**. Avoid piercing peaks in the **2–5 kHz** range, where the ear is most sensitive. Warm timbres (marimba, felt piano, ukulele, soft pads). (DESIGN) |
| Variety | Same chime family throughout the app. At most 1 SFX at a time (ignore or queue overlapping triggers within 150 ms). |
| Silence | Allow silence. Music is optional; a ≥ 4–8 bar gap in the loop is fine. |
| Master | App master gain ≤ 0.8. Music and SFX toggles are separate (DESIGN), plus (NEW) **voice prompts** on/off. |
| Audio session | `interruptionMode: 'mixWithOthers'` (don't kill a parent's podcast). `playsInSilentMode` respects the parent's choice (see LIBRARIES.md). |

### R10. Voice prompts (NEW, recommended)
- Children can't read, but 2–3 year olds benefit a lot from **a human voice saying the task** ("Gdzie jest **czerwony**?", "Co pasuje do kotka?"). Ms Rachel's success comes partly from warm, slow speech and pauses.
- Speech rate about **0.85× normal**, the key word stressed, followed by a **≥ 2 s pause** before anything else happens. Repeat the prompt only if the child doesn't act within 8 s, and at most once.
- **Prefer pre-recorded human voice files** (a warm Polish speaker, about 40 short clips) over TTS. See LIBRARIES.md §expo-speech for why TTS is a fallback only.

### R11. Haptics
- Light only: `ImpactFeedbackStyle.Soft` or `Light` on pick-up and on a correct snap. No haptic on mistakes. At most 1 haptic per 300 ms. Tied to the SFX toggle, or its own toggle in the parents' area. (iPads have no Taptic Engine, so treat haptics as a bonus.)

---

## 3. Checklist for reviewing any screen (copy into PR descriptions)

- [ ] While choosing, does exactly one thing move?
- [ ] Is every pulse or blink slower than 1 per 1.5 s, with ≤ 2 repeats?
- [ ] Is every motion between 300 and 600 ms (celebration ≤ 1.5 s total), with no default spring?
- [ ] Do stars stay inside the winning quadrant, ≤ 5 of them?
- [ ] Do the background tints have S ≤ 0.12, with every item outlined and no neon?
- [ ] Are the quadrant tiles identical in colour rounds?
- [ ] Does a wrong answer get no red, no X, no shake, no buzzer, and is the 3rd attempt auto-guided?
- [ ] Is there no auto-advance, no timer, no streak, no sad mascot, and is exit always one tap?
- [ ] Is Reduce Motion handled?
- [ ] Does music fade in, duck under voice and SFX, and stay at gain ≤ 0.35?

---

## 4. Proposed changes to `docs/DESIGN.md` (owner: coordinator)

1. **Animation, timing split:** add "touch acknowledgement starts within 100 ms; movement 300–600 ms; a full celebration ≤ 1.5 s; 300–500 ms pause before the next prompt." The current 250–600 ms range doesn't cover the celebration as a whole.
2. **Idle breathing period:** change "about 2–3 s" to **3.5–4 s per cycle**, prompt only, paused while dragging.
3. **Springs:** add "never the default spring; dampingRatio ≥ 0.85 (0.6–0.7 only for the single happy bounce, peak scale ≤ 1.10)".
4. **Stars:** quantify as "≤ 5 particles, confined to the winning quadrant, 1.2–1.6 s, opacity ≤ 0.8".
5. **Flicker:** besides "nothing above 3 Hz", add the stricter "**≤ 1 pulse per 1.5 s, max 2 pulses**" for glows and hints.
6. **Reduce Motion:** add a line requiring support for the OS setting.
7. **Quadrant tiles (important):** `UI.quadrant` has four different pastels, which confounds colour rounds. Make the tiles identical (neutral) at least in colour rounds, ideally always, and carry the world identity in the background.
8. **Outline is mandatory**, not just stylistic: yellow, white, pink and grey items have contrast < 2.3:1 against `UI.bg` without it.
9. **Mistake ladder:** add the 3rd-attempt auto-guide, and inactivity timings of 8 s (soft breath) and 15 s (hint glow).
10. **Music tempo:** 90–110 → **80–100 BPM for rounds** (≤ 110 for menus). Add the loudness, fade-in and ducking rules from R9.
11. **Voice prompts:** add an optional Polish voice prompt ("Gdzie jest czerwony?"), recorded rather than TTS, with its own toggle. This doesn't conflict with "no text".
12. **Anti-dark-pattern additions:** no auto-advance to the next level, mascot rules (never sad or begging), no notifications, exit always one tap.
13. **Session:** add the level length (5–6 rounds), the suggested 10–15 min session, the optional parent timer with a calm "sleepy" ending, and a rest moment after 3 levels.
14. **Touch specifics:** `maxPointers: 1`, drop resolved by the finger-lift point, a central dead zone of about 60 pt, the prompt grab area ≥ 150 pt, and controls ≥ 24 pt from screen edges.
15. **Haptics:** soft or light only, no haptic on mistakes, toggleable.
16. **Parents' area:** add a co-play tip ("ask your child why…"), which supports the social pillar.

What DESIGN.md already gets right (keep it): no timers, streaks, loot boxes or IAP; no red X or buzzer; the glow after the 2nd attempt; tap as an alternative to drag; no text in the child area; ≥ 120 pt targets; warm timbres; separate music and SFX toggles; offline with no tracking; a parental gate; one dominant colour per picture; the outline style.

---

## Sources
- Lillard, A. S., & Peterson, J. (2011). The immediate impact of different types of television on young children's executive function. *Pediatrics*, 128(4), 644–649. Coverage: [UVA Magazine](https://uvamagazine.org/articles/costly_cartoons), [Medical News Today](https://www.medicalnewstoday.com/articles/234246), [EarthSky](https://earthsky.org/human-world/spongebob-may-not-be-good-for-4-year-old-thinking/), [Cavalier Daily](https://www.cavalierdaily.com/article/2011/09/research-finds-spongebob-harmful-to-kids)
- Radesky, J. et al. (2022). Prevalence and characteristics of manipulative design in mobile applications used by children. *JAMA Netw Open* 5(6):e2217641. [PMC9206186](https://pmc.ncbi.nlm.nih.gov/articles/PMC9206186/), [Michigan Medicine](https://www.michiganmedicine.org/health-lab/design-tricks-commonly-used-monetize-young-childrens-app-use), [deceptive.design summary](https://deceptive.design/articles/prevalence-and-characteristics-of-manipulative-design-in-mobile-applications-used-by-children)
- Hirsh-Pasek, K. et al. (2015). Putting education in "educational" apps. *PSPI* 16(1). [APS](https://www.psychologicalscience.org/publications/educational-apps.html), [New America](https://www.newamerica.org/insights/new-framework-identify-truly-educational-apps/), [Meyer et al. 2021 app analysis](https://kathyhirshpasek.com/wp-content/uploads/sites/9/2021/03/How-educational-are-educational-apps-for-young-children-App-store-content-analysis-using-the-Four-Pillars-of-Learning-framework.pdf)
- AAP Council on Communications and Media (2016). Media and Young Minds. *Pediatrics* 138(5). [ScienceDaily](https://sciencedaily.com/releases/2016/10/161021121843.htm), [Healio](https://www.healio.com/pediatrics/developmental-behavioral-medicine/news/online/%7b17921555-a6d8-482c-b084-006d96b4f282%7d/aap-recommends-1-hour-limit-on-digital-media-use-for-preschoolers), [Children's Mercy 2025](https://www.childrensmercy.org/health-care-providers/refer-or-manage-a-patient/connect-with-childrens-mercy/newsletter-the-link/the-link-2025/the-link---july-2025/mental-health-screens-and-sanity-a-pediatricians-guide-to-managing-recreational-media/)
- Fisher, A. V., Godwin, K. E., & Seltman, H. (2014). Visual environment, attention allocation, and learning in young children. *Psychological Science*. [CMU](https://www.cmu.edu/news/stories/archives/2014/may/may27_decoratedclassrooms.html)
- Seductive details: [Wikipedia overview](https://en.wikipedia.org/wiki/Seductive_details), [PMC10176302](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10176302/)
- Toddler touch interaction: [Frontiers 2017](https://www.frontiersin.org/news/2017/05/09/touchscreens-frontiers-psychology-how-do-toddlers-learn-best-from-touchscreens), [Nacher et al. IJHCS](https://riunet.upv.es/bitstream/handle/10251/64752/IJHCS-Nacher.pdf?sequence=2), [Anthony et al. 2013](https://lisa-anthony.com/wp-content/uploads/2013/04/anthony-et-al-jpuc2013.pdf), [Woodward et al. CHI 2016](https://init.cise.ufl.edu/wp-content/uploads/sites/378/2017/05/Woodward-et-al-CHI2016_0.pdf), [NN/g children's physical development](https://www.nngroup.com/articles/children-ux-physical-development/)
- W3C, [Understanding SC 2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)
- WHO–ITU, [Safe listening devices and systems (H.870)](https://www.who.int/publications-detail/safe-listening-devices-and-systems-a-who-itu-standard), [Health Policy Watch](https://healthpolicy-watch.org/new-who-itu-standard-released-on-safe-listening-to-prevent-hearing-loss)
- Cocomelon / low-stim debate (non-academic, for context only): [Screenwise](https://screenwiseapp.com/guides/cocomelon-effects-on-baby-attention-span), [Stelle](https://stelleworld.com/blogs/mom-tips/low-stimulation-shows-for-toddlers)

*Palette numbers (HSV saturation, contrast ratios, R/(R+G+B)) were computed from `src/game/palette.ts` as of 2026-11-16.*
