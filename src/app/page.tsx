"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// ★ MUI Grid の正しい import（Vercel / Next.js / MUI 全環境で動く）
import Grid from "@mui/material/Grid";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            SurviveAI
          </Typography>
          <Button variant="outlined" color="inherit">
            ログイン
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          AIがあなたのコードを<br />24時間レビュー
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          プロのようなコードを書けるようになる。
          AI搭載のプログラミング学習サービス
        </Typography>

        <Button variant="contained" size="large" sx={{ px: 5, py: 1.5 }}>
          無料で始める
        </Button>
      </Container>

      {/* Features */}
      <Container sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  コードレビュー
                </Typography>
                <Typography color="text.secondary">
                  AIが改善点を指摘し、より良い書き方を提案します。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  学習効率UP
                </Typography>
                <Typography color="text.secondary">
                  初心者にも分かりやすい解説でステップ学習できます。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  24時間サポート
                </Typography>
                <Typography color="text.secondary">
                  困った瞬間にすぐ質問して解決できます。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 5, textAlign: "center", bgcolor: "#f5f5f5" }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 SurviveAI All Rights Reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
