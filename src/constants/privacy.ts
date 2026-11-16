/**
 * Full privacy policy, shown in-app behind the parental gate (no network, no link out).
 * Source: docs/STORE_COMPLIANCE.md §2.4. COORDINATOR: fill DEVELOPER / CONTACT / UPDATED before release.
 */
export const DEVELOPER = '[NAZWA DEWELOPERA]';
export const CONTACT = '[E-MAIL KONTAKTOWY]';
export const UPDATED = '[DATA]';

export type Section = { heading?: string; body: string };

export const PRIVACY_PL: { title: string; sections: Section[] } = {
  title: 'Polityka prywatności — Pasujki',
  sections: [
    { body: `Ostatnia aktualizacja: ${UPDATED}` },
    {
      body: `Pasujki to gra w dopasowywanie dla małych dzieci, stworzona przez ${DEVELOPER} („my”). Ta polityka opisuje, jak aplikacja obchodzi się z informacjami. W skrócie: Pasujki nie zbiera, nie przechowuje na naszych serwerach i nie udostępnia żadnych danych osobowych. Działa całkowicie offline.`,
    },
    {
      heading: 'Co zbieramy',
      body: 'Nic. Pasujki nie ma kont ani logowania, reklam, analityki, śledzenia, raportowania awarii ani zewnętrznych bibliotek zbierających dane. Aplikacja nie łączy się z internetem i nigdy nie otrzymujemy żadnych informacji o Tobie, Twoim dziecku ani Twoim urządzeniu.',
    },
    {
      heading: 'Co zostaje na urządzeniu',
      body: 'Żeby pamiętać postępy w grze (ukończone poziomy i naklejki) i ustawienia (muzyka i dźwięki), aplikacja zapisuje niewielką ilość danych wyłącznie na Twoim urządzeniu. Nie mamy do nich dostępu. Usunięcie aplikacji usuwa te dane. Jeśli korzystasz z kopii zapasowej systemu (np. iCloud albo kopii Google), tą kopią zarządza Apple lub Google w ramach Twojego konta i według swoich polityk prywatności.',
    },
    {
      heading: 'Uprawnienia',
      body: 'Pasujki nie prosi o dostęp do aparatu, mikrofonu, zdjęć, kontaktów ani lokalizacji i nie wysyła powiadomień.',
    },
    {
      heading: 'Dzieci',
      body: 'Pasujki jest przeznaczone dla dzieci w wieku 2–5 lat. Ponieważ nie zbiera żadnych danych osobowych, nie potrzebuje i nie prosi o dane dziecka ani rodzica. Ustawienia, ta polityka i wszystko, co prowadzi poza grę, są za bramką rodzicielską. Spełniamy wymagania amerykańskiej ustawy COPPA, RODO (w tym art. 8) oraz brytyjskiego Age Appropriate Design Code.',
    },
    {
      heading: 'Podmioty trzecie',
      body: 'Nikomu nie udostępniamy danych, bo ich nie mamy. Aplikację pobiera się przez App Store lub Google Play. Informacjami o pobraniu i płatnościach zarządzają Apple i Google według własnych polityk prywatności.',
    },
    {
      heading: 'Twoje prawa i usuwanie danych',
      body: 'Nie przechowujemy żadnych danych o Tobie, więc po naszej stronie nie ma czego udostępnić, poprawić ani usunąć. Aby usunąć postępy zapisane na urządzeniu, usuń aplikację.',
    },
    {
      heading: 'Zmiany',
      body: 'Jeśli aplikacja kiedyś zmieni sposób obchodzenia się z informacjami, zaktualizujemy tę stronę i datę powyżej przed wydaniem takiej wersji.',
    },
    { heading: 'Kontakt', body: `${DEVELOPER}, ${CONTACT}.` },
  ],
};

export const PRIVACY_EN: { title: string; sections: Section[] } = {
  title: 'Privacy Policy — Pasujki',
  sections: [
    { body: `Last updated: ${UPDATED}` },
    {
      body: `Pasujki is a matching game for young children, made by ${DEVELOPER} ("we"). This policy explains how the app handles information. Short version: Pasujki does not collect, store on our servers, or share any personal data. It works completely offline.`,
    },
    {
      heading: 'What we collect',
      body: 'Nothing. Pasujki has no accounts, no sign-in, no advertising, no analytics, no tracking, no crash reporting and no third-party SDKs that collect data. The app makes no internet connections, and we never receive any information about you, your child or your device.',
    },
    {
      heading: 'What stays on the device',
      body: 'To remember game progress (completed levels and stickers) and settings (music and sound on/off), the app saves a small amount of data only on your device. We can\'t access it. It is deleted when you delete the app. If you use your device\'s own backup (for example iCloud or Google backup), that copy is managed by Apple or Google under your account and their privacy policies.',
    },
    {
      heading: 'Permissions',
      body: "Pasujki doesn't ask for access to your camera, microphone, photos, contacts or location, and doesn't send notifications.",
    },
    {
      heading: 'Children',
      body: "Pasujki is designed for children aged 2–5. Because it collects no personal information, it doesn't need, and doesn't ask for, a child's or parent's personal details. Settings, this policy and anything that leads outside the game are behind a parental gate. We follow the requirements of the Children's Online Privacy Protection Act (COPPA), the GDPR (including Article 8) and the UK Age Appropriate Design Code.",
    },
    {
      heading: 'Third parties',
      body: "We don't share data with anyone, because we don't have any. The app is downloaded through the App Store or Google Play. Apple and Google handle download and payment information under their own privacy policies.",
    },
    {
      heading: 'Your rights and deletion',
      body: 'As we hold no data about you, there is nothing to access, correct or delete on our side. To remove the progress stored on your device, delete the app.',
    },
    {
      heading: 'Changes',
      body: "If the app ever changes how it handles information, we'll update this page and the date above before releasing that version.",
    },
    { heading: 'Contact', body: `${DEVELOPER}, ${CONTACT}.` },
  ],
};
