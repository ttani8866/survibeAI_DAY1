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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import AdminLayout from "@/components/AdminLayout";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 詳細ダイアログ
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // 削除確認ダイアログ
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  // 通知
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) {
        throw new Error("お問合せ一覧の取得に失敗しました");
      }
      const data = await res.json();
      setContacts(data.contacts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchContacts();
    }
  }, [status, session, fetchContacts]);

  // 詳細表示
  const handleViewClick = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailDialogOpen(true);
  };

  // 削除
  const handleDeleteClick = (contact: Contact) => {
    setDeletingContact(contact);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingContact) return;

    try {
      const res = await fetch(`/api/admin/contacts/${deletingContact.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "削除に失敗しました");
      }

      setSnackbar({
        open: true,
        message: "お問合せを削除しました",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      fetchContacts();
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
      field: "name",
      headerName: "名前",
      width: 150,
    },
    {
      field: "email",
      headerName: "メールアドレス",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "subject",
      headerName: "件名",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "createdAt",
      headerName: "受信日時",
      width: 160,
      renderCell: (params: GridRenderCellParams<Contact>) =>
        new Date(params.row.createdAt).toLocaleString("ja-JP"),
    },
    {
      field: "actions",
      headerName: "操作",
      width: 140,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Contact>) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleViewClick(params.row)}
            sx={{
              minWidth: 40,
              borderColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              "&:hover": {
                borderColor: "#22c55e",
                bgcolor: "rgba(34, 197, 94, 0.1)",
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
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
            お問合せ管理
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            受信したお問合せの一覧と管理
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
            rows={contacts}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>

        {/* 詳細ダイアログ */}
        <Dialog
          open={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: "#1a1a1a",
              color: "#fff",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            お問合せ詳細
            <IconButton
              onClick={() => setDetailDialogOpen(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            {selectedContact && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    送信者
                  </Typography>
                  <Typography>{selectedContact.name}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    メールアドレス
                  </Typography>
                  <Typography>{selectedContact.email}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    件名
                  </Typography>
                  <Typography>{selectedContact.subject}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    本文
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <Typography>{selectedContact.message}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    受信日時
                  </Typography>
                  <Typography>
                    {new Date(selectedContact.createdAt).toLocaleString("ja-JP")}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Button
              onClick={() => setDetailDialogOpen(false)}
              variant="contained"
              sx={{
                bgcolor: "#f97316",
                "&:hover": { bgcolor: "#ea580c" },
              }}
            >
              閉じる
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
          <DialogTitle>お問合せ削除の確認</DialogTitle>
          <DialogContent>
            <Typography>
              「{deletingContact?.subject}」を削除してもよろしいですか？
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

