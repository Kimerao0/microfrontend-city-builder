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

interface RemoteTileProps {
  cellIndex: number;
  cellType: TileType;
  team: Teams;
}

export const RemoteTile: React.FC<RemoteTileProps> = ({
  cellIndex,
  cellType,
  team,
}) => {
  const getTileImage = (type?: TileType) => {
    switch (type) {
      case "curva-NE":
      case "curva-NW":
      case "curva-SE":
      case "curva-SW":
        return CurvaImg;
      case "rettilineo-EW":
      case "rettilineo-NS":
        return RettilineoImg;

      case "giardino":
        return GiardinoImg;
      case "prato":
        return PratoImg;
      case "curva-tram-NE":
      case "curva-tram-NW":
      case "curva-tram-SE":
      case "curva-tram-SW":
        return CurvaTramImg;
      case "rettilineo-tram-EW":
      case "rettilineo-tram-NS":
        return RettilineoTramImg;
      default:
        return IncrocioImg;
    }
  };
  const getRotation = (type?: TileType) => {
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
          backgroundImage: `url(${getTileImage(cellType)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: getRotation(cellType) || undefined,
        }}
      />
    </div>
  );
};
