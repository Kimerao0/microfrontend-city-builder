import type { SpecialTileType, TileType } from "./types";

export const getTileCost = (type: TileType) => {
  switch (type) {
    case "curva-NE":
    case "curva-NW":
    case "curva-SE":
    case "curva-SW":
      return 8;
    case "rettilineo-EW":
    case "rettilineo-NS":
      return 5;
    case "prato":
      return 3;
    case "giardino":
      return 9;
    case "curva-tram-NE":
    case "curva-tram-NW":
    case "curva-tram-SE":
    case "curva-tram-SW":
      return 14;
    case "rettilineo-tram-EW":
    case "rettilineo-tram-NS":
      return 10;
    case "incrocio":
      return 12;
    case "parcheggio":
      return 7;
  }
};

/**
 * Converte un indice dell'array piatto in coordinate (riga, colonna)
 */
function indexToCoord(index: number, size: number) {
  return { row: Math.floor(index / size), col: index % size };
}

/**
 * Raccoglie le coordinate di tutte le occorrenze di un tile speciale nella board
 */
function coordsForTile(board: string[], tile: SpecialTileType) {
  const size = Math.sqrt(board.length);
  if (!Number.isInteger(size)) {
    throw new Error("La board non ha dimensioni quadrate perfette.");
  }
  const coords: Array<{ row: number; col: number; index: number }> = [];
  board.forEach((cell, i) => {
    if (cell === tile) {
      const { row, col } = indexToCoord(i, size);
      coords.push({ row, col, index: i });
    }
  });
  return { coords, size };
}

/**
 * Distanza Manhattan tra due coordinate
 */
const manhattan = (
  a: { row: number; col: number },
  b: { row: number; col: number }
) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

/**
 * Restituisce la minima distanza Manhattan tra tileA e tileB.
 * Se uno dei due non è presente, ritorna null.
 * Se tileA === tileB e c'è una sola occorrenza, ritorna null (non c'è “secondo” punto).
 */
export function minGridDistance(
  board: string[],
  tileA: SpecialTileType,
  tileB: SpecialTileType
): number | null {
  const { coords: A } = coordsForTile(board, tileA);
  const { coords: B } = coordsForTile(board, tileB);

  if (A.length === 0 || B.length === 0) return null;
  if (tileA === tileB && A.length === 1) return null;

  let best = Number.POSITIVE_INFINITY;

  // Se sono lo stesso tipo, confronta tutte le coppie diverse
  if (tileA === tileB) {
    for (let i = 0; i < A.length; i++) {
      for (let j = i + 1; j < A.length; j++) {
        const d = manhattan(A[i], A[j]);
        if (d < best) best = d;
      }
    }
  } else {
    // Tipi diversi: tutte le coppie A x B
    for (const a of A) {
      for (const b of B) {
        const d = manhattan(a, b);
        if (d < best) best = d;
      }
    }
  }

  return Number.isFinite(best) ? best : null;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
