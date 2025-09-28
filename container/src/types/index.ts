type Teams = 'red' | 'blue' | 'green' | 'purple';

export interface BoardTile {
  index: number;
  team: Teams;
  tile: React.JSX.Element;
}
