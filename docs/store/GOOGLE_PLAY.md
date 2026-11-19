# Pasujki: Google Play submission pack (v1.0)

Prepared 2026-11-16. Package `com.tobob.pasujki`. It's a companion to `APP_STORE.md`, and the background is in `docs/STORE_COMPLIANCE.md` §2.5 and §2.7.
Counts were measured by script. Play counts characters, not bytes.

Play metadata rules (Store listing help, checked today): the app name is ≤30 characters, the short description ≤80, the full description ≤4000. No emojis, no all-caps for emphasis, and no repeated punctuation. No ranking, price or promo claims ("Best", "#1", "Top", "New", "Free", "Sale"). No calls to action ("Download now"). No keyword stuffing.

---

## 1. Store listing

Category: **Game › Educational** (alternative: Puzzle). Tags: pick Kids/Toddler-related, Matching and Puzzle tags from the list.
Contact: website https://tobob.github.io/pasujki-site/. Email: `<PLAY_CONTACT_EMAIL>` (Play requires one, and it's shown publicly). Privacy policy: https://tobob.github.io/pasujki-site/privacy/.

### 1.1 pl-PL (default language)

**App name**: 26 / 30
```
Pasujki – gra dla maluchów
```

**Short description**: 74 / 80
```
Spokojne dopasowywanie kolorów, kształtów i cieni dla dzieci od 2 do 5 lat
```

**Full description**: 1760 / 4000
```
Pasujki to spokojna gra w dopasowywanie dla dzieci w wieku od 2 do 5 lat.

W czterech rogach ekranu są obrazki: zwierzęta, owoce, zabawki i rzeczy z domu. Na środku pojawia się zagadka: obrazek, kolor, kształt, cień albo wzorek. Dziecko przeciąga ją do pasującego rogu. Najmłodsi mogą po prostu stuknąć w róg.

CO JEST W ŚRODKU
• 8 światów i 68 poziomów: Takie same, Kolory, Kształty, Cienie, Wzorki, Kto z kim?, Pogoda i pary oraz Wymyślanki, w których każda odpowiedź jest dobra.
• Poziomy trudnieją powoli: najpierw dwa obrazki do wyboru, potem trzy, a na końcu cztery.
• Za każdy ukończony poziom dziecko dostaje naklejkę.

SPOKOJNIE, BEZ POŚPIECHU
Animacje są wolne i miękkie, kolory pastelowe i nic nie miga. Muzyka gra cicho i można ją wyłączyć osobno od dźwięków. Nie ma limitu czasu, punktów karnych ani serii do podtrzymywania. Pomyłka nie jest porażką: obrazek łagodnie wraca na środek, a po drugiej próbie właściwy róg delikatnie się podświetla.

CO DZIECKO MOŻE ĆWICZYĆ
Podczas gry dziecko ma okazję ćwiczyć dostrzeganie podobieństw i różnic, rozpoznawanie kolorów i kształtów, łączenie rzeczy w pary i grupy, a przy przeciąganiu także ruchy palca. Do gry nie trzeba umieć czytać.

DLA RODZICÓW
• Bez reklam.
• Bez internetu: gra działa w całości offline.
• Nie zbieramy żadnych danych. Postępy zostają tylko na urządzeniu.
• Strefa rodzica jest zabezpieczona bramką rodzicielską. Znajdziesz w niej ustawienia (muzyka, dźwięki, podpowiedzi tekstowe, odblokowanie wszystkich poziomów, zerowanie postępów) i politykę prywatności.
• Teksty dla rodziców są po polsku albo po angielsku, zależnie od języka urządzenia.
• Muzyka milknie, gdy wyjdziesz z aplikacji.

Wszystkie ilustracje i muzyka powstały specjalnie dla Pasujek.
```

### 1.2 en-US

**App name**: 26 / 30
```
Pasujki – Toddler Matching
```

**Short description**: 68 / 80
```
Calm matching of colors, shapes and shadows for children aged 2 to 5
```

