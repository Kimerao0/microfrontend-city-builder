import BasicTile, { type BlueRemoteTileWrapperProps } from './components/BasicTile';
import type { BoardTile } from '../../shared/src/types';

type BlueRegistry = Omit<BlueRemoteTileWrapperProps, 'team'>;

const generateBlueRegistryTile = ({ index, type }: BlueRegistry): BoardTile => ({
  id: index,
  team: 'blue',
  tile: <BasicTile index={index} team="blue" type={type} />,
});

export const Registry: BoardTile[] = [generateBlueRegistryTile({ index: 18, type: 'curva-NE' })];

export default Registry;
