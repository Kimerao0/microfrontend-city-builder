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
  "prato",
  "giardino",
  "parcheggio",
] as const;

export type TileType = (typeof tileTypesList)[number];

export const specialTyleList = [
  "stazione",
  "stadio",
  "municipio",
  "statua",
  "ospedale",
  "centrale",
] as const;

export type SpecialTileType = (typeof specialTyleList)[number];

export const poweredNeededTileList: TileType[] = [
  "curva-tram-NE",
  "curva-tram-NW",
  "curva-tram-SE",
  "curva-tram-SW",
  "rettilineo-tram-NS",
  "rettilineo-tram-EW",
  "giardino",
];

// contracts/powerStationPosition.ts
export type StationPosition = {
  positions: number[];
};
export const EVENT_STATION_POS = "mf:power:station:position";
