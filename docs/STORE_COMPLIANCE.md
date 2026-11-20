# Pasujki — store compliance (App Store + Google Play)

Owner: research-store. Researched and written **2026-11-16**. All "read" dates below are 2026-11-16 unless stated otherwise.
Goal: pass App Review and Play review **on the first submission**.

Labels: **[V]** = verified today on the official page cited. **[S]** = secondary source only, not confirmed on the official page. **UNVERIFIED** = from memory or inference, check before relying on it. Nothing here is legal advice.

---

## 0. Verdict

| | Choice | Why |
|---|---|---|
| **Apple, age rating** | Answer "None" / "No" to everything → calculated **4+** | No mature content, no web access, no UGC, no ads, no chat, no gambling. |
| **Apple, Kids Category** | **Made for Kids → "5 and under"** | Audience is 2–4 (up to ~5). Age bands are "5 and under, 6-8, or 9-11" [V, developer.apple.com/app-store/kids-apps]. Only possible when the calculated rating is 4+ or 9+ [V, ASC help]. Being in Kids lets us say "for kids/toddlers" in metadata (2.3.8 reserves that for Kids Category). **This choice is permanent**: "You can't change this selection once your app is approved by App Review" [V]. Pasujki already meets every Kids rule by design, so the lock-in costs nothing. |
| **Apple, categories** | Primary **Education** (or Games › Educational), secondary **Games** › Puzzle | Kids Category placement comes from the Made for Kids flag, not from the primary category. Exact sub-category menu: UNVERIFIED, pick in ASC. |
| **Google Play, target audience** | **Ages 5 and under** only | Matches the design. Picking only under-13 groups means the Families Policy applies in full (we comply: no ads, no data, no SDKs). Don't tick 6–8 unless content is really designed for that age, because Google may check the declared audience [V, answer/9893335]. |
| **Google Play, category** | Game › **Educational** (alternative: Puzzle) | Natural fit; Kids tab placement comes from the target audience plus Teacher Approved, not the category. |
| **Google Play, Teacher Approved** | Eligible automatically once published and compliant; no application needed [S] | Bonus visibility (badge, Kids tab). Criteria: design, appeal, enrichment, age-appropriateness, ads, IAP, cross-promotion [S, play.google.com/console/about/programs/teacherapproved/]. |
| **IARC (Play)** | Answer "Game", all content questions "No" → expected **PEGI 3 / ESRB Everyone / USK 0** | Expected outcome is UNVERIFIED (IARC assigns the rating). |

---

## 1. Sources (read 2026-11-16)

