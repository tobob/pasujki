# Pasujki: App Store Connect submission pack (v1.0)

Prepared 2026-11-16. Sources are listed at the end, and limits were re-checked on Apple's pages the same day.
Ready to paste. Every count below was measured by script (`python3 -c 'print(len(s))'`). Keywords are counted in **UTF-8 bytes**, because Apple sets that limit in bytes and each Polish diacritic (ą, ę, ł, ó, ś, ź, ż, ć, ń) takes 2 bytes.

| Fact | Value |
|---|---|
| Bundle ID | `com.tobob.pasujki` |
| SKU (suggestion) | `pasujki-ios-001` |
| Version | 1.0.0 (`app.json`) |
| Primary language | Polish (pl-PL) |
| Price | Free, no In-App Purchases, no ads |
| Devices | iPhone + iPad (`supportsTablet: true`), portrait |
| Copyright | `2026 tobob` |
| Privacy Policy URL | https://tobob.github.io/pasujki-site/privacy/ |
| Support URL | https://tobob.github.io/pasujki-site/ (contact through https://github.com/tobob/pasujki-site/issues) |
| Marketing URL | optional; leave empty or reuse the support URL |

Two limits matter most here. Name and Subtitle each allow 2–30 / ≤30 characters. Promotional Text is ≤170 characters and can be edited without a review. Description is ≤4000 characters of plain text. Keywords are ≤100 **bytes**, each keyword must be longer than 2 characters, and the app or company name must not be repeated. What's New isn't shown for the first version. Review Notes are ≤4000 bytes.

Keyword strategy: Apple already indexes the words in the Name and Subtitle, so the keywords below avoid repeating them (Pasujki, gra, maluchów, kolory, kształty, cienie / Toddler, Matching, Colors, Shapes, Shadows). They contain no competitor names and none of the words "free", "app" or "best".

---

## 1. Localisations

### 1.1 pl-PL (primary)

**App name**: 26 / 30
```
Pasujki – gra dla maluchów
```

**Subtitle**: 25 / 30
```
Kolory, kształty i cienie
```

**Promotional text**: 152 / 170
```
Spokojna gra w dopasowywanie dla dzieci od 2 do 5 lat. 68 poziomów w 8 światach. Bez reklam, bez zakupów i bez internetu. Dziecko gra we własnym tempie.
```

**Keywords**: 95 / 100 bytes (93 characters)
```
dopasowywanie,dzieci,przedszkolak,zwierzęta,układanka,zagadki,logiczna,pary,sortowanie,wzorki
```

