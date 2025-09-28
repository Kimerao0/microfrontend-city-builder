type Teams = 'blue';

export interface BoardTile {
  id: number;
  team: Teams;
  tile: React.JSX.Element;
}
