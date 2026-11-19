import { CONTACT, DEVELOPER } from '../../constants/contact';
import type { ColorId, ItemId, ShapeId } from '../../game/types';
import type { HintPack, Locale } from '../types';

const UPDATED = '19. November 2026';

// ── hint words ─────────────────────────────────────────────────────────────────────────────────
type G = 'm' | 'f' | 'n' | 'pl';
/** [noun, gender, oblique form of a weak masculine noun (den/dem Löwen)] */
type N = [string, G, string?];
const ITEMS: Record<ItemId, N> = {
  cat: ['Katze', 'f'], dog: ['Hund', 'm'], cow: ['Kuh', 'f'], pig: ['Schwein', 'n'], sheep: ['Schaf', 'n'],
  horse: ['Pferd', 'n'], hen: ['Huhn', 'n'], duck: ['Ente', 'f'], frog: ['Frosch', 'm'], fish: ['Fisch', 'm'],
  elephant: ['Elefant', 'm', 'Elefanten'], lion: ['Löwe', 'm', 'Löwen'], giraffe: ['Giraffe', 'f'], zebra: ['Zebra', 'n'],
  tiger: ['Tiger', 'm'], ladybug: ['Marienkäfer', 'm'], bee: ['Biene', 'f'], butterfly: ['Schmetterling', 'm'],
  bear: ['Bär', 'm', 'Bären'], rabbit: ['Hase', 'm', 'Hasen'], mouse: ['Maus', 'f'], owl: ['Eule', 'f'], penguin: ['Pinguin', 'm'],
  monkey: ['Affe', 'm', 'Affen'], snail: ['Schnecke', 'f'], turtle: ['Schildkröte', 'f'], squirrel: ['Eichhörnchen', 'n'],
  flamingo: ['Flamingo', 'm'], whale: ['Wal', 'm'], parrot: ['Papagei', 'm'],
  chick: ['Küken', 'n'], kitten: ['Kätzchen', 'n'], puppy: ['Welpe', 'm', 'Welpen'], lamb: ['Lamm', 'n'], calf: ['Kalb', 'n'],
  duckling: ['Entenküken', 'n'],
  strawberry: ['Erdbeere', 'f'], banana: ['Banane', 'f'], lemon: ['Zitrone', 'f'], orange: ['Orange', 'f'], apple: ['Apfel', 'm'],
  pear: ['Birne', 'f'], grapes: ['Weintrauben', 'pl'], carrot: ['Karotte', 'f'], cheese: ['Käse', 'm'], bone: ['Knochen', 'm'],
  honey: ['Honig', 'm'], leaf: ['Blatt', 'n'], acorn: ['Eichel', 'f'], milk: ['Milch', 'f'], watermelon: ['Wassermelone', 'f'],
  blueberries: ['Blaubeeren', 'pl'], corn: ['Mais', 'm'], bread: ['Brot', 'n'], egg: ['Ei', 'n'], worm: ['Wurm', 'm'],
  doghouse: ['Hundehütte', 'f'], beehive: ['Bienenstock', 'm'], nest: ['Nest', 'n'], pond: ['Teich', 'm'], barn: ['Scheune', 'f'],
  iceberg: ['Eisscholle', 'f'], tree: ['Baum', 'm'], sea: ['Meer', 'n'], hutch: ['Hasenstall', 'm'], kennel_bowl: ['Napf', 'm'],
  ball: ['Ball', 'm'], sun: ['Sonne', 'f'], moon: ['Mond', 'm'], star: ['Stern', 'm'], cloud: ['Wolke', 'f'],
  umbrella: ['Regenschirm', 'm'], raindrop: ['Regentropfen', 'm'], snowflake: ['Schneeflocke', 'f'], snowman: ['Schneemann', 'm'],
  scarf: ['Schal', 'm'], sunglasses: ['Sonnenbrille', 'f'], boot: ['Gummistiefel', 'm'], hat: ['Mütze', 'f'],
  mitten: ['Handschuh', 'm'], cup: ['Becher', 'm'], spoon: ['Löffel', 'm'], toothbrush: ['Zahnbürste', 'f'], soap: ['Seife', 'f'],
  bed: ['Bett', 'n'], pillow: ['Kissen', 'n'], car: ['Auto', 'n'], boat: ['Boot', 'n'], airplane: ['Flugzeug', 'n'],
  train: ['Zug', 'm'], bicycle: ['Fahrrad', 'n'], flower: ['Blume', 'f'], house: ['Haus', 'n'], key: ['Schlüssel', 'm'],
  drum: ['Trommel', 'f'], balloon: ['Luftballon', 'm'], book: ['Buch', 'n'], crayon: ['Buntstift', 'm'], sock: ['Socke', 'f'],
  shoe: ['Schuh', 'm'], teddy: ['Teddy', 'm'], clock: ['Uhr', 'f'], lamp: ['Lampe', 'f'], tomato: ['Tomate', 'f'],
  pumpkin: ['Kürbis', 'm'], heart_toy: ['Herz', 'n'],
  gift: ['Geschenk', 'n'], block: ['Bauklotz', 'm'], party_hat: ['Partyhut', 'm'], crow: ['Krähe', 'f'], hay: ['Heu', 'n'],
  bird: ['Vogel', 'm'], kite: ['Drachen', 'm'], rainbow: ['Regenbogen', 'm'], sandwich: ['Sandwich', 'n'], cake: ['Torte', 'f'],
  bucket: ['Eimer', 'm'], shovel: ['Schaufel', 'f'], mushroom: ['Pilz', 'm'], cherry: ['Kirsche', 'f'], plum: ['Pflaume', 'f'],
  peas: ['Erbsen', 'pl'], fox: ['Fuchs', 'm'], hedgehog: ['Igel', 'm'], octopus: ['Oktopus', 'm'], dinosaur: ['Dino', 'm'],
};
const ART = {
  nom: { m: 'der', f: 'die', n: 'das', pl: 'die' },
  acc: { m: 'den', f: 'die', n: 'das', pl: 'die' },
  dat: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
} as const;
const nom = (i: ItemId) => `${ART.nom[ITEMS[i][1]]} ${ITEMS[i][0]}`;
const acc = (i: ItemId) => `${ART.acc[ITEMS[i][1]]} ${ITEMS[i][2] ?? ITEMS[i][0]}`;
/** "zum Löffel", "zur Socke", "zu den Erbsen" */
const zu = (i: ItemId) => {
  const [n, g, obl] = ITEMS[i];
  return g === 'm' || g === 'n' ? `zum ${obl ?? n}` : g === 'f' ? `zur ${n}` : `zu den ${n}`;
};
const GLEICHE: Record<G, string> = { m: 'der gleiche', f: 'die gleiche', n: 'das gleiche', pl: 'die gleichen' };

