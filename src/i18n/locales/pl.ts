import { CONTACT, DEVELOPER } from '../../constants/contact';
import type { Locale } from '../types';

const UPDATED = '16 listopada 2026';

/** Polski — the source of tone for every other language. Hint lines: hint_pl on each Round. */
const pl: Locale = {
  name: 'Polski',
  strings: {
    play: 'Graj',
    map: 'Mapa światów',
    parents: 'Dla rodziców',
    start: 'Start',
    back: 'Wróć',
    exit: 'Wyjdź',
    next: 'Następny poziom',
    bravo: 'Brawo!',
    gateTitle: 'Strefa rodzica',
    gateHold: 'Poproś dorosłego. Przytrzymaj przycisk przez 3 sekundy.',
    gateHoldButton: 'Przytrzymaj',
    gateQuestion: (a: string, b: string) => `Ile to jest ${a} razy ${b}?`,
    music: 'Muzyka',
    sounds: 'Dźwięki i wibracje',
    hints: 'Pokazuj podpowiedzi',
    hintsDetail: 'Krótkie zdanie nad planszą, np. „Co jest czerwone?”',
    unlockAll: 'Odblokuj wszystkie poziomy',
    unlockAllDetail: 'Dla starszych dzieci: od razu otwiera wszystkie światy.',
    reset: 'Wyzeruj postępy',
    resetTitle: 'Wyzerować postępy?',
    resetBody: 'Gwiazdki i odblokowane poziomy zostaną usunięte.',
    cancel: 'Anuluj',
    resetConfirm: 'Wyzeruj',
    aboutTitle: 'O grze',
    about:
      'Pasujki to spokojna gra w dopasowywanie dla dzieci w wieku 2–5 lat. Dziecko przeciąga obrazek ze środka do pasującego rogu (albo po prostu stuka w róg). Nie ma limitu czasu, punktów karnych ani pośpiechu — każda pomyłka to po prostu kolejna próba. Po drugiej pomyłce właściwy róg delikatnie się podświetla.',
    worldsTitle: 'Światy i wiek',
    worlds:
      'Takie same (od 2 lat) → Kolory → Kształty → Cienie → Wzorki (3+) → Kto z kim? (jedzenie, domki, mamy) → Pogoda i pary (4–5 lat). Kolejny świat otwiera się po ukończeniu połowy poprzedniego. „Wymyślanki” są otwarte zawsze: tam nie ma złych odpowiedzi — każdy wybór jest dobry i to zaproszenie do rozmowy („Dlaczego krówka lubi niebieski?”).',
    soundTitle: 'Dźwięk',
    soundNote:
      'Gra szanuje przełącznik wyciszenia w iPhonie: gdy telefon jest wyciszony, muzyki i dźwięków nie słychać. Muzyka jest cicha i wyłącza się, gdy zamkniesz aplikację.',
    safetyTitle: 'Bezpieczeństwo',
    safety:
      'Bez reklam, zakupów, kont, internetu i zbierania danych. Gra działa w całości offline. Ustawienia i ta strona są za bramką rodzica.',
    version: 'Wersja',
  },
  numbers: ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć'],
  hints: null,
  privacy: {
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
      { heading: 'Kontakt', body: `${DEVELOPER}: pytania i zgłoszenia na ${CONTACT}.` },
    ],
  },
};
export default pl;
