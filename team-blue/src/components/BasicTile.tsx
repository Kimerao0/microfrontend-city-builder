import React from 'react';
import RemoteTile from '../../../shared/src/components/RemoteTile';
import type { Teams } from '../../../shared/src/types';

export interface BlueRemoteTileWrapperProps {
  index: number;
  team: Teams;
  type: string;
}

const BasicTile: React.FC<BlueRemoteTileWrapperProps> = ({ index, team, type }) => {
  return <RemoteTile cellIndex={index} team={team} cellType={type} />;
};

export default BasicTile;
