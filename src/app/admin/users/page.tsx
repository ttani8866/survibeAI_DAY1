"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AdminLayout from "@/components/AdminLayout";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "user" | "admin";
  createdAt: string;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 編集ダイアログ
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<"user" | "admin">("user");

  // 削除確認ダイアログ
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // 通知
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        throw new Error("ユーザー一覧の取得に失敗しました");
      }
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchUsers();
    }
  }, [status, session, fetchUsers]);

  // 権限変更
  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setNewRole(user.role);
    setEditDialogOpen(true);
  };

  const handleRoleChange = (event: SelectChangeEvent<"user" | "admin">) => {
    setNewRole(event.target.value as "user" | "admin");
  };

  const handleUpdateRole = async () => {
    if (!editingUser) return;

    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "更新に失敗しました");
      }

      setSnackbar({
        open: true,
        message: "権限を更新しました",
        severity: "success",
      });
      setEditDialogOpen(false);
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "更新に失敗しました",
        severity: "error",
      });
    }
  };

  // 削除
  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "削除に失敗しました");
      }

      setSnackbar({
        open: true,
        message: "ユーザーを削除しました",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "削除に失敗しました",
        severity: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "",
      width: 60,
      sortable: false,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Avatar
          src={params.row.image || undefined}
          alt={params.row.name}
          sx={{ width: 36, height: 36 }}
        />
      ),
    },
    {
      field: "name",
      headerName: "名前",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "メールアドレス",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "権限",
      width: 120,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Chip
          label={params.row.role === "admin" ? "管理者" : "ユーザー"}
          size="small"
          sx={{
            bgcolor:
              params.row.role === "admin"
                ? "rgba(249, 115, 22, 0.2)"
                : "rgba(255,255,255,0.1)",
            color: params.row.role === "admin" ? "#f97316" : "#fff",
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "登録日",
      width: 140,
      renderCell: (params: GridRenderCellParams<User>) =>
        new Date(params.row.createdAt).toLocaleDateString("ja-JP"),
    },
    {
      field: "actions",
      headerName: "操作",
      width: 140,
      sortable: false,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEditClick(params.row)}
            sx={{
              minWidth: 40,
              borderColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              "&:hover": {
                borderColor: "#f97316",
                bgcolor: "rgba(249, 115, 22, 0.1)",
              },
            }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteClick(params.row)}
            sx={{
              minWidth: 40,
              borderColor: "rgba(239, 68, 68, 0.5)",
              "&:hover": {
                borderColor: "#ef4444",
                bgcolor: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      ),
    },
  ];

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
            ユーザー管理
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            登録ユーザーの一覧と管理
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* データグリッド */}
        <Box
          sx={{
            height: 600,
            width: "100%",
            "& .MuiDataGrid-root": {
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.02)",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "rgba(255,255,255,0.05)",
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.1)",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#fff",
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: "rgba(255,255,255,0.03)",
            },
            "& .MuiDataGrid-footerContainer": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiTablePagination-selectIcon": {
              color: "#fff",
            },
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>

        {/* 権限変更ダイアログ */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: "#1a1a1a",
              color: "#fff",
              minWidth: 400,
            },
          }}
        >
          <DialogTitle>権限変更</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Typography sx={{ mb: 2 }}>
                {editingUser?.name} ({editingUser?.email})
              </Typography>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
                  権限
                </InputLabel>
                <Select
                  value={newRole}
                  onChange={handleRoleChange}
                  label="権限"
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f97316",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },
                  }}
                >
                  <MenuItem value="user">ユーザー</MenuItem>
                  <MenuItem value="admin">管理者</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setEditDialogOpen(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleUpdateRole}
              variant="contained"
              sx={{
                bgcolor: "#f97316",
                "&:hover": { bgcolor: "#ea580c" },
              }}
            >
              更新
            </Button>
          </DialogActions>
        </Dialog>

        {/* 削除確認ダイアログ */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: "#1a1a1a",
              color: "#fff",
              minWidth: 400,
            },
          }}
        >
          <DialogTitle>ユーザー削除の確認</DialogTitle>
          <DialogContent>
            <Typography>
              {deletingUser?.name} ({deletingUser?.email})
              を削除してもよろしいですか？
            </Typography>
            <Typography
              sx={{ mt: 2, color: "#ef4444", fontSize: "0.875rem" }}
            >
              この操作は取り消せません。
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              sx={{
                bgcolor: "#ef4444",
                "&:hover": { bgcolor: "#dc2626" },
              }}
            >
              削除
            </Button>
          </DialogActions>
        </Dialog>

        {/* スナックバー */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
}