**Full description**: 1764 / 4000
```
Pasujki is a calm matching game for children aged 2 to 5.

Four pictures sit in the corners of the screen: animals, fruit, toys and things from home. A prompt appears in the middle: a picture, a color, a shape, a shadow or a pattern. Your child drags it to the corner where it belongs. The youngest players can simply tap the corner.

WHAT'S INSIDE
• 8 worlds and 68 levels: The same, Colors, Shapes, Shadows, Patterns, Who goes with whom?, Weather and pairs, and Make-believe, where every answer is right.
• Levels get harder slowly: first two pictures to choose from, then three, then four.
• Every finished level earns a sticker.

CALM, NO HURRY
Animations are soft and unhurried, colors are pastel, and nothing flashes. Music plays quietly and can be turned off separately from sound effects. There are no timers, no penalty points and no streaks to keep up. A mistake isn't a failure: the picture gently floats back to the middle, and after a second try the right corner softly lights up.

WHAT YOUR CHILD CAN PRACTISE
While playing, children get to practise noticing what is the same and what is different, recognising colors and shapes, putting things into pairs and groups, and, when dragging, controlling small finger movements. No reading is needed to play.

FOR PARENTS
• No ads.
• No internet needed: the game works fully offline.
• We collect no data. Progress stays on the device only.
• The parents' area sits behind a parental gate. It holds the settings (music, sounds, text hints, unlock all levels, reset progress) and the privacy policy.
• Parent-facing text is shown in English, or in Polish on Polish-language devices.
• Music stops when you leave the app.

All illustrations and music were made specially for Pasujki.
```

(en-GB optional: the same text with "colours".)

---

## 2. App content declarations (Policy → App content)

