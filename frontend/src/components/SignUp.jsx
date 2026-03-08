import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Chip } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  pseudo: Yup.string().required("Le pseudo est requis"),
  email: Yup.string()
    .email("Adresse e-mail invalide")
    .required("L'adresse e-mail est requise"),
  password: Yup.string()
    .min(8, "8 caractères minimum")
    .required("Le mot de passe est requis"),
});

export default function SignUp() {
  const [languageId, setLanguageId] = useState([]);
  const [sideLanguages, setSideLanguages] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { pseudo: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:4000/users", {
          pseudo: values.pseudo,
          email: values.email,
          password: values.password,
          language_id: languageId,
        })
        .then(() => navigate("/connexion"))
        .catch(() => {});
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/languages")
      .then((r) => setSideLanguages(r.data))
      .catch(() => {});
  }, []);

  const toggleLanguage = (id) => {
    setLanguageId((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

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
          maxWidth: 460,
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
            <PersonAddOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#0F172A", mb: 0.5 }}
          >
            Créer un compte
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: 14 }}>
            Rejoignez la communauté DevHubSHARE
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Pseudo"
            name="pseudo"
            value={formik.values.pseudo}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.pseudo)}
            helperText={formik.errors.pseudo}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Adresse email"
            name="email"
            type="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
            sx={{ mb: 2.5 }}
          />

          {/* Language chips */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: "#475569", mb: 1.5 }}
            >
              Langages préférés (optionnel)
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {sideLanguages.map((lang) => {
                const selected = languageId.includes(lang.id);
                return (
                  <Chip
                    key={lang.id}
                    label={lang.language_name}
                    onClick={() => toggleLanguage(lang.id)}
                    sx={{
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: selected ? 600 : 400,
                      backgroundColor: selected ? "#EEF2FF" : "#F8FAFC",
                      color: selected ? "#6366F1" : "#64748B",
                      border: selected
                        ? "1.5px solid #6366F1"
                        : "1px solid #E2E8F0",
                      "&:hover": {
                        backgroundColor: selected ? "#E0E7FF" : "#F1F5F9",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={formik.isSubmitting}
            sx={{ py: 1.5, fontSize: 15, borderRadius: 2.5, mb: 2 }}
          >
            Créer mon compte
          </Button>

          <Typography
            sx={{ fontSize: 13, color: "#64748B", textAlign: "center" }}
          >
            Déjà inscrit ?{" "}
            <Link
              to="/connexion"
              style={{
                color: "#6366F1",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Se connecter
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
