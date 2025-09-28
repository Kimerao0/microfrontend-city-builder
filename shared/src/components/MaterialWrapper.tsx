import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

const MaterialWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MaterialWrapper;
