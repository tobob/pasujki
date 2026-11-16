import { CONTACT, DEVELOPER } from '../../constants/contact';
import type { ColorId, ItemId, ShapeId } from '../../game/types';
import type { HintPack, Locale } from '../types';

/**
 * Português — neutral, Brazilian-friendly wording: no "tu"/"você" in hints, impersonal or
 * imperative forms that read naturally in Brazil and Portugal.
 */
const UPDATED = '16 de novembro de 2026';

// ── hint words ─────────────────────────────────────────────────────────────────────────────────
/** Name with its definite article; gender and number are read off the article (o/a/os/as). */
const ITEMS: Record<ItemId, string> = {
  cat: 'o gato', dog: 'o cachorro', cow: 'a vaca', pig: 'o porquinho', sheep: 'a ovelha', horse: 'o cavalo',
  hen: 'a galinha', duck: 'o pato', frog: 'o sapo', fish: 'o peixe', elephant: 'o elefante', lion: 'o leão',
  giraffe: 'a girafa', zebra: 'a zebra', tiger: 'o tigre', ladybug: 'a joaninha', bee: 'a abelha',
  butterfly: 'a borboleta', bear: 'o urso', rabbit: 'o coelho', mouse: 'o ratinho', owl: 'a coruja',
  penguin: 'o pinguim', monkey: 'o macaco', snail: 'o caracol', turtle: 'a tartaruga', squirrel: 'o esquilo',
  flamingo: 'o flamingo', whale: 'a baleia', parrot: 'o papagaio',
  chick: 'o pintinho', kitten: 'o gatinho', puppy: 'o cachorrinho', lamb: 'o cordeirinho', calf: 'o bezerrinho',
  duckling: 'o patinho',
  strawberry: 'o morango', banana: 'a banana', lemon: 'o limão', orange: 'a laranja', apple: 'a maçã', pear: 'a pera',
  grapes: 'as uvas', carrot: 'a cenoura', cheese: 'o queijo', bone: 'o osso', honey: 'o mel', leaf: 'a folha',
  acorn: 'a bolota', milk: 'o leite', watermelon: 'a melancia', blueberries: 'os mirtilos', corn: 'o milho',
  bread: 'o pão', egg: 'o ovo', worm: 'a minhoca',
  doghouse: 'a casinha', beehive: 'a colmeia', nest: 'o ninho', pond: 'o lago', barn: 'o celeiro', iceberg: 'o iceberg',
  tree: 'a árvore', sea: 'o mar', hutch: 'a coelheira', kennel_bowl: 'a tigela',
  ball: 'a bola', sun: 'o sol', moon: 'a lua', star: 'a estrela', cloud: 'a nuvem', umbrella: 'o guarda-chuva',
  raindrop: 'a gota de chuva', snowflake: 'o floco de neve', snowman: 'o boneco de neve', scarf: 'o cachecol',
  sunglasses: 'os óculos de sol', boot: 'a bota', hat: 'o gorro', mitten: 'a luva', cup: 'a caneca', spoon: 'a colher',
  toothbrush: 'a escova de dentes', soap: 'o sabonete', bed: 'a cama', pillow: 'o travesseiro', car: 'o carro',
  boat: 'o barco', airplane: 'o avião', train: 'o trem', bicycle: 'a bicicleta', flower: 'a flor', house: 'a casa',
  key: 'a chave', drum: 'o tambor', balloon: 'o balão', book: 'o livro', crayon: 'o giz de cera', sock: 'a meia',
  shoe: 'o sapato', teddy: 'o ursinho de pelúcia', clock: 'o relógio', lamp: 'o abajur', tomato: 'o tomate',
  pumpkin: 'a abóbora', heart_toy: 'o coração',
  gift: 'o presente', block: 'o bloco', party_hat: 'o chapéu de festa', crow: 'o corvo', hay: 'o feno',
  bird: 'o passarinho', kite: 'a pipa', rainbow: 'o arco-íris', sandwich: 'o sanduíche', cake: 'o bolo',
  bucket: 'o balde', shovel: 'a pá', mushroom: 'o cogumelo', cherry: 'a cereja', plum: 'a ameixa', peas: 'as ervilhas',
  fox: 'a raposa', hedgehog: 'o ouriço', octopus: 'o polvo', dinosaur: 'o dinossauro',
};
const art = (i: ItemId) => ITEMS[i].split(' ')[0] as 'o' | 'a' | 'os' | 'as';
const plural = (i: ItemId) => art(i).endsWith('s');
const noun = (i: ItemId) => ITEMS[i].slice(ITEMS[i].indexOf(' ') + 1);
/** de + o = do, de + a = da … */
const de = (i: ItemId) => `d${ITEMS[i]}`;
const OUTRO = { o: 'o outro', a: 'a outra', os: 'os outros', as: 'as outras' } as const;

