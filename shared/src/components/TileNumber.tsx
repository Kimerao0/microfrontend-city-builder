import { styled } from "@mui/material";

export const TileNumber = styled("span")<{ val: number }>(({ val }) => {
  const smallFs = val > 9 ? 11 : 13;
  const size = 18;
  return {
    borderRadius: "50%",
    backgroundColor: "#00000075",
    width: size,
    height: size,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: val > 99 ? 9 : smallFs,
    lineHeight: size,
    color: "white",
  };
});
