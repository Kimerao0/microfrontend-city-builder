import type { BasicContractType } from '.';

export const basicContractsList: BasicContractType[] = [
  {
    title: 'Collega la stazione con lo stadio',
    description: 'Costruisci una strada tra la stazione e lo stadio per permettere ai tifosi di portare la guerriglia urbana anche nelle altre città.',
    location1: 'stazione',
    location2: 'stadio',
  },
  {
    title: 'Collega la stazione con lo il municipio',
    description: "Costruisci una strada tra la stazione e il municipio per permettere al sindaco di viaggiare nell'interesse della città.",
    location1: 'stazione',
    location2: 'municipio',
  },
  {
    title: "Collega la stazione con l'ospedale",
    description: "Costruisci una strada tra la stazione e l'ospedale per permettere a chi viene da fuori città di curarsi.",
    location1: 'stazione',
    location2: 'ospedale',
  },
  {
    title: 'Collega la stazione con la statua',
    description: 'Costruisci una strada tra la stazione e la statua per migliorare il turismo in città.',
    location1: 'stazione',
    location2: 'statua',
  },
  {
    title: 'Collega il municipio con la statua',
    description: 'Costruisci una strada tra il municipio e la statua per permettere le celebrazioni cittadine.',
    location1: 'municipio',
    location2: 'statua',
  },
  {
    title: 'Collega il municipio con lo stadio',
    description: 'Costruisci una strada tra il municipio e lo stadio per permettere al sindaco di inaugurare la prima partita della stagione.',
    location1: 'municipio',
    location2: 'stadio',
  },
  {
    title: "Collega il municipio con l'ospedale",
    description: "Costruisci una strada tra il municipio e l'ospedale per permettere ai pazienti di ottemperare alle dovute procedure burocratiche.",
    location1: 'municipio',
    location2: 'ospedale',
  },
  {
    title: "Collega lo stadio con l'ospedale",
    description:
      "Costruisci una strada tra lo stadio e l'ospedale per permettere ai tifosi feriti nel tentativo di difendere l'onore cittadino di ricevere cure mediche.",
    location1: 'stadio',
    location2: 'ospedale',
  },
  {
    title: 'Collega lo stadio con la statua',
    description: 'Costruisci una strada tra lo stadio e la statua per permettere ai tifosi di vandalizzare i monumenti cittadini.',
    location1: 'stadio',
    location2: 'statua',
  },
  {
    title: "Collega l'ospedale con la statua",
    description: "Costruisci una strada tra l'ospedale e la statua per permettere ai pazienti di trovare conforto nell'arte.",
    location1: 'ospedale',
    location2: 'statua',
  },
  {
    title: 'Costruisci un rettilineo di 6 caselle',
    description: 'Costruisci una strada dritta lunga 6 caselle per permettere le gare illegali notturne.',
    value: 30,
  },
  {
    title: 'Costruisci un piccolo prato urbano',
    description:
      'Costruisci un prato urbano di almeno 4 caselle adiacenti (in verticale o orizzontale) per migliorare un poco la qualità della vita dei cittadini.',
    value: 12,
  },
  {
    title: 'Costruisci un grande prato urbano',
    description:
      'Costruisci un prato urbano di almeno 8 caselle adiacenti (in verticale o orizzontale) per migliorare di molto la qualità della vita dei cittadini.',
    value: 24,
  },
  {
    title: "Costruisci un giardino intorno all'ospedale",
    description:
      "Costruisci un giardino di almeno 3 caselle adiacenti (in verticale o orizzontale) intorno all'ospedale per migliorare il benessere dei pazienti.",
    value: 27,
  },
  {
    title: "Porta la corrente all'ospedale",
    description: "Estendi la rete elettrica fino all'ospedale in modo da permettere ai dottori di operare anche di notte.",
    location1: 'ospedale',
    location2: 'centrale',
  },
  {
    title: 'Porta la corrente allo stadio',
    description: 'Estendi la rete elettrica fino allo stadio in modo da permettere le partite serali.',
    location1: 'stadio',
    location2: 'centrale',
  },
  {
    title: 'Porta la corrente al municipio',
    description: 'Estendi la rete elettrica fino al municipio in modo da permettere al sindaco di rilasciare interviste telefoniche.',
    location1: 'municipio',
    location2: 'centrale',
  },
  {
    title: 'Porta la corrente alla statua',
    description:
      'Estendi la rete elettrica fino alla statua in modo da illuminarla di notte e renderla un facile bersaglio per i manifestanti anche dopo il tramonto.',
    location1: 'statua',
    location2: 'centrale',
  },
  {
    title: 'Costruisci un giardino intorno alla statua',
    description:
      "Costruisci un giardino di almeno 2 caselle adiacenti (in verticale o orizzontale) intorno alla statua per migliorare l'area ed far aumentare i prezzi delle case.",
    value: 18,
  },
  {
    title: 'Costruisci un grande giardino intorno al municipio',
    description:
      'Costruisci un giardino di almeno 6 caselle adiacenti (in verticale o orizzontale) intorno al municipio permettere al sindaco di fare una pausa e dar da mangiare alle papere.',
    value: 54,
  },
  {
    title: 'Costruisci un parcheggio intorno alla stadio',
    description:
      'Costruisci un parcheggio di almeno 4 caselle adiacenti (in verticale o orizzontale) intorno alla stadio per permettere ai tifosi di ingolfare il traffico cittadino in occasione delle partite.',
    value: 28,
  },
  {
    title: "Costruisci un parcheggio intorno all'ospedale",
    description:
      'Costruisci un parcheggio di almeno 2 caselle adiacenti (in verticale o orizzontale) intorno all\ospedale per impedire ai dipendenti di usare lo sciopero dei mezzi come scusa per non lavorare.',
    value: 14,
  },
];
