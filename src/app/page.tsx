"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import CTASection from "@/components/CTASection";
import AuthHeader from "@/components/AuthHeader";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", color: "#fff" }}>
      {/* Header */}
      <AuthHeader />

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
