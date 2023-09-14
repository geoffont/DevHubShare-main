import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import { styled } from "@mui/system";
import {
  Grid,
  Container,
  TextField,
  Avatar,
  useMediaQuery,
  InputLabel,
  Button,
} from "@mui/material";

const StyledButton = styled(Button)({
  backgroundColor: "#82BE00",
  color: "#FFFFFF",
  "&:hover": { backgroundColor: "#82BE00" },
  fontSize: 9,
  fontWeight: "bold",
  width: "10%",
  marginTop: "2%",
  alignSelf: "flex-end",
});

export default function Post({
  pseudo,
  user,
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
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/answers",
        {
          user_id: localId,
          post_id: postId,
          answer_text: answerText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnswerText("");
      setNewAnswerSubmitted(!newAnswerSubmitted);
    } catch (error) {
      console.error(error);
      navigate("/erreur404");
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        padding: "0%",
        mb: "4%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: isMobile && "column",
        alignContent: isMobile && "stretch",
        alignItems: isMobile && "center",
      }}
    >
      <Grid
        container
        mb="1%"
        mr="5%"
        sx={{
          flexDirection: isMobile && "column",
          alignContent: isMobile && "center",
          alignItems: isMobile && "center",
        }}
      >
        <Grid
          item
          xs={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            arial-label="Initiales de l'utilisateur"
            key={user.id}
            alt="pseudo"
            sx={{
              width: 60,
              height: 60,
              mt: 1,
              alignSelf: "center",
            }}
          >
            {pseudo.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>

        <Grid item xs={10}>
          <Grid container flexDirection="column" spacing={4} padding={1}>
            <Grid item>
              <InputLabel
                htmlFor="pseudo-input"
                sx={{
                  color: "#0088CE",
                  fontWeight: "bold",
                }}
              >
                Pseudo
              </InputLabel>
              <TextField
                id="pseudo-input"
                aria-label="Pseudo de l'utilisateur qui a posté"
                value={pseudo}
                variant="standard"
                sx={{
                  width: "100%",
                }}
              />
            </Grid>

            <Grid item>
              <InputLabel
                htmlFor="tag-input"
                sx={{
                  color: "#0088CE",
                  fontWeight: "bold",
                }}
              >
                Titre
              </InputLabel>
              <TextField
                id="tag-input"
                aria-label="Titre du post"
                value={tag}
                variant="standard"
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item color="#82BE00">
              <InputLabel
                htmlFor="post-input"
                sx={{
                  color: "#0088CE",
                  fontSize: "smaller",
                  fontWeight: "bold",
                }}
              >
                Post publié le {format(new Date(postDate), "dd-MM-yyyy")}
              </InputLabel>
              <TextField
                id="post-input"
                aria-label="Texte du post"
                value={post}
                multiline
                rows={1}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: "solid 2px #82BE00",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Grid>

            {answers.map((answer) => (
              <Grid item component="form" key={answer.answerId}>
                <InputLabel
                  htmlFor="answer-input"
                  sx={{
                    color: "#0088CE",
                    fontSize: "smaller",
                    fontWeight: "bold",
                  }}
                >
                  Réponse de {answer.userAnswer.pseudo} du{" "}
                  {format(new Date(answer.dateAnswer), "dd-MM-yyyy")}
                </InputLabel>
                {answer && (
                  <TextField
                    id="answer-input"
                    aria-label="Réponse au post"
                    value={answer.textAnswer}
                    multiline
                    rows={1}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      border: "solid 2px #82BE00",
                      backgroundColor: "white",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </Grid>
            ))}
            <Grid
              item
              component="form"
              onSubmit={handleAnswerSubmit}
              display="flex"
              flexDirection="column"
            >
              <InputLabel
                htmlFor="answer-input"
                sx={{
                  color: "#0088CE",
                  fontSize: "smaller",
                  fontWeight: "bold",
                  paddingBottom: "3%",
                }}
              >
                Répondre à {pseudo}
              </InputLabel>
              <TextField
                id="answer-input"
                aria-label="réponse de l'utilisateur au post"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                multiline
                rows={2}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: "solid 2px #82BE00",
                  backgroundColor: "#FFFFFF",
                  boxSizing: "border-box",
                }}
              />
              <StyledButton type="submit" aria-label="Soumettre une réponse">
                Poster
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
Post.propTypes = {
  pseudo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  answers: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      picture: PropTypes.instanceOf(Blob).isRequired,
    })
  ),
  newAnswerSubmitted: PropTypes.bool.isRequired,
  setNewAnswerSubmitted: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

Post.defaultProps = {
  user: [],
};
