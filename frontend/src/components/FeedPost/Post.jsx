import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";

export default function Post({
  pseudo,
  tag,
  post,
  answers,
  postDate,
  postId,
  newAnswerSubmitted,
  setNewAnswerSubmitted,
}) {
  const [answerText, setAnswerText] = useState("");
  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        p: 2.5,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #6366F1, #4F46E5)",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {pseudo.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>
            {pseudo}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#94A3B8" }}>
            {format(new Date(postDate), "dd/MM/yyyy")}
          </Typography>
        </Box>
        {tag && (
          <Chip
            label={tag}
            size="small"
            sx={{
              backgroundColor: "#EEF2FF",
              color: "#6366F1",
              fontWeight: 600,
              fontSize: 11,
            }}
          />
        )}
      </Box>

      <Typography
        sx={{
          fontSize: 14,
          color: "#334155",
          lineHeight: 1.7,
          mb: 2,
          p: 2,
          backgroundColor: "#F8FAFC",
          borderRadius: 2,
          border: "1px solid #E2E8F0",
          whiteSpace: "pre-wrap",
        }}
      >
        {post}
      </Typography>

      {answers.length > 0 && (
        <Accordion
          elevation={0}
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "8px !important",
            mb: 2,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#64748B" }} />}
          >
            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}
            >
              {answers.length} réponse{answers.length > 1 ? "s" : ""}
            </Typography>
          </AccordionSummary>
          {answers.map((answer) => (
            <AccordionDetails
              key={answer.answerId}
              sx={{ pt: 0, pb: 1, px: 2 }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: 11, color: "#94A3B8", mb: 0.5 }}>
                  {answer.userAnswer?.pseudo || "Utilisateur"} —{" "}
                  {format(new Date(answer.dateAnswer), "dd/MM/yyyy")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#475569",
                    p: 1.5,
                    backgroundColor: "#F8FAFC",
                    borderRadius: 1.5,
                    border: "1px solid #E2E8F0",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {answer.textAnswer}
                </Typography>
              </Box>
            </AccordionDetails>
          ))}
        </Accordion>
      )}

      <Box
        component="form"
        onSubmit={handleAnswerSubmit}
        sx={{ display: "flex", gap: 1 }}
      >
        <TextField
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder={`Répondre à ${pseudo}...`}
          multiline
          rows={2}
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#F8FAFC",
              "& fieldset": { borderColor: "#E2E8F0" },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ alignSelf: "flex-end", minWidth: 44, px: 1.5, borderRadius: 2 }}
        >
          <SendIcon sx={{ fontSize: 18 }} />
        </Button>
      </Box>
    </Box>
  );
}

Post.propTypes = {
  pseudo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answerId: PropTypes.number,
      textAnswer: PropTypes.string,
      dateAnswer: PropTypes.string,
      userAnswer: PropTypes.shape({ pseudo: PropTypes.string }),
    })
  ).isRequired,
  postDate: PropTypes.string.isRequired,
  newAnswerSubmitted: PropTypes.bool.isRequired,
  setNewAnswerSubmitted: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
