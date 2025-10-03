import React from 'react';
import { Button, styled } from '@mui/material';
import { createDefaultTiles } from './createDefaultTiles';
import { DefaultTile, findIndexesOfCentrale, getNeighborIndices } from './defaultTile';
import safeJsonParse from '../../utils/safeDecode';
import { useCity } from '../../context/CityContext';
import { EVENT_STATION_POS, type BoardTile, type StationPosition } from '../../../../shared/src/types';
import { colors } from '../../../../shared/src/values';
import { getTileCost } from '../../../../shared/src/fn';
import type { TeamValues } from '../../App';

export interface CityGridProps {
  tiles: BoardTile[];
  teams: TeamValues;
  setTeams: React.Dispatch<React.SetStateAction<TeamValues>>;
}

export const CityGrid: React.FC<CityGridProps> = ({ tiles, teams, setTeams }) => {
  const [powerStationPosition, setPowerStationPosition] = React.useState<number[]>([]);
  const { defaultTilesTypes, setDefaultTilesTypes } = useCity();

  const rows = 14;
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
    const confirmReset = window.confirm('⚠️ Sei sicuro di voler resettare la mappa? Questa azione non può essere annullata.');

    if (!confirmReset) return;

    setDefaultTilesTypes(null);
    localStorage.setItem('defaultTiles', JSON.stringify(null));
    localStorage.removeItem('mapState');
    localStorage.removeItem('teams');
  };
  const handleSaveMapState = () => {
    const oldTiles = safeJsonParse<BoardTile[]>(localStorage.getItem('mapState'));
    // differenza fra oltdTiles e tiles
    let speseBlue = 0;
    let speseRed = 0;
    let speseGreen = 0;
    let spesePurple = 0;
    const newTiles = oldTiles ? tiles.filter((t) => !oldTiles.some((ot) => ot.id === t.id)) : tiles;
    newTiles.forEach((t) => {
      const tileVal = getTileCost(t.tile.props.type);
      const tileExtra = t.tile.props.withPowerStation ? 2 : 0;
      if (t.team === 'blue') speseBlue += tileVal + tileExtra;
      if (t.team === 'red') speseRed += tileVal + tileExtra;
      if (t.team === 'green') speseGreen += tileVal + tileExtra;
      if (t.team === 'purple') spesePurple += tileVal + tileExtra;
      console.log(`Team ${t.team} ha piazzato ${t.tile.props.type} (costo: ${tileVal} + ${tileExtra})`);
    });
    const updatedTeams = {
      blue: teams['blue'] - speseBlue,
      red: teams['red'] - speseRed,
      green: teams['green'] - speseGreen,
      purple: teams['purple'] - spesePurple,
    };

    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
    localStorage.setItem('mapState', JSON.stringify(tiles));
  };

  React.useEffect(() => {
    if (!defaultTilesTypes) return;
    const powerList = findIndexesOfCentrale(defaultTilesTypes);
    const listOfPoweredCells: number[] = [];
    powerList.forEach((powerIndex) => {
      listOfPoweredCells.push(...getNeighborIndices(powerIndex, Math.sqrt(defaultTilesTypes.length)));
    });
    setPowerStationPosition(powerList);
    notifyStationPosition({
      positions: listOfPoweredCells,
    });
  }, [defaultTilesTypes, tiles]);

  return (
    <>
      <TableWrapper role="table" rows={rows} cols={cols}>
        {items.map((index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const cellIndex = row * cols + col + 1;
          const tileAtIndex = tiles.find((t) => t.id === cellIndex);
          let isRightColor = false;
          if (tileAtIndex && defaultTilesTypes) {
            isRightColor = colors[tileAtIndex.team] === defaultTilesTypes[cellIndex - 1];
          }
          return (
            <div role="cell" key={index} id={`${cellIndex}`}>
              {tileAtIndex && isRightColor ? (
                tileAtIndex.tile
              ) : (
                <DefaultTile
                  value={defaultTilesTypes ? defaultTilesTypes[index] : null}
                  cellIndex={cellIndex}
                  allItems={defaultTilesTypes || []}
                  powerList={powerStationPosition}
                />
              )}
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
        <Button variant="contained" color="primary" onClick={handleSaveMapState}>
          Save map state
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

export function notifyStationPosition(p: StationPosition) {
  window.dispatchEvent(new CustomEvent<StationPosition>(EVENT_STATION_POS, { detail: p }));
}
