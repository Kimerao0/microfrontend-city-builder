import { Button, styled } from '@mui/material';
import * as React from 'react';
import { createDefaultTiles } from './createDefaultTiles';
import { DefaultTile } from './defaultTile';
import safeJsonParse from '../../utils/safeDecode';
import { useCity } from '../../context/CityContext';
import type { BoardTile } from '../../../../shared/src/types';
export interface CityGridProps {
  tiles: BoardTile[];
}

export const CityGrid: React.FC<CityGridProps> = ({ tiles }) => {
  const { defaultTilesTypes, setDefaultTilesTypes } = useCity();

  const rows = 12;
  const cols = rows;
  const items = React.useMemo(() => Array.from({ length: rows * cols }, (_, i) => i), [rows, cols]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
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
      <TableWrapper role="table" rows={rows} cols={cols}>
        {items.map((index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const cellIndex = row * cols + col + 1;
          const tileAtIndex = tiles.find((t) => t.id === cellIndex);
          return (
            <div role="cell" key={index} id={`${cellIndex}`}>
              {tileAtIndex ? tileAtIndex.tile : <DefaultTile value={defaultTilesTypes ? defaultTilesTypes[index] : null} cellIndex={cellIndex} />}
            </div>
          );
        })}
      </TableWrapper>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, gap: 8 }}>
        <Button variant="contained" color="primary" onClick={handleColorMap}>
          Color map
        </Button>
        <Button variant="outlined" color="primary" onClick={handleMapReset}>
          Reset map
        </Button>
      </div>
    </>
  );
};

const TableWrapper = styled('div')<{ cols: number; rows: number }>(({ rows, cols }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${cols}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, 1fr)`,
  gap: 4,
  width: '100%',
  height: '100%',
}));
