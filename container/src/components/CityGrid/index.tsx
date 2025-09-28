import { Button } from '@mui/material';
import * as React from 'react';
import { createDefaultTiles } from './createDefaultTiles';
import { DefaultTile } from './defaultTile';
import safeJsonParse from '../../utils/safeDecode';
import { useCity } from '../../context/CityContext';

export type TileProps = { row: number; col: number };
export type CityGridProps = { tiles: React.ComponentType<TileProps>[] };

export const CityGrid: React.FC<CityGridProps> = ({ tiles }) => {
  const { defaultTilesTypes, setDefaultTilesTypes } = useCity();

  const rows = 12;
  const cols = 12;
  const items = React.useMemo(() => Array.from({ length: rows * cols }, (_, i) => i), [rows, cols]);


  React.useEffect(() => {
    if (typeof window === 'undefined') return; // safety per SSR
    const stored = localStorage.getItem('defaultTiles');
    const parsed = safeJsonParse<string[] | null>(stored);
    if (parsed) setDefaultTilesTypes(parsed);
  }, [setDefaultTilesTypes]);

  const handleColorMap = () => {
    const newTiles = createDefaultTiles(rows, cols); // string[]
    setDefaultTilesTypes(newTiles);
    localStorage.setItem('defaultTiles', JSON.stringify(newTiles));
  };

  const handleMapReset = () => {
    setDefaultTilesTypes(null);
    localStorage.setItem('defaultTiles', JSON.stringify(null));
  };

  return (
    <>
      <div
        role="table"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: 4,
          width: '100%',
          height: '100%',
        }}
      >
        {items.map((index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const cellIndex = row * 10 + col + 1; // (nota: qui usi "10" fisso)

          const Tile = tiles[index];

          return (
            <div role="cell" key={index} id={`${cellIndex}`}>
              {Tile ? (
                <Tile row={row} col={col} />
              ) : (
                <DefaultTile value={defaultTilesTypes ? defaultTilesTypes[index] : null} cellIndex={cellIndex} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button variant="contained" color="primary" onClick={handleColorMap}>
          Color map
        </Button>
        <Button variant="contained" color="primary" onClick={handleMapReset} style={{ marginLeft: 8 }}>
          Reset map
        </Button>
      </div>
    </>
  );
};
