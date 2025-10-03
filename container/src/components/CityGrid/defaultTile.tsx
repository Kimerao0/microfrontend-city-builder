import * as React from 'react';
import CentraleImg from '../../assets/places/centrale.jpg';
import StadioImg from '../../assets/places/stadio.jpg';
import OspedaleImg from '../../assets/places/hospital.jpg';
import MunicipioImg from '../../assets/places/municipio.jpg';
import StatuaImg from '../../assets/places/statua.jpg';
import StazioneImg from '../../assets/places/stazione.jpg';
import { isExtraTile, isPowerPlantTile } from './createDefaultTiles';
import { TileNumber } from '../../../../shared/src/components/TileNumber';
import { PoweredSpot } from '../../../../shared/src/components/PoweredSpot';

export const DefaultTile: React.FC<{ value: string | null; cellIndex: number; allItems: string[]; powerList: number[] }> = ({
  value,
  cellIndex,
  allItems,
  powerList,
}) => {
  const isThisTilePowered =
    powerList.length > 0 &&
    allItems.length > 0 &&
    powerList.some((powerIndex) => getNeighborIndices(powerIndex, Math.sqrt(allItems.length)).includes(cellIndex));

  if (value === null || (!isExtraTile(value) && !isPowerPlantTile(value))) {
    return (
      <div style={{ background: value || 'gray', height: '100%', aspectRatio: '1/1', position: 'relative' }}>
        <TileNumber val={cellIndex}> {cellIndex}</TileNumber>
        {isThisTilePowered && <PoweredSpot />}
      </div>
    );
  }

  const getTileImage = () => {
    switch (value) {
      case 'centrale':
        return CentraleImg;
      case 'stadio':
        return StadioImg;
      case 'ospedale':
        return OspedaleImg;
      case 'municipio':
        return MunicipioImg;
      case 'statua':
        return StatuaImg;
      case 'stazione':
        return StazioneImg;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        height: '100%',
        aspectRatio: '1/1',
        backgroundImage: `url(${getTileImage()})`,
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TileNumber val={cellIndex}> {cellIndex}</TileNumber>
      {isThisTilePowered && <PoweredSpot />}
    </div>
  );
};

export function getNeighborIndices(index: number, rows: number, cols: number = rows): number[] {
  if (index < 1 || index > rows * cols) {
    throw new Error(`Indice fuori dai limiti: ${index} non è in [1, ${rows * cols}]`);
  }

  const i = index - 1; // passa a 0-based
  const r = Math.floor(i / cols); // riga 0-based
  const c = i % cols; // colonna 0-based

  const neighbors: number[] = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // salta la cella stessa
      const rr = r + dr;
      const cc = c + dc;
      // limiti griglia
      if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
        neighbors.push(rr * cols + cc + 1); // torna a 1-based
      }
    }
  }

  // opzionale: ordina in senso crescente per comodità di lettura
  neighbors.sort((a, b) => a - b);
  return neighbors;
}

export function findIndexesOfCentrale(arr: string[]): number[] {
  return arr.map((value, index) => (value === 'centrale' ? index : -2) + 1).filter((index) => index !== -1);
}
