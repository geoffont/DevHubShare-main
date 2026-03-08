import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CreatePost({
  languageNameSelected,
  setLanguageNameSelected,
}) {
  const [languages, setLanguages] = useState([]);
  const [tag, setTag] = useState("");
  const [post, setPost] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/languages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setLanguages(r.data))
      .catch(() => {});
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!languageNameSelected) {
      setErrorSubmit("La sélection d'un langage est obligatoire");
      return;
    }
    const selectedLanguage = languages.find(
      (l) => l.language_name === languageNameSelected
    );
    axios
      .post(
        "http://localhost:4000/posts",
        {
          user_id: userId,
          language_id: selectedLanguage.id,
          tag,
          post_text: post,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate("/mes-posts"))
      .catch(() => navigate("/erreur400"));
  };

  return (
    <Box sx={{ maxWidth: 680, mx: "auto", mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366F1, #4F46E5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddIcon sx={{ color: "#fff", fontSize: 20 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A" }}>
          Créer un post
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 3,
          p: { xs: 2.5, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {errorSubmit && (
          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            {errorSubmit}
          </Alert>
        )}

        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#475569", mb: 1 }}
          >
            Langage <span style={{ color: "#EF4444" }}>*</span>
          </Typography>
          <Select
            value={languageNameSelected}
            onChange={(e) => {
              setLanguageNameSelected(e.target.value);
              setErrorSubmit("");
            }}
            displayEmpty
            renderValue={(v) => v || "Sélectionner un langage..."}
            size="small"
            fullWidth
            sx={{
              backgroundColor: "#F8FAFC",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.id} value={lang.language_name}>
                <Chip
                  label={lang.language_name}
                  size="small"
                  sx={{
                    backgroundColor: "#EEF2FF",
                    color: "#6366F1",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#475569", mb: 1 }}
          >
            Tag <span style={{ color: "#EF4444" }}>*</span>
          </Typography>
          <TextField
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            placeholder="Ex: bug, question, aide..."
            size="small"
            fullWidth
          />
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#475569", mb: 1 }}
          >
            Contenu du post <span style={{ color: "#EF4444" }}>*</span>
          </Typography>
          <TextField
            value={post}
            onChange={(e) => setPost(e.target.value)}
            multiline
            rows={7}
            required
            fullWidth
            placeholder="Décrivez votre problème ou partagez vos connaissances..."
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ px: 4, borderRadius: 2.5 }}
          >
            Publier le post
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

CreatePost.propTypes = {
  languageNameSelected: PropTypes.string.isRequired,
  setLanguageNameSelected: PropTypes.func.isRequired,
};
