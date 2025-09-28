import React from "react";
import { TileNumber } from "../TileNumber";
import type { Teams } from "../../src/types";

interface RemoteTileProps {
  cellIndex: number;
  cellType: string;
  team: Teams;
}

const RemoteTile: React.FC<RemoteTileProps> = ({
  cellIndex,
  cellType,
  team,
}) => {
  const getTileImage = (type?: string) => {};

  return (
    <div
      style={{
        height: "95%",
        aspectRatio: "1/1",
        backgroundImage: `url(${getTileImage(cellType)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TileNumber val={cellIndex}> {cellIndex}</TileNumber>
    </div>
  );
};

export default RemoteTile;
