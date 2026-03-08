import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, TextField, Typography, Chip } from "@mui/material";

function InfoUser() {
  const [currentUser, setCurrentUser] = useState({});
  const [userLanguages, setUserLanguages] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCurrentUser(response.data));
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios
        .get(`http://localhost:4000/user_has_language/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserLanguages(
            response.data.map((lang) => ({ language_name: lang.language_name }))
          );
        });
    }
  }, [currentUser]);

  const fields = [
    { label: "Pseudo", value: currentUser.pseudo },
    { label: "Prénom", value: currentUser.firstname },
    { label: "Nom", value: currentUser.lastname },
    { label: "Email", value: currentUser.email },
    { label: "Poste actuel", value: currentUser.workplace },
    { label: "GitHub", value: currentUser.github },
    { label: "LinkedIn", value: currentUser.linkedin },
  ];

  return (
    <Box
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
        Mes informations
      </Typography>
      <Grid container spacing={2}>
        {fields.map((f) => (
          <Grid item xs={12} key={f.label}>
            <TextField
              label={f.label}
              value={f.value || ""}
              fullWidth
              size="small"
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F8FAFC",
                  "& fieldset": { borderColor: "#E2E8F0" },
                },
              }}
            />
          </Grid>
        ))}
        {userLanguages.length > 0 && (
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 12, fontWeight: 600, color: "#475569", mb: 1 }}
            >
              Langages
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
      </Grid>
    </Box>
  );
}

export default InfoUser;
