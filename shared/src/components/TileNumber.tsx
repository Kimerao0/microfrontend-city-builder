import { styled } from "@mui/material";

export const TileNumber = styled("span")<{ val: number; bgcolor?: string }>(({
  val,
  bgcolor,
}) => {
  const smallFs = val > 9 ? 11 : 13;
  const size = 20;
  return {
    borderRadius: "50%",
    backgroundColor: bgcolor || "#00000075",
    width: size,
    height: size,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: val > 99 ? 9 : smallFs,
    lineHeight: size,
    color: "white",
    position: "absolute",
    top: 4,
    left: 4,
    userSelect: "none",
    pointerEvents: "none",
    zIndex: 2,
    border: "1px solid #ffffff52",
  };
});
