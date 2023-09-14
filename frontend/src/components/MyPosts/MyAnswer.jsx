import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Stack,
  Container,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import flecheSend from "./images/flecheSend.png";

export default function MyAnswer({ post, onNewAnswerSubmitted }) {
  const flecheStyle = { height: "2rem", width: "2rem" };
  const [answerText, setAnswerText] = useState("");
  const navigate = useNavigate();
  const answerSent = (e) => setAnswerText(e.target.value);

  const handleAnswerSubmit = async () => {
    if (!answerText || post.id == null) {
      return;
    }

    try {
      const localId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/answers",
        {
          answer_text: answerText,
          post_id: post.id,
          user_id: localId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnswerText("");
      onNewAnswerSubmitted();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse:", error);
      navigate("/erreur400");
    }
  };

  return (
    <Container
      role="region"
      aria-labelledby="answer-section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        maxWidth: "sm",
        maxHeight: "sm",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{
          borderRadius: 1,
          boxShadow: "10px 10px 15px 2px #D7D7D7",
          backgroundColor: "#009AA6",
          width: "95%",
        }}
      >
        <FormControl sx={{ width: "100%", m: 2, gap: 1 }}>
          <TextField
            id="post-content"
            label="Mon texte ici..."
            value={answerText}
            onChange={answerSent}
            multiline
            rows={7}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Envoyer la réponse"
                    onClick={handleAnswerSubmit}
                  >
                    <img
                      className="flecheSend"
                      src={flecheSend}
                      alt="fleche envoyer la réponse"
                      style={flecheStyle}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
              fontSize: "sm",
              width: "100%",
            }}
          />
        </FormControl>
      </Stack>
    </Container>
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
