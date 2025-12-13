"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  Fade,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.4)",
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
  "& .MuiFormHelperText-root": {
    color: "#ef4444",
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "名前を入力してください";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "件名を入力してください";
    }
    if (!formData.message.trim()) {
      newErrors.message = "本文を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setServerError(
          data.errors?.join(", ") || data.error || "送信に失敗しました"
        );
      }
    } catch {
      setServerError("ネットワークエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 送信完了画面
  if (isSuccess) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#0a0a0a", color: "#fff" }}>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Toolbar>
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
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ pt: 20, pb: 10 }}>
          <Fade in={true} timeout={500}>
            <Box sx={{ textAlign: "center" }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: 80, color: "#22c55e", mb: 3 }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, mb: 2 }}
              >
                送信完了
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  mb: 5,
                  lineHeight: 1.8,
                }}
              >
                お問合せありがとうございます。
                <br />
                内容を確認次第、ご連絡いたします。
              </Typography>
              <Button
                component={Link}
                href="/"
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  borderRadius: 0,
                  border: "1px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "transparent",
                  },
                }}
              >
                トップページに戻る
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  // お問合せフォーム
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0a0a0a", color: "#fff" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ pt: 16, pb: 10 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "rgba(255,255,255,0.5)",
            textTransform: "none",
            mb: 4,
            "&:hover": { color: "#fff", bgcolor: "transparent" },
          }}
        >
          Back to Home
        </Button>

        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.3em",
            fontSize: "0.75rem",
            mb: 2,
            display: "block",
          }}
        >
          CONTACT US
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
          }}
        >
          お問い合わせ
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.5)",
            mb: 5,
            lineHeight: 1.8,
          }}
        >
          ご質問・ご要望がございましたら、
          <br />
          お気軽にお問い合わせください。
        </Typography>

        {serverError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              bgcolor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="お名前"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            required
            disabled={isSubmitting}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            label="メールアドレス"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            required
            disabled={isSubmitting}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            label="件名"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            error={!!errors.subject}
            helperText={errors.subject}
            margin="normal"
            required
            disabled={isSubmitting}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            label="本文"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            margin="normal"
            required
            multiline
            rows={6}
            disabled={isSubmitting}
            sx={textFieldStyles}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{
              mt: 4,
              py: 1.5,
              bgcolor: "#fff",
              color: "#0a0a0a",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 0,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
              "&:disabled": {
                bgcolor: "rgba(255,255,255,0.3)",
                color: "rgba(0,0,0,0.5)",
              },
            }}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