| Declaration | Answer |
|---|---|
| Privacy policy | https://tobob.github.io/pasujki-site/privacy/ (it is also shown in-app, which Play requires) |
| App access | **All functionality is available without special access** (no login) |
| Ads | **No, my app does not contain ads** |
| Advertising ID | **No** (the app doesn't use the advertising ID; `com.google.android.gms.permission.AD_ID` is in `blockedPermissions`) |
| Content rating | IARC, see §4 |
| Target audience and content | see §3 |
| Data safety | see §5 |
| Government app | No |
| Financial features | None |
| Health apps | None / not a health app |
| News app | No |
| Foreground service permissions | None declared (the `FOREGROUND_SERVICE*` permissions are blocked, and background audio is disabled in the expo-audio plugin) |
| Photo and video permissions | Not used |

## 3. Target audience and content (Families)

- **Target age groups: "5 and under" only.** Don't tick 6–8. Google checks that the declared audience matches the content.
- Appeals to children: yes, by design. Because the target audience includes children, the full **Families Policy** applies. Pasujki complies: no ads, no SDKs that collect data, no data collection, minimal permissions (VIBRATE, MODIFY_AUDIO_SETTINGS) and no location.
- Families Self-Certified Ads SDK program: not applicable (no ads SDK).
- Store presence: accept the Families policy declaration. Teacher Approved: eligibility is automatic. Don't mention it in the listing unless the app is actually awarded the badge.
- Inform Google about the parental gate if asked (Families requires that settings and the policy can't be reached by the child unaided). The App Store review notes text can be reused in "App access → instructions" if a field asks for it.

## 4. Content rating (IARC questionnaire)

The exact question wording shifts, so read each one and answer No unless it really applies.

| Question group | Answer |
|---|---|
| Email for IARC certificate | `<PLAY_CONTACT_EMAIL>` |
| Category | **Game** (puzzle / educational type) |
| Violence (any kind, incl. cartoon/fantasy) | **No** |
| Fear / horror | **No** |
| Sexuality / nudity | **No** |
| Language (profanity, crude humour) | **No** |
| Controlled substances (drugs, alcohol, tobacco) | **No** |
| Gambling, simulated gambling, real-money betting | **No** |
| Users can interact or exchange content | **No** |
| Shares user location with other users | **No** |
| Digital purchases | **No** |
| Unrestricted internet / web browser | **No** |
| Promotes age-restricted products (if asked) | **No** |
| Loot boxes / randomised paid items (if asked) | **No** |

Expected result: PEGI 3, ESRB Everyone, USK 0, IARC 3+. IARC assigns the rating. Re-submit the questionnaire whenever content changes.

## 5. Data safety

- "Does your app collect or share any of the required user data types?" → **No**.
- The form then skips the encryption and deletion questions. The listing will show **"No data collected"** and **"No data shared with third parties"**.
- Account deletion URL: not applicable (no accounts).
- Why this is true: there are no network requests, no SDKs that collect data, and progress is stored only in on-device storage. Android's own Auto Backup to the user's Google Drive is controlled by the user and Google, so it isn't developer collection. If you want to remove it entirely, set `android.allowBackup: false` (optional, see STORE_COMPLIANCE K-5).

## 6. Ads

**No ads** anywhere, now or planned. This is declared in App content → Ads and backed by the blocked `AD_ID` permission.

## 7. Account and release prerequisites

- **New personal developer account → closed testing first.** Play requires at least **12 testers opted in for 14 consecutive days** before you can apply for production access. This applies to personal accounts created after 13 Nov 2023. Plan for **15+ testers** (adult parents' Google accounts), so drop-outs don't reset the count. Start the closed track as soon as a stable AAB exists. After the 14 days, answer Google's short production-access questionnaire (how testers were recruited, what feedback changed, etc.).
- Testers on a closed track must opt in through the web link and install from Play. Sideloaded installs don't count.
- Target API level: **36** (required for new apps since 31 Aug 2026). Expo SDK 58 → targetSdk 36. OK.
- **Tablets:** with targetSdk 36, `orientation: portrait` is ignored on large screens (sw600dp+) unless the app is categorised as a game in the manifest. Check the tablet layout in landscape before you take tablet screenshots (STORE_COMPLIANCE C-11).
- Identity verification and the EU DSA trader declaration in Play Console.
- Families apps can take longer to review, so allow a few extra days.

## 8. Required graphics

| Asset | Spec | Pasujki |
|---|---|---|
| App icon | **512 × 512**, 32-bit PNG (alpha allowed), ≤ 1024 KB | export from the icon source; no text or badges |
| Feature graphic | **1024 × 500**, JPEG or 24-bit PNG, **no alpha** | pastel background (`#FFF8EC`), the four friend characters and the "Pasujki" wordmark. Keep important content away from the edges (Play may overlay a play button or crop the image). No "Free" or badges. |
| Phone screenshots | **2–8**, JPEG or 24-bit PNG, no alpha, each side 320–3840 px, **long side ≤ 2× short side**. Recommended: ≥ 4 (games: ≥ 3) at ≥ 1080 px, 9:16 (1080 × 1920) | the same 6 shots as App Store §7. Many modern phones are 20:9 (1080 × 2400 = 2.22:1), which **exceeds the 2:1 limit**. Capture on a 16:9 emulator (e.g. 1080 × 1920 "Pixel 2" profile) or crop to 1080 × 2160 / 1080 × 1920. |
| 7" tablet screenshots | optional; up to 8; 1080–7680 px, 9:16 or 16:9 | recommended for Families/Kids surfaces: shots 2–5 on a 7" emulator |
| 10" tablet screenshots | optional, but upload at least 4 to be eligible for large-screen features; 1080–7680 px | shots 1–6 on a 10" emulator (e.g. 1600 × 2560 cropped to 9:16 or a 1920 × 1200 landscape) |
| Promo video | optional (YouTube URL) | skip for 1.0 |

No device frames, no store badges and no other trademarks in any graphic. Don't show the parents' area in the screenshots (same reasoning as App Store §7).

## Sources (checked 2026-11-16)

- Store listing assets and metadata rules: https://support.google.com/googleplay/android-developer/answer/9866151
- Families policy: https://support.google.com/googleplay/android-developer/answer/9893335
- Target audience: https://support.google.com/googleplay/android-developer/answer/9867159
- Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Content ratings (IARC): https://support.google.com/googleplay/android-developer/answer/9898843
- Testing requirement for new personal accounts: https://support.google.com/googleplay/android-developer/answer/14151465
- Target API level: https://support.google.com/googleplay/android-developer/answer/11926878
