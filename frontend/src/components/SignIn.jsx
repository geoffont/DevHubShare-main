import React from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import BasicModal from "./BasicModal";

const schema = Yup.object({
  email: Yup.string().email("Email non valide").required("Email requis"),
  password: Yup.string()
    .min(8, "8 caractères minimum")
    .required("Mot de passe requis"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          { email: values.email, password: values.password },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId.toString());
        navigate("/creer-post");
      } catch {
        helpers.setErrors({ submit: "Email ou mot de passe invalide" });
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - var(--header-height) - var(--footer-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: "#FFFFFF",
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366F1, #4F46E5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#0F172A", mb: 0.5 }}
          >
            Connexion
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: 14 }}>
            Content de vous revoir !
          </Typography>
        </Box>

        {formik.errors.submit && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {formik.errors.submit}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Adresse email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={formik.isSubmitting}
            sx={{ py: 1.5, fontSize: 15, borderRadius: 2.5, mb: 2 }}
          >
            Se connecter
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <BasicModal />
            <Typography sx={{ fontSize: 13, color: "#64748B" }}>
              Pas de compte ?{" "}
              <Link
                to="/inscription"
                style={{
                  color: "#6366F1",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                S'inscrire
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