| # | Source | Notes |
|---|---|---|
| A1 | https://developer.apple.com/app-store/review/guidelines/ | "Last Updated: October 16, 2026". 1.3, 2.1, 2.3.x, 2.5.4, 3.1.1, 4.2, 4.3, 5.1.1, 5.1.2, 5.1.4 quoted below. |
| A2 | https://developer.apple.com/app-store/kids-apps/ | Age bands, parental gates, no data to third parties, ads human-reviewed. |
| A3 | https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/ | Made for Kids flow, 4+/9+ only, permanent. |
| A4 | https://developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions/ | 4+, 9+, 13+, 16+, 18+. Questionnaire groups. |
| A5 | https://developer.apple.com/news/?id=ks775ehf (24 Jul 2025) + https://developer.apple.com/news/ | New age rating system. Questionnaire responses required for new apps/updates since **9 Sep 2026**. New descriptors **Shared Location** and **Dating and Relationships** must be declared on any update **from 16 Nov 2026** (all apps by 12 Jan 2027). Uploads need the **iOS 26 SDK** since 28 Apr 2026 (iOS 27 SDK from April 2027). |
| A6 | https://developer.apple.com/app-store/app-privacy-details/ and https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/ | Definition of "collect"; "No, we do not collect data from this app"; privacy policy URL "required for all apps". |
| A7 | https://developer.apple.com/documentation/bundleresources/app-privacy-configuration/nsprivacyaccessedapitypes/nsprivacyaccessedapitypereasons | Reason code meanings (read via the docs JSON). |
| A8 | https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/ | Screenshot sizes. |
| E1 | https://docs.expo.dev/guides/apple-privacy/ | `ios.privacyManifests`. Expo does **not** promise to merge library manifests: copy reasons from `node_modules/*/ios/PrivacyInfo.xcprivacy`. |
| E2 | https://docs.expo.dev/versions/v58.0.0/config/app/ | `ios.privacyManifests` sub-keys, `android.blockedPermissions`, `ios.supportsTablet` (default `false`). |
| E3 | https://docs.expo.dev/versions/v58.0.0/sdk/audio/ + `node_modules/expo-audio/plugin/build/withAudio.js` | **Default plugin adds mic permission + background audio**, see C-2. |
| G1 | https://support.google.com/googleplay/android-developer/answer/9893335 | Families Policy. |
| G2 | https://support.google.com/googleplay/android-developer/answer/9867159 | Target audience and content. |
| G3 | https://support.google.com/googleplay/android-developer/answer/9900633 | Families Self-Certified Ads SDK program. |
| G4 | https://support.google.com/googleplay/android-developer/answer/10787469 | Data safety form. |
| G5 | https://support.google.com/googleplay/android-developer/answer/10144311 | User Data policy: privacy policy in Console **and in the app**. |
| G6 | https://support.google.com/googleplay/android-developer/answer/9898843 | IARC content ratings. |
| G7 | https://support.google.com/googleplay/android-developer/answer/11926878 | Target API level. |
| G8 | https://support.google.com/googleplay/android-developer/answer/14151465 | Testing requirement for new personal accounts. |
| G9 | https://developer.android.com/developer-verification | Android developer verification. |
| G10 | https://support.google.com/googleplay/android-developer/answer/9866151 | Store listing asset specs and metadata rules. |
| G11 | https://developer.android.com/about/versions/16/behavior-changes-16 | Large-screen orientation change for targetSdk 36. |
| L1 | https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa + Federal Register 90 FR 16918 (22 Apr 2025, https://www.govinfo.gov/content/pkg/FR-2025-04-22/html/2025-05904.htm) | COPPA rule. Amendment dates confirmed via law-firm summaries [S]: effective **23 Jun 2025**, compliance by **22 Apr 2026**. |
| L2 | https://gdpr-info.eu/art-8-gdpr/ | GDPR Art. 8(1). |
| L3 | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/ | Children's Code. The official pages returned **HTTP 403** to our fetcher; scope summarised from ICO search snippets [S]. |

---

## 2. Requirements checklist

### 2.1 Code / app behaviour

| # | Requirement | Source | What Pasujki must do |
|---|---|---|---|
| C-1 | **No placeholder/template content** and no links out of the child area | A1 2.1(a), 1.3 | **Current repo still has the Expo template**: `src/app/explore.tsx`, `src/components/external-link.tsx` (uses `expo-web-browser` to open docs.expo.dev), `web-badge.tsx`, `hint-row.tsx`, `app-tabs*.tsx`, `ui/collapsible.tsx`, `expo-device` in `src/app/index.tsx`. All must go before submission. A tab bar with an "Explore" screen linking to expo.dev would be an instant 1.3 + 2.1 rejection. Remove unused deps (`expo-web-browser`, `expo-device`, `expo-symbols`, `expo-glass-effect` if unused). Removing `expo-device` also removes its SystemBootTime required-reason API. |
| C-2 | **No microphone, no background audio** | A1 2.5.4 ("may only use background services for their intended purposes"), G1 (child-directed apps: minimal permissions), E3 | `expo-audio`'s plugin defaults add `NSMicrophoneUsageDescription`, `UIBackgroundModes: [audio]`, and Android `RECORD_AUDIO`, `MODIFY_AUDIO_SETTINGS`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PLAYBACK` plus a media playback service (verified in `node_modules/expo-audio/plugin/build/withAudio.js`). Background audio in a toddler game = 2.5.4 risk, and on Play it triggers the **foreground service declaration** (with video). A mic permission in a kids app looks like data collection to reviewers. **Fix in app.json, see K-3.** Music must stop when the app goes to the background (pause on `AppState` change). |
| C-3 | **Parental gate** before anything outside the game: settings, info, privacy policy link, contact, any URL, any future purchase | A1 1.3; A2 ("adult-level tasks … following link outs … buying In-App Purchases"); 3.1 if IAP is ever added | Use DESIGN.md's gate: **press and hold for 3 s**, then a **randomised** task in written text that a pre-literate child can't read (e.g. "Tap the number 7 × 3" with 3–4 numeric answers, a new task every time, no visual hint). Wrong answer → back to the game, no hints. Per A2, consider a short spoken or visual cue ("ask a grown-up") so a child knows to fetch a parent. Don't use a plain "tap 3 times" or "swipe" gate. UNVERIFIED (common reviewer feedback): gates that are just a colour/shape tap get rejected as "not adult-level". |
| C-4 | **Privacy policy reachable in the app** | A1 5.1.1(i) ("within the app in an easily accessible manner"); G5 ("within the app itself") | In the parents' area (behind the gate): a "Privacy policy" item. Best: **show the full policy text inside the app** (no network, no link out), plus optionally the URL as text. If it opens a browser, it must stay behind the gate. |
| C-5 | **Zero network requests** | A1 1.3 (no device info to third parties), A6 (definition of collect), G4 | No remote images (`expo-image` only with bundled assets), no remote fonts, no crash reporter, no analytics, no `expo-updates`, no Sentry/Firebase. Check with a proxy (Charles/Proxyman) or Xcode network instrument during QA: **no traffic at all** after launch. This is what lets us honestly answer "Data Not Collected" / "No data collected". |
| C-6 | **No third-party analytics or advertising SDKs**, now or in updates | A1 1.3, 5.1.4(a); G1 ("must not contain any APIs or SDKs that are not approved for use in primarily child-directed services"); G3 | Keep the dependency list Expo + RN only. Before adding any library, check that it doesn't phone home. Never transmit AAID, IDFA, IDFV, device serials (G1 lists AAID, SIM Serial, Build Serial, BSSID, MAC, SSID, IMEI, IMSI). |
| C-7 | **No purchasing, no "rate us", no cross-promotion, no social links** in the child area | A1 1.3 ("purchasing opportunities, or other distractions"), Teacher Approved criteria (cross-promotion) | Superseded 2026-11-19: rating and feedback exist only in the parents' area behind the gate, see §2.8. Never in the child area. No "More apps" button. |
| C-8 | **No location, camera, photos, contacts, notifications, tracking, ATT prompt** | A1 5.1.1/5.1.2; G1 (no location for child-only apps) | None needed. Don't add `expo-notifications`, `expo-location`, `expo-tracking-transparency`. |
| C-9 | **Complete and lasting experience** ("lasting entertainment value") | A1 4.2, 4.3(b) | v1.0 should ship with the full progression from DESIGN.md: several worlds (identical → colour → shape → texture → food/home/baby → weather/pairs + the abstract world), stickers/collection, sound and music toggles, a parents' area. Rough target: ≥ 6 worlds × ≥ 5 levels (UNVERIFIED threshold; Apple publishes none). A single-screen matching demo risks 4.2/4.3 "minimum functionality / indistinguishable" feedback. Mention the variety in the review notes. |
| C-10 | **No crashes on any device Apple tests on**, including iPad | A1 2.1(a) | Apple reviews iPhone apps on iPad too (compatibility mode, UNVERIFIED but common). Test cold start, kill/resume, airplane mode, low-power mode, iPad, small iPhone (SE), Android tablet. |
| C-11 | **Android tablets & foldables** | G11 | With targetSdk 36 (Expo SDK 58 → RN `targetSdk = "36"`, verified in `react-native/gradle/libs.versions.toml`), `orientation: portrait` is **ignored on screens ≥ sw600dp** unless the app is categorised as a game (`android:appCategory="game"`). Either make the 4-quadrant layout work in landscape (recommended, it's naturally symmetric) or set the app category to game through a config plugin (no app.json key known; UNVERIFIED). |
| C-12 | **Accessibility & calm** (helps Teacher Approved and review perception) | Teacher Approved criteria [S]; WCAG 2.3.1 already in DESIGN.md | Nothing flashing > 3 Hz, large targets, no time pressure. Already in the design. |
| C-13 | **No hidden features / remote toggles** | A1 2.3.1, 2.5.19 (bait-and-switch, added Oct 2026, per A5) | What the reviewer sees is the whole app. |
| C-14 | **Future IAP** (not in v1) | A1 1.3, 3.1.1; A2 | If ever added: Apple IAP only (3.1.1), store/paywall only in the parents' area behind the gate, re-check Families ads/IAP criteria. Changing this later is fine; leaving the Kids Category is **not** possible (A3). |

### 2.2 app.json / EAS config

Current `app.json` issues and exact keys (Expo SDK 58, E2):

**K-1. Privacy manifest (`ios.privacyManifests`).** Expo's guide (E1) says Apple doesn't reliably read manifests from static CocoaPods dependencies, so copy the reasons into app.json. Union of the manifests that ship in `node_modules` today (read 2026-11-16):

| Library (manifest file) | Category | Reasons |
|---|---|---|
| `react-native/React/Resources/PrivacyInfo.xcprivacy` | FileTimestamp | C617.1 |
| same | UserDefaults | CA92.1 |
| `expo-constants/ios/PrivacyInfo.xcprivacy` | UserDefaults | CA92.1 |
| `expo-system-ui/ios/PrivacyInfo.xcprivacy` | UserDefaults | CA92.1 |
| `expo-file-system/ios/PrivacyInfo.xcprivacy` (transitive dep of `expo`) | FileTimestamp | 0A2A.1, 3B52.1 |
| same | DiskSpace | E174.1, 85F4.1 |
| `expo-device/ios/PrivacyInfo.xcprivacy` (remove the dep, see C-1) | SystemBootTime | 35F9.1 |

All of them declare `NSPrivacyTracking: false` and no collected data types.

Reason meanings (A7): CA92.1 = user defaults readable only by the app itself; C617.1 = timestamps/size of files inside the app container; 0A2A.1 = third-party SDK wrapper around file timestamp APIs; 3B52.1 = files the user explicitly granted access to; 35F9.1 = system boot time to measure elapsed time / timers; E174.1 = check there's enough disk space to write files; 85F4.1 = display disk space to the user. (0A2A.1 is formally an "SDK-only" reason. Expo's guide tells apps to copy library reasons, so we copy it. If Apple ever objects, drop it.)

Recommended block (add to `expo.ios`):

```json
"privacyManifests": {
  "NSPrivacyTracking": false,
  "NSPrivacyTrackingDomains": [],
  "NSPrivacyCollectedDataTypes": [],
  "NSPrivacyAccessedAPITypes": [
    { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
      "NSPrivacyAccessedAPITypeReasons": ["CA92.1"] },
    { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryFileTimestamp",
      "NSPrivacyAccessedAPITypeReasons": ["C617.1", "0A2A.1", "3B52.1"] },
    { "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryDiskSpace",
      "NSPrivacyAccessedAPITypeReasons": ["E174.1", "85F4.1"] }
  ]
}
```

Add `{ "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategorySystemBootTime", "NSPrivacyAccessedAPITypeReasons": ["35F9.1"] }` **only if `expo-device` stays**. After any dependency change, re-run:
`find node_modules -name PrivacyInfo.xcprivacy -not -path "*/node_modules/*/node_modules/*"` and re-sync. Apple emails missing reasons (ITMS-91053) minutes after upload (E1). Upload a TestFlight build early to catch them. Pods such as SDWebImage (used by `expo-image`) ship their own manifest inside the pod; not checked here (UNVERIFIED).

**K-2. Encryption.** `ios.infoPlist.ITSAppUsesNonExemptEncryption: false` is already set. Fine. (`ios.config.usesNonExemptEncryption: false` is the documented equivalent, E2.)

**K-3. expo-audio without mic and background (replaces the bare `"expo-audio"` plugin entry):**

```json
["expo-audio", {
  "microphonePermission": false,
  "recordAudioAndroid": false,
  "enableBackgroundPlayback": false,
  "enableBackgroundRecording": false
}]
```

After `npx expo prebuild --clean` (or in the EAS build log), verify: no `NSMicrophoneUsageDescription`, no `UIBackgroundModes`, no `RECORD_AUDIO`, no `FOREGROUND_SERVICE*`, no `AudioControlsService`.

**K-4. Android permissions.** The Expo template manifest (from `node_modules/expo/template.tgz`) contains `INTERNET`, `SYSTEM_ALERT_WINDOW` (debug), `VIBRATE`, `READ/WRITE_EXTERNAL_STORAGE` (maxSdk 32). Recommended:

```json
"android": {
  "permissions": ["android.permission.VIBRATE"],
  "blockedPermissions": [
    "android.permission.RECORD_AUDIO",
    "android.permission.READ_EXTERNAL_STORAGE",
    "android.permission.WRITE_EXTERNAL_STORAGE",
    "android.permission.SYSTEM_ALERT_WINDOW",
    "android.permission.FOREGROUND_SERVICE",
    "android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK",
    "com.google.android.gms.permission.AD_ID"
  ]
}
```

(`VIBRATE` is for `expo-haptics`; `MODIFY_AUDIO_SETTINGS` is harmless and needed by expo-audio.) Blocking `AD_ID` lets us answer "No" to the Play Console Advertising ID declaration with certainty. `INTERNET` stays (Expo adds it; harmless, and blocking it is optional and needs testing). Check the final merged manifest: `bunx/npx expo prebuild -p android` and `aapt dump permissions` on the built APK/AAB.

**K-5. Optional: `android.allowBackup: false`** stops Android Auto Backup copying local progress to the parent's Google Drive. That backup isn't developer "collection" (G4: collect = transmitted off device to the developer/third parties) and is user-controlled, so this is optional. The privacy policy mentions OS backups either way.

**K-6. iPad.** `ios.supportsTablet` isn't set → default `false` (E2) → iPhone-only, runs letterboxed on iPad. Toddlers use iPads a lot. **Recommend `"supportsTablet": true`**, test the layout on iPad (both orientations if `orientation` changes), and upload 13" iPad screenshots (required when the app runs on iPad, A8).

**K-7. Misc.**
- `userInterfaceStyle: "automatic"`: make sure dark mode doesn't break the pastel design (or set `"light"`).
- `web.output: "server"` is irrelevant for stores but harmless.
- `scheme: "pasujki"` is fine (deep links only open our own app).
- Splash `backgroundColor: "#208AEF"` is a saturated template blue, which goes against DESIGN.md's calm palette. Art/engine owners should switch it to a pastel.
- `version: "1.0.0"`. `eas.json` production `autoIncrement` is fine. EAS `image: latest` gives Xcode 26+ (iOS 26 SDK required, A5) and targetSdk 36 (Play requires API 36 for new apps since 31 Aug 2026, G7).

### 2.3 Store listing metadata

**Apple (App Store Connect)**
- Name ≤ 30 chars (2.3.7), e.g. "Pasujki – Toddler Matching". Subtitle: no other app names, no unverifiable claims (2.3.7).
- "For kids", "toddlers", "2–4 years" **are allowed** because we're in the Kids Category (2.3.8 / 5.1.4 reserve them for Kids apps).
- Keywords: no competitor or trademark names (e.g. Toca Boca, Sago Mini, Pok Pok, Peppa, Montessori as a brand claim), no "free", no prices (2.3.7).
- Description: describe what's actually there (worlds, drag/tap matching, calm design, offline, no ads/IAP/data). **Avoid unverifiable educational claims** ("boosts IQ", "clinically proven", "recommended by teachers/psychologists") (2.3.1/2.3.7). "Practises colours, shapes and matching" is fine.
- Screenshots (2.3.3, A8): real gameplay, not splash/title art. Required: iPhone 6.9" (1320×2868 / 1290×2796 / 1260×2736) or 6.5" fallback, plus at least one 6.1"-class (1179×2556 / 1206×2622) per A8's "required device sizes", plus iPad 13" (2064×2752 / 2048×2732) if `supportsTablet`. 1–10 per size, PNG/JPEG, **no alpha**. Must be 4+-appropriate (2.3.8). Don't show Android devices or other stores (2.3.10).
- Privacy Policy URL (required, A6): `https://tobob.github.io/pasujki-site/privacy/`. Support URL: required in ASC (UNVERIFIED that it can equal the policy page; better a small support page).
- Optional "Age Suitability URL" (A3) can point to the same site.
- Localise listing PL + EN.

**Google Play**
- Title ≤ 30 chars (UNVERIFIED on G10), short description ≤ 80 chars: no emojis, ★, all caps, repeated punctuation (G10).
- No "Best", "#1", "Top", "New", "Free", "Sale", no "download now" calls to action (G10).
- Icon 512×512 PNG ≤ 1024 KB; feature graphic 1024×500 no alpha; ≥ 2 screenshots (recommended ≥ 4 at ≥ 1080 px, 9:16) (G10). Add 7" and 10" tablet screenshots (optional, helps tablet/Kids surfaces).
- No third-party trademarks or device frames in graphics (G10).
- Childlike listing art is **fine** because we target 5 and under; Google only flags it when the declared audience doesn't include children (G2).
- Mention the Teacher Approved badge only once it's actually awarded.

### 2.8 Rating and feedback in the parents' area (added 2026-11-19, Bob's decision)

Replaces the old advice in C-7 ("don't call `requestReview()`"): everything below lives only in the parents' area, behind the gate in C-3, so a child can't trigger it. Code: `src/feedback/review.ts`, `src/components/feedback-overlays.tsx`, `src/app/parents.tsx`.

- **Bottom of the parents' area:** "Rate Pasujki on the App Store" → `itms-apps://itunes.apple.com/app/id6835474239?action=write-review` (fallback `https://apps.apple.com/...`; on Android the Play listing). "Send us feedback" → `https://pastelki.club/<lang>/feedback?app=pasujki&version=…&build=…&platform=ios|android&utm_source=pasujki&utm_medium=app` in the external browser (`Linking.openURL`, never a web view). `<lang>` = UI language (all 8 are among the 17 Pastelki languages), else `en`.
- **One-time card:** visits are counted on the device (`pasujki.review.v1` in kv-store). On the 6th visit, after a short pause, an in-screen overlay asks "Do you like Pasujki?" Yes / Not really / Not now. Yes → iOS `StoreReview.requestReview()` (fallback: the write-review link when unavailable, e.g. TestFlight); Android → the Play listing link (see below). Not really → a card with "Tell us what could be better" (feedback link with `liked=0`), "Rate on the App Store" and "Not now". Not now → asked once more after 180 days at the earliest, then never. Yes / Not really → never again.
- **Overlay, not `<Modal>`:** a system sheet presented while an RN Modal is dismissing is dropped on Fabric (Kolorowanki). The overlays are absolutely positioned animated views; links open 350 ms after the card fades.
- **No network:** the app itself still makes no requests, so C-5 and the privacy labels ("Data Not Collected" / "No data collected") stay valid. `expo-store-review` only calls StoreKit / Play Core. Added deps: `expo-store-review`, `expo-application` (build number for the link).

Guidelines checked (2026-11-19):
- **Apple 1.3 Kids:** "must not include links out of the app, purchasing opportunities, or other distractions to kids unless reserved for a designated area behind a parental gate" → both links and the card are only behind the gate. No third-party analytics, nothing sent by the app.
- **Apple 5.6.1:** "Use the provided API to prompt users to review your app … we will disallow custom review prompts." → the only rating prompt is StoreKit's. Our card asks a yes/no question and never imitates stars; the "Rate" buttons are plain links to the App Store page (Apple's own documented `action=write-review` link, which is how a button should rate since the API may show nothing). To avoid review gating, the "Not really" path offers "Rate on the App Store" as a full-size button too, and the bottom "Rate" button is always there for everyone.
- **Google Play in-app review:** "Your app shouldn't ask the user any questions before or while presenting the rating button or card, including … 'Do you like the app?'" and "should not have a call-to-action option (such as a button) to trigger the API". → On Android we never call the in-app review API: "Yes" and the button open the Play listing (`market://details?id=com.tobob.pasujki`). This is the one deviation from Bob's flow (Yes → `requestReview()` only on iOS).
- **Expo docs (v58, expo-store-review):** "Don't call `requestReview()` from a button … Don't ask the user questions before or while showing the rating prompt." → Residual risk on iOS: the Yes tap that leads to the prompt is an answer to a question. Apple's 5.6.1 only bans custom prompts, and this pattern is widely accepted, but if a reviewer objects, switch iOS "Yes" to the write-review link like Android (one line in `rateAfterYes`).

