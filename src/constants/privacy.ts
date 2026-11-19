/**
 * Full privacy policy, shown in-app behind the parental gate (no network; the policy itself has no links).
 * Source: docs/STORE_COMPLIANCE.md §2.4. The same text is published at PRIVACY_URL (store listing).
 * The texts live with the other translations in src/i18n/locales/<lang>.ts (field `privacy`).
 */
import de from '../i18n/locales/de';
import en from '../i18n/locales/en';
import es from '../i18n/locales/es';
import fr from '../i18n/locales/fr';
import it from '../i18n/locales/it';
import nl from '../i18n/locales/nl';
import pl from '../i18n/locales/pl';
import pt from '../i18n/locales/pt';
import type { Lang, Policy } from '../i18n/types';

export { CONTACT, DEVELOPER, PRIVACY_URL } from './contact';
export type { Policy, Section } from '../i18n/types';

export const PRIVACY_PL: Policy = pl.privacy;
export const PRIVACY_EN: Policy = en.privacy;
/** Every language, in site order. */
export const PRIVACY_BY_LANG: Record<Lang, Policy> = {
  en: en.privacy,
  pl: pl.privacy,
  de: de.privacy,
  fr: fr.privacy,
  it: it.privacy,
  es: es.privacy,
  pt: pt.privacy,
  nl: nl.privacy,
};
