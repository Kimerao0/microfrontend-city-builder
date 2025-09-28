import React, { useState, useEffect } from 'react';
import { RemoteTile } from '../../../shared/src/components/RemoteTile';
import { EVENT_STATION_POS, type Teams, type TileType, type StationPosition } from '../../../shared/src/types';

export interface BlueRemoteTileWrapperProps {
  index: number;
  team: Teams;
  type: TileType;
}

const BasicTile: React.FC<BlueRemoteTileWrapperProps> = ({ index, team, type }) => {
  const [pos, setPos] = useState<StationPosition | null>(null);

  // ascolto gli eventi di posizione e aggiorno lo stato
  useStationPosition((p) => {
    setPos(p);
  });
  console.log(pos);
  return <RemoteTile cellIndex={index} team={team} cellType={type} />;
};

export default BasicTile;

export function useStationPosition(onPos: (p: StationPosition) => void) {
  useEffect(() => {
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<StationPosition>;
      // mini-validazione
      if (typeof detail?.position === 'number' && Number.isFinite(detail.position)) {
        onPos(detail);
      }
    };
    window.addEventListener(EVENT_STATION_POS, handler);
    return () => window.removeEventListener(EVENT_STATION_POS, handler);
  }, [onPos]);
}
