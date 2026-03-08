import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  Drawer,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CodeIcon from "@mui/icons-material/Code";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 260;

const NAV_ITEMS = [
  {
    label: "Accueil",
    icon: <HomeIcon fontSize="small" />,
    to: "/",
    public: true,
  },
  {
    label: "Créer un post",
    icon: <AddBoxOutlinedIcon fontSize="small" />,
    to: "/creer-post",
  },
  {
    label: "Fil de discussion",
    icon: <ForumOutlinedIcon fontSize="small" />,
    to: "/fil-de-discussion",
  },
  {
    label: "Membres",
    icon: <PeopleOutlineIcon fontSize="small" />,
    to: "/profil-membres",
  },
  {
    label: "Ressources",
    icon: <MenuBookOutlinedIcon fontSize="small" />,
    to: "/ressources",
    public: true,
  },
  {
    label: "Mes posts",
    icon: <ArticleOutlinedIcon fontSize="small" />,
    to: "/mes-posts",
  },
];

function SidebarContent({ onClose }) {
  const [sideLanguages, setSideLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    axios
      .get("http://localhost:4000/languages")
      .then((r) => setSideLanguages(r.data))
      .catch(() => {});
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
    if (onClose) onClose();
    navigate("/fil-de-discussion");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/connexion");
    if (onClose) onClose();
  };

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        backgroundColor: "#1E293B",
        display: "flex",
        flexDirection: "column",
        py: 2,
      }}
    >
      {/* Logo (mobile only) */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          px: 2,
          mb: 2,
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6366F1, #4F46E5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CodeIcon sx={{ color: "#fff", fontSize: 16 }} />
        </Box>
        <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: 15 }}>
          DevHub<span style={{ color: "#818CF8" }}>SHARE</span>
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ px: 1.5, flex: 1 }} disablePadding>
        {NAV_ITEMS.map((item) => {
          if (!item.public && !isLoggedIn) return null;
          const isActive = location.pathname === item.to;
          return (
            <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.to}
                onClick={onClose}
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  px: 1.5,
                  backgroundColor: isActive
                    ? "rgba(99,102,241,0.15)"
                    : "transparent",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 34, color: isActive ? "#818CF8" : "#64748B" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#E0E7FF" : "#94A3B8",
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 3,
                      height: 20,
                      borderRadius: 4,
                      backgroundColor: "#6366F1",
                      ml: 1,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* Language selector */}
        {isLoggedIn && (
          <Box sx={{ px: 0.5, mt: 2 }}>
            <Typography
              sx={{
                color: "#475569",
                fontSize: 11,
                fontWeight: 600,
                px: 1,
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Langage du fil
            </Typography>
            <Select
              value={selectedLang}
              onChange={handleLanguageChange}
              displayEmpty
              size="small"
              renderValue={(v) => v || "Sélectionner..."}
              sx={{
                width: "100%",
                fontSize: 13,
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#94A3B8",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
                "& .MuiSvgIcon-root": { color: "#64748B" },
              }}
            >
              {sideLanguages.map((lang) => (
                <MenuItem
                  key={lang.id}
                  value={lang.language_name}
                  sx={{ fontSize: 13 }}
                >
                  {lang.language_name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </List>

      {/* Logout */}
      {isLoggedIn && (
        <>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 1.5 }} />
          <Box sx={{ px: 2 }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: "8px",
                py: 1,
                px: 1.5,
                "&:hover": { backgroundColor: "rgba(239,68,68,0.1)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: "#64748B" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Déconnexion"
                primaryTypographyProps={{ fontSize: 13.5, color: "#94A3B8" }}
              />
            </ListItemButton>
          </Box>
        </>
      )}
    </Box>
  );
}

SidebarContent.propTypes = {
  onClose: PropTypes.func,
};
SidebarContent.defaultProps = { onClose: null };

export default function Sidebar({ mobileOpen, onMobileClose, mobileOnly }) {
  if (mobileOnly) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            border: "none",
            backgroundColor: "#1E293B",
          },
        }}
      >
        <SidebarContent onClose={onMobileClose} />
      </Drawer>
    );
  }

  return <SidebarContent />;
}

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool,
  onMobileClose: PropTypes.func,
  mobileOnly: PropTypes.bool,
};
Sidebar.defaultProps = {
  mobileOpen: false,
  onMobileClose: () => {},
  mobileOnly: false,
};
