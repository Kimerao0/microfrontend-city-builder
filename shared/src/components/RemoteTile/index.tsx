import React from "react";
import { TileNumber } from "../TileNumber";
import type { Teams, TileType } from "../../types";
import { colors } from "../../values";
import CurvaImg from "../../assets/curva.jpg";
import RettilineoImg from "../../assets/rettilineo.jpg";
import IncrocioImg from "../../assets/incrocio.jpg";
import GiardinoImg from "../../assets/giardino.jpg";
import PratoImg from "../../assets/prato.jpg";
import CurvaTramImg from "../../assets/tram-curva.jpg";
import RettilineoTramImg from "../../assets/tram-rettilineo.jpg";
import { PoweredSpot } from "../../../../shared/src/components/PoweredSpot";
import ParcheggioImg from "../../assets/parcheggio.jpg";
import { PowerStation } from "../../../../shared/src/components/PowerStation";

interface RemoteTileProps {
  cellIndex: number;
  cellType: TileType;
  team: Teams;
  isPowered?: boolean;
  hasPowerStation?: boolean;
  hasMetroStation?: boolean;
}

export const RemoteTile: React.FC<RemoteTileProps> = ({
  cellIndex,
  cellType,
  team,
  isPowered,
  hasPowerStation,
}) => {
  console.log(cellIndex, cellType, team, isPowered, hasPowerStation);
  const isCellPowered = isPowered || hasPowerStation;
  return (
    <div
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <TileNumber val={cellIndex} bgcolor={colors[team]}>
        {cellIndex}
      </TileNumber>
      <div
        style={{
          height: "100%",
          backgroundImage: `url(${getTileImage(cellType, isCellPowered || false)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: getRotation(cellType) || undefined,
        }}
      />
      {isCellPowered && <PoweredSpot />}
      {hasPowerStation && <PowerStation />}
    </div>
  );
};

const getTileImage = (type: TileType, isPowered: boolean) => {
  switch (type) {
    case "curva-NE":
    case "curva-NW":
    case "curva-SE":
    case "curva-SW":
      return CurvaImg;
    case "rettilineo-EW":
    case "rettilineo-NS":
      return RettilineoImg;
    case "prato":
      return PratoImg;
    case "giardino":
      return isPowered ? GiardinoImg : PratoImg;
    case "curva-tram-NE":
    case "curva-tram-NW":
    case "curva-tram-SE":
    case "curva-tram-SW":
      return isPowered ? CurvaTramImg : CurvaImg;
    case "rettilineo-tram-EW":
    case "rettilineo-tram-NS":
      return isPowered ? RettilineoTramImg : RettilineoImg;
    case "parcheggio":
      return ParcheggioImg;
    default:
      return IncrocioImg;
  }
};
const getRotation = (type: TileType) => {
  switch (type) {
    case "curva-NE":
    case "curva-tram-NE":
      return "rotate(-90deg)";
    case "curva-NW":
    case "curva-tram-NW":
      return "rotate(180deg)";
    case "curva-SW":
    case "curva-tram-SW":
    case "rettilineo-EW":
    case "rettilineo-tram-EW":
      return "rotate(90deg)";
    default:
      return "rotate(0deg)";
  }
};
