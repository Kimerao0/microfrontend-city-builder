export type Teams = "red" | "blue" | "green" | "purple";

export interface BoardTile {
  id: number;
  team: Teams;
  tile: React.JSX.Element;
}

export const tileTypesList = [
  "curva-NE",
  "curva-NW",
  "curva-SE",
  "curva-SW",
  "rettilineo-NS",
  "rettilineo-EW",
  "incrocio",
  "curva-tram-NE",
  "curva-tram-NW",
  "curva-tram-SE",
  "curva-tram-SW",
  "rettilineo-tram-NS",
  "rettilineo-tram-EW",
  "giardino",
  "prato",
] as const;

export type TileType = (typeof tileTypesList)[number];

// contracts/powerStationPosition.ts
export type StationPosition = {
  position: number;
};
export const EVENT_STATION_POS = "mf:power:station:position";
