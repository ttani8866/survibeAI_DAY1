"use client";

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "next/link";

export default function CompletePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "150%",
          height: "150%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0a0a0a 70%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Progress Indicator */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          bgcolor: "rgba(255,255,255,0.1)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "#22c55e",
            transition: "width 0.3s",
          }}
        />
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Logo */}
        <Typography
          component={Link}
          href="/"
          sx={{
            display: "block",
            fontWeight: 700,
            letterSpacing: "0.1em",
            fontSize: "1rem",
            mb: 6,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          SURVIVE<span style={{ fontWeight: 300 }}>AI</span>
        </Typography>

        {/* Success Icon */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "rgba(34, 197, 94, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 4,
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": {
                boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.4)",
              },
              "70%": {
                boxShadow: "0 0 0 20px rgba(34, 197, 94, 0)",
              },
              "100%": {
                boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
              },
            },
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 50, color: "#22c55e" }} />
        </Box>

        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          YOU&apos;RE READY TO
          <br />
          INNOVATE
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            mb: 6,
            fontSize: "1.125rem",
            lineHeight: 1.8,
          }}
        >
          24時間、AIがあなたのコードを見守ります。
          <br />
          今すぐ最初のコードをレビューしましょう。
        </Typography>

        {/* CTAs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 2,
              bgcolor: "#fff",
              color: "#0a0a0a",
              textTransform: "none",
              fontSize: "1.125rem",
              fontWeight: 600,
              borderRadius: 1,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            最初のコードをレビューする
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<MenuBookIcon />}
            sx={{
              py: 2,
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: 1,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Learning Pathを見る
          </Button>
        </Box>

        {/* Skip to Dashboard */}
        <Button
          component={Link}
          href="/"
          sx={{
            mt: 4,
            color: "rgba(255,255,255,0.4)",
            textTransform: "none",
            "&:hover": {
              color: "#fff",
              bgcolor: "transparent",
            },
          }}
        >
          ダッシュボードに移動
        </Button>
      </Container>
    </Box>
  );
}

