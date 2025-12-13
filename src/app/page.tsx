"use client";

import React from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
      }}
    >
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontSize: "1rem",
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

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
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
              "radial-gradient(ellipse at 80% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800 }}>
            <Typography
              variant="overline"
              sx={{
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.3em",
                fontSize: "0.75rem",
                mb: 2,
                display: "block",
              }}
            >
              WE ARE A
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "3rem", md: "5.5rem" },
                lineHeight: 1,
                letterSpacing: "-0.02em",
                mb: 1,
              }}
            >
              CODE
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "3rem", md: "5.5rem" },
                lineHeight: 1,
                letterSpacing: "-0.02em",
                mb: 4,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              INNOVATOR
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.125rem",
                lineHeight: 1.8,
                maxWidth: 500,
                mb: 5,
              }}
            >
              AIがあなたのコードを24時間レビュー。
              <br />
              プロフェッショナルなコードを書くための、
              <br />
              新しいスタンダードを創造する。
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                href="/onboarding/signup"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#fff",
                  color: "#0a0a0a",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 0,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                無料で始める
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/contact"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: 0,
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "transparent",
                  },
                }}
              >
                お問い合わせ
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 15,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.3em",
              fontSize: "0.75rem",
              mb: 6,
              display: "block",
            }}
          >
            OUR FEATURES
          </Typography>

          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  borderLeft: "1px solid rgba(255,255,255,0.2)",
                  pl: 4,
                  py: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    mb: 2,
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  01
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  AI Code Review
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                  }}
                >
                  AIが改善点を指摘し、より良い書き方を提案。
                  プロのようなコードを書けるようになる。
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  borderLeft: "1px solid rgba(255,255,255,0.2)",
                  pl: 4,
                  py: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    mb: 2,
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  02
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Learning Path
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                  }}
                >
                  初心者にも分かりやすい解説で、
                  ステップバイステップで学習できる。
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  borderLeft: "1px solid rgba(255,255,255,0.2)",
                  pl: 4,
                  py: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    mb: 2,
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  03
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  24/7 Support
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                  }}
                >
                  困った瞬間にすぐ質問して解決。
                  24時間いつでもAIがサポート。
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 15,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 3,
            }}
          >
            Ready to innovate?
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.125rem",
              mb: 5,
            }}
          >
            今すぐ無料で始めて、コーディングスキルを次のレベルへ。
          </Typography>
          <Button
            component={Link}
            href="/onboarding/signup"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#fff",
              color: "#0a0a0a",
              textTransform: "none",
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 0,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            無料で始める
          </Button>
        </Container>
      </Box>

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
