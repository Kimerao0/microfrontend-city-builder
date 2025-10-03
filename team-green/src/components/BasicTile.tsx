import React from 'react';
import { RemoteTile } from '../../../shared/src/components/RemoteTile';
import { type Teams, type TileType } from '../../../shared/src/types';

export interface GreenRemoteTileWrapperProps {
  index: number;
  team: Teams;
  type: TileType;
  withPowerStation?: boolean;
}

const BasicTile: React.FC<GreenRemoteTileWrapperProps> = ({ index, team, type, withPowerStation }) => (
  <RemoteTile cellIndex={index} team={team} cellType={type} hasPowerStation={withPowerStation} />
);
export default BasicTile;
