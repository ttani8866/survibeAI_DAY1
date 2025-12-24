"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import AdminLayout from "@/components/AdminLayout";

interface Stats {
  totalUsers: number;
  totalContacts: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchStats();
    }
  }, [status, session]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) {
        throw new Error("統計情報の取得に失敗しました");
      }
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // ローディング中
  if (status === "loading" || loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress sx={{ color: "#f97316" }} />
        </Box>
      </AdminLayout>
    );
  }

  // 未認証または権限なし
  if (!session?.user || session.user.role !== "admin") {
    router.push("/admin/forbidden");
    return null;
  }

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* ヘッダー */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            ダッシュボード
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            サービスの概要を確認できます
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 統計カード */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(249, 115, 22, 0.2)",
                  borderColor: "rgba(249, 115, 22, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: "rgba(249, 115, 22, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 28, color: "#f97316" }} />
                  </Box>
                </Box>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  sx={{ color: "#fff", mb: 1 }}
                >
                  {stats?.totalUsers ?? "-"}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  総ユーザー数
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(34, 197, 94, 0.2)",
                  borderColor: "rgba(34, 197, 94, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: "rgba(34, 197, 94, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 28, color: "#22c55e" }} />
                  </Box>
                </Box>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  sx={{ color: "#fff", mb: 1 }}
                >
                  {stats?.totalContacts ?? "-"}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  総お問合せ数
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 追加情報 */}
        <Box
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            ようこそ、{session.user.name}さん
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            サイドメニューから各管理機能にアクセスできます。
          </Typography>
        </Box>
      </Box>
    </AdminLayout>
  );
}

