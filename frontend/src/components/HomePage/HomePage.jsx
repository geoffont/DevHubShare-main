import React from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const FEATURES = [
  {
    icon: <ForumIcon sx={{ color: "#6366F1", fontSize: 28 }} />,
    title: "Posez vos questions",
    desc: "Publiez vos problèmes techniques et obtenez des réponses de développeurs expérimentés.",
  },
  {
    icon: <PeopleIcon sx={{ color: "#0EA5E9", fontSize: 28 }} />,
    title: "Rencontrez des devs",
    desc: "Connectez-vous avec d'autres développeurs, découvrez leurs profils et échangez.",
  },
  {
    icon: <LightbulbOutlinedIcon sx={{ color: "#10B981", fontSize: 28 }} />,
    title: "Partagez votre savoir",
    desc: "Répondez aux posts, contribuez à la communauté et développez vos compétences.",
  },
];

const LANGUAGES = ["HTML", "CSS", "JavaScript", "Java", "Python", "C#"];

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: 760, mx: "auto" }}>
      {/* Hero */}
      <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 }, px: 2 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.75,
            borderRadius: 20,
            backgroundColor: "#EEF2FF",
            border: "1px solid #C7D2FE",
            mb: 3,
          }}
        >
          <CodeIcon sx={{ color: "#6366F1", fontSize: 16 }} />
          <Typography sx={{ color: "#6366F1", fontSize: 13, fontWeight: 600 }}>
            La plateforme des développeurs
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#0F172A",
            mb: 2,
            fontSize: { xs: "1.9rem", md: "2.6rem" },
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
          }}
        >
          Apprenez, partagez et{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(135deg, #6366F1, #0EA5E9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            progressez ensemble
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: { xs: 14, md: 16 },
            maxWidth: 520,
            mx: "auto",
            mb: 4,
            lineHeight: 1.7,
          }}
        >
          DevHubSHARE connecte les développeurs de tous niveaux pour partager
          des connaissances, résoudre des problèmes et grandir ensemble.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Button
            component={Link}
            to="/inscription"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: 15, borderRadius: 2.5 }}
          >
            Rejoindre la communauté
          </Button>
          <Button
            component={Link}
            to="/connexion"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: 15,
              borderRadius: 2.5,
              borderColor: "#E2E8F0",
              color: "#475569",
              "&:hover": {
                borderColor: "#6366F1",
                color: "#6366F1",
                backgroundColor: "#EEF2FF",
              },
            }}
          >
            Se connecter
          </Button>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {LANGUAGES.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              size="small"
              sx={{
                backgroundColor: "#F1F5F9",
                color: "#475569",
                fontWeight: 500,
                fontSize: 12,
                border: "1px solid #E2E8F0",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Features */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
          mt: 2,
          pb: 4,
        }}
      >
        {FEATURES.map((f) => (
          <Box
            key={f.title}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(99,102,241,0.1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box sx={{ mb: 1.5 }}>{f.icon}</Box>
            <Typography
              sx={{ fontWeight: 600, color: "#0F172A", mb: 0.75, fontSize: 15 }}
            >
              {f.title}
            </Typography>
            <Typography
              sx={{ color: "#64748B", fontSize: 13.5, lineHeight: 1.6 }}
            >
              {f.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
