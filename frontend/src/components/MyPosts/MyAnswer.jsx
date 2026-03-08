import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

export default function MyAnswer({ post, onNewAnswerSubmitted }) {
  const [answerText, setAnswerText] = useState("");
  const navigate = useNavigate();

  const handleAnswerSubmit = async () => {
    if (!answerText || post.id == null) return;
    try {
      const localId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/answers",
        { answer_text: answerText, post_id: post.id, user_id: localId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswerText("");
      onNewAnswerSubmitted();
    } catch (error) {
      console.error(error);
      navigate("/erreur400");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        p: 3,
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#0F172A", mb: 2 }}
      >
        Répondre
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Votre réponse ici..."
          multiline
          rows={5}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#F8FAFC",
              "& fieldset": { borderColor: "#E2E8F0" },
              "&.Mui-focused fieldset": { borderColor: "#6366F1" },
            },
          }}
        />
        <IconButton
          onClick={handleAnswerSubmit}
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#6366F1",
            color: "#fff",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#4F46E5" },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

MyAnswer.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    tag: PropTypes.string,
    postText: PropTypes.string,
  }),
  onNewAnswerSubmitted: PropTypes.func.isRequired,
};
MyAnswer.defaultProps = { post: {} };
