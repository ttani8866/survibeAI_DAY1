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
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import { useRouter } from "next/navigation";

const goals = [
  {
    value: "quality",
    label: "コードの品質を上げたい",
    desc: "より読みやすく、保守しやすいコードを書く",
    icon: CodeIcon,
  },
  {
    value: "learn",
    label: "新しい言語を習得したい",
    desc: "未経験の言語やフレームワークに挑戦",
    icon: SchoolIcon,
  },
  {
    value: "speed",
    label: "開発スピードを上げたい",
    desc: "効率的なコーディングで生産性向上",
    icon: SpeedIcon,
  },
  {
    value: "review",
    label: "レビュー工数を減らしたい",
    desc: "AIによる事前レビューでチーム効率化",
    icon: GroupsIcon,
  },
];

export default function GoalPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleGoalChange = (
    _: React.MouseEvent<HTMLElement>,
    newGoals: string[]
  ) => {
    setSelectedGoals(newGoals);
  };

  const handleNext = () => {
    router.push("/onboarding/complete");
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
            width: "75%",
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
          STEP 3 OF 4
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
          SET YOUR GOAL
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            mb: 6,
            fontSize: "1.125rem",
          }}
        >
          AIがあなたの目標達成をサポートします。
          <br />
          <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>
            （複数選択可）
          </span>
        </Typography>

        {/* Goals */}
        <ToggleButtonGroup
          value={selectedGoals}
          onChange={handleGoalChange}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <ToggleButton
                key={goal.value}
                value={goal.value}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  py: 2.5,
                  px: 3,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px !important",
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "rgba(99, 102, 241, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ color: "#6366f1" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{goal.label}</Typography>
                    <Typography
                      sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}
                    >
                      {goal.desc}
                    </Typography>
                  </Box>
                </Box>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 2, mt: 6 }}>
          <Button
            component={Link}
            href="/onboarding/about"
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
            disabled={selectedGoals.length === 0}
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