**Description**: 2150 / 4000
```
Pasujki to spokojna gra w dopasowywanie dla dzieci w wieku od 2 do 5 lat.

W czterech rogach ekranu są obrazki: zwierzęta, owoce, zabawki i rzeczy z domu. Na środku pojawia się zagadka: obrazek, kolor, kształt, cień albo wzorek. Dziecko przeciąga ją do pasującego rogu. Najmłodsi mogą po prostu stuknąć w róg.

CO JEST W ŚRODKU
• 8 światów i 68 poziomów:
– Takie same: znajdź ten sam obrazek
– Kolory: co jest żółte, a co niebieskie?
– Kształty: koło, gwiazdka, serce, trójkąt
– Cienie: czyj to cień?
– Wzorki: paski, kropki, łuski, futerko
– Kto z kim?: mama i maluszek, kto co je, kto gdzie mieszka
– Pogoda i pary: co się przyda w deszcz i co do czego pasuje
– Wymyślanki: tu każda odpowiedź jest dobra, liczy się wyobraźnia
• Poziomy trudnieją powoli: najpierw tylko dwa obrazki do wyboru, potem trzy, a na końcu cztery.
• Za każdy ukończony poziom dziecko dostaje naklejkę.

SPOKOJNIE, BEZ POŚPIECHU
Pasujki celowo nie pędzą. Animacje są wolne i miękkie, kolory pastelowe i nic nie miga. Muzyka gra cicho i można ją wyłączyć osobno od dźwięków. Nie ma limitu czasu, punktów karnych ani serii do podtrzymywania.
Pomyłka nie jest porażką. Obrazek łagodnie wraca na środek, a po drugiej próbie właściwy róg delikatnie się podświetla.

CO DZIECKO MOŻE ĆWICZYĆ
Podczas gry dziecko ma okazję ćwiczyć dostrzeganie podobieństw i różnic, rozpoznawanie kolorów i kształtów, łączenie rzeczy w pary i grupy, a przy przeciąganiu także ruchy palca. Do gry nie trzeba umieć czytać.

DLA RODZICÓW
• Bez reklam i bez zakupów w aplikacji.
• Bez internetu: gra działa w całości offline.
• Nie zbieramy żadnych danych. Postępy zostają tylko na urządzeniu.
• Strefa rodzica jest zabezpieczona bramką rodzicielską. Znajdziesz w niej ustawienia (muzyka, dźwięki, podpowiedzi tekstowe, odblokowanie wszystkich poziomów, zerowanie postępów) i politykę prywatności.
• Teksty dla rodziców (bramka i strefa rodzica) są w języku urządzenia: po polsku, angielsku, niemiecku, francusku, włosku, hiszpańsku, portugalsku albo niderlandzku.
• Gra respektuje tryb cichy iPhone'a i milknie, gdy wyjdziesz z aplikacji.

Wszystkie ilustracje i muzyka powstały specjalnie dla Pasujek.
```

**What's New**: not shown for version 1.0.

### 1.2 en-US

(en-GB: paste the same text. If you want British spelling there, change "Colors" to "Colours" and "color" to "colour". "Colours" keeps the subtitle at 30.)

**App name**: 26 / 30
```
Pasujki – Toddler Matching
```

**Subtitle**: 26 / 30
```
Colors, shapes and shadows
```

**Promotional text**: 159 / 170
```
A calm matching game for children aged 2 to 5. 68 levels across 8 worlds, with no ads, no purchases and no internet needed. Your child plays at their own pace.
```

**Keywords**: 96 / 100 bytes
```
kids,preschool,puzzle,animals,pairs,sorting,patterns,logic,baby,learning,calm,offline,2 year old
```

**Description**: 2186 / 4000
```
Pasujki is a calm matching game for children aged 2 to 5.

Four pictures sit in the corners of the screen: animals, fruit, toys and things from home. A prompt appears in the middle: a picture, a color, a shape, a shadow or a pattern. Your child drags it to the corner where it belongs. The youngest players can simply tap the corner.

WHAT'S INSIDE
• 8 worlds and 68 levels:
– The same: find the identical picture
– Colors: what is yellow, what is blue?
– Shapes: circle, star, heart, triangle
– Shadows: whose shadow is this?
– Patterns: stripes, spots, scales, fur
– Who goes with whom?: mothers and babies, who eats what, who lives where
– Weather and pairs: what you need in the rain, what goes together
– Make-believe: every answer is right here; it's all about imagination
• Levels get harder slowly: first only two pictures to choose from, then three, then four.
• Every finished level earns a sticker.

CALM, NO HURRY
Pasujki is slow on purpose. Animations are soft and unhurried, colors are pastel, and nothing flashes. Music plays quietly and can be turned off separately from sound effects. There are no timers, no penalty points and no streaks to keep up.
A mistake isn't a failure. The picture gently floats back to the middle, and after a second try the right corner softly lights up.

WHAT YOUR CHILD CAN PRACTICE
While playing, children get to practice noticing what is the same and what is different, recognizing colors and shapes, putting things into pairs and groups, and, when dragging, controlling small finger movements. No reading is needed to play.

FOR PARENTS
• No ads and no in-app purchases.
• No internet needed: the game works fully offline.
• We collect no data. Progress stays on the device only.
• The parents' area sits behind a parental gate. It holds the settings (music, sounds, text hints, unlock all levels, reset progress) and the privacy policy.
• Parent-facing text (the gate and the parents' area) follows the device language: English, Polish, German, French, Italian, Spanish, Portuguese or Dutch.
• The game follows the iPhone's silent mode and goes quiet when you leave the app.

All illustrations and music were made specially for Pasujki.
```

