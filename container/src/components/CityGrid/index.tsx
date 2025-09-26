import { Button } from "@mui/material";
import * as React from "react";
import { shuffle } from "../../utils/arrayMethods";

export type TileProps = {
  row: number; // 0..9
  col: number; // 0..9
};

export type CityGridProps = {
  tiles: React.ComponentType<TileProps>[];
};

export const CityGrid: React.FC<CityGridProps> = ({ tiles }) => {
  const [colorsArray, setColorsArray] = React.useState<string[] | null>(null);
  const rows = 10;
  const cols = 10;
  const items = React.useMemo(
    () => Array.from({ length: rows * cols }, (_, i) => i),
    []
  );

  const handleColorMap = () => {
    const colors = [
      "#e24334ff", 
      "#0b3f7aff", 
      "#2d7a2dff",
      "#a724a7ff"  
    ];
    const colorsArray = colors.map((color) => {
      return Array.from({ length: rows*cols/4 }, () => color);
    }).flat();
    
    const shuffledColors = shuffle(colorsArray);
    setColorsArray(shuffledColors);
    
  }

  return (<>
    <div
      role="table"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 4,
        width: "100%",
        height: "100%",
      }}
    >     
      {items.map((index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const cellIndex = (row*10+col)+1

        const Tile = tiles[index];

        return (
          <div
            role="cell"
            key={index}
            id={`${cellIndex}`}
          >
            {Tile ? <Tile row={row} col={col} /> : <div style={{ background: colorsArray === null ? "#724900" : colorsArray[index], height: "100%", aspectRatio: "1/1" }} ><span>{cellIndex}</span></div>}
          </div>
        );
      })}
    </div>
    <Button variant="contained" color="primary" onClick={handleColorMap} style={{marginTop: '16px'}}>
      Color map
    </Button>
    </>
  );
};
