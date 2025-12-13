"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