**What's New**: not shown for version 1.0.

> The word list above is hard-coded: it doesn't come from `src/game/levels.ts`. Before submitting, check that the English world names in the description ("The same", "Colors", "Shapes", "Shadows", "Patterns", "Who goes with whom?", "Weather and pairs", "Make-believe") match the final localised UI. The code uses British "Colours" today. Either change the UI to "Colors" on en-US, or use "Colours" in the en-US text too. The mismatch is only cosmetic.

---

## 2. Category

**Recommendation: Primary = Education, Secondary = Games** (subcategories: Puzzle + Family; pick Educational instead of Family if Apple offers it).

Why:
- Kids Category placement comes **only** from Age Rating → "Made for Kids" (and its age band). The primary category doesn't affect it. Section 3 covers that setting.
- Education describes what parents are actually looking for (colours, shapes, matching), and Pasujki has no game-like hooks (score chasing, timers, competition). It also puts the app in the Education charts. Those are less crowded than Games, and for small kids' apps they have more parent traffic.
- The secondary Games category, with subcategories Puzzle and Family, still puts the app in front of people browsing games. Apple lets you choose 1–2 subcategories only for Games and Stickers, so Games works better as the secondary category than as a second "plain" one.
- Risk of Education as primary: reviewers judge "educational" metadata against the content. The description deliberately says "has a chance to practise" and makes no learning-outcome or certification claims, so this is low risk.
- Alternative, if you'd rather be in the Games charts: Primary Games › Puzzle / Educational, Secondary Education. Either is acceptable to App Review.

---

## 3. Age rating (App Information → Age Ratings → Set Up / Edit)

Apple's current flow has 3 steps: (1) in-app controls & capabilities, (2) content questionnaire with a frequency or yes/no answer per item, (3) Age Categories and Override. The **Shared Location** and **Dating and Relationships** descriptors went live in App Store Connect **today (16 Nov 2026)** and are required on any new submission.

### Step 1: In-app controls and capabilities (select none)

| Item | Answer | Note |
|---|---|---|
| Parental Controls | **No** (not selected) | Apple means controls that *restrict content*. Pasujki's parental gate only protects the settings, so it doesn't count. |
| Age Assurance | **No** | No age verification of any kind. |
| Unrestricted Web Access | **No** | No browser, no links, no network at all. |
| User-Generated Content | **No** | Nothing can be created or shared. |
| Messaging and Chat | **No** | |
| Social Media (and "Social Media Disabled for Users Under 13") | **No** | |
| Advertising | **No** | |
| Shared Location (new, 16 Nov 2026) | **No** | No location access at all. |
| Dating and Relationships (new, 16 Nov 2026) | **No** | |

### Step 2: Content questionnaire

