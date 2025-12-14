"use client";

import React from "react";
import { Box, Container, Typography, Button, AppBar, Toolbar } from "@mui/material";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", color: "#fff" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontSize: "1rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            SURVIVE<span style={{ fontWeight: 300 }}>AI</span>
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              component={Link}
              href="/contact"
              sx={{
                color: "rgba(255,255,255,0.7)",
                textTransform: "none",
                fontSize: "0.875rem",
                "&:hover": { color: "#fff" },
              }}
            >
              Contact
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              ログイン
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Animations */}
      <HeroSection />

      {/* Feature Cards with Scroll Animations */}
      <FeatureCards />

      {/* CTA Section with Shimmer Effect */}
      <CTASection />

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.875rem",
              }}
            >
              © 2025 SurviveAI. All Rights Reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                component={Link}
                href="/contact"
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  minWidth: "auto",
                  p: 0,
                  "&:hover": { color: "#fff", bgcolor: "transparent" },
                }}
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
