import { shuffle } from '../../utils/arrayMethods';

export const buildingsTiles = ['stadio', 'ospedale', 'municipio', 'statua', 'stazione'] as const;
export type ExtraTile = (typeof buildingsTiles)[number];
// creo typeGuard per ExtraTile
export const isExtraTile = (value: string): value is ExtraTile => {
  return (buildingsTiles as readonly string[]).includes(value);
};

export const powerPlantTile = 'centrale' as const;
export type PowerPlantTile = typeof powerPlantTile;
export const isPowerPlantTile = (value: string): value is PowerPlantTile => {
  return value === powerPlantTile;
};
export const AllExtraTiles = [...buildingsTiles, powerPlantTile];

export const createDefaultTiles = (rows: number, cols: number) => {
  const colors = ['#e24334ff', '#0b3f7aff', '#2d7a2dff', '#a724a7ff'];

  // array di colori base
  const colorsArray = colors
    .map((color) => {
      return Array.from({ length: (rows * cols - 8) / 4 }, () => color);
    })
    .flat();

  const centrali = [...Array.from({ length: 3 }, () => powerPlantTile)];

  // shuffle senza le centrali
  const shuffled = shuffle([...colorsArray, ...buildingsTiles]);

  // inserisco le centrali nelle fasce
  const unVentesimo = Math.floor((rows * cols) / 20);
  const unTerzo = Math.floor((rows * cols) / 3);
  const dueTerzi = Math.floor((rows * cols * 2) / 3);
  const ranges = [
    [unVentesimo, unTerzo - unVentesimo],
    [unTerzo + unVentesimo, dueTerzi - unVentesimo],
    [dueTerzi + unVentesimo, rows * cols - unVentesimo],
  ];
  console.log({ ranges });

  centrali.forEach((tile, i) => {
    const [min, max] = ranges[i];
    const pos = Math.floor(Math.random() * (max - min + 1)) + min;
    shuffled.splice(pos, 0, tile); // inserisco in posizione random nel range
  });

  return shuffled;
};
