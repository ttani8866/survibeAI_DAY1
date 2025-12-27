"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AuthHeader from "@/components/AuthHeader";
import CodeIcon from "@mui/icons-material/Code";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ローディング中
  if (status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#0a0a0a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#6366f1" }} />
      </Box>
    );
  }

  // 未認証の場合はログインページへ
  if (!session?.user) {
    router.push("/auth/signin");
    return null;
  }

  const user = session.user;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0a0a0a", color: "#fff" }}>
      <AuthHeader />

      <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
        {/* Welcome Section */}
        <Box
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)",
            border: "1px solid rgba(99,102,241,0.3)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              src={user.image || undefined}
              alt={user.name || "User"}
              sx={{ width: 80, height: 80, border: "3px solid rgba(255,255,255,0.2)" }}
            />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                ようこそ、{user.name}さん！
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mt: 1 }}>
                AIコードレビューで、プログラミングスキルを向上させましょう
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h3" fontWeight={700} sx={{ color: "#6366f1" }}>
                  0
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  レビュー済みコード
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h3" fontWeight={700} sx={{ color: "#22c55e" }}>
                  0
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  改善提案
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h3" fontWeight={700} sx={{ color: "#f59e0b" }}>
                  0
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  学習日数
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
          クイックアクション
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              component={Link}
              href="/code-review"
              fullWidth
              variant="contained"
              startIcon={<CodeIcon />}
              sx={{
                py: 3,
                bgcolor: "#6366f1",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": { bgcolor: "#5558e3" },
              }}
            >
              コードをレビューする
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              component={Link}
              href="/features/learning-path"
              fullWidth
              variant="outlined"
              startIcon={<MenuBookIcon />}
              sx={{
                py: 3,
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "#6366f1",
                  bgcolor: "rgba(99, 102, 241, 0.1)",
                },
              }}
            >
              学習を続ける
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              component={Link}
              href="/ai-chat"
              fullWidth
              variant="outlined"
              startIcon={<ChatIcon />}
              sx={{
                py: 3,
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "#10b981",
                  bgcolor: "rgba(16, 185, 129, 0.1)",
                },
              }}
            >
              AIに聞く
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