### 2.4 Privacy policy (host at `https://tobob.github.io/pasujki-site/privacy/`)

Requirements it must meet: what data is collected (none) and how it's used; third parties (none); retention/deletion; how to revoke consent or request deletion (A1 5.1.1(i)). Developer identity + privacy contact, clearly titled "Privacy Policy", names the app, public non-PDF non-geofenced URL (G5). Replace the `[…]` placeholders (developer name exactly as shown in both store listings, contact e-mail) before publishing.

#### English

> # Privacy Policy — Pasujki
> _Last updated: [DATE]_
>
> Pasujki is a matching game for young children, made by [DEVELOPER NAME] ("we"). This policy explains how the app handles information. Short version: **Pasujki does not collect, store on our servers, or share any personal data. It works completely offline.**
>
> **What we collect.** Nothing. Pasujki has no accounts, no sign-in, no advertising, no analytics, no tracking, no crash reporting and no third-party SDKs that collect data. The app makes no internet connections, and we never receive any information about you, your child or your device.
>
> **What stays on the device.** To remember game progress (completed levels and stickers) and settings (music and sound on/off), the app saves a small amount of data **only on your device**. We can't access it. It is deleted when you delete the app. If you use your device's own backup (for example iCloud or Google backup), that copy is managed by Apple or Google under your account and their privacy policies.
>
> **Permissions.** Pasujki doesn't ask for access to your camera, microphone, photos, contacts or location, and doesn't send notifications.
>
> **Children.** Pasujki is designed for children aged 2–5. Because it collects no personal information, it doesn't need, and doesn't ask for, a child's or parent's personal details. Settings, this policy and anything that leads outside the game are behind a parental gate. We follow the requirements of the Children's Online Privacy Protection Act (COPPA), the GDPR (including Article 8) and the UK Age Appropriate Design Code.
>
> **Third parties.** We don't share data with anyone, because we don't have any. The app is downloaded through the App Store or Google Play. Apple and Google handle download and payment information under their own privacy policies.
>
> **Your rights and deletion.** As we hold no data about you, there is nothing to access, correct or delete on our side. To remove the progress stored on your device, delete the app.
>
> **Changes.** If the app ever changes how it handles information, we'll update this page and the date above before releasing that version.
>
> **Contact.** [DEVELOPER NAME], [CONTACT E-MAIL].