const COLOR: Record<ColorId, string> = {
  red: 'vermelho', yellow: 'amarelo', blue: 'azul', green: 'verde', orange: 'laranja', purple: 'roxo', pink: 'rosa',
  brown: 'marrom', white: 'branco', black: 'preto', grey: 'cinza',
};
const SHAPE: Record<ShapeId, string> = {
  circle: 'um círculo', square: 'um quadrado', triangle: 'um triângulo', star: 'uma estrela', heart: 'um coração',
  oval: 'um oval', rectangle: 'um retângulo', crescent: 'uma meia-lua',
};

const SUITS = 'Com quem isto combina?';
const GIVE = 'Para quem vamos dar?';

const HINTS: HintPack = {
  isColor: (c) => `O que é ${COLOR[c]}?`,
  looksLike: (s) => `O que tem forma de ${SHAPE[s].replace(/^uma? /, '')}?`,
  texture: {
    stripes_bw: 'Quem tem listras pretas e brancas?',
    stripes_orange: 'Quem tem estas listras?',
    spots_red_black: 'Quem tem estas bolinhas?',
    spots_giraffe: 'Quem tem estas manchas?',
    wool: 'Quem tem lã macia?',
    feathers: 'Quem tem penas?',
    scales: 'Quem tem escamas?',
    honeycomb: 'Onde está o favo de mel?',
    wood: 'O que é de madeira?',
    waves: 'Onde estão as ondas?',
    bricks: 'O que é de tijolos?',
    ice: 'O que é de gelo?',
    fur_brown: 'Quem tem pelo marrom?',
    polka: 'Quem gostaria de bolinhas?',
    checks: 'Quem gostaria de xadrez?',
    grass: 'Quem gostaria de grama?',
  },
  shadow: ['De quem é esta sombra?', 'Quem está escondido na sombra?', 'A quem pertence esta sombra?'],
  weather: {
    sun: 'Que sol! Do que precisamos?',
    raindrop: 'Que chuva! Do que precisamos?',
    cloud: 'Uma nuvem! Vai chover. Do que precisamos?',
    snowflake: 'Que neve! Do que precisamos?',
  },
  same: (i) => `Onde ${plural(i) ? 'estão' : 'está'} ${OUTRO[art(i)]} ${noun(i)}?`,
  food: (i) => `Quem gosta ${de(i)}?`,
  home: (i) => `Onde ${plural(i) ? 'moram' : 'mora'} ${ITEMS[i]}?`,
  baby: {
    chick: 'Onde está a mãe do pintinho?',
    kitten: 'Onde está a mãe do gatinho?',
    puppy: 'Onde está a mãe do cachorrinho?',
    lamb: 'Onde está a mãe do cordeirinho?',
    calf: 'Onde está a mãe do bezerrinho?',
    duckling: 'Onde está a mãe do patinho?',
  },
  pair: (i) => `O que combina com ${ITEMS[i]}?`,
  likesColor: (c) => `Quem gosta de ${COLOR[c]}?`,
  suitsColor: (c) => `Quem combina com ${COLOR[c]}?`,
  freeTexture: {
    stripes_bw: 'Quem quer listras?',
    bricks: 'Quem vai construir uma casa de tijolos?',
    waves: 'Quem quer ir nadar?',
    honeycomb: 'Quem gosta deste desenho?',
    wool: 'Quem ganha um suéter de lã?',
  },
  getsShape: (s) => `Quem ganha ${SHAPE[s]}?`,
  eat: (i) => `O que ${ITEMS[i]} ${plural(i) ? 'comeriam' : 'comeria'}?`,
  live: ['Quem moraria aqui?', 'De quem vai ser esta casinha?', 'Quem vai morar aqui?'],
  wear: ['Quem vai vestir isto?', SUITS, 'Quem quer se fantasiar com isto?'],
  play: ['Quem vai brincar com isto?', GIVE, 'Quem quer brincar?'],
  suits: SUITS,
  wants: (i) => `Quem quer ${ITEMS[i]}?`,
  give: GIVE,
};

