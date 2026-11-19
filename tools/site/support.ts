/** Support-page texts per language (site only, not shipped in the app). Setting names come from the app's UI strings. */
import type { Lang, UiStrings } from '../../src/i18n/types';

export type Support = {
  title: string;
  intro: string;
  askTitle: string;
  /** `{link}` is replaced with the issues link. */
  ask: string;
  faqTitle: string;
  faq: (s: UiStrings) => [q: string, a: string][];
  privacy: string;
};

export const SUPPORT: Record<Lang, Support> = {
  en: {
    title: 'Support',
    intro: 'Pasujki is a calm matching game for children aged 2–5. It works completely offline, with no ads, no accounts and no data collection.',
    askTitle: 'Questions or problems?',
    ask: 'Open an issue at {link} (GitHub account needed). We answer within a few days.',
    faqTitle: 'Frequently asked',
    faq: (s) => [
      ['There is no sound.', "The game follows the iPhone silent switch. Turn the switch off silent and raise the volume. Music and sounds can also be switched on or off in the parents' area."],
      ["How do I open the parents' area?", 'Tap the small people icon in the top-right corner of the home screen, hold the button for 3 seconds, then answer the multiplication question.'],
      ['My child is older. Can we skip the easy levels?', `Yes: in the parents' area turn on "${s.unlockAll}".`],
      ['How do I reset progress?', `Parents' area → "${s.reset}", or delete the app.`],
    ],
    privacy: 'Privacy Policy',
  },
  pl: {
    title: 'Pomoc',
    intro: 'Pasujki to spokojna gra w dopasowywanie dla dzieci w wieku 2–5 lat. Działa całkowicie offline, bez reklam, kont i zbierania danych.',
    askTitle: 'Pytania lub problemy?',
    ask: 'Zgłoś je na {link} (wymaga konta GitHub). Odpowiadamy w ciągu kilku dni.',
    faqTitle: 'Częste pytania',
    faq: (s) => [
      ['Nie ma dźwięku.', 'Gra respektuje przełącznik wyciszenia w iPhonie. Wyłącz wyciszenie i zwiększ głośność. Muzykę i dźwięki można też włączyć lub wyłączyć w strefie rodzica.'],
      ['Jak wejść do strefy rodzica?', 'Stuknij małą ikonkę w prawym górnym rogu ekranu startowego, przytrzymaj przycisk przez 3 sekundy i odpowiedz na pytanie o mnożenie.'],
      ['Dziecko jest starsze. Czy można pominąć łatwe poziomy?', `Tak: w strefie rodzica włącz „${s.unlockAll}”.`],
      ['Jak wyzerować postępy?', `Strefa rodzica → „${s.reset}” albo usuń aplikację.`],
    ],
    privacy: 'Polityka prywatności',
  },
  de: {
    title: 'Hilfe',
    intro: 'Pasujki ist ein ruhiges Zuordnungsspiel für Kinder von 2 bis 5 Jahren. Es funktioniert komplett offline – ohne Werbung, Konten und Datenerfassung.',
    askTitle: 'Fragen oder Probleme?',
    ask: 'Eröffne ein Issue unter {link} (GitHub-Konto nötig). Wir antworten innerhalb weniger Tage.',
    faqTitle: 'Häufige Fragen',
    faq: (s) => [
      ['Es ist kein Ton zu hören.', 'Das Spiel folgt dem Stummschalter des iPhones. Schalte den Stummmodus aus und erhöhe die Lautstärke. Musik und Töne lassen sich auch im Elternbereich ein- und ausschalten.'],
      ['Wie öffne ich den Elternbereich?', 'Tippe auf das kleine Personen-Symbol oben rechts auf dem Startbildschirm, halte die Taste 3 Sekunden lang gedrückt und beantworte dann die Rechenfrage.'],
      ['Mein Kind ist älter. Können wir die leichten Level überspringen?', `Ja: Schalte im Elternbereich „${s.unlockAll}“ ein.`],
      ['Wie setze ich den Fortschritt zurück?', `Elternbereich → „${s.reset}“ oder die App löschen.`],
    ],
    privacy: 'Datenschutzerklärung',
  },
  fr: {
    title: 'Aide',
    intro: "Pasujki est un jeu d'association tout en douceur pour les enfants de 2 à 5 ans. Il fonctionne entièrement hors ligne, sans publicité, sans compte et sans collecte de données.",
    askTitle: 'Des questions ou un problème ?',
    ask: 'Ouvrez un ticket sur {link} (compte GitHub nécessaire). Nous répondons sous quelques jours.',
    faqTitle: 'Questions fréquentes',
    faq: (s) => [
      ["Il n'y a pas de son.", "Le jeu suit le bouton silencieux de l'iPhone. Désactivez le mode silencieux et montez le volume. La musique et les sons peuvent aussi être activés ou coupés dans l'espace parents."],
      ["Comment ouvrir l'espace parents ?", "Touchez la petite icône de personnages en haut à droite de l'écran d'accueil, maintenez le bouton appuyé 3 secondes, puis répondez à la question de multiplication."],
      ['Mon enfant est plus grand. Peut-on passer les niveaux faciles ?', `Oui : dans l'espace parents, activez « ${s.unlockAll} ».`],
      ['Comment réinitialiser la progression ?', `Espace parents → « ${s.reset} », ou supprimez l'app.`],
    ],
    privacy: 'Politique de confidentialité',
  },
  it: {
    title: 'Assistenza',
    intro: 'Pasujki è un tranquillo gioco di abbinamenti per bambini dai 2 ai 5 anni. Funziona completamente offline, senza pubblicità, account né raccolta di dati.',
    askTitle: 'Domande o problemi?',
    ask: 'Apri una segnalazione su {link} (serve un account GitHub). Rispondiamo entro pochi giorni.',
    faqTitle: 'Domande frequenti',
    faq: (s) => [
      ['Non si sente nessun suono.', "Il gioco segue l'interruttore silenzioso dell'iPhone. Disattiva il silenzioso e alza il volume. Musica e suoni si possono anche attivare o disattivare nell'area genitori."],
      ["Come si apre l'area genitori?", 'Tocca la piccola icona con le persone in alto a destra nella schermata iniziale, tieni premuto il pulsante per 3 secondi e rispondi alla domanda di moltiplicazione.'],
      ['Il bambino è più grande. Possiamo saltare i livelli facili?', `Sì: nell'area genitori attiva «${s.unlockAll}».`],
      ['Come si azzerano i progressi?', `Area genitori → «${s.reset}», oppure elimina l'app.`],
    ],
    privacy: 'Informativa sulla privacy',
  },
  es: {
    title: 'Ayuda',
    intro: 'Pasujki es un juego tranquilo de emparejar para niños de 2 a 5 años. Funciona totalmente sin conexión, sin anuncios, cuentas ni recogida de datos.',
    askTitle: '¿Preguntas o problemas?',
    ask: 'Abre una incidencia en {link} (se necesita una cuenta de GitHub). Respondemos en pocos días.',
    faqTitle: 'Preguntas frecuentes',
    faq: (s) => [
      ['No hay sonido.', 'El juego respeta el interruptor de silencio del iPhone. Desactiva el modo silencio y sube el volumen. La música y los sonidos también se pueden activar o desactivar en la zona para padres.'],
      ['¿Cómo entro en la zona para padres?', 'Toca el pequeño icono de personas en la esquina superior derecha de la pantalla de inicio, mantén presionado el botón durante 3 segundos y responde a la pregunta de multiplicar.'],
      ['Mi hijo es mayor. ¿Podemos saltarnos los niveles fáciles?', `Sí: en la zona para padres activa «${s.unlockAll}».`],
      ['¿Cómo borro el progreso?', `Zona para padres → «${s.reset}», o elimina la app.`],
    ],
    privacy: 'Política de privacidad',
  },
  pt: {
    title: 'Ajuda',
    intro: 'Pasujki é um jogo calmo de combinar para crianças de 2 a 5 anos. Funciona totalmente offline, sem anúncios, contas ou coleta de dados.',
    askTitle: 'Dúvidas ou problemas?',
    ask: 'Abra uma issue em {link} (é preciso ter uma conta no GitHub). Respondemos em poucos dias.',
    faqTitle: 'Perguntas frequentes',
    faq: (s) => [
      ['Não há som.', 'O jogo respeita a chave de silêncio do iPhone. Desative o modo silencioso e aumente o volume. A música e os sons também podem ser ligados ou desligados na área dos pais.'],
      ['Como abrir a área dos pais?', 'Toque no pequeno ícone de pessoas no canto superior direito da tela inicial, mantenha o botão pressionado por 3 segundos e responda à pergunta de multiplicação.'],
      ['A criança é mais velha. É possível pular os níveis fáceis?', `Sim: na área dos pais, ative “${s.unlockAll}”.`],
      ['Como apagar o progresso?', `Área dos pais → “${s.reset}”, ou exclua o app.`],
    ],
    privacy: 'Política de privacidade',
  },
  nl: {
    title: 'Hulp',
    intro: 'Pasujki is een rustig koppelspel voor kinderen van 2 tot 5 jaar. Het werkt volledig offline, zonder reclame, accounts of gegevensverzameling.',
    askTitle: 'Vragen of problemen?',
    ask: 'Maak een issue aan op {link} (GitHub-account nodig). We antwoorden binnen een paar dagen.',
    faqTitle: 'Veelgestelde vragen',
    faq: (s) => [
      ['Er is geen geluid.', 'Het spel volgt de stilteschakelaar van de iPhone. Zet de stille modus uit en zet het volume hoger. Muziek en geluiden kun je ook aan- of uitzetten in het ouderdeel.'],
      ['Hoe open ik het ouderdeel?', 'Tik op het kleine poppetjesicoon rechtsboven op het startscherm, houd de knop 3 seconden ingedrukt en beantwoord daarna de keersom.'],
      ['Mijn kind is ouder. Kunnen we de makkelijke levels overslaan?', `Ja: zet in het ouderdeel ‘${s.unlockAll}’ aan.`],
      ['Hoe wis ik de voortgang?', `Ouderdeel → ‘${s.reset}’, of verwijder de app.`],
    ],
    privacy: 'Privacybeleid',
  },
};
