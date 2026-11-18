# Pasujki — karta aplikacji

Plik studia: czytaj go zanim zaczniesz pracę nad aplikacją, a po każdej istotnej zmianie dopisz linijkę do **Historii**.

| | |
|---|---|
| Slug / folder | `pasujki` · `studio/apps/pasujki` |
| iOS bundle ID | `com.tobob.pasujki` |
| Android package | `com.tobob.pasujki` |
| EAS | konto `tobobu`, projectId w `app.json` → `extra.eas.projectId` (`studio link pasujki`) |
| Repo | [github.com/tobob/pasujki](https://github.com/tobob/pasujki) (publiczne, MIT) · strona: tobob/pasujki-site |
| Utworzona | 2026-11-16 |

## Co robi

Spokojna gra w dopasowywanie dla dzieci 2–4 lat. Ekran podzielony na 4 ćwiartki z obrazkami; na środku pojawia się kolor / tekstura / kształt / obrazek, który dziecko tapnięciem albo przeciągnięciem przypisuje do pasującej ćwiartki. 7 światów, 34 poziomy po 6 rund, ostatni świat „Wymyślanki” (abstrakcyjny, każda odpowiedź dobra). Całość offline, zero zbieranych danych.

## Architektura i pułapki

- Kontrakt: `src/game/types.ts` (id obrazków/kolorów/tekstur/kształtów/dźwięków), paleta `src/game/palette.ts`, zasady spokoju `docs/DESIGN.md` + `docs/CALM_DESIGN_RESEARCH.md`.
- Poziomy: `src/game/levels.ts` (generator z seedem) + `src/game/item-attributes.ts`; walidator `npx tsx scripts/validate-levels.ts` (MUSI przechodzić).
- Grafika: `src/art/**` (SVG, react-native-svg), rejestr generowany `node tools/art/gen-registry.mjs`; arkusz `tools/art/contact-sheet.png`.
- Dźwięk: `assets/audio/*.m4a` generowane `tools/audio/generate.py` (venv w tools/audio/.venv), mapa `src/audio/index.ts`.
- Silnik: `src/game/engine/` (progression, sound, dev hook pod `__DEV__`), ekrany `src/app/`, bramka rodzicielska `src/components/parental-gate.tsx`.
- app.json: expo-audio bez mikrofonu i tła, `android.blockedPermissions`, `ios.privacyManifests`. Sprawdzaj `npx expo config --type introspect` po zmianie pluginów.
- Budowa lokalna iOS: `PATH=/opt/homebrew/opt/cocoapods/bin:$PATH` (shim asdf zasłania pod).
- Przed wydaniem: uzupełnić DEVELOPER/CONTACT/UPDATED w `src/constants/privacy.ts`; wymagania sklepów: `docs/STORE_COMPLIANCE.md`.

## Sklepy

- **iOS:** 1.0 (build 2) wysłana do App Review 2026-11-16, wydanie automatyczne po akceptacji. ASC app 6835474239.
- **Android:** nie wydana. Plan: grupa docelowa „5 i mniej”, Families Policy. Wymaga konta Google Play + zamkniętego testu 12+ testerów przez 14 dni.

## Historia
- 2026-11-16 — v0.1: 6 agentów równolegle (poziomy, grafika, audio, silnik, zgodność ze sklepami, badania spokojnego designu + biblioteki); działa na symulatorze iPhone i iPad
- 2026-11-16 — v0.2: 68 poziomów / 8 światów (nowy świat „Cienie”, sylwetki), reguły różnorodności w walidatorze, 20 nowych obrazków, przyjaźniejsze proporcje zwierząt; fix bramki rodzica (porównanie z iloczynem)
- 2026-11-16 — 1.0: 8 języków, strona tobob.github.io/pasujki-site, wysłane do App Review (build 2); repo publiczne (MIT), historia oczyszczona z danych kontaktowych
- 2026-11-16 22:37 — DSA: zweryfikowano w App Store Connect — konto i aplikacja jako non-trader (darmowa, bez zarobku)
- 2026-11-17 12:17 — build 4 (1.0.1, fix expo-asset peer dep) uruchomiony, potem anulowany (421b42cb)
- 2026-11-18 14:37 — sync-art: updated 45: cat v1 → v2; dog v1 → v2; cow v1 → v2; pig v1 → v2; sheep v1 → v2; horse v1 → v2; hen v1 → v2; duck v1 → v2; frog v1 → v2; fish v1 → v2; elephant v1 → v2; lion v1 → v2; giraffe v1 → v2; zebra v1 → v2; tiger v1 → v2; ladybug v1 → v3; bee v1 → v2; butterfly v1 → v2; bear v1 → v2; rabbit v1 → v2; mouse v1 → v2; owl v1 → v2; penguin v1 → v2; monkey v1 → v2; snail v1 → v2; turtle v1 → v2; squirrel v1 → v2; flamingo v1 → v2; whale v1 → v2; parrot v1 → v2; chick v1 → v2; kitten v1 → v2; puppy v1 → v2; lamb v1 → v2; calf v1 → v2; duckling v1 → v2; worm v1 → v2; kennel_bowl v? → v3; snowman v? → v2; crow v1 → v2; bird v1 → v2; fox v1 → v2; hedgehog v1 → v2; octopus v1 → v3; dinosaur v1 → v2 (następny build sklepowy dostarczy zmiany)
- 2026-11-18 14:39 — build ios (production) wysłany na EAS
- 2026-11-18 14:39 — build 5 (1.0.1) z 45 nowszymi obrazkami z Pastelek: EAS c1a0a659, auto-submit do ASC zaplanowany (submission 493401ca); do review wysyła Bob
