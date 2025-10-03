import BasicTile, { type GreenRemoteTileWrapperProps } from './components/BasicTile';
import type { BoardTile } from '../../shared/src/types';

type GreenRegistry = Omit<GreenRemoteTileWrapperProps, 'team'>;

const generateGreenRegistryTile = ({ index, type }: GreenRegistry): BoardTile => ({
  id: index,
  team: 'green',
  tile: <BasicTile index={index} team="green" type={type} />,
});

export const Registry: BoardTile[] = [generateGreenRegistryTile({ index: 80, type: 'rettilineo-EW' })];

export default Registry;
