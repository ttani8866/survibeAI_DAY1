"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useRouter } from "next/navigation";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    bgcolor: "rgba(255,255,255,0.05)",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.5)",
    "&.Mui-focused": {
      color: "#6366f1",
    },
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 実際の認証処理
    router.push("/onboarding/about");
  };

  const handleSocialLogin = () => {
    router.push("/onboarding/about");
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
            width: "25%",
            height: "100%",
            bgcolor: "#6366f1",
          }}
        />
      </Box>

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

        {/* Step Indicator */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            mb: 2,
            textAlign: "center",
          }}
        >
          STEP 1 OF 4
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
          START YOUR JOURNEY
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            mb: 5,
            fontSize: "1.125rem",
          }}
        >
          コードの書き方が、今日から変わる。
        </Typography>

        {/* Social Login Buttons */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={handleSocialLogin}
            sx={{
              py: 1.5,
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
              textTransform: "none",
              fontSize: "0.95rem",
              borderRadius: 1,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            GitHubで始める
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleSocialLogin}
            sx={{
              py: 1.5,
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
              textTransform: "none",
              fontSize: "0.95rem",
              borderRadius: 1,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Googleで始める
          </Button>
        </Box>

        <Divider
          sx={{
            my: 3,
            "&::before, &::after": {
              borderColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.4)", px: 2 }}>
            または
          </Typography>
        </Divider>

        {/* Email Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            label="パスワード"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            sx={textFieldStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#fff",
              color: "#0a0a0a",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 1,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            次へ進む
          </Button>
        </Box>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.875rem",
            textAlign: "center",
            mt: 3,
          }}
        >
          無料プランはクレジットカード不要
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.875rem",
            textAlign: "center",
            mt: 4,
          }}
        >
          すでにアカウントをお持ちの方は{" "}
          <Link
            href="/"
            style={{ color: "#6366f1", textDecoration: "none" }}
          >
            ログイン
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

