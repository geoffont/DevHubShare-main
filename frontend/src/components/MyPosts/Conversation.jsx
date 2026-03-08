import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Typography, Avatar, Box, TextField, IconButton } from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function Conversation({ post, newAnswer, postIsDeleted }) {
  const [myAnswers, setMyAnswers] = useState([]);
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [editedAnswerText, setEditedAnswerText] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("userId");

  useEffect(() => {
    if (!post || !post.id) return;
    async function getMyAnswers() {
      try {
        const response = await axios.get(
          `http://localhost:4000/answers/post/${post.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMyAnswers(response.data);
      } catch (error) {
        console.error(error);
        navigate("/erreur404");
      }
    }
    getMyAnswers();
  }, [post, newAnswer]);

  const handleEditAnswer = (answer) => {
    setEditingAnswer(answer);
    setEditedAnswerText(answer.answer_text);
  };

  async function updateAnswer(answerId) {
    try {
      await axios.put(
        `http://localhost:4000/answers/${answerId}`,
        { answer_text: editedAnswerText, post_id: post.id, user_id: localId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyAnswers((prev) =>
        prev.map((a) =>
          a.id === answerId ? { ...a, answer_text: editedAnswerText } : a
        )
      );
      setEditingAnswer(null);
    } catch (error) {
      console.error(error);
      navigate("/erreur400");
    }
  }

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
        Les réponses
      </Typography>

      {postIsDeleted && (
        <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
          Ce post a été supprimé.
        </Typography>
      )}
      {!postIsDeleted && myAnswers.length === 0 && (
        <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
          Aucune réponse pour ce post.
        </Typography>
      )}
      {!postIsDeleted &&
        myAnswers
          .slice()
          .sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date))
          .map((answer) => (
            <Accordion
              key={answer.id}
              elevation={0}
              sx={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px !important",
                mb: 1.5,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#64748B" }} />}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: 12,
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                    }}
                  >
                    {answer.pseudo?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600} color="#0F172A">
                    {answer.pseudo}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {editingAnswer === answer ? (
                  <TextField
                    value={editedAnswerText}
                    onChange={(e) => setEditedAnswerText(e.target.value)}
                    multiline
                    rows={5}
                    fullWidth
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          size="small"
                          onClick={() => updateAnswer(answer.id)}
                        >
                          <SaveIcon sx={{ color: "#6366F1", fontSize: 18 }} />
                        </IconButton>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F8FAFC",
                        "& fieldset": { borderColor: "#E2E8F0" },
                        "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                      },
                    }}
                  />
                ) : (
                  <TextField
                    value={answer.answer_text}
                    multiline
                    fullWidth
                    rows={5}
                    size="small"
                    InputProps={{ readOnly: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F8FAFC",
                        "& fieldset": { borderColor: "#E2E8F0" },
                      },
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 12, color: "#94A3B8" }}>
                    {format(
                      new Date(answer.creation_date),
                      "dd/MM/yyyy - HH:mm"
                    )}
                  </Typography>
                  {answer.user_id === parseInt(localId, 10) && (
                    <IconButton
                      size="small"
                      onClick={() => handleEditAnswer(answer)}
                      sx={{ color: "#94A3B8" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
    </Box>
  );
}

Conversation.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    tag: PropTypes.string,
    postText: PropTypes.string,
  }),
  newAnswer: PropTypes.bool.isRequired,
  postIsDeleted: PropTypes.bool.isRequired,
};
Conversation.defaultProps = { post: {} };
