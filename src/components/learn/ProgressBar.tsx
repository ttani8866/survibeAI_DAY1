"use client";

import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <Box sx={{ mb: 4 }}>
      {label && (
        <Typography
          sx={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.75rem",
            mb: 1,
          }}
        >
          {label}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              },
            }}
          />
        </Box>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.875rem",
            fontWeight: 600,
            minWidth: 50,
          }}
        >
          {current}/{total}
        </Typography>
      </Box>
    </Box>
  );
}

