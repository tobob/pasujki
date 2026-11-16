import { CONTACT, DEVELOPER } from '../../constants/contact';
import { ITEM_ATTRS } from '../../game/item-attributes';
import type { ColorId, ItemId, ShapeId } from '../../game/types';
import type { HintPack, Locale } from '../types';

const UPDATED = '16 November 2026';

const COLOR: Record<ColorId, string> = {
  red: 'red', yellow: 'yellow', blue: 'blue', green: 'green', orange: 'orange', purple: 'purple',
  pink: 'pink', brown: 'brown', white: 'white', black: 'black', grey: 'grey',
};
const SHAPE: Record<ShapeId, string> = {
  circle: 'a circle', square: 'a square', triangle: 'a triangle', star: 'a star', heart: 'a heart',
  oval: 'an oval', rectangle: 'a rectangle', crescent: 'a crescent',
};
const the = (i: ItemId) => `the ${ITEM_ATTRS[i].en}`;

const HINTS: HintPack = {
  isColor: (c) => `What is ${COLOR[c]}?`,
  looksLike: (s) => `What looks like ${SHAPE[s]}?`,
  texture: {
    stripes_bw: 'Who has black and white stripes?',
    stripes_orange: 'Who has these stripes?',
    spots_red_black: 'Who has these spots?',
    spots_giraffe: 'Who has these patches?',
    wool: 'Who has soft wool?',
    feathers: 'Who has feathers?',
    scales: 'Who has scales?',
    honeycomb: 'Where is the honeycomb?',
    wood: 'What is made of wood?',
    waves: 'Where are the waves?',
    bricks: 'What is made of bricks?',
    ice: 'What is made of ice?',
    fur_brown: 'Who has brown fur?',
    polka: 'Who would like dots?',
    checks: 'Who would like checks?',
    grass: 'Who would like grass?',
  },
  shadow: ['Whose shadow is this?', 'Who is hiding in the shadow?', 'Who does this shadow belong to?'],
  weather: {
    sun: 'The sun is shining! What do we need?',
    raindrop: "It's raining! What do we need?",
    cloud: 'A cloud! Rain is coming. What do we need?',
    snowflake: "It's snowing! What do we need?",
  },
  same: (i) => `Where is the same ${ITEM_ATTRS[i].en}?`,
  food: (i) => `Who likes ${the(i)}?`,
  home: (i) => `Where does ${the(i)} live?`,
  baby: {
    chick: "Where is the chick's mummy?",
    kitten: "Where is the kitten's mummy?",
    puppy: "Where is the puppy's mummy?",
    lamb: "Where is the lamb's mummy?",
    calf: "Where is the calf's mummy?",
    duckling: "Where is the duckling's mummy?",
  },
  pair: (i) => `What goes with ${the(i)}?`,
  likesColor: (c) => `Who likes ${COLOR[c]}?`,
  suitsColor: (c) => `Who suits ${COLOR[c]}?`,
  freeTexture: {
    stripes_bw: 'Who would like stripes?',
    bricks: 'Who will build a brick house?',
    waves: 'Who wants to go swimming?',
    honeycomb: 'Who likes this pattern?',
    wool: 'Who gets a woolly jumper?',
  },
  getsShape: (s) => `Who gets ${SHAPE[s]}?`,
  eat: (i) => `What would ${the(i)} eat?`,
  live: ['Who would live here?', 'Whose home will this be?', 'Who will move in here?'],
  wear: ['Who will wear this?', 'Who does this suit?', 'Who will dress up in this?'],
  play: ['Who will play with this?', 'Who will you give it to?', 'Who wants to play?'],
  suits: 'Who does this suit?',
  wants: (i) => `Who wants ${the(i)}?`,
  give: 'Who will you give it to?',
};

/** English. Hint lines: hint_en on each Round (the pack below mirrors levels.ts hintFor()). */
const en: Locale = {
  name: 'English',
  strings: {
    play: 'Play',
    map: 'World map',
    parents: 'For parents',
    start: 'Home',
    back: 'Back',
    exit: 'Leave',
    next: 'Next level',
    bravo: 'Well done!',
    gateTitle: 'For grown-ups',
    gateHold: 'Ask a grown-up. Press and hold the button for 3 seconds.',
    gateHoldButton: 'Hold',
    gateQuestion: (a: string, b: string) => `What is ${a} times ${b}?`,
    music: 'Music',
    sounds: 'Sounds and vibration',
    hints: 'Show hints',
    hintsDetail: 'A short line above the board, e.g. "What is red?"',
    unlockAll: 'Unlock all levels',
    unlockAllDetail: 'For older children: opens every world straight away.',
    reset: 'Reset progress',
    resetTitle: 'Reset progress?',
    resetBody: 'Stars and unlocked levels will be removed.',
    cancel: 'Cancel',
    resetConfirm: 'Reset',
    aboutTitle: 'About the game',
    about:
      'Pasujki is a calm matching game for children aged 2–5. The child drags the picture from the middle to the matching corner (or simply taps the corner). There is no timer, no penalty and no rush — a mistake is just another try. After a second miss the right corner glows softly.',
    worldsTitle: 'Worlds and ages',
    worlds:
      'The same (from age 2) → Colours → Shapes → Shadows → Patterns (3+) → Who goes with whom? (food, homes, mummies) → Weather and pairs (4–5). The next world opens once half of the previous one is done. "Make-believe" is always open: there are no wrong answers there — every choice is right and an invitation to talk ("Why does the cow like blue?").',
    soundTitle: 'Sound',
    soundNote:
      "The game respects the iPhone's silent switch: when the phone is muted, music and sounds are off. Music is quiet and stops when you leave the app.",
    safetyTitle: 'Safety',
    safety:
      'No ads, no purchases, no accounts, no internet and no data collection. The game works completely offline. Settings and this page are behind the parental gate.',
    version: 'Version',
  },
  numbers: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  hints: HINTS,
  privacy: {
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
      { heading: 'Contact', body: `${DEVELOPER}: questions and requests at ${CONTACT}.` },
    ],
  },
};
export default en;