#### Polski

> # Polityka prywatności — Pasujki
> _Ostatnia aktualizacja: [DATA]_
>
> Pasujki to gra w dopasowywanie dla małych dzieci, stworzona przez [NAZWA DEWELOPERA] („my”). Ta polityka opisuje, jak aplikacja obchodzi się z informacjami. W skrócie: **Pasujki nie zbiera, nie przechowuje na naszych serwerach i nie udostępnia żadnych danych osobowych. Działa całkowicie offline.**
>
> **Co zbieramy.** Nic. Pasujki nie ma kont ani logowania, reklam, analityki, śledzenia, raportowania awarii ani zewnętrznych bibliotek zbierających dane. Aplikacja nie łączy się z internetem i nigdy nie otrzymujemy żadnych informacji o Tobie, Twoim dziecku ani Twoim urządzeniu.
>
> **Co zostaje na urządzeniu.** Żeby pamiętać postępy w grze (ukończone poziomy i naklejki) i ustawienia (muzyka i dźwięki), aplikacja zapisuje niewielką ilość danych **wyłącznie na Twoim urządzeniu**. Nie mamy do nich dostępu. Usunięcie aplikacji usuwa te dane. Jeśli korzystasz z kopii zapasowej systemu (np. iCloud albo kopii Google), tą kopią zarządza Apple lub Google w ramach Twojego konta i według swoich polityk prywatności.
>
> **Uprawnienia.** Pasujki nie prosi o dostęp do aparatu, mikrofonu, zdjęć, kontaktów ani lokalizacji i nie wysyła powiadomień.
>
> **Dzieci.** Pasujki jest przeznaczone dla dzieci w wieku 2–5 lat. Ponieważ nie zbiera żadnych danych osobowych, nie potrzebuje i nie prosi o dane dziecka ani rodzica. Ustawienia, ta polityka i wszystko, co prowadzi poza grę, są za bramką rodzicielską. Spełniamy wymagania amerykańskiej ustawy COPPA, RODO (w tym art. 8) oraz brytyjskiego Age Appropriate Design Code.
>
> **Podmioty trzecie.** Nikomu nie udostępniamy danych, bo ich nie mamy. Aplikację pobiera się przez App Store lub Google Play. Informacjami o pobraniu i płatnościach zarządzają Apple i Google według własnych polityk prywatności.
>
> **Twoje prawa i usuwanie danych.** Nie przechowujemy żadnych danych o Tobie, więc po naszej stronie nie ma czego udostępnić, poprawić ani usunąć. Aby usunąć postępy zapisane na urządzeniu, usuń aplikację.
>
> **Zmiany.** Jeśli aplikacja kiedyś zmieni sposób obchodzenia się z informacjami, zaktualizujemy tę stronę i datę powyżej przed wydaniem takiej wersji.
>
> **Kontakt.** [NAZWA DEWELOPERA], [E-MAIL KONTAKTOWY].

