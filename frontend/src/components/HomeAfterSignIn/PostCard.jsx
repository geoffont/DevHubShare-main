import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditAnswer from "./EditAnswer";

export default function PostCard({
  postUsers,
  postId,
  postTag,
  postDate,
  postText,
  postAnswers,
  postUserId,
  newAnswerSubmitted,
  setNewAnswerSubmitted,
  postDeleted,
  setPostDeleted,
  handleUpdateAnswer,
}) {
  const [answerText, setAnswerText] = useState("");
  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const isOwner = postUserId.toString() === localId?.toString();
  const author = postUsers?.[0];

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    if (!answerText.trim()) return;
    try {
      await axios.post(
        "http://localhost:4000/answers",
        { user_id: localId, post_id: postId, answer_text: answerText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswerText("");
      setNewAnswerSubmitted(!newAnswerSubmitted);
    } catch (error) {
      console.error(error);
      navigate("/erreur404");
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:4000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostDeleted(!postDeleted);
    } catch (error) {
      console.error(error);
      navigate("/erreur404");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.06)" },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          pb: 0,
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #6366F1, #4F46E5)",
            fontSize: 16,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {author?.pseudo?.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{ fontWeight: 600, color: "#0F172A", fontSize: 14 }}
            >
              {author?.pseudo}
            </Typography>
            <Typography sx={{ color: "#94A3B8", fontSize: 12 }}>·</Typography>
            <Typography sx={{ color: "#94A3B8", fontSize: 12 }}>
              {format(new Date(postDate), "dd MMM yyyy")}
            </Typography>
            <Chip
              label={postTag}
              size="small"
              sx={{
                backgroundColor: "#EEF2FF",
                color: "#6366F1",
                fontWeight: 600,
                fontSize: 11,
                height: 20,
                ml: "auto",
              }}
            />
          </Box>
        </Box>
        {isOwner && (
          <Tooltip title="Supprimer le post">
            <IconButton
              size="small"
              onClick={handleDeletePost}
              sx={{
                color: "#CBD5E1",
                "&:hover": { color: "#EF4444", backgroundColor: "#FEF2F2" },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 2 }}>
        <Typography
          sx={{
            color: "#334155",
            fontSize: 14,
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {postText}
        </Typography>
      </Box>

      {/* Answers */}
      {postAnswers.length > 0 && (
        <Accordion
          sx={{
            borderTop: "1px solid #F1F5F9",
            "& .MuiAccordionSummary-root": { px: 2.5, minHeight: 44 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
            }
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 15, color: "#6366F1" }} />
              <Typography
                sx={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}
              >
                {postAnswers.length} réponse{postAnswers.length > 1 ? "s" : ""}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 1 }}>
            {postAnswers.map((answer) => (
              <EditAnswer
                key={answer.id}
                postId={postId}
                answer={answer}
                handleAnswerSubmit={handleAnswerSubmit}
                handleUpdateAnswer={handleUpdateAnswer}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {/* Answer form */}
      <Box
        component="form"
        onSubmit={handleAnswerSubmit}
        sx={{
          borderTop: "1px solid #F1F5F9",
          px: 2.5,
          py: 2,
          display: "flex",
          gap: 1.5,
          alignItems: "flex-end",
        }}
      >
        <TextField
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          multiline
          maxRows={4}
          size="small"
          placeholder={
            postAnswers.length === 0
              ? "Soyez le premier à répondre..."
              : `Répondre à ${author?.pseudo}...`
          }
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 13,
              backgroundColor: "#F8FAFC",
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!answerText.trim()}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "#6366F1",
            color: "#fff",
            borderRadius: "9px",
            flexShrink: 0,
            "&:hover": { backgroundColor: "#4F46E5" },
            "&:disabled": { backgroundColor: "#E2E8F0", color: "#94A3B8" },
          }}
        >
          <SendIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

PostCard.propTypes = {
  postId: PropTypes.number.isRequired,
  postTag: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  postUserId: PropTypes.number.isRequired,
  postAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      answer_text: PropTypes.string.isRequired,
    })
  ).isRequired,
  postUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pseudo: PropTypes.string.isRequired,
    })
  ).isRequired,
  newAnswerSubmitted: PropTypes.bool.isRequired,
  setNewAnswerSubmitted: PropTypes.func.isRequired,
  postDeleted: PropTypes.bool.isRequired,
  setPostDeleted: PropTypes.func.isRequired,
  handleUpdateAnswer: PropTypes.func.isRequired,
};
