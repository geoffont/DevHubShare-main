import React from "react";
import { Box, Typography, Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";

export default function BadRequestError() {
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
          backgroundColor: "#FFFBEB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 40, color: "#F59E0B" }} />
      </Box>
      <Typography
        variant="h2"
        sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}
      >
        400
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "#0F172A", mb: 1 }}
      >
        Requête invalide
      </Typography>
      <Typography
        sx={{ color: "#64748B", mb: 4, maxWidth: 380, lineHeight: 1.7 }}
      >
        Une erreur est survenue lors du traitement de votre demande.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate("/")}>
        Retour à l'accueil
      </Button>
    </Box>
  );
}