### 2.5 Questionnaire answers

#### Apple age rating (App Information → Age Ratings), per A3/A4/A5

| Section | Item | Answer |
|---|---|---|
| In-App Controls | Parental Controls | **No** (a parental gate isn't a parental-controls feature; interpretation UNVERIFIED) |
| | Age Assurance | **No** |
| Capabilities | Unrestricted Web Access | **No** |
| | User-Generated Content | **No** |
| | Social Media / Social Media Disabled for Users Under 13 | **No** |
| | Messaging and Chat | **No** |
| | Advertising | **No** |
| | Shared Location (new, required on submissions from 16 Nov 2026) | **No** |
| | Dating and Relationships (new, same date) | **No** |
| Mature Themes | Profanity/Crude Humor, Horror/Fear, Alcohol/Tobacco/Drugs | **None** |
| Medical or Wellness | Medical/Treatment Info, Health/Wellness Topics | **None** / **No** |
| Sexuality or Nudity | all | **None** |
| Violence | Cartoon/Fantasy, Realistic, Prolonged Graphic, Guns/Weapons | **None** |
| Chance-Based Activities | Gambling, Simulated Gambling, Contests, Loot Boxes | **None** / **No** (stickers are fixed rewards, not random) |
| Age Categories and Override | | **Made for Kids → 5 and under** (permanent, A3) |
| Age Suitability URL | | optional |

Expected result: **4+**, shown in Kids › 5 & Under.

#### Apple App Privacy (A6)
App Privacy → Get Started → **"No, we do not collect data from this app"** → Save. Privacy Policy URL as above. Valid because nothing leaves the device ("Data that is processed only on device is not 'collected'") and there are no third-party partners' SDKs. Re-check if any dependency changes.

#### Google Play Data safety (G4)
- "Does your app collect or share any of the required user data types?" → **No**. Result: "No data collected" / "No data shared".
- Privacy policy URL is still required (G4: "the completed form and privacy policy can indicate that no user data is collected or shared").
- Account deletion URL: not applicable (no accounts). Exact wording of follow-up questions: UNVERIFIED.

#### Google Play target audience & content (G2)
- Target age groups: **5 and under** only.
- Ads: the app **does not contain ads** (also in App content → Ads: "No").
- Families Policy acknowledgement: accept. No ads SDK, so no Families Self-Certified Ads SDK question applies (G3).
- Teacher Approved: leave eligible (automatic).

#### Other Play Console "App content" declarations (list from Console experience, UNVERIFIED)
App access: **all functionality available without special access** · Ads: **No** · Advertising ID: **No, the app doesn't use advertising ID** (backed by K-4) · Government app: No · Financial features: none · Health: none · News: No · Content rating: IARC (below) · Data safety: above · Target audience: above. Foreground service types: **none** (after K-3).

#### IARC questionnaire (G6)
- Category: **Game** (wording UNVERIFIED).
- Violence, fear, sexuality, language, controlled substances, crude humour, gambling/simulated gambling: **No** to all.
- Interactive elements: users interact/communicate with each other **No**; shares user location **No**; digital purchases **No**; unrestricted internet/web browser **No**.
- Expected: PEGI 3, ESRB Everyone, USK 0 (UNVERIFIED, IARC decides). Re-submit the questionnaire if content changes (G6).

### 2.6 Law: what applies to an app that collects nothing

| Law | Applies? | Pasujki position |
|---|---|---|
| **COPPA** (16 CFR 312; 2025 amendments published 22 Apr 2025, effective 23 Jun 2025, compliance 22 Apr 2026 [L1, dates via S]) | Obligations attach to operators of child-directed online services **that collect personal information** from children; "personal information" includes persistent identifiers (and, after 2025, biometric identifiers [S]). | No collection → no notice/verifiable-parental-consent duties are triggered. The 2025 changes (separate consent for third-party disclosures, written data retention policy, security programme [S]) also hinge on collection. **Keep it that way**: one analytics or crash SDK that sends a device ID would bring the whole COPPA regime in. |
| **GDPR Art. 8** (L2: information society services offered directly to a child; consent below 16, Member States may lower to ≥ 13) | Only if personal data is processed. The developer processes none; progress lives only on the device. | Not triggered. ePrivacy Art. 5(3) (storing info on the device) has a "strictly necessary for the service the user asked for" exemption, which covers saving game progress (my analysis, UNVERIFIED legal view). |
| **UK Children's Code** (L3) | Covers information society services *likely to be accessed by children* that process personal data [S, ICO pages 403'd]. | With no personal data processing it's effectively not engaged, but Pasujki matches its spirit: high privacy by default, no geolocation, no profiling, no nudge techniques, no data sharing. Write down this reasoning (ICO advises documenting scoping decisions [S]). |
| **US state app-store age laws** (e.g. Texas SB 2420 in force 4 Jun 2026, per A5) | Mostly obligations on stores plus apps' "significant change" handling via Apple's Declared Age Range / PermissionKit APIs. | No action needed for v1 (no accounts, no data). UNVERIFIED whether "significant change" notices will be expected for kids apps' updates; revisit if Apple asks. |
| **EU DSA trader status** | Both stores require a trader/non-trader declaration for EU distribution (UNVERIFIED for 2026 details). | Reuse the Apple account's existing status; set it up in the new Play account. |

