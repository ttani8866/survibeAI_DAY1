"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/navigation";

const experienceLevels = [
  { value: "beginner", label: "完全初心者", desc: "プログラミング未経験" },
  { value: "learning", label: "独学で少し触った程度", desc: "基本的な文法は理解" },
  { value: "junior", label: "実務経験あり（1〜3年）", desc: "チームで開発経験あり" },
  { value: "senior", label: "ベテラン（3年以上）", desc: "アーキテクチャ設計も可能" },
];

const languages = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "other", label: "その他" },
];

export default function AboutPage() {
  const router = useRouter();
  const [experience, setExperience] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  const handleNext = () => {
    router.push("/onboarding/goal");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
        py: 8,
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
            width: "50%",
            height: "100%",
            bgcolor: "#6366f1",
            transition: "width 0.3s",
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
          STEP 2 OF 4
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
          TELL US ABOUT YOU
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            mb: 6,
            fontSize: "1.125rem",
          }}
        >
          最適な学習パスをAIが設計します。
        </Typography>

        {/* Question 1 */}
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 2,
              fontWeight: 600,
            }}
          >
            プログラミング経験は？
          </Typography>

          <ToggleButtonGroup
            value={experience}
            exclusive
            onChange={(_, value) => value && setExperience(value)}
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            {experienceLevels.map((level) => (
              <ToggleButton
                key={level.value}
                value={level.value}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  py: 2,
                  px: 3,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px !important",
                  color: "#fff",
                  textTransform: "none",
                  "&.Mui-selected": {
                    bgcolor: "rgba(99, 102, 241, 0.2)",
                    borderColor: "#6366f1",
                    "&:hover": {
                      bgcolor: "rgba(99, 102, 241, 0.3)",
                    },
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{level.label}</Typography>
                  <Typography
                    sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}
                  >
                    {level.desc}
                  </Typography>
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Question 2 */}
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 2,
              fontWeight: 600,
            }}
          >
            メインで使いたい言語は？
          </Typography>

          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={(_, value) => value && setLanguage(value)}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {languages.map((lang) => (
              <ToggleButton
                key={lang.value}
                value={lang.value}
                sx={{
                  px: 3,
                  py: 1.5,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px !important",
                  color: "#fff",
                  textTransform: "none",
                  "&.Mui-selected": {
                    bgcolor: "rgba(99, 102, 241, 0.2)",
                    borderColor: "#6366f1",
                    "&:hover": {
                      bgcolor: "rgba(99, 102, 241, 0.3)",
                    },
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                {lang.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 2, mt: 6 }}>
          <Button
            component={Link}
            href="/onboarding/signup"
            startIcon={<ArrowBackIcon />}
            sx={{
              py: 1.5,
              px: 3,
              color: "rgba(255,255,255,0.6)",
              textTransform: "none",
              "&:hover": {
                color: "#fff",
                bgcolor: "transparent",
              },
            }}
          >
            戻る
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
            disabled={!experience || !language}
            sx={{
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
              "&:disabled": {
                bgcolor: "rgba(255,255,255,0.2)",
                color: "rgba(0,0,0,0.4)",
              },
            }}
          >
            次へ進む
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

