import Test1 from './components/Test1';
import type { BoardTile } from '../../shared/types';

export const Registry: BoardTile[] = [
  {
    id: 55,
    team: 'blue',
    tile: <Test1 />,
  },
];

export default Registry;