const COLOR: Record<ColorId, string> = {
  red: 'rot', yellow: 'gelb', blue: 'blau', green: 'grün', orange: 'orange', purple: 'lila', pink: 'rosa',
  brown: 'braun', white: 'weiß', black: 'schwarz', grey: 'grau',
};
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** [nominative "ein Kreis", accusative "einen Kreis"] */
const SHAPE: Record<ShapeId, [string, string]> = {
  circle: ['ein Kreis', 'einen Kreis'], square: ['ein Quadrat', 'ein Quadrat'], triangle: ['ein Dreieck', 'ein Dreieck'],
  star: ['ein Stern', 'einen Stern'], heart: ['ein Herz', 'ein Herz'], oval: ['ein Oval', 'ein Oval'],
  rectangle: ['ein Rechteck', 'ein Rechteck'], crescent: ['ein Halbmond', 'einen Halbmond'],
};

const SUITS = 'Wem passt das?';
const GIVE = 'Wem gibst du das?';

const HINTS: HintPack = {
  isColor: (c) => `Was ist ${COLOR[c]}?`,
  looksLike: (s) => `Was sieht aus wie ${SHAPE[s][0]}?`,
  texture: {
    stripes_bw: 'Wer hat schwarz-weiße Streifen?',
    stripes_orange: 'Wer hat solche Streifen?',
    spots_red_black: 'Wer hat solche Punkte?',
    spots_giraffe: 'Wer hat solche Flecken?',
    wool: 'Wer hat weiche Wolle?',
    feathers: 'Wer hat Federn?',
    scales: 'Wer hat Schuppen?',
    honeycomb: 'Wo sind die Honigwaben?',
    wood: 'Was ist aus Holz?',
    waves: 'Wo sind die Wellen?',
    bricks: 'Was ist aus Ziegelsteinen?',
    ice: 'Was ist aus Eis?',
    fur_brown: 'Wer hat braunes Fell?',
    polka: 'Wem gefallen Punkte?',
    checks: 'Wer mag Karos?',
    grass: 'Wer mag Gras?',
  },
  shadow: ['Wessen Schatten ist das?', 'Wer versteckt sich im Schatten?', 'Zu wem passt dieser Schatten?'],
  weather: {
    sun: 'Die Sonne scheint! Was brauchen wir?',
    raindrop: 'Es regnet! Was brauchen wir?',
    cloud: 'Eine Wolke! Gleich regnet es. Was brauchen wir?',
    snowflake: 'Es schneit! Was brauchen wir?',
  },
  same: (i) => (ITEMS[i][1] === 'pl' ? `Wo sind die gleichen ${ITEMS[i][0]}?` : `Wo ist ${GLEICHE[ITEMS[i][1]]} ${ITEMS[i][0]}?`),
  food: (i) => `Wer mag ${acc(i)}?`,
  home: (i) => `Wo ${ITEMS[i][1] === 'pl' ? 'wohnen' : 'wohnt'} ${nom(i)}?`,
  baby: {
    chick: 'Wo ist die Mama vom Küken?',
    kitten: 'Wo ist die Mama vom Kätzchen?',
    puppy: 'Wo ist die Mama vom Welpen?',
    lamb: 'Wo ist die Mama vom Lamm?',
    calf: 'Wo ist die Mama vom Kalb?',
    duckling: 'Wo ist die Mama vom Entenküken?',
  },
  pair: (i) => `Was passt ${zu(i)}?`,
  likesColor: (c) => `Wer mag ${cap(COLOR[c])}?`,
  suitsColor: (c) => `Wem steht ${cap(COLOR[c])}?`,
  freeTexture: {
    stripes_bw: 'Wer hätte gern Streifen?',
    bricks: 'Wer baut ein Haus aus Ziegeln?',
    waves: 'Wer will schwimmen gehen?',
    honeycomb: 'Wem gefällt dieses Muster?',
    wool: 'Wer bekommt einen Wollpulli?',
  },
  getsShape: (s) => `Wer bekommt ${SHAPE[s][1]}?`,
  eat: (i) => `Was ${ITEMS[i][1] === 'pl' ? 'mögen' : 'mag'} ${nom(i)} essen?`,
  live: ['Wer würde hier wohnen?', 'Wessen Zuhause wird das?', 'Wer zieht hier ein?'],
  wear: ['Wer zieht das an?', SUITS, 'Wer verkleidet sich damit?'],
  play: ['Wer spielt damit?', GIVE, 'Wer will spielen?'],
  suits: SUITS,
  wants: (i) => `Wer möchte ${acc(i)}?`,
  give: GIVE,
};

