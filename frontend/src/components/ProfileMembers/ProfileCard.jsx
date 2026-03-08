import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Avatar, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function ProfileCard({ pseudo, email, userText, onClickUser }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        p: 2,
        width: "100%",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(99,102,241,0.08)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          onClick={onClickUser}
          sx={{
            width: 48,
            height: 48,
            background: "linear-gradient(135deg, #6366F1, #4F46E5)",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
            "&:hover": { opacity: 0.85 },
          }}
        >
          {pseudo.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            onClick={onClickUser}
            sx={{
              fontWeight: 700,
              color: "#0F172A",
              fontSize: 15,
              cursor: "pointer",
              "&:hover": { color: "#6366F1" },
              transition: "color 0.15s",
            }}
          >
            {pseudo}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EmailOutlinedIcon sx={{ fontSize: 13, color: "#94A3B8" }} />
            <Typography
              sx={{
                color: "#64748B",
                fontSize: 13,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {email}
            </Typography>
          </Box>
        </Box>
        {userText && (
          <IconButton
            size="small"
            onClick={() => setExpanded((p) => !p)}
            sx={{
              color: expanded ? "#6366F1" : "#94A3B8",
              backgroundColor: expanded ? "#EEF2FF" : "transparent",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.2s",
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {userText && (
        <Collapse in={expanded}>
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid #F1F5F9",
              display: "flex",
              gap: 1,
            }}
          >
            <ChatBubbleOutlineIcon
              sx={{ fontSize: 16, color: "#94A3B8", mt: 0.25, flexShrink: 0 }}
            />
            <Typography
              sx={{ color: "#64748B", fontSize: 13.5, lineHeight: 1.6 }}
            >
              {userText}
            </Typography>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

ProfileCard.propTypes = {
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userText: PropTypes.string,
  onClickUser: PropTypes.func.isRequired,
};
ProfileCard.defaultProps = { userText: "" };
