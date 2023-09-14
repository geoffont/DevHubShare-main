import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Button,
  IconButton,
} from "@mui/material";
import EditAnswer from "./EditAnswer";

const StyledButton = styled(Button)({
  backgroundColor: "#82BE00",
  color: "#FFFFFF",
  "&:hover": { backgroundColor: "#82BE00" },
  fontSize: 9,
  fontWeight: "bold",
  width: "10%",
  marginRight: "6%",
  marginTop: "1%",
});

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

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/posts/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPostDeleted(!postDeleted);
      if (response.status === 204) {
        navigate("/creer-post");
      }
    } catch (error) {
      console.error(error);
      navigate("/erreur404");
    }
  };

  const renderDeleteButton = () => {
    if (postUserId.toString() === localId.toString()) {
      return (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => handleDeletePost(postId)}
        >
          <DeleteIcon sx={{ color: "#82BE00" }} />
        </IconButton>
      );
    }
    return null;
  };

  return (
    <Container
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 1,
      }}
    >
      <Grid
        container
        mb={1}
        sx={{
          flexDirection: isMobile && "column",
          alignContent: isMobile && "stretch",
        }}
      >
        <Grid item sm={2} xs={12} display="flex" justifyContent="center">
          {postUsers?.map((user) => (
            <Avatar
              key={user.id}
              alt="pseudo"
              sx={{
                width: 60,
                height: 60,
                bgcolor: "#82BE00",
                mr: isMobile ? 0 : 2,
                mt: 1,
                alignSelf: "center",
              }}
            >
              {user.pseudo.charAt(0).toUpperCase()}
            </Avatar>
          ))}
        </Grid>
        <Grid item sm={10} xs={12}>
          <Grid container direction="column" spacing={0.6}>
            <Grid item sx={{ mt: isMobile ? 0 : 1 }}>
              <Typography color="#82BE00" fontWeight="bold">
                TAG
              </Typography>
            </Grid>
            <Grid item sx={{ m: 0 }}>
              <TextField
                aria-label="tag"
                value={postTag}
                multiline
                rows={1}
                size="small"
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 1,
                  border: "solid 1px #82BE00",
                  minWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container mb={1} direction="column">
        {postUsers.map((user) => (
          <Accordion defaultExpanded key={user.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Post de {user.pseudo}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pb: 1 }}>
              <Grid item>
                <TextField
                  aria-label="post content"
                  value={postText}
                  multiline
                  rows={5}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label={format(new Date(postDate), "dd-MM-yyyy")}
                  sx={{
                    width: "100%",
                    borderRadius: 1,
                    border: "solid 1px #82BE00",
                    bgColor: "#FFFFFF",
                  }}
                />
              </Grid>
              <Grid item>{renderDeleteButton()}</Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
      {postAnswers?.length === 0 ? (
        <Grid
          container
          direction="column"
          mb={1}
          component="form"
          onSubmit={handleAnswerSubmit}
          sx={{ alignItems: "flex-end" }}
        >
          <TextField
            aria-label="write an answer"
            InputLabelProps={{ shrink: true }}
            label="Il n'y a pas encore de réponse pour ce post ! Pourquoi pas vous ?"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            multiline
            rows={2}
            sx={{
              backgroundColor: "#FFFFFF",
              border: "dotted 1px #82BE00",
              borderRadius: 1,
              width: "100%",
              fontStyle: "italic",
              mt: 1,
            }}
          />
          <StyledButton type="submit">Poster</StyledButton>
        </Grid>
      ) : (
        <Grid item>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Réponse(s) au post</Typography>
            </AccordionSummary>
            {postAnswers?.map((answer) => (
              <EditAnswer
                key={answer.id}
                postId={postId}
                answer={answer}
                handleAnswerSubmit={handleAnswerSubmit}
                handleUpdateAnswer={handleUpdateAnswer}
              />
            ))}
          </Accordion>
          {postUsers?.map((user) => (
            <Grid
              container
              mb={1}
              direction="column"
              component="form"
              onSubmit={handleAnswerSubmit}
              key={user.id}
              sx={{ alignItems: "flex-end" }}
            >
              <TextField
                key={user.id}
                aria-label="write an answer"
                InputLabelProps={{ shrink: true }}
                label={`Souhaitez-vous apporter votre aide à ${user.pseudo}`}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                multiline
                rows={2}
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "dotted 1px #82BE00",
                  borderRadius: 1,
                  width: "100%",
                  fontStyle: "italic",
                  mt: 2,
                }}
              />
              <StyledButton type="submit">Poster</StyledButton>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
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
      picture: PropTypes.instanceOf(Blob),
      pseudo: PropTypes.string.isRequired,
    })
  ).isRequired,
  newAnswerSubmitted: PropTypes.bool.isRequired,
  setNewAnswerSubmitted: PropTypes.func.isRequired,
  postDeleted: PropTypes.bool.isRequired,
  setPostDeleted: PropTypes.func.isRequired,
  handleUpdateAnswer: PropTypes.func.isRequired,
};