const pt: Locale = {
  name: 'Português',
  strings: {
    play: 'Jogar',
    map: 'Mapa dos mundos',
    parents: 'Para os pais',
    start: 'Início',
    back: 'Voltar',
    exit: 'Sair',
    next: 'Próximo nível',
    bravo: 'Muito bem!',
    gateTitle: 'Para adultos',
    gateHold: 'Peça ajuda a um adulto. Mantenha o botão pressionado por 3 segundos.',
    gateHoldButton: 'Manter',
    gateQuestion: (a: string, b: string) => `Quanto é ${a} vezes ${b}?`,
    music: 'Música',
    sounds: 'Sons e vibração',
    hints: 'Mostrar dicas',
    hintsDetail: 'Uma frase curta acima do tabuleiro, por exemplo: “O que é vermelho?”',
    unlockAll: 'Desbloquear todos os níveis',
    unlockAllDetail: 'Para crianças maiores: abre todos os mundos de uma vez.',
    reset: 'Apagar o progresso',
    resetTitle: 'Apagar o progresso?',
    resetBody: 'As estrelas e os níveis desbloqueados serão apagados.',
    cancel: 'Cancelar',
    resetConfirm: 'Apagar',
    aboutTitle: 'Sobre o jogo',
    about:
      'Pasujki é um jogo calmo de combinar para crianças de 2 a 5 anos. A criança arrasta a figura do centro até o canto certo (ou simplesmente toca no canto). Não há tempo limite, nem penalidades, nem pressa: um erro é só mais uma tentativa. Depois do segundo erro, o canto certo brilha suavemente.',
    worldsTitle: 'Mundos e idades',
    worlds:
      'Iguais (a partir dos 2 anos) → Cores → Formas → Sombras → Padrões (3+) → Quem com quem? (comida, casas, mães) → Tempo e pares (4–5 anos). O mundo seguinte abre quando metade do anterior estiver concluída. “Imaginação” está sempre aberto: lá não há respostas erradas — toda escolha vale e é um convite para conversar (“Por que a vaca gosta de azul?”).',
    soundTitle: 'Som',
    soundNote:
      'O jogo respeita a chave de silêncio do iPhone: com o telefone no silencioso, a música e os sons ficam desligados. A música é suave e para quando o app é fechado.',
    safetyTitle: 'Segurança',
    safety:
      'Sem anúncios, compras, contas, internet ou coleta de dados. O jogo funciona totalmente offline. As configurações e esta página ficam protegidas pelo bloqueio para pais.',
    version: 'Versão',
  },
  numbers: ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'],
  worlds: {
    1: 'Iguais',
    2: 'Cores',
    3: 'Formas',
    4: 'Sombras',
    5: 'Padrões',
    6: 'Quem com quem?',
    7: 'Tempo e pares',
    8: 'Imaginação',
  },
  levels: {
    'w1-l1': 'Primeiros passos',
    'w1-l2': 'Onde está o outro?',
    'w1-l3': 'Encontre o par',
    'w1-l4': 'Três janelas',
    'w1-l5': 'O que temos aqui?',
    'w1-l6': 'Adivinhe!',
    'w1-l7': 'Quatro janelas',
    'w1-l8': 'Olhinhos espertos',
    'w2-l1': 'Primeiras cores',
    'w2-l2': 'Um dia colorido',
    'w2-l3': 'Arco-íris',
    'w2-l4': 'Cores novas',
    'w2-l5': 'Escuro e claro',
    'w2-l6': 'Quatro cores',
    'w2-l7': 'Todas as cores',
    'w2-l8': 'Cores parecidas',
    'w3-l1': 'Círculo e estrela',
    'w3-l2': 'Quadrado e coração',
    'w3-l3': 'Triângulo e meia-lua',
    'w3-l4': 'Oval',
    'w3-l5': 'Retângulo',
    'w3-l6': 'Quatro formas',
    'w3-l7': 'Todas as formas',
    'w4-l1': 'De quem é a sombra?',
    'w4-l2': 'Escondidos na sombra',
    'w4-l3': 'Sombras na parede',
    'w4-l4': 'Quatro sombras',
    'w4-l5': 'Sombras parecidas',
    'w4-l6': 'Mestre das sombras',
    'w5-l1': 'Listras e bolinhas',
    'w5-l2': 'Pelo e penas',
    'w5-l3': 'Quem tem isto?',
    'w5-l4': 'Do que é feito?',
    'w5-l5': 'Macio e duro',
    'w5-l6': 'Quatro padrões',
    'w5-l7': 'Olhos atentos',
    'w5-l8': 'Mestre dos padrões',
    'w6-l1': 'Mãe e filhote',
    'w6-l2': 'Quem come o quê?',
    'w6-l3': 'Onde mora?',
    'w6-l4': 'Casinhas e petiscos',
    'w6-l5': 'Bom apetite!',
    'w6-l6': 'Quem mora onde?',
    'w6-l7': 'Todas as mães',
    'w6-l8': 'Amigos da floresta',
    'w6-l9': 'No campo e no lago',
    'w6-l10': 'Atenção!',
    'w6-l11': 'Parecidos',
    'w6-l12': 'Mestre dos bichos',
    'w7-l1': 'Como está o tempo?',
    'w7-l2': 'Do que precisamos?',
    'w7-l3': 'O que faz par?',
    'w7-l4': 'Pares',
    'w7-l5': 'Chuva e neve',
    'w7-l6': 'Aniversário',
    'w7-l7': 'O que é de quem?',
    'w7-l8': 'Cuidado com as cores',
    'w7-l9': 'Pares difíceis',
    'w7-l10': 'Mestre dos pares',
    'w8-l1': 'Quem gosta desta cor?',
    'w8-l2': 'De quem são os padrões?',
    'w8-l3': 'Um presente para quem?',
    'w8-l4': 'O que come o dinossauro?',
    'w8-l5': 'Quem moraria aqui?',
    'w8-l6': 'Use a imaginação',
    'w8-l7': 'O que vamos vestir?',
    'w8-l8': 'De quem é esta cor?',
    'w8-l9': 'Vamos brincar!',
  },
  hints: HINTS,
  privacy: {
    title: 'Política de privacidade — Pasujki',
    sections: [
      { body: `Última atualização: ${UPDATED}` },
      {
        body: `Pasujki é um jogo de combinar para crianças pequenas, criado por ${DEVELOPER} (“nós”). Esta política explica como o aplicativo trata as informações. Resumindo: o Pasujki não coleta, não guarda nos nossos servidores e não compartilha nenhum dado pessoal. Funciona totalmente offline.`,
      },
      {
        heading: 'O que coletamos',
        body: 'Nada. O Pasujki não tem contas, login, publicidade, análises, rastreamento, relatórios de falhas nem SDKs de terceiros que coletem dados. O aplicativo não se conecta à internet, e nunca recebemos nenhuma informação sobre você, o seu filho ou o seu dispositivo.',
      },
      {
        heading: 'O que fica no dispositivo',
        body: 'Para lembrar o progresso no jogo (níveis concluídos e figurinhas) e as configurações (música e sons ligados ou desligados), o aplicativo guarda uma pequena quantidade de dados apenas no seu dispositivo. Não temos acesso a eles. Eles são apagados quando o aplicativo é excluído. Se você usa o backup do dispositivo (por exemplo, iCloud ou backup do Google), essa cópia é gerenciada pela Apple ou pelo Google na sua conta, de acordo com as políticas de privacidade deles.',
      },
      {
        heading: 'Permissões',
        body: 'O Pasujki não pede acesso à câmera, ao microfone, às fotos, aos contatos nem à localização, e não envia notificações.',
      },
      {
        heading: 'Crianças',
        body: 'O Pasujki foi feito para crianças de 2 a 5 anos. Como não coleta nenhuma informação pessoal, não precisa nem pede dados da criança ou dos pais. As configurações, esta política e tudo o que leva para fora do jogo ficam protegidos por um bloqueio para pais. Seguimos os requisitos da lei norte-americana COPPA (Children’s Online Privacy Protection Act), do RGPD/GDPR europeu (incluindo o artigo 8) e do Age Appropriate Design Code do Reino Unido.',
      },
      {
        heading: 'Terceiros',
        body: 'Não compartilhamos dados com ninguém, porque não temos nenhum. O aplicativo é baixado pela App Store ou pelo Google Play. A Apple e o Google tratam as informações de download e pagamento de acordo com as suas próprias políticas de privacidade.',
      },
      {
        heading: 'Seus direitos e exclusão',
        body: 'Como não guardamos nenhum dado sobre você, do nosso lado não há nada para consultar, corrigir ou excluir. Para apagar o progresso salvo no dispositivo, exclua o aplicativo.',
      },
      {
        heading: 'Alterações',
        body: 'Se um dia o aplicativo mudar a forma como trata as informações, atualizaremos esta página e a data acima antes de lançar essa versão.',
      },
      { heading: 'Contato', body: `${DEVELOPER}: perguntas e pedidos em ${CONTACT}.` },
    ],
  },
};
export default pt;
