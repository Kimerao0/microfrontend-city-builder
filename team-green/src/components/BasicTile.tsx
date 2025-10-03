import React from 'react';
import { RemoteTile } from '../../../shared/src/components/RemoteTile';
import { type Teams, type TileType } from '../../../shared/src/types';

export interface GreenRemoteTileWrapperProps {
  index: number;
  team: Teams;
  type: TileType;
}

const BasicTile: React.FC<GreenRemoteTileWrapperProps> = ({ index, team, type }) => {
  return <RemoteTile cellIndex={index} team={team} cellType={type} />;
};

export default BasicTile;