| Section | Item | Answer |
|---|---|---|
| Mature Themes | Profanity or Crude Humor | **None** |
| | Horror/Fear Themes | **None** (the "Shadows" world shows friendly silhouettes of everyday objects and animals, which isn't fear content) |
| | Alcohol, Tobacco, or Drug Use or References | **None** |
| Medical or Wellness | Medical or Treatment Information | **None** |
| | Health or Wellness Topics | **No** |
| Sexuality or Nudity | Mature or Suggestive Themes | **None** |
| | Sexual Content or Nudity | **None** |
| | Graphic Sexual Content and Nudity | **None** |
| Violence | Cartoon or Fantasy Violence | **None** |
| | Realistic Violence | **None** |
| | Prolonged Graphic or Sadistic Realistic Violence | **None** |
| | Guns or Other Weapons | **None** |
| Chance-Based Activities | Gambling | **No** |
| | Simulated Gambling | **None** |
| | Contests | **None** |
| | Loot Boxes | **No** (stickers and stars are fixed rewards for finishing a level and aren't random) |

Expected calculated rating: **4+** in every region.

### Step 3: Age Categories and Override

- Choose **Made for Kids** → age range **5 and under**. This is only available when the calculated rating is 4+ or 9+.
- **Permanent:** once App Review approves the app, this choice can't be changed, and every update must follow the Kids category guidelines (1.3, 5.1.4).
- Age Suitability URL (optional): leave empty, or use https://tobob.github.io/pasujki-site/.
- Not "Override to Higher Age Rating".

---

## 4. App Privacy (nutrition label)

App Privacy → Get Started → "Do you or your third-party partners collect data from this app?" → **No, we do not collect data from this app** → Save → Publish.

Result: **"Data Not Collected"**.

Justification. Apple's definition: data is "collected" when it is transmitted off the device in a way that you or your third-party partners can access beyond the time needed to service the request. Data processed only on the device is not collected.
- Pasujki makes **no network requests**. There is no backend, no analytics, no crash reporting, no ads SDK, no remote images or fonts, and no `expo-updates`.
- Progress and settings (stars, unlocked levels, music/sounds/hints/unlock toggles) are stored locally with `expo-sqlite/kv-store` and never leave the device. OS backups (iCloud) are controlled by the user and Apple, not by us.
- There are no accounts, no sign-in, no permissions requested (no camera, mic, location, photos, contacts or notifications) and no IDFA/ATT.
- The privacy manifest in `app.json` declares `NSPrivacyTracking: false`, no tracking domains and no collected data types. Only required-reason APIs from RN/Expo are listed: UserDefaults, FileTimestamp, DiskSpace and SystemBootTime.
- Privacy Policy URL: https://tobob.github.io/pasujki-site/privacy/. The full text is also shown inside the app, in the parents' area.

Re-check this answer whenever a dependency is added.

---

## 5. App Review Information

| Field | Value |
|---|---|
| Sign-in required | **No** (leave username and password empty) |
| Contact first name | `<REVIEW_CONTACT_FIRST_NAME>` |
| Contact last name | `<REVIEW_CONTACT_LAST_NAME>` |
| Phone | `<REVIEW_CONTACT_PHONE>` |
| Email | `<REVIEW_CONTACT_EMAIL>` |
| Attachment | optional: you can attach the screen recording file here as well as linking it |

**Notes**: 2811 / 4000 bytes
```
Pasujki is a calm, fully offline matching game for children aged 2-5 (Made for Kids, 5 and under). Free, no in-app purchases, no ads, no accounts, no network requests, no data collection, no permission prompts.

SCREEN RECORDING (physical iPhone, fresh install): <RECORDING_URL>
It shows launch, gameplay, a wrong answer, level completion, the map, the parental gate (fail and pass) and the parents' area.

NO LOGIN NEEDED
Launch the app and tap the large Play button on the home screen. The first level starts immediately.

HOW TO PLAY
- Pictures sit in the screen corners. A prompt appears in the centre (a picture, colour, shape, shadow or pattern).
- Drag the prompt to the matching corner, or simply tap the matching corner.
- Correct: soft glow, gentle sound, slowly drifting stars. Wrong: the prompt floats back to the centre; after the 2nd miss the correct corner glows softly, after the 3rd it glides there by itself. No timers, no failure state.
- Each level has 6 rounds and ends with a sticker and 1-3 stars. From there: Next level, or the Map.

CONTENT: 8 worlds, 68 levels
The same, Colours, Shapes, Shadows, Patterns, Who goes with whom?, Weather and pairs, Make-believe. In Make-believe every answer is correct (imagination play). World 1 and Make-believe are always open; each other world unlocks once half of the previous world's levels are done.

PARENTAL GATE / PARENTS' AREA
- On the home screen tap the people icon in the top-right corner.
- Press and hold the button for 3 seconds, then answer a multiplication written in words (e.g. "What is seven times four?") by tapping one of 4 numbers. The question is random each time. A wrong answer returns to the home screen.
- The app follows the device language: Polish, English, German, French, Italian, Spanish, Portuguese or Dutch (PL/EN/DE/FR/IT/ES/PT/NL); any other device language shows English. The gate, the parents' area, world titles and the optional hint line use that language, and the gate's multiplication question is written in words in that language (e.g. "What is seven times four?" in English, "Ile to jest siedem razy cztery?" in Polish). Gameplay itself needs no text.
- Inside: Music, Sounds, Show hints (short text line above the board), Unlock all levels, Reset progress, About, and the full privacy policy (shown in-app, no links out).
- TIP: turn on "Unlock all levels" to open every world and level without playing through.

AUDIO
Music and sounds follow the ring/silent switch: with the iPhone silenced the app is silent. Music stops when the app goes to the background. No background audio mode, no microphone.

OFFLINE / PRIVACY
The app works entirely in airplane mode. Progress is stored only on the device. There are no external links, web views, purchases, review prompts or social features anywhere in the app.
```

> Before pasting: (1) replace `<RECORDING_URL>` with an unlisted link that opens without logging in, for example an unlisted YouTube video or a public GitHub release asset; (2) check that the English gate wording matches the shipped build (today `src/components/parental-gate.tsx` still has Polish words only, and the localisation is in progress); (3) check that the home-screen icon is still in the top-right corner.

**Recording plan** (from the Sunset 2.1 lesson). Use a physical iPhone, Control Centre → Screen Recording, microphone off, 60–120 s:
1. Delete the app, install the TestFlight build, turn on Airplane Mode (shown in Control Centre).
2. Launch: splash → home. No permission prompts appear.
3. Play: one drag match, one tap match, one wrong drop (it drifts back), a 2nd wrong drop (the right corner glows), then finish the level → sticker screen → Next.
4. Home → Map: World 2 is shown locked.
5. People icon → hold 3 s → wrong answer → back to home. Again → correct answer → parents' area.
6. Toggle Unlock all → Map: everything is open → play one round in Shadows and one in Make-believe (any answer is celebrated).
7. Parents' area → scroll through the privacy policy.
8. Swipe to the home screen (the music stops), reopen (the music fades back in, progress is kept).

---

## 6. Export compliance, content rights, pricing, availability

- **Export compliance:** `ios.infoPlist.ITSAppUsesNonExemptEncryption = false` is in `app.json`, so builds are marked automatically and ASC won't ask the encryption question for each build. If it ever asks: "None of the algorithms mentioned above" / no proprietary or non-exempt encryption. The app uses no encryption beyond what the OS itself provides, and makes no network calls.
- **Content Rights** (App Information): **"No, it does not contain, show, or access third-party content."** All illustrations (SVG art in `src/art`) and all music and sound effects (synthesised in `tools/audio`) were made in-house for Pasujki. There are no licensed characters, no stock assets, and no web content.
- **Copyright:** `2026 tobob`
- **Pricing:** Pricing and Availability → Base country Poland (or United States) → **Free** ($0.00). No In-App Purchases and no subscriptions.
- **Availability:** **all countries and regions** (select all). Notes:
  - **Apple Vision Pro: turn OFF.** Apple doesn't allow Made for Kids apps on visionOS.
  - **iPhone and iPad apps on Apple silicon Mac: recommend OFF** for 1.0. The app hasn't been tested with mouse or trackpad drag, and the portrait-only layout looks odd on a Mac. This is an open decision.
  - China mainland: a free offline game without an ICP number is normally fine, but any game sold in China needs a games licence (ISBN), so **exclude China mainland** unless you plan to get one. This is an open decision.
- **EU Digital Services Act trader status:** reuse the account's existing declaration.
- **App Accessibility (Accessibility Nutrition Labels):** voluntary for now. Claim only what has been tested. "Reduced Motion" is plausible because the app honours `useReducedMotion`. Leave the rest unclaimed.
- **Release:** "Manually release this version" is recommended, so the privacy site is checked to be live first.

---

## 7. Screenshot plan

Current Apple requirements (Screenshot specifications page, checked 2026-11-16): 1–10 screenshots per size, PNG or JPEG, **no alpha / transparency**, portrait for Pasujki.

| Slot | Size (portrait) | Required? | How to capture |
|---|---|---|---|
| iPhone 6.9" (Dynamic Island, large) | **1320 × 2868** (also accepted: 1290 × 2796) | Provide it. If it's missing, 6.5" (1284 × 2778 / 1242 × 2688) becomes required instead | iPhone 17 Pro Max / 16 Pro Max simulator |
| iPhone 6.3"/6.1" (Dynamic Island, medium) | **1206 × 2622** (6.3") or 1179 × 2556 (6.1") | Apple's page now lists at least one medium Dynamic Island screenshot as required | iPhone 17 Pro / 17 simulator |
| iPad 13" | **2064 × 2752** (also accepted: 2048 × 2732) | **Required** (the app runs on iPad) | iPad Pro 13" (M4/M5) simulator |
| iPad 12.9" (2nd gen) | 2048 × 2732 | Optional, scaled from 13" | — |

Capture tips:
- `xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3`, then `xcrun simctl io booted screenshot shot.png`.
- Remove the alpha channel before uploading: `sips -s format jpeg -s formatOptions 95 shot.png --out shot.jpg`.
- Keep **Show hints OFF**, so the board has no text and the same gameplay shots work for pl-PL and en-US. Shoot the map and the sticker screen separately per language (the world titles and "Brawo!" / "Well done!" are text).
- Turn on Unlock all to reach later worlds, but take the map shot (#6 below) with the lock still visible on later worlds if you want to show progression.
- No device frames are needed. If captions are used, use the same text on all sizes, and don't show Android devices.

**Parental area in screenshots:** Apple's Kids page and guidelines contain **no explicit ban** on showing the parents' area. Guideline 2.3.3 asks for screenshots that show the app in use, and 2.3.8 asks for metadata suitable for all ages. **Recommendation: don't include it.** It's an adult-only screen, it wastes a slot, and it shows the gate's answer method to anyone looking. The privacy points are better made in the description.

### The 6 shots (same order for every size)

| # | Screen to capture | Setup | Caption idea (PL / EN, optional) |
|---|---|---|---|
| 1 | **Home screen**: "Pasujki" title, four friend pictures (cat, sun, strawberry, duck), large Play button | fresh state | "Spokojna gra w dopasowywanie" / "A calm matching game" |
| 2 | **Colours round, World 2** (`w2-l4` or `w2-l5`, 3 corners): a colour blob in the centre, mid-drag towards the matching corner | Unlock all; pause mid-drag (hold the pointer in the simulator) | "Kolory: co jest żółte?" / "Colours: what's yellow?" |
| 3 | **Shadows round, World 4** (`w4-l3`, 3–4 corners): dark silhouette in the centre, coloured items in the corners | Unlock all | "Czyj to cień?" / "Whose shadow is this?" |
| 4 | **Patterns round, World 5** (`w5-l4`): stripes or spots texture in the centre, animals in the corners | Unlock all | "Paski, kropki, łuski" / "Stripes, spots and scales" |
| 5 | **Who goes with whom?, World 6** (`w6-l2`): a mother/baby or "who eats what" round, ideally just after a correct match with the soft glow and stars | Unlock all | "Kto z kim? Mama i maluszek" / "Who goes with whom?" |
| 6 | **Level complete**: sticker + 3 stars + Next / Map buttons | finish any World 1 level with no mistakes | "Naklejka za każdy poziom" / "A sticker for every level" |

Alternative for #6, if you want to show variety: the **Map** with 8 world cards and stars (`/map`).
On iPad the board shows larger pictures. Use the same level IDs, so the iPhone and iPad sets match.

App Preview video: optional, skip it for 1.0. The review recording (section 5) is separate and doesn't go on the product page.

---

## 8. Review click-through scenario (fresh install)

Use a physical iPhone with the TestFlight build, then repeat steps 1–6 on an iPad. Start with the app deleted, the ring/silent switch on **ring**, and the volume at about 50 %. If you set the device to English you test the en-US strings; switch the device to Polish for a second pass.

| # | Action | Expected result |
|---|---|---|
| 1 | Turn on **Airplane Mode**, then install and launch | Calm splash on a cream background → home screen. **No permission prompts** of any kind. Soft menu music fades in. No network errors. |
| 2 | Look at the home screen | Title "Pasujki", 4 friend pictures, the large Play button slowly "breathes", a Map button below, a small people icon top-right. No text needed to play. |
| 3 | Tap **Play** | Level `w1-l1` (The same, 2 active corners) opens. The other two corners "sleep" (empty). A picture in the centre matches one corner. |
| 4 | **Drag** the centre picture onto the identical corner and drop it anywhere inside that quadrant | Soft glow, gentle bounce, a few slowly drifting stars and a pleasant sound. The next round starts after a short pause. |
| 5 | In the next round, **tap** the matching corner instead of dragging | Counts as correct, with the same celebration. |
| 6 | Drop the prompt on the **wrong** corner once | The prompt gently drifts back to the centre, with a warm "try again" sound. No red X, no buzzer, no shaking. |
| 7 | Drop on a wrong corner a **2nd** time | The prompt drifts back and the **correct corner glows softly**. |
| 8 | Drop on a wrong corner a **3rd** time | After a short drift back, the prompt glides to the correct corner by itself (errorless ladder) and the round is celebrated. |
| 9 | Drop the prompt on an empty (sleeping) corner | Nothing counts as a choice. The prompt floats home, with no miss counted and no sound. |
| 10 | Leave a round untouched for ~15 s | The correct corner glows softly as an idle hint (after ~8 s there's a slightly deeper "breath" first). |
| 11 | Finish all 6 rounds | The **level complete** screen: "Brawo!" / well-done title, the sticker (the last round's picture) springs in softly, then 1–3 stars appear one by one. A level-complete sound plays. **No auto-advance.** |
| 12 | Tap **Next** (arrow button) | Level `w1-l2` starts. |
| 13 | Tap the exit button (top-left) during play | Back to the previous screen. Progress for unfinished levels isn't saved, which is expected. |
| 14 | Home → **Map** | 8 world cards with tints, pictures and star counts (e.g. "3 / 24"). World 1 is open. **Worlds 2–8 are dimmed with a lock icon.** |
| 15 | Tap a **locked world** | Nothing happens (the card is disabled). No message and no purchase prompt. |
| 16 | Tap World 1 | Level bubbles: all 8 levels of World 1 are open. Finished levels show their stars or picture. |
| 17 | Home → **people icon** (top-right) | "Parents' area" gate: "Ask a grown-up. Hold the button for 3 seconds." with a Hold button. |
| 18 | **Gate fail A:** press Hold and let go after ~1 s | The fill bar slides back to empty. The gate stays on the hold step. |
| 19 | **Gate fail B:** hold for 3 s → a question appears ("What is seven times four?", in words) with 4 number buttons → tap a **wrong** number | You're returned to the home screen right away, with no hint and no retry on the same question. |
| 20 | **Gate pass:** people icon → hold 3 s → tap the **correct** product | The parents' area opens ("For parents"). The question differs from step 19 (it's random). |
| 21 | Toggle **Music** off, go Home | No music on the home screen or in play. Sound effects still play. Turn it back on and the music fades in. |
| 22 | Toggle **Sounds** off, play a round | No effect sounds (taps, success, try again). Music is unaffected. Turn it back on. |
| 23 | Toggle **Show hints** on, play a round | A short text line appears above the board (e.g. "What is yellow?" / "Co jest żółte?"). Off by default. |
| 24 | Toggle **Unlock all levels** on → Map | Every world and every level is open (no lock icons). |
| 25 | Scroll down in the parents' area | "About" text with the version number (1.0.0), then the **privacy policy** in full (Polish and English sections), rendered in-app. There are no links that leave the app. Check that the developer name, contact and date are filled in, not `[NAZWA DEWELOPERA]`. |
| 26 | Tap **Reset progress** | A confirmation alert ("Reset progress?" with Cancel / Reset). **Cancel** changes nothing. **Reset** removes the stars and unlocked levels. The settings toggles stay as they are. If Unlock all is on, everything is still open, and turning it off shows only World 1 open again. |
| 27 | Rule check, **W1 The same** | The centre picture is identical to one corner picture. |
| 28 | Rule check, **W2 Colours** | The centre is a colour blob; the answer is the item of that colour. Early levels never pair confusable colours (red/pink, orange/yellow). |
| 29 | Rule check, **W3 Shapes** | The centre is a shape (circle, star, heart…); the answer is the object with that outline (ball, star, heart toy). |
| 30 | Rule check, **W4 Shadows** | The centre is a dark silhouette; the answer is the same item in colour. |
| 31 | Rule check, **W5 Patterns** | The centre is a texture (stripes, spots, wool, scales…); the answer is the animal or object it belongs to. |
| 32 | Rule check, **W6 Who goes with whom?** | A mix of mother → baby, animal → food and animal → home rounds. Exactly one corner is plausible. |
| 33 | Rule check, **W7 Weather and pairs** | Weather → what helps (rain → umbrella), and pairs (toothbrush → toothpaste, etc.). |
| 34 | Rule check, **W8 Make-believe** | 4 corners. **Every corner is accepted and celebrated.** No misses and no glow hints. The level always ends with 3 stars. |
| 35 | While music plays, swipe up to the iOS Home Screen (background the app) | Music **stops immediately**. Nothing plays in the background, and there's no Now Playing entry. |
| 36 | Reopen the app | Music fades back in (if on). Progress and settings are kept. |
| 37 | Flip the **ring/silent switch** to silent (or the Action button → Silent Mode) during play | Music and effects go **silent**. Flip it back and sound returns. |
| 38 | Start a podcast in another app, then open Pasujki | The podcast keeps playing (Pasujki mixes with other audio and doesn't stop it). |
| 39 | Force-quit and relaunch | Progress (stars, unlocked worlds) and toggles persist. |
| 40 | iPad: repeat 3–8 and 17–20 | The layout fills the screen without letterboxing, the four quadrants are large, and the gate is centred. |

---

## Sources (checked 2026-11-16)

- Screenshot specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/
- Platform version information (promo text, description, keywords in bytes, notes 4000 bytes, copyright format): https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/
- App information (name 2–30, subtitle 30, categories and subcategories, Made for Kids lock, content rights): https://developer.apple.com/help/app-store-connect/reference/app-information/app-information
- Set an app age rating (3-step flow, Made for Kids only for 4+ and 9+, permanent, no visionOS): https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/
- Age ratings values and definitions: https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/
- New descriptors (Shared Location, Dating and Relationships; 16 Nov 2026, deadline 12 Jan 2027): https://developer.apple.com/news/?id=yxkh08us
- Kids apps (age bands, parental gates): https://developer.apple.com/app-store/kids-apps/
- App privacy details: https://developer.apple.com/app-store/app-privacy-details/
- Background research: `docs/STORE_COMPLIANCE.md`, `../../docs/STORE_REVIEW_LESSONS.md`
