/**
 * Rating, the feedback link and the one-time "Do you like Pasujki?" card. Everything here is reachable
 * only from the grown-ups' area (behind the parental gate); children never see it. The app makes no
 * network requests: feedback is a link to a web form on pastelki.club opened in the system browser.
 *
 * Store rules this follows (see docs/STORE_COMPLIANCE.md §Feedback):
 * - The "Rate" button opens the store's write-review page (a link, never the rating API from a button).
 * - iOS "Yes" → StoreKit's own prompt via expo-store-review (Apple decides whether it appears).
 * - Android "Yes" → the Play Store page, not the in-app review API: Google forbids asking
 *   "Do you like the app?" before that card.
 */
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import * as StoreReview from 'expo-store-review';
import { Linking, Platform } from 'react-native';

import { LANG } from '@/i18n';
import { reviewStore } from '@/storage/store';

export const APP_STORE_ID = '6835474239';
export const ANDROID_PACKAGE = 'com.tobob.pasujki';

/** Visit on which the card first appears. */
const ASK_ON_VISIT = 3;
/** "Not now" → wait this long before asking once more (then never again). */
const SNOOZE_MS = 180 * 24 * 60 * 60 * 1000;
const MAX_ASKS = 2;

export const STORE_NAME = Platform.OS === 'ios' ? 'App Store' : 'Google Play';

const LINKS =
  Platform.OS === 'ios'
    ? [
        `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}?action=write-review`,
        `https://apps.apple.com/app/id${APP_STORE_ID}?action=write-review`,
      ]
    : [
        `market://details?id=${ANDROID_PACKAGE}&showAllReviews=true`,
        `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&showAllReviews=true`,
      ];

/** Languages of the pastelki.club site (17); anything else gets the English page. */
const SITE_LANGS = ['pl', 'en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'cs', 'sk', 'hu', 'ro', 'sv', 'tr', 'uk', 'ja', 'zh'];

/** Web feedback form on pastelki.club. `liked`: answer to "Do you like Pasujki?", null = not asked. */
export function feedbackUrl(liked: boolean | null): string {
  const lang = SITE_LANGS.includes(LANG) ? LANG : 'en';
  const params: [string, string][] = [
    ['app', 'pasujki'],
    ['version', Application.nativeApplicationVersion ?? Constants.expoConfig?.version ?? ''],
    ['build', Application.nativeBuildVersion ?? ''],
    ['platform', Platform.OS === 'ios' ? 'ios' : 'android'],
  ];
  if (liked !== null) params.push(['liked', liked ? '1' : '0']);
  params.push(['utm_source', 'pasujki'], ['utm_medium', 'app']);
  const q = params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  return `https://pastelki.club/${lang}/feedback?${q}`;
}

/** Opens the feedback form in the external browser (never an in-app web view). Never throws. */
export async function openFeedback(liked: boolean | null): Promise<void> {
  try {
    await Linking.openURL(feedbackUrl(liked));
  } catch {
    // nothing to do: the grown-up can try again
  }
}

/** Opens the store's "write a review" page (falls back to the web link). Never throws. */
export async function openWriteReview(): Promise<void> {
  for (const url of LINKS) {
    try {
      await Linking.openURL(url);
      return;
    } catch {
      // try the next link
    }
  }
}

/** "Yes, I like it": the system rating prompt on iOS, the store page otherwise. Never throws. */
export async function rateAfterYes(): Promise<void> {
  if (Platform.OS === 'ios') {
    try {
      if (await StoreReview.isAvailableAsync()) {
        await StoreReview.requestReview();
        return;
      }
    } catch {
      // fall through to the link
    }
  }
  await openWriteReview();
}

/** Counts one visit to the grown-ups' area; true when the card should be shown now. */
export function recordGrownUpsVisit(now = Date.now()): boolean {
  const s = reviewStore.get();
  const visits = s.visits + 1;
  const ask = !s.answered && visits >= ASK_ON_VISIT && s.asks < MAX_ASKS && now >= s.snoozedUntil;
  // Showing the card starts the long pause right away, so leaving without an answer counts as "Not now".
  reviewStore.set(ask ? { ...s, visits, asks: s.asks + 1, snoozedUntil: now + SNOOZE_MS } : { ...s, visits });
  return ask;
}

/** "Yes" or "Not really": never ask again. */
export function markReviewAnswered() {
  reviewStore.set({ ...reviewStore.get(), answered: true });
}

/** "Not now": leave it for a long time (and after the second ask, for good). */
export function snoozeReview(now = Date.now()) {
  reviewStore.set({ ...reviewStore.get(), snoozedUntil: now + SNOOZE_MS });
}
