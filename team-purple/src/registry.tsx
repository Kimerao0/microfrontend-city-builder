import BasicTile, { type PurpleRemoteTileWrapperProps } from './components/BasicTile';
import type { BoardTile } from '../../shared/src/types';

type PurpleRegistry = Omit<PurpleRemoteTileWrapperProps, 'team'>;

const generatePurpleRegistryTile = ({ index, type }: PurpleRegistry): BoardTile => ({
  id: index,
  team: 'purple',
  tile: <BasicTile index={index} team="purple" type={type} />,
});

export const Registry: BoardTile[] = [generatePurpleRegistryTile({ index: 39, type: 'curva-NE' })];

export default Registry;