### 2.7 Google Play account prerequisites (Bob has **no Play account yet**, per `apps/sunset/STUDIO.md`)
- **New personal account → closed test first**: ≥ **12 testers opted in** for **14 consecutive days** before applying for production (accounts created after 13 Nov 2023) (G8, [V]). Plan ≥ 15 testers (adults/parents) to survive drop-outs; start the closed test as soon as a stable build exists. Organisation accounts (D-U-N-S) aren't subject to this (UNVERIFIED for 2026; confirm when creating the account).
- **Target API**: new apps must target **API 36** (since 31 Aug 2026, extension to 1 Nov 2026 has passed) (G7, [V]). Expo SDK 58 → targetSdk 36. OK.
- **Developer verification**: Play Console developers are registered via Play; Google "automatically registers 99% of apps". Mandatory protections start 30 Sep 2026 in BR/ID/SG/TH, global from 2027 (G9, [V]). For a Play-only app: complete Play Console identity verification; nothing extra expected (UNVERIFIED if region-specific steps appear).
- Families apps may get **longer review times**. Budget extra days (UNVERIFIED).

---

## 3. Review notes (paste into App Store Connect → App Review Information → Notes, and Play Console → App access / review notes)

```
Pasujki is a calm, offline matching game for children aged 2–5 (Kids Category, 5 and under).

HOW TO PLAY
- Launch the app; the game starts immediately. No account, login or setup.
- The screen has four pictures in the corners (animals and objects). A prompt appears
  in the centre (a picture, colour, shape or texture).
- Drag the prompt to the matching corner, or simply tap the matching corner
  (for the youngest children).
- A correct match gives a soft glow, a gentle sound and slow drifting stars. A wrong
  choice just floats the prompt back to the centre; after the second try the right
  corner glows softly. There is no failure state, timer or score pressure.
- Each world gets harder: identical pictures → colours → shapes → textures →
  food/home/baby → weather/pairs. The "abstract" world has no wrong answer
  (imagination play). Finishing a level gives a sticker.

PARENTS' AREA (parental gate)
- Tap the [icon, e.g. gear in the top corner], press and hold for 3 seconds, then
  answer the written question (e.g. "Tap 3 × 4" – pick 12). The question changes each time.
- Inside: music on/off, sounds on/off, reset progress, privacy policy (shown in-app)
  [and contact info]. Nothing outside the app is reachable without the gate.

PRIVACY
- The app collects NO data: no accounts, no ads, no analytics, no tracking,
  no third-party SDKs and no network requests at all. It works fully in airplane mode.
- Progress and settings are stored only on the device (local storage).
- No permissions are requested (no camera, microphone, location, photos or notifications).
- No in-app purchases.

A short screen recording from a physical iPhone showing first launch, gameplay,
the parental gate and the parents' area: [LINK]
```

