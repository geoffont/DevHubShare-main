import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CodeIcon from "@mui/icons-material/Code";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({ onMenuClick }) {
  const [newResponsesCount, setNewResponsesCount] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const localId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!localId || !token) return;
    const fetchNotifications = async () => {
      try {
        const [answersRes, postsRes] = await Promise.all([
          axios.get("http://localhost:4000/answers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:4000/posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const myPosts = postsRes.data.filter(
          (p) => p.user_id.toString() === localId
        );
        const myPostIds = myPosts.map((p) => p.id);
        const count = answersRes.data.filter(
          (a) =>
            myPostIds.includes(a.post_id) && a.user_id.toString() !== localId
        ).length;
        setNewResponsesCount(count);
      } catch {
        // silent
      }
    };
    fetchNotifications();
  }, [localId, token]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        zIndex: (t) => t.zIndex.drawer + 1,
        height: "var(--header-height)",
      }}
    >
      <Toolbar
        sx={{
          height: "var(--header-height)",
          px: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: hamburger (mobile) + logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              onClick={onMenuClick}
              sx={{ color: "#64748B", p: 1 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "9px",
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CodeIcon sx={{ color: "#fff", fontSize: 18 }} />
            </Box>
            {!isMobile && (
              <Typography
                variant="h6"
                sx={{
                  color: "#0F172A",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                DevHub<span style={{ color: "#6366F1" }}>SHARE</span>
              </Typography>
            )}
          </Link>
        </Box>

        {/* Right: actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {isLoggedIn && (
            <IconButton
              sx={{
                color: "#64748B",
                position: "relative",
                "&:hover": { backgroundColor: "#F1F5F9" },
              }}
              aria-label="notifications"
            >
              <NotificationsNoneIcon />
              {newResponsesCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#EF4444",
                    border: "2px solid #fff",
                  }}
                />
              )}
            </IconButton>
          )}

          {isLoggedIn ? (
            <Avatar
              onClick={() => navigate("/mon-compte")}
              sx={{
                width: 34,
                height: 34,
                background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": { opacity: 0.85 },
              }}
            >
              {localId ? localId.charAt(0) : "U"}
            </Avatar>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Link to="/connexion" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "#64748B",
                    fontWeight: 500,
                    fontSize: 14,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#F1F5F9", color: "#0F172A" },
                    transition: "all 0.15s",
                  }}
                >
                  Connexion
                </Typography>
              </Link>
              <Link to="/inscription" style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    px: 2,
                    py: 0.75,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.9 },
                    transition: "all 0.15s",
                  }}
                >
                  S'inscrire
                </Box>
              </Link>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onMenuClick: PropTypes.func,
};
Header.defaultProps = {
  onMenuClick: () => {},
};
