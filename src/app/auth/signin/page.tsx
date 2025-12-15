"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Container, Typography, Button, Box, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    console.log("Googleログインボタンがクリックされました");
    // 直接APIエンドポイントにリダイレクト
    window.location.href = "/api/auth/signin/google?callbackUrl=/dashboard";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <Typography
          component={Link}
          href="/"
          sx={{
            display: "block",
            textAlign: "center",
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

        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            textAlign: "center",
            mb: 2,
          }}
        >
          ログイン
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            mb: 5,
            fontSize: "1.125rem",
          }}
        >
          アカウントにログインして、AIコードレビューを始めましょう
        </Typography>

        {/* Google Login Button */}
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
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
          Googleでログイン
        </Button>

        <Divider
          sx={{
            my: 4,
            "&::before, &::after": {
              borderColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.4)", px: 2 }}>
            または
          </Typography>
        </Divider>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            fontSize: "0.95rem",
          }}
        >
          アカウントをお持ちでない方も、Googleアカウントで
          <br />
          すぐに始められます
        </Typography>

        {/* Back Link */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "rgba(255,255,255,0.5)",
              textTransform: "none",
              "&:hover": { color: "#fff", bgcolor: "transparent" },
            }}
          >
            トップページに戻る
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