Use specifics (2.3.1(a) says generic notes get rejected). Update the icon/gate wording to match the final UI.

### Screen recording plan (answers the Sunset "2.1 Information Needed" lesson ahead of time)
Record on a **physical iPhone** (Control Centre → Screen Recording, with mic off), ~60–90 s, then a ~30 s Android version for Play if needed:
1. Delete the app → fresh install from TestFlight → **turn on airplane mode** (shows offline/no network).
2. Cold launch: splash → game starts, **no permission prompts** appear.
3. Level 1 (identical pictures, 2 corners): one drag match, one tap match.
4. One wrong choice → prompt drifts back, correct corner glows after the 2nd attempt.
5. Finish a level → sticker reward.
6. Jump to a later world (colour/shape) and the abstract world (any answer celebrated).
7. Open the parental gate: show a **failed** attempt (wrong answer → back to the game), then a successful hold + answer.
8. Parents' area: toggle music/sounds, open the in-app privacy policy, go back.
9. Home button → reopen → progress kept.

Host as an **unlisted** video or a file link that works without login (e.g. unlisted YouTube or a direct mp4 link), put the link in the notes, keep the file for Resolution Center replies.

---

## 4. Risks that commonly sink kids apps, and how Pasujki avoids them

| # | Risk (typical rejection) | Guideline | Mitigation |
|---|---|---|---|
| R1 | Template leftovers / links out in the child area (Explore tab → expo.dev) | 1.3, 2.1 | C-1: delete template screens and `expo-web-browser`. Grep for `http` and `openURL` before every submission: the only allowed hits are in `src/feedback/review.ts`, used only from `src/app/parents.tsx` after the gate (§2.8). |
| R2 | Unused permission strings / background modes (mic, `UIBackgroundModes: audio`) | 2.5.4, 5.1.1; Play Families, FGS declaration | K-3 + K-4. Verify the generated Info.plist and merged AndroidManifest. |
| R3 | Parental gate too easy (colour tap, "swipe", fixed answer) or missing for the privacy link | 1.3 | C-3: hold 3 s + randomised written arithmetic; every outward path behind it. |
| R4 | Third-party SDK that collects device info (analytics, crash, ads, remote fonts/images) | 1.3, 5.1.4, G1 | C-5/C-6: zero network. Proxy check in QA. Dependency review in each PR. |
| R5 | Privacy label / Data safety doesn't match the binary | 2.3 intro ("including privacy information"), 5.1.1; G4 | Both say "not collected" and the binary truly makes no requests. Re-check after every dependency change. |
| R6 | Missing required-reason entries in the privacy manifest (ITMS-91053) | Apple privacy manifest rules (A7, E1) | K-1, upload to TestFlight early, react to Apple's email. |
| R7 | "Minimum functionality" / "spam": too few levels, feels like a demo | 4.2, 4.3(b) | C-9: ship the full world progression, stickers, parents' area; describe the variety in the notes. |
| R8 | "Information Needed" (2.1): reviewer can't see how it works | 2.1, 2.3.1 | Section 3 notes plus the recording link in the **first** submission. |
| R9 | Metadata: competitor names, "best/#1/free", unverifiable educational claims, splash-only screenshots, Android imagery on iOS | 2.3.3, 2.3.7, 2.3.10; G10 | Section 2.3 do/don't list. |
| R10 | Crash or broken layout on iPad / Android tablet / small phone | 2.1; Android 16 large-screen rules | C-10, C-11, K-6: test matrix incl. iPad and an Android tablet in landscape. |
| R11 | Age rating questionnaire incomplete (new Sep/Nov 2026 questions) → submission blocked | A5 | Fill the full questionnaire including Shared Location / Dating (section 2.5). |
| R12 | Privacy policy missing in-app, a PDF, or not naming the developer/app | 5.1.1(i); G5 | C-4 + the section 2.4 texts, HTML page, title "Privacy Policy". |
| R13 | Play: declared audience doesn't match listing/content; selecting extra age groups | G1, G2 | 5 and under only; listing consistent. |
| R14 | Play: production access blocked (new personal account) | G8 | Closed test with ≥ 12 (aim 15+) testers × 14 days, started early. |
| R15 | Kids Category lock-in later blocks a monetisation idea (e.g. ads) | A3, 1.3 | Accept: future IAP is possible behind a gate; ads (if ever) only contextual, human-reviewed; no behavioural ads ever. |
| R16 | Overstimulating content or a scary sound/image flagged by Teacher Approved reviewers | Teacher Approved criteria [S] | DESIGN.md calm rules already cover this. |
| R17 | Review prompt / "more apps" / social buttons a child can reach | 1.3 | C-7: none in v1. |

---

## 5. Pre-submission checklist (short)

- [ ] Template code and unused deps removed (C-1); grep shows no `http`, `openURL`, `WebBrowser` outside the gated parents' area
- [ ] `expo-audio` plugin options set (K-3); generated Info.plist/AndroidManifest verified (no mic, no background modes, no FGS)
- [ ] `ios.privacyManifests` added and synced with `node_modules` manifests (K-1)
- [ ] `android.blockedPermissions` incl. `AD_ID` (K-4); `supportsTablet` decision made (K-6)
- [ ] Parental gate implemented and protecting settings + policy + any link (C-3, C-4)
- [ ] Proxy test: zero network traffic; airplane mode works end-to-end (C-5)
- [ ] Full content progression in v1.0 (C-9)
- [ ] Privacy policy live at tobob.github.io/pasujki-site/privacy/ (PL + EN) and in-app
- [ ] ASC: age rating (Made for Kids, 5 and under), App Privacy "not collected", screenshots 6.9"/6.1"(/13"), notes + recording link
- [ ] Play: account + identity verification, closed test 12+ testers × 14 days, Data safety "No", target audience 5 & under, ads No, AD_ID No, IARC, listing assets
