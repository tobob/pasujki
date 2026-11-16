/**
 * Site-only texts (not shipped in the app): navigation labels, the "about" block and the Terms of Use.
 * `{eula}` in a terms body becomes a link to Apple's Standard EULA; the contact address is linkified by gen-site.
 */
import type { Lang, Policy } from '../../src/i18n/types';
import { CONTACT, DEVELOPER } from '../../src/constants/contact';

export const EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export type SiteText = {
  /** <html lang> / hreflang code. */
  code: string;
  nav: { support: string; privacy: string; terms: string };
  /** Label of the language switcher. */
  language: string;
  /** Short line under the app name on the support page. */
  tagline: string;
  /** Bullet facts on the support page. */
  facts: string[];
  /** Footer line after "© year developer". */
  footer: string;
  terms: Policy;
};

const C = CONTACT;
const D = DEVELOPER;

export const SITE: Record<Lang, SiteText> = {
  en: {
    code: 'en',
    nav: { support: 'Support', privacy: 'Privacy', terms: 'Terms' },
    language: 'Language',
    tagline: 'A calm matching game for children aged 2–5',
    facts: ['No ads', 'No in-app purchases', 'No accounts', 'Works offline', 'No data collected'],
    footer: 'Made with care for small children.',
    terms: {
      title: 'Terms of Use',
      sections: [
        { body: 'Last updated: 16 November 2026' },
        { heading: 'Who we are', body: `Pasujki is made by ${D}, an independent developer. Contact: ${C}` },
        { heading: 'Licence', body: "Pasujki is free. Your use of the app is governed by {eula} for apps downloaded from the App Store, and by the Google Play Terms of Service for apps downloaded from Google Play. These terms only add a few points specific to Pasujki." },
        { heading: 'For children, with a grown-up', body: 'The app is designed for children aged 2–5, ideally with a parent or carer nearby. Settings and information for adults are behind a parental gate.' },
        { heading: 'What the app does not do', body: 'Pasujki shows no ads, sells nothing, needs no account, does not connect to the internet and collects no data. Details are in the Privacy Policy.' },
        { heading: 'Content', body: `All illustrations, music and sounds in Pasujki were created for the app and belong to ${D}. Please do not copy or redistribute them.` },
        { heading: 'No guarantees', body: 'We do our best to keep the app working well, but it is provided "as is", without guarantees beyond those required by law. Nothing here limits your statutory rights as a consumer.' },
        { heading: 'Changes', body: 'If these terms change, we will update this page and the date above.' },
      ],
    },
  },
  pl: {
    code: 'pl',
    nav: { support: 'Pomoc', privacy: 'Prywatność', terms: 'Warunki' },
    language: 'Język',
    tagline: 'Spokojna gra w dopasowywanie dla dzieci w wieku 2–5 lat',
    facts: ['Bez reklam', 'Bez zakupów w aplikacji', 'Bez kont', 'Działa offline', 'Nie zbiera danych'],
    footer: 'Zrobione z myślą o najmłodszych.',
    terms: {
      title: 'Warunki korzystania',
      sections: [
        { body: 'Ostatnia aktualizacja: 16 listopada 2026' },
        { heading: 'Kim jesteśmy', body: `Pasujki tworzy ${D}, niezależny twórca. Kontakt: ${C}` },
        { heading: 'Licencja', body: 'Pasujki są darmowe. Korzystanie z aplikacji pobranej z App Store reguluje {eula}, a z aplikacji pobranej z Google Play – Warunki korzystania z usługi Google Play. Te warunki dodają tylko kilka punktów dotyczących samych Pasujek.' },
        { heading: 'Dla dzieci, przy dorosłym', body: 'Aplikacja jest przeznaczona dla dzieci w wieku 2–5 lat, najlepiej gdy rodzic lub opiekun jest w pobliżu. Ustawienia i informacje dla dorosłych są za bramką rodzicielską.' },
        { heading: 'Czego aplikacja nie robi', body: 'Pasujki nie wyświetlają reklam, niczego nie sprzedają, nie wymagają konta, nie łączą się z internetem i nie zbierają danych. Szczegóły są w Polityce prywatności.' },
        { heading: 'Treści', body: `Wszystkie ilustracje, muzyka i dźwięki w Pasujkach powstały dla aplikacji i należą do ${D}. Prosimy ich nie kopiować ani nie rozpowszechniać.` },
        { heading: 'Bez gwarancji', body: 'Dbamy o to, by aplikacja działała dobrze, ale jest udostępniana „taka, jaka jest”, bez gwarancji wykraczających poza wymagane prawem. Nic tutaj nie ogranicza Twoich ustawowych praw jako konsumenta.' },
        { heading: 'Zmiany', body: 'Jeśli te warunki się zmienią, zaktualizujemy tę stronę i datę powyżej.' },
      ],
    },
  },
  de: {
    code: 'de',
    nav: { support: 'Hilfe', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen' },
    language: 'Sprache',
    tagline: 'Ein ruhiges Zuordnungsspiel für Kinder von 2 bis 5 Jahren',
    facts: ['Keine Werbung', 'Keine In-App-Käufe', 'Kein Konto', 'Funktioniert offline', 'Keine Datenerfassung'],
    footer: 'Mit Sorgfalt für kleine Kinder gemacht.',
    terms: {
      title: 'Nutzungsbedingungen',
      sections: [
        { body: 'Zuletzt aktualisiert: 16. November 2026' },
        { heading: 'Wer wir sind', body: `Pasujki wird von ${D} entwickelt, einem unabhängigen Entwickler. Kontakt: ${C}` },
        { heading: 'Lizenz', body: 'Pasujki ist kostenlos. Für die Nutzung der aus dem App Store geladenen App gilt {eula}, für die aus Google Play geladene App die Nutzungsbedingungen von Google Play. Diese Bedingungen ergänzen nur einige Punkte speziell zu Pasujki.' },
        { heading: 'Für Kinder, mit einem Erwachsenen', body: 'Die App ist für Kinder von 2 bis 5 Jahren gedacht, am besten mit einem Elternteil oder einer Betreuungsperson in der Nähe. Einstellungen und Informationen für Erwachsene liegen hinter einer Elternsperre.' },
        { heading: 'Was die App nicht tut', body: 'Pasujki zeigt keine Werbung, verkauft nichts, braucht kein Konto, verbindet sich nicht mit dem Internet und erhebt keine Daten. Details stehen in der Datenschutzerklärung.' },
        { heading: 'Inhalte', body: `Alle Illustrationen, Musik und Geräusche in Pasujki wurden für die App erstellt und gehören ${D}. Bitte nicht kopieren oder weiterverbreiten.` },
        { heading: 'Keine Gewähr', body: 'Wir geben uns Mühe, dass die App gut funktioniert, sie wird jedoch „wie besehen“ bereitgestellt, ohne Gewährleistung über das gesetzlich Vorgeschriebene hinaus. Ihre gesetzlichen Verbraucherrechte bleiben unberührt.' },
        { heading: 'Änderungen', body: 'Wenn sich diese Bedingungen ändern, aktualisieren wir diese Seite und das Datum oben.' },
      ],
    },
  },
  fr: {
    code: 'fr',
    nav: { support: 'Aide', privacy: 'Confidentialité', terms: "Conditions d'utilisation" },
    language: 'Langue',
    tagline: "Un jeu d'association tout en douceur pour les enfants de 2 à 5 ans",
    facts: ['Sans publicité', 'Sans achats intégrés', 'Sans compte', 'Fonctionne hors ligne', 'Aucune donnée collectée'],
    footer: 'Fait avec soin pour les tout-petits.',
    terms: {
      title: "Conditions d'utilisation",
      sections: [
        { body: 'Dernière mise à jour : 16 novembre 2026' },
        { heading: 'Qui sommes-nous', body: `Pasujki est créé par ${D}, un développeur indépendant. Contact : ${C}` },
        { heading: 'Licence', body: "Pasujki est gratuit. L'utilisation de l'app téléchargée sur l'App Store est régie par {eula}, et celle de l'app téléchargée sur Google Play par les Conditions d'utilisation de Google Play. Ces conditions n'ajoutent que quelques points propres à Pasujki." },
        { heading: 'Pour les enfants, avec un adulte', body: "L'app est conçue pour les enfants de 2 à 5 ans, idéalement avec un parent ou un adulte à proximité. Les réglages et les informations pour les adultes sont protégés par un contrôle parental." },
        { heading: "Ce que l'app ne fait pas", body: "Pasujki n'affiche aucune publicité, ne vend rien, ne demande aucun compte, ne se connecte pas à internet et ne collecte aucune donnée. Les détails figurent dans la politique de confidentialité." },
        { heading: 'Contenus', body: `Toutes les illustrations, musiques et sons de Pasujki ont été créés pour l'app et appartiennent à ${D}. Merci de ne pas les copier ni les diffuser.` },
        { heading: 'Absence de garantie', body: "Nous faisons de notre mieux pour que l'app fonctionne bien, mais elle est fournie « en l'état », sans garantie au-delà de ce que la loi impose. Rien ici ne limite vos droits légaux de consommateur." },
        { heading: 'Modifications', body: 'Si ces conditions changent, nous mettrons à jour cette page et la date ci-dessus.' },
      ],
    },
  },
  it: {
    code: 'it',
    nav: { support: 'Assistenza', privacy: 'Privacy', terms: "Condizioni d'uso" },
    language: 'Lingua',
    tagline: 'Un gioco di abbinamenti tranquillo per bambini dai 2 ai 5 anni',
    facts: ['Niente pubblicità', 'Niente acquisti in-app', 'Nessun account', 'Funziona offline', 'Nessun dato raccolto'],
    footer: 'Fatto con cura per i più piccoli.',
    terms: {
      title: "Condizioni d'uso",
      sections: [
        { body: 'Ultimo aggiornamento: 16 novembre 2026' },
        { heading: 'Chi siamo', body: `Pasujki è creato da ${D}, uno sviluppatore indipendente. Contatto: ${C}` },
        { heading: 'Licenza', body: "Pasujki è gratuito. L'uso dell'app scaricata dall'App Store è regolato da {eula}, quello dell'app scaricata da Google Play dai Termini di servizio di Google Play. Queste condizioni aggiungono solo alcuni punti specifici di Pasujki." },
        { heading: 'Per bambini, con un adulto', body: "L'app è pensata per bambini dai 2 ai 5 anni, meglio se con un genitore o un adulto vicino. Le impostazioni e le informazioni per gli adulti sono protette da un controllo parentale." },
        { heading: "Cosa non fa l'app", body: "Pasujki non mostra pubblicità, non vende nulla, non richiede account, non si collega a internet e non raccoglie dati. I dettagli sono nell'informativa sulla privacy." },
        { heading: 'Contenuti', body: `Tutte le illustrazioni, la musica e i suoni di Pasujki sono stati creati per l'app e appartengono a ${D}. Per favore non copiarli né distribuirli.` },
        { heading: 'Nessuna garanzia', body: "Facciamo del nostro meglio perché l'app funzioni bene, ma è fornita «così com'è», senza garanzie oltre quelle previste dalla legge. Nulla qui limita i tuoi diritti di consumatore previsti dalla legge." },
        { heading: 'Modifiche', body: 'Se queste condizioni cambiano, aggiorneremo questa pagina e la data qui sopra.' },
      ],
    },
  },
  es: {
    code: 'es',
    nav: { support: 'Ayuda', privacy: 'Privacidad', terms: 'Condiciones de uso' },
    language: 'Idioma',
    tagline: 'Un juego tranquilo de emparejar para niños de 2 a 5 años',
    facts: ['Sin anuncios', 'Sin compras dentro de la app', 'Sin cuentas', 'Funciona sin conexión', 'No recopila datos'],
    footer: 'Hecho con cariño para los más pequeños.',
    terms: {
      title: 'Condiciones de uso',
      sections: [
        { body: 'Última actualización: 16 de noviembre de 2026' },
        { heading: 'Quiénes somos', body: `Pasujki lo crea ${D}, un desarrollador independiente. Contacto: ${C}` },
        { heading: 'Licencia', body: 'Pasujki es gratis. El uso de la app descargada del App Store se rige por {eula}, y el de la app descargada de Google Play por las Condiciones de servicio de Google Play. Estas condiciones solo añaden algunos puntos propios de Pasujki.' },
        { heading: 'Para niños, con un adulto', body: 'La app está pensada para niños de 2 a 5 años, mejor con una madre, un padre o un adulto cerca. Los ajustes y la información para adultos están detrás de un control parental.' },
        { heading: 'Lo que la app no hace', body: 'Pasujki no muestra anuncios, no vende nada, no necesita cuenta, no se conecta a internet y no recopila datos. Los detalles están en la política de privacidad.' },
        { heading: 'Contenidos', body: `Todas las ilustraciones, la música y los sonidos de Pasujki se crearon para la app y pertenecen a ${D}. Por favor, no los copies ni los distribuyas.` },
        { heading: 'Sin garantías', body: 'Hacemos lo posible para que la app funcione bien, pero se ofrece «tal cual», sin garantías más allá de las que exige la ley. Nada de esto limita tus derechos legales como consumidor.' },
        { heading: 'Cambios', body: 'Si estas condiciones cambian, actualizaremos esta página y la fecha de arriba.' },
      ],
    },
  },
  pt: {
    code: 'pt',
    nav: { support: 'Ajuda', privacy: 'Privacidade', terms: 'Termos de uso' },
    language: 'Idioma',
    tagline: 'Um jogo tranquilo de associação para crianças de 2 a 5 anos',
    facts: ['Sem anúncios', 'Sem compras no app', 'Sem contas', 'Funciona offline', 'Não coleta dados'],
    footer: 'Feito com carinho para os pequenos.',
    terms: {
      title: 'Termos de uso',
      sections: [
        { body: 'Última atualização: 16 de novembro de 2026' },
        { heading: 'Quem somos', body: `O Pasujki é criado por ${D}, um desenvolvedor independente. Contato: ${C}` },
        { heading: 'Licença', body: 'O Pasujki é gratuito. O uso do app baixado da App Store é regido pelo {eula}, e o do app baixado do Google Play pelos Termos de Serviço do Google Play. Estes termos apenas acrescentam alguns pontos específicos do Pasujki.' },
        { heading: 'Para crianças, com um adulto', body: 'O app foi pensado para crianças de 2 a 5 anos, de preferência com um pai, mãe ou responsável por perto. Os ajustes e as informações para adultos ficam atrás de um controle parental.' },
        { heading: 'O que o app não faz', body: 'O Pasujki não mostra anúncios, não vende nada, não precisa de conta, não se conecta à internet e não coleta dados. Os detalhes estão na política de privacidade.' },
        { heading: 'Conteúdo', body: `Todas as ilustrações, músicas e sons do Pasujki foram criados para o app e pertencem a ${D}. Por favor, não copie nem distribua.` },
        { heading: 'Sem garantias', body: 'Fazemos o possível para que o app funcione bem, mas ele é fornecido "como está", sem garantias além das exigidas por lei. Nada aqui limita seus direitos legais de consumidor.' },
        { heading: 'Alterações', body: 'Se estes termos mudarem, atualizaremos esta página e a data acima.' },
      ],
    },
  },
  nl: {
    code: 'nl',
    nav: { support: 'Hulp', privacy: 'Privacy', terms: 'Gebruiksvoorwaarden' },
    language: 'Taal',
    tagline: 'Een rustig matchspel voor kinderen van 2 tot 5 jaar',
    facts: ['Geen reclame', 'Geen in-app-aankopen', 'Geen account', 'Werkt offline', 'Verzamelt geen gegevens'],
    footer: 'Met zorg gemaakt voor kleine kinderen.',
    terms: {
      title: 'Gebruiksvoorwaarden',
      sections: [
        { body: 'Laatst bijgewerkt: 16 november 2026' },
        { heading: 'Wie we zijn', body: `Pasujki wordt gemaakt door ${D}, een onafhankelijke ontwikkelaar. Contact: ${C}` },
        { heading: 'Licentie', body: 'Pasujki is gratis. Voor het gebruik van de app uit de App Store geldt {eula}, voor de app uit Google Play de Servicevoorwaarden van Google Play. Deze voorwaarden voegen alleen een paar punten toe die specifiek over Pasujki gaan.' },
        { heading: 'Voor kinderen, met een volwassene', body: 'De app is bedoeld voor kinderen van 2 tot 5 jaar, het liefst met een ouder of verzorger in de buurt. Instellingen en informatie voor volwassenen zitten achter een ouderslot.' },
        { heading: 'Wat de app niet doet', body: 'Pasujki toont geen reclame, verkoopt niets, heeft geen account nodig, maakt geen verbinding met internet en verzamelt geen gegevens. Details staan in het privacybeleid.' },
        { heading: 'Inhoud', body: `Alle illustraties, muziek en geluiden in Pasujki zijn voor de app gemaakt en zijn eigendom van ${D}. Kopieer of verspreid ze alsjeblieft niet.` },
        { heading: 'Geen garantie', body: 'We doen ons best om de app goed te laten werken, maar hij wordt geleverd "zoals hij is", zonder garanties buiten wat de wet vereist. Niets hier beperkt je wettelijke rechten als consument.' },
        { heading: 'Wijzigingen', body: 'Als deze voorwaarden veranderen, werken we deze pagina en de datum hierboven bij.' },
      ],
    },
  },
};

/** How the {eula} placeholder reads in each language. */
export const EULA_NAME: Record<Lang, string> = {
  en: "Apple's Standard Licensed Application End User License Agreement (EULA)",
  pl: 'standardowa umowa licencyjna Apple dla użytkownika końcowego (EULA)',
  de: 'der Standard-Endbenutzer-Lizenzvertrag (EULA) von Apple',
  fr: "le contrat de licence standard d'Apple pour l'utilisateur final (EULA)",
  it: "il contratto di licenza standard di Apple per l'utente finale (EULA)",
  es: 'el contrato de licencia estándar de Apple para el usuario final (EULA)',
  pt: 'Contrato de Licença de Usuário Final padrão da Apple (EULA)',
  nl: 'de standaard licentieovereenkomst voor eindgebruikers (EULA) van Apple',
};
