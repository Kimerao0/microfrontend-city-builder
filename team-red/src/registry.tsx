import BasicTile, { type RedRemoteTileWrapperProps } from './components/BasicTile';
import type { BoardTile } from '../../shared/src/types';

type RedRegistry = Omit<RedRemoteTileWrapperProps, 'team'>;

const generateRedRegistryTile = ({ index, type }: RedRegistry): BoardTile => ({
  id: index,
  team: 'red',
  tile: <BasicTile index={index} team="red" type={type} />,
});

export const Registry: BoardTile[] = [generateRedRegistryTile({ index: 22, type: 'curva-NE' })];

export default Registry;
