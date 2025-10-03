import BasicTile, { type GreenRemoteTileWrapperProps } from './components/BasicTile';
import type { BoardTile } from '../../shared/src/types';

type GreenRegistry = Omit<GreenRemoteTileWrapperProps, 'team'>;

const generateGreenRegistryTile = ({ index, type, withPowerStation }: GreenRegistry): BoardTile => ({
  id: index,
  team: 'green',
  tile: <BasicTile index={index} team="green" type={type} withPowerStation={withPowerStation} />,
});

export const Registry: BoardTile[] = [
  generateGreenRegistryTile({ index: 5, type: 'curva-NE' }),
  generateGreenRegistryTile({ index: 47, type: 'rettilineo-tram-NS', withPowerStation: true }),
  generateGreenRegistryTile({ index: 61, type: 'rettilineo-tram-NS', withPowerStation: true }),
  generateGreenRegistryTile({ index: 75, type: 'rettilineo-tram-NS', withPowerStation: true }),
];

export default Registry;