const de: Locale = {
  name: 'Deutsch',
  strings: {
    play: 'Spielen',
    map: 'Weltkarte',
    parents: 'Für Eltern',
    start: 'Start',
    back: 'Zurück',
    exit: 'Beenden',
    next: 'Nächstes Level',
    bravo: 'Super!',
    gateTitle: 'Für Erwachsene',
    gateHold: 'Frag einen Erwachsenen. Halte die Taste 3 Sekunden lang gedrückt.',
    gateHoldButton: 'Halten',
    gateQuestion: (a: string, b: string) => `Wie viel ist ${a} mal ${b}?`,
    music: 'Musik',
    sounds: 'Töne und Vibration',
    hints: 'Hinweise anzeigen',
    hintsDetail: 'Ein kurzer Satz über dem Spielfeld, z. B. „Was ist rot?“',
    unlockAll: 'Alle Level freischalten',
    unlockAllDetail: 'Für ältere Kinder: öffnet sofort alle Welten.',
    reset: 'Fortschritt zurücksetzen',
    resetTitle: 'Fortschritt zurücksetzen?',
    resetBody: 'Sterne und freigeschaltete Level werden gelöscht.',
    cancel: 'Abbrechen',
    resetConfirm: 'Zurücksetzen',
    aboutTitle: 'Über das Spiel',
    about:
      'Pasujki ist ein ruhiges Zuordnungsspiel für Kinder von 2 bis 5 Jahren. Das Kind zieht das Bild aus der Mitte in die passende Ecke (oder tippt einfach auf die Ecke). Es gibt keine Zeitbegrenzung, keine Minuspunkte und keine Eile – ein Fehler ist einfach ein neuer Versuch. Nach dem zweiten Fehlversuch leuchtet die richtige Ecke sanft auf.',
    worldsTitle: 'Welten und Alter',
    worlds:
      'Gleich und gleich (ab 2 Jahren) → Farben → Formen → Schatten → Muster (3+) → Wer zu wem? (Futter, Zuhause, Mamas) → Wetter und Paare (4–5 Jahre). Die nächste Welt öffnet sich, sobald die Hälfte der vorherigen geschafft ist. „Fantasie“ ist immer offen: Dort gibt es keine falschen Antworten – jede Wahl ist richtig und eine Einladung zum Gespräch („Warum mag die Kuh Blau?“).',
    soundTitle: 'Ton',
    soundNote:
      'Das Spiel beachtet den Stummschalter des iPhones: Ist das Telefon stumm, sind Musik und Töne aus. Die Musik ist leise und stoppt, wenn du die App verlässt.',
    safetyTitle: 'Sicherheit',
    safety:
      'Keine Werbung, keine Konten, keine Internetverbindungen und keine Datenerfassung – das Spiel funktioniert komplett offline. Die Einstellungen, diese Seite und die zwei Links unten (Bewertung im Store und eine Feedback-Seite auf pastelki.club, die sich außerhalb der App öffnen) sind durch die Elternsperre geschützt.',
    version: 'Version',
    rateApp: (store: string) => `Pasujki im ${store} bewerten`,
    rateShort: (store: string) => `Im ${store} bewerten`,
    feedbackButton: 'Feedback senden',
    linksNote: 'Beides öffnet sich außerhalb der App: der Store oder eine kurze Feedback-Seite auf pastelki.club im Browser.',
    likeTitle: 'Gefällt dir Pasujki?',
    likeYes: 'Ja',
    likeNo: 'Nicht so sehr',
    notNow: 'Jetzt nicht',
    noTitle: 'Danke für deine Ehrlichkeit',
    noBody: 'Im Browser öffnet sich eine kurze Seite auf pastelki.club, auf der du uns schreiben kannst, was besser sein könnte.',
    tellUs: 'Sag uns, was besser sein könnte',
  },
  numbers: ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'],
  worlds: {
    1: 'Gleich und gleich',
    2: 'Farben',
    3: 'Formen',
    4: 'Schatten',
    5: 'Muster',
    6: 'Wer zu wem?',
    7: 'Wetter und Paare',
    8: 'Fantasie',
  },
  levels: {
    'w1-l1': 'Erste Schritte',
    'w1-l2': 'Wo ist das andere?',
    'w1-l3': 'Finde den Zwilling',
    'w1-l4': 'Drei Fenster',
    'w1-l5': 'Was haben wir hier?',
    'w1-l6': 'Rate mal!',
    'w1-l7': 'Vier Fenster',
    'w1-l8': 'Adleraugen',
    'w2-l1': 'Erste Farben',
    'w2-l2': 'Ein bunter Tag',
    'w2-l3': 'Regenbogen',
    'w2-l4': 'Neue Farben',
    'w2-l5': 'Dunkel und hell',
    'w2-l6': 'Vier Farben',
    'w2-l7': 'Alle Farben',
    'w2-l8': 'Ähnliche Farben',
    'w3-l1': 'Kreis und Stern',
    'w3-l2': 'Quadrat und Herz',
    'w3-l3': 'Dreieck und Halbmond',
    'w3-l4': 'Oval',
    'w3-l5': 'Rechteck',
    'w3-l6': 'Vier Formen',
    'w3-l7': 'Alle Formen',
    'w4-l1': 'Wessen Schatten?',
    'w4-l2': 'Versteckt im Schatten',
    'w4-l3': 'Schatten an der Wand',
    'w4-l4': 'Vier Schatten',
    'w4-l5': 'Ähnliche Schatten',
    'w4-l6': 'Schattenmeister',
    'w5-l1': 'Streifen und Punkte',
    'w5-l2': 'Fell und Federn',
    'w5-l3': 'Wer hat das?',
    'w5-l4': 'Woraus ist das?',
    'w5-l5': 'Weich und hart',
    'w5-l6': 'Vier Muster',
    'w5-l7': 'Genau hinschauen',
    'w5-l8': 'Mustermeister',
    'w6-l1': 'Mama und Baby',
    'w6-l2': 'Wer frisst was?',
    'w6-l3': 'Wo wohnt es?',
    'w6-l4': 'Zuhause und Leckerli',
    'w6-l5': 'Guten Appetit!',
    'w6-l6': 'Wer wohnt wo?',
    'w6-l7': 'Alle Mamas',
    'w6-l8': 'Waldfreunde',
    'w6-l9': 'Auf der Wiese und am Teich',
    'w6-l10': 'Aufgepasst!',
    'w6-l11': 'Ähnlich',
    'w6-l12': 'Tiermeister',
    'w7-l1': 'Wie ist das Wetter?',
    'w7-l2': 'Was brauchen wir?',
    'w7-l3': 'Was gehört zusammen?',
    'w7-l4': 'Paare',
    'w7-l5': 'Regen und Schnee',
    'w7-l6': 'Geburtstag',
    'w7-l7': 'Was gehört wohin?',
    'w7-l8': 'Achte auf die Farben',
    'w7-l9': 'Knifflige Paare',
    'w7-l10': 'Zuordnungsmeister',
    'w8-l1': 'Wer mag diese Farbe?',
    'w8-l2': 'Wessen Muster?',
    'w8-l3': 'Ein Geschenk für wen?',
    'w8-l4': 'Was isst der Dino?',
    'w8-l5': 'Wer würde hier wohnen?',
    'w8-l6': 'Deine eigene Idee',
    'w8-l7': 'Was ziehen wir an?',
    'w8-l8': 'Wessen Farbe ist das?',
    'w8-l9': 'Lass uns spielen!',
  },
  hints: HINTS,
  privacy: {
    title: 'Datenschutzerklärung — Pasujki',
    sections: [
      { body: `Zuletzt aktualisiert: ${UPDATED}` },
      {
        body: `Pasujki ist ein Zuordnungsspiel für kleine Kinder, entwickelt von ${DEVELOPER} („wir“). Diese Erklärung beschreibt, wie die App mit Informationen umgeht. Kurz gesagt: Pasujki erhebt keine personenbezogenen Daten, speichert keine auf unseren Servern und gibt keine weiter. Die App funktioniert vollständig offline.`,
      },
      {
        heading: 'Was wir erheben',
        body: 'Nichts. Pasujki hat keine Konten, keine Anmeldung, keine Werbung, keine Analyse, kein Tracking, keine Absturzberichte und keine Drittanbieter-SDKs, die Daten sammeln. Die App baut keine Internetverbindungen auf, und wir erhalten nie Informationen über dich, dein Kind oder dein Gerät.',
      },
      {
        heading: 'Was auf dem Gerät bleibt',
        body: 'Damit sich die App den Spielfortschritt (geschaffte Level und Sticker) und die Einstellungen (Musik und Töne an/aus) merkt, speichert sie eine kleine Datenmenge ausschließlich auf deinem Gerät. Wir haben keinen Zugriff darauf. Beim Löschen der App werden diese Daten gelöscht. Wenn du die Datensicherung deines Geräts nutzt (zum Beispiel iCloud oder Google-Backup), wird diese Kopie von Apple oder Google in deinem Konto und nach deren Datenschutzrichtlinien verwaltet.',
      },
      {
        heading: 'Berechtigungen',
        body: 'Pasujki fragt nicht nach Zugriff auf Kamera, Mikrofon, Fotos, Kontakte oder Standort und sendet keine Mitteilungen.',
      },
      {
        heading: 'Links für Erwachsene',
        body: 'Im Bereich für Erwachsene, hinter der Elternsperre, gibt es zwei Links, die sich außerhalb der App öffnen: einen zum Bewerten von Pasujki im App Store oder bei Google Play und einen zu einer Feedback-Seite auf pastelki.club (unserer Website), die sich in deinem Browser öffnet. Der Link teilt dieser Seite App-Version, Build-Nummer, Plattform, Sprache und – falls beantwortet – mit, ob dir Pasujki gefällt, damit wir wissen, um welche Version es geht. Die App selbst sendet nichts; was du auf dieser Seite schreibst, unterliegt der Datenschutzerklärung von pastelki.club, Bewertungen den Richtlinien von Apple bzw. Google. Einmal, bei einem späteren Besuch im Bereich für Erwachsene, fragt die App vielleicht „Gefällt dir Pasujki?“; die Antwort bleibt auf dem Gerät, außer du öffnest danach die Feedback-Seite. Damit die Frage nur einmal kommt, zählt die App auf dem Gerät, wie oft der Bereich für Erwachsene geöffnet wurde.',
      },
      {
        heading: 'Kinder',
        body: 'Pasujki ist für Kinder von 2 bis 5 Jahren gedacht. Da die App keine personenbezogenen Daten erhebt, braucht sie keine Angaben über Kind oder Eltern und fragt auch nicht danach. Die Einstellungen, diese Erklärung und alles, was aus dem Spiel hinausführt, sind durch eine Elternsperre geschützt. Wir erfüllen die Anforderungen des US-amerikanischen Children’s Online Privacy Protection Act (COPPA), der DSGVO (einschließlich Artikel 8) und des britischen Age Appropriate Design Code.',
      },
      {
        heading: 'Dritte',
        body: 'Wir geben keine Daten weiter, weil wir keine haben. Die App wird über den App Store oder Google Play geladen. Informationen zu Download und Zahlung verwalten Apple und Google nach ihren eigenen Datenschutzrichtlinien.',
      },
      {
        heading: 'Deine Rechte und Löschung',
        body: 'Da wir keine Daten über dich speichern, gibt es bei uns nichts, was wir dir zeigen, berichtigen oder löschen könnten. Um den auf dem Gerät gespeicherten Fortschritt zu entfernen, lösche die App.',
      },
      {
        heading: 'Änderungen',
        body: 'Sollte die App jemals ändern, wie sie mit Informationen umgeht, aktualisieren wir diese Seite und das Datum oben, bevor eine solche Version erscheint.',
      },
      { heading: 'Kontakt', body: `${DEVELOPER}: Fragen und Anliegen unter ${CONTACT}.` },
    ],
  },
};
export default de;
