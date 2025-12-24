"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DRAWER_WIDTH = 260;

const menuItems = [
  {
    title: "ダッシュボード",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    title: "ユーザー管理",
    path: "/admin/users",
    icon: <PeopleIcon />,
  },
  {
    title: "お問合せ管理",
    path: "/admin/contacts",
    icon: <EmailIcon />,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* ロゴ */}
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          管理画面
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* メニュー */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ px: 2, py: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "rgba(249, 115, 22, 0.15)" : "transparent",
                  color: isActive ? "#f97316" : "rgba(255,255,255,0.7)",
                  "&:hover": {
                    bgcolor: isActive
                      ? "rgba(249, 115, 22, 0.2)"
                      : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#f97316" : "rgba(255,255,255,0.5)",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* フッター */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          component={Link}
          href="/dashboard"
          sx={{
            borderRadius: 2,
            color: "rgba(255,255,255,0.7)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.5)", minWidth: 40 }}>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText
            primary="サイトに戻る"
            primaryTypographyProps={{ fontSize: "0.9rem" }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0a0a" }}>
      {/* モバイル用AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "#111111",
            boxShadow: "0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              fontWeight={700}
              sx={{
                background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              管理画面
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* サイドバー */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* モバイル用ドロワー */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "#111111",
              borderRight: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* デスクトップ用ドロワー */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "#111111",
              borderRight: "1px solid rgba(255,255,255,0.1)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: 8, md: 0 },
          color: "#fff",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

