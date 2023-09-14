import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Typography, Avatar, Stack, TextField } from "@mui/material";
import { format } from "date-fns";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function Conversation({ post, newAnswer, postIsDeleted }) {
  const [myAnswers, setMyAnswers] = useState([]);
  const [editingAnswer, setEditingAnswer] = useState([]);
  const [editedAnswerText, setEditedAnswerText] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("userId");

  useEffect(() => {
    if (!post && !newAnswer) return;
    async function getMyAnswers() {
      try {
        const response = await axios.get(
          `http://localhost:5000/answers/post/${post.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
        `http://localhost:5000/answers/${answerId}`,
        {
          answer_text: editedAnswerText,
          post_id: post.id,
          user_id: localId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, answer_text: editedAnswerText }
            : answer
        )
      );
    } catch (error) {
      console.error(error);
      navigate("/erreur400");
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={4}
      sx={{
        borderRadius: 2,
        boxShadow: "10px 10px 15px 2px #D7D7D7",
        backgroundColor: "#82BE00",
        width: "100%",
      }}
    >
      <div style={{ padding: "1rem", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 3,
            padding: "0.2rem",
          }}
        >
          <Typography variant="h5" sx={{ margin: "0.5rem", color: "#82BE00" }}>
            Les réponses ici:
          </Typography>
        </div>
        <Stack direction="column" justifyContent="flex-end">
          <div
            className="TexteReponse"
            style={{
              padding: "1rem",
              width: "90%",
              marginLeft: "6%",
            }}
          >
            {postIsDeleted
              ? null
              : myAnswers
                  .sort(
                    (a, b) =>
                      new Date(a.creation_date) - new Date(b.creation_date)
                  )
                  .map((answer) => (
                    <div key={answer.id} className="reponsesAvecEdit">
                      <Accordion
                        aria-label={`Réponse de ${answer.pseudo}`}
                        sx={{
                          backgroundColor: "#fff",
                          marginBottom: "1rem",
                          borderRadius: 1,
                          marginTop: "1rem",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            "& .MuiAccordionSummary-content": {
                              margin: 0,
                            },
                          }}
                        >
                          <Stack direction="row" alignItems="center">
                            <Avatar
                              aria-label={`Initiale de ${answer.pseudo}`}
                              sx={{
                                bgcolor: "#82BE00",
                                marginRight: "0.5rem",
                              }}
                            >
                              {answer.pseudo.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body1" fontWeight="bold">
                              {answer.pseudo}
                            </Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            style={{
                              backgroundColor: "#fff",
                              marginBottom: "1rem",
                              borderRadius: 2,
                            }}
                          >
                            {editingAnswer === answer ? (
                              <TextField
                                id="post-content"
                                label="Mon nouveau texte ici..."
                                value={editedAnswerText}
                                onChange={(e) =>
                                  setEditedAnswerText(e.target.value)
                                }
                                multiline
                                rows={7}
                                InputProps={{
                                  endAdornment: (
                                    <IconButton
                                      aria-label="Enregistrer la réponse modifiée"
                                      position="end"
                                      onClick={() => updateAnswer(answer.id)}
                                    >
                                      <SaveIcon sx={{ color: "#82BE00" }} />
                                    </IconButton>
                                  ),
                                }}
                                sx={{
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: 1,
                                  fontSize: "sm",
                                  width: "100%",
                                }}
                              />
                            ) : (
                              <TextField
                                aria-label="Texte de la réponse"
                                value={answer.answer_text}
                                multiline
                                fullWidth
                                rows={10}
                              />
                            )}
                            <div
                              className="editAnswer"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="subtitle1">
                                {format(
                                  new Date(answer.creation_date),
                                  "dd/MM/yyyy - HH:mm"
                                )}
                              </Typography>
                              {answer.user_id === parseInt(localId, 10) && (
                                <IconButton
                                  aria-label="Modifier la réponse"
                                  size="large"
                                  onClick={() =>
                                    handleEditAnswer(answer, answer.id)
                                  }
                                >
                                  <EditIcon sx={{ color: "#82BE00" }} />
                                </IconButton>
                              )}
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
          </div>
        </Stack>
      </div>
    </Stack>
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
