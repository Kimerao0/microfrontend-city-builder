import { Button } from '@mui/material';
import * as React from 'react';
import { createDefaultTiles } from './helpers';
import { DefaultTile } from './defaultTile';

export type TileProps = {
  row: number; // 0..9
  col: number; // 0..9
};

export type CityGridProps = {
  tiles: React.ComponentType<TileProps>[];
};

export const CityGrid: React.FC<CityGridProps> = ({ tiles }) => {
  const [defaultTilesTypes, setDefaultTilesTypes] = React.useState<string[] | null>(null);
  const rows = 10;
  const cols = 10;
  const items = React.useMemo(() => Array.from({ length: rows * cols }, (_, i) => i), []);

  const handleColorMap = () => {
    const shuffledColors = createDefaultTiles(rows, cols);
    setDefaultTilesTypes(shuffledColors);
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
          const cellIndex = row * 10 + col + 1;

          const Tile = tiles[index];

          return (
            <div role="cell" key={index} id={`${cellIndex}`}>
              {Tile ? (
                <Tile row={row} col={col} />
              ) : (
               <DefaultTile value={defaultTilesTypes ? defaultTilesTypes[index] : null} cellIndex={cellIndex}/>
              )}
            </div>
          );
        })}
      </div>
      <Button variant="contained" color="primary" onClick={handleColorMap} style={{ marginTop: '16px' }}>
        Color map
      </Button>
    </>
  );
};
