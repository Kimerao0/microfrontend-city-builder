export type Teams = "red" | "blue" | "green" | "purple";

export interface BoardTile {
  id: number;
  team: Teams;
  tile: React.JSX.Element;
}
