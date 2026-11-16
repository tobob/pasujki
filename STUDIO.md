# Pasujki — karta aplikacji

Plik studia: czytaj go zanim zaczniesz pracę nad aplikacją, a po każdej istotnej zmianie dopisz linijkę do **Historii**.

| | |
|---|---|
| Slug / folder | `pasujki` · `studio/apps/pasujki` |
| iOS bundle ID | `com.tobob.pasujki` |
| Android package | `com.tobob.pasujki` |
| EAS | konto `tobobu`, projectId w `app.json` → `extra.eas.projectId` (`studio link pasujki`) |
| Repo | `github.com/tobob/pasujki` (do założenia) |
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

- **iOS:** nie wydana. Plan: Kids Category, przedział „5 i mniej”, 4+ (nieodwracalne po zatwierdzeniu).
- **Android:** nie wydana. Plan: grupa docelowa „5 i mniej”, Families Policy. Wymaga konta Google Play + zamkniętego testu 12+ testerów przez 14 dni.

## Historia
- 2026-11-16 — v0.1: 6 agentów równolegle (poziomy, grafika, audio, silnik, zgodność ze sklepami, badania spokojnego designu + biblioteki); działa na symulatorze iPhone i iPad
- 2026-11-16 — v0.2: 68 poziomów / 8 światów (nowy świat „Cienie”, sylwetki), reguły różnorodności w walidatorze, 20 nowych obrazków, przyjaźniejsze proporcje zwierząt; fix bramki rodzica (porównanie z iloczynem)
