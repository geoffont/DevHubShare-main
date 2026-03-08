import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalSuppression from "./ModalSuppression";

function RegisteredInformations() {
  const [currentUser, setCurrentUser] = useState({});
  const [userLanguages, setUserLanguages] = useState([]);
  const [sideLanguages, setSideLanguages] = useState([]);
  const [languageId, setLanguageId] = useState([]);
  const [userUpdate, setUserUpdate] = useState({});
  const [pseudo, setPseudo] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [userText, setUserText] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:4000/languages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setSideLanguages(r.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setCurrentUser(r.data));
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios
        .get(`http://localhost:4000/user_has_language/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) =>
          setUserLanguages(
            r.data.map((l) => ({ language_name: l.language_name }))
          )
        );
    }
  }, [currentUser]);

  const handleSaveChanges = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:4000/users/${userId}`,
        { ...userUpdate, languageId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          navigate("/mon-compte");
        }, 1000);
      });
  };

  function handleLanguageChange(id) {
    setLanguageId((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  }

  const makeHandler = (setter, key) => (e) => {
    setter(e.target.value);
    setUserUpdate((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const fields = [
    {
      label: `Pseudo${currentUser.pseudo ? ` (${currentUser.pseudo})` : ""}`,
      value: pseudo,
      onChange: makeHandler(setPseudo, "pseudo"),
      id: "pseudo",
      required: true,
    },
    {
      label: `Prénom${
        currentUser.firstname ? ` (${currentUser.firstname})` : ""
      }`,
      value: firstname,
      onChange: makeHandler(setFirstname, "firstname"),
      id: "firstname",
    },
    {
      label: `Nom${currentUser.lastname ? ` (${currentUser.lastname})` : ""}`,
      value: lastname,
      onChange: makeHandler(setLastname, "lastname"),
      id: "lastname",
    },
    {
      label: `Email${currentUser.email ? ` (${currentUser.email})` : ""}`,
      value: email,
      onChange: makeHandler(setEmail, "email"),
      id: "email",
      required: true,
      type: "email",
    },
    {
      label: `Poste actuel${
        currentUser.workplace ? ` (${currentUser.workplace})` : ""
      }`,
      value: workplace,
      onChange: makeHandler(setWorkplace, "workplace"),
      id: "workplace",
    },
    {
      label: `GitHub${currentUser.github ? ` (${currentUser.github})` : ""}`,
      value: github,
      onChange: makeHandler(setGithub, "github"),
      id: "github",
    },
    {
      label: `LinkedIn${
        currentUser.linkedin ? ` (${currentUser.linkedin})` : ""
      }`,
      value: linkedin,
      onChange: makeHandler(setLinkedin, "linkedin"),
      id: "linkedin",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box
          component="form"
          onSubmit={handleSaveChanges}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#0F172A", mb: 2.5 }}
          >
            Modifier mes informations
          </Typography>

          {saved && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              Modifications enregistrées !
            </Alert>
          )}

          <Grid container spacing={2}>
            {fields.map((f) => (
              <Grid item xs={12} key={f.id}>
                <TextField
                  label={f.label}
                  value={f.value}
                  onChange={f.onChange}
                  fullWidth
                  size="small"
                  type={f.type || "text"}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F8FAFC",
                      "& fieldset": { borderColor: "#E2E8F0" },
                      "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                    },
                  }}
                />
              </Grid>
            ))}

            {userLanguages.length > 0 && (
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#475569",
                    mb: 1,
                  }}
                >
                  Langages actuels
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {userLanguages.map((lang) => (
                    <Chip
                      key={lang.language_name}
                      label={lang.language_name}
                      size="small"
                      sx={{
                        backgroundColor: "#EEF2FF",
                        color: "#6366F1",
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: 12, fontWeight: 600, color: "#475569", mb: 1 }}
              >
                Choisir mes langages préférés
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {sideLanguages.map((language) => (
                  <FormControlLabel
                    key={language.id}
                    control={
                      <Checkbox
                        checked={languageId.includes(language.id)}
                        onChange={() => handleLanguageChange(language.id)}
                        size="small"
                        sx={{ "&.Mui-checked": { color: "#6366F1" } }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 13 }}>
                        {language.language_name}
                      </Typography>
                    }
                  />
                ))}
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Enregistrer
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: 11, color: "#94A3B8" }}>
                * Champs obligatoires
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography
            sx={{ fontSize: 12, fontWeight: 600, color: "#475569", mb: 1 }}
          >
            Texte libre
          </Typography>
          <TextField
            label="Votre texte ici"
            value={userText}
            onChange={makeHandler(setUserText, "user_text")}
            multiline
            minRows={8}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F8FAFC",
                "& fieldset": { borderColor: "#E2E8F0" },
                "&.Mui-focused fieldset": { borderColor: "#6366F1" },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <ModalSuppression />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisteredInformations;
