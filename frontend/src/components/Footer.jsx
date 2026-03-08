import React from "react";
import { Box, Typography, Link } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "var(--footer-height)",
        backgroundColor: "#0F172A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 3 },
        zIndex: 100,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CodeIcon sx={{ color: "#6366F1", fontSize: 16 }} />
        <Typography sx={{ color: "#475569", fontSize: 12, fontWeight: 500 }}>
          DevHubSHARE
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2.5 }}>
        <Link
          href="https://github.com/WildCodeSchool/DevHubConnect"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            color: "#475569",
            fontSize: 12,
            "&:hover": { color: "#818CF8" },
            transition: "color 0.15s",
          }}
        >
          DevHub Connect
        </Link>
        <Link
          href="https://github.com/WildCodeSchool/DevHubProject"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            color: "#475569",
            fontSize: 12,
            "&:hover": { color: "#818CF8" },
            transition: "color 0.15s",
          }}
        >
          DevHub Project
        </Link>
      </Box>

      <Typography sx={{ color: "#334155", fontSize: 11 }}>
        WCS Marseille 2023
      </Typography>
    </Box>
  );
}
