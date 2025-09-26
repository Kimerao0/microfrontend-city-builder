import { shuffle } from '../../utils/arrayMethods';

export const extraTiles = ['centrale', 'stadio', 'ospedale', 'centrale', 'municipio', 'statua', 'stazione', 'centrale'];

export const createDefaultTiles = (rows: number, cols: number) => {
  const colors = ['#e24334ff', '#0b3f7aff', '#2d7a2dff', '#a724a7ff'];

  // array di colori base
  const colorsArray = colors
    .map((color) => {
      return Array.from({ length: (rows * cols - 8) / 4 }, () => color);
    })
    .flat();

  // separo le centrali dal resto
  const otherExtra = extraTiles.filter((t) => t !== 'centrale');
  const centrali = extraTiles.filter((t) => t === 'centrale');

  // shuffle senza le centrali
  const shuffled = shuffle([...colorsArray, ...otherExtra]);

  // inserisco le centrali nelle fasce
  const ranges = [
    [23, 27],
    [51, 55],
    [85, 88],
  ];

  centrali.forEach((tile, i) => {
    const [min, max] = ranges[i];
    const pos = Math.floor(Math.random() * (max - min + 1)) + min;
    shuffled.splice(pos, 0, tile); // inserisco in posizione random nel range
  });

  return shuffled;
};
