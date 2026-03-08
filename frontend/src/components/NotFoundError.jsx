import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";

export default function NotFoundError() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "20px",
          backgroundColor: "#FEF2F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 40, color: "#EF4444" }} />
      </Box>
      <Typography
        variant="h2"
        sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "#0F172A", mb: 1 }}
      >
        Page introuvable
      </Typography>
      <Typography
        sx={{ color: "#64748B", mb: 4, maxWidth: 380, lineHeight: 1.7 }}
      >
        La page que vous recherchez n'existe pas ou a été déplacée.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate("/")}>
        Retour à l'accueil
      </Button>
    </Box>
  );
}
