import React from 'react';
import { RemoteTile } from '../../../shared/src/components/RemoteTile';
import type { Teams, TileType } from '../../../shared/src/types';

export interface BlueRemoteTileWrapperProps {
  index: number;
  team: Teams;
  type: TileType;
}

const BasicTile: React.FC<BlueRemoteTileWrapperProps> = ({ index, team, type }) => {
  return <RemoteTile cellIndex={index} team={team} cellType={type} />;
};

export default BasicTile;
