"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

export default function AuthHeader() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut({ callbackUrl: "/" });
  };

  return (
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {status === "loading" ? (
            <CircularProgress size={24} sx={{ color: "rgba(255,255,255,0.5)" }} />
          ) : session?.user ? (
            <>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.875rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {session.user.name}
              </Typography>

              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar
                  src={session.user.image || undefined}
                  alt={session.user.name || "User"}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    bgcolor: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    minWidth: 200,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {session.user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {session.user.email}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
                <MenuItem
                  component={Link}
                  href="/dashboard"
                  onClick={handleMenuClose}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}
                >
                  ダッシュボード
                </MenuItem>
                <MenuItem
                  onClick={handleSignOut}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}
                >
                  ログアウト
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
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
                href="/auth/signin"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                  textTransform: "none",
                  px: 3,
                  textDecoration: "none",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                ログイン
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

