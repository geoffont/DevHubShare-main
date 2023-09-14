import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import Post from "./Post";
import SelectedLanguageContext from "../../services/context/SelectedLanguageContext";

const Links = styled(Link)({
  textDecoration: "none",
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: "small",
});

export default function FeedSelected() {
  const { selectedLanguage } = useContext(SelectedLanguageContext);
  const [postList, setPostList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [newAnswerSubmitted, setNewAnswerSubmitted] = useState(false);
  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const getAnswerList = async () => {
      const response = await axios.get("http://localhost:5000/answers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswerList(response.data);
    };

    const getUserList = async () => {
      const response = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserList(response.data);
    };
    getAnswerList();
    getUserList();
  }, [newAnswerSubmitted]);

  useEffect(() => {
    const getLanguageList = async () => {
      const response = await axios.get("http://localhost:5000/languages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLanguageList(response.data);
    };
    getLanguageList();
  }, []);

  const getPostList = async () => {
    const response = await axios.get("http://localhost:5000/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPostList(response.data);
  };
  useEffect(() => {
    getPostList();
  }, [newAnswerSubmitted, answerList]);

  const languageFiltered = languageList.filter(
    (language) => language.language_name === selectedLanguage
  );

  const postFiltered = postList.filter(
    (post) => post.language_id === languageFiltered[0]?.id
  );

  const sortedPostList = postList.sort(
    (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
  );

  const sortedPostFiltered = postFiltered.sort(
    (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
  );
  return (
    <Container
      direction="column"
      sx={{
        maxWidth: "sm",
        maxHeight: "sm",
        width: "100%",
        margin: "1%",
      }}
    >
      <Stack marginTop="2%" alignItems="flex-end">
        <Button
          aria-label="Lien vers la page créer un post"
          sx={{
            width: isMobile ? "50%" : "15%",
            fontSize: isMobile && "smaller",
            marginBottom: "1%",
            padding: 0.5,
            backgroundColor: "#0088CE",
          }}
        >
          <Links to="/creer-post">CREER MON POST</Links>
        </Button>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#82BE00",
          borderRadius: 2,
        }}
      >
        <Stack
          sx={{
            flexDirection: isMobile && "row",
            alignItems: isMobile && "center",
            justifyContent: isMobile && "center",
          }}
        >
          <Typography
            variant="h5"
            color="#FFFFFF"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >
            <em>Fil de discussion </em>
            {selectedLanguage && <span>{selectedLanguage}</span>}
          </Typography>
        </Stack>

        <Stack sx={{ width: "90%", paddingBottom: "4%" }}>
          {selectedLanguage
            ? sortedPostFiltered.map((postMap) => {
                const user = userList.find(
                  (userFind) => userFind.id === postMap.user_id
                );
                return (
                  <Post
                    key={postMap?.id}
                    postId={postMap?.id}
                    pseudo={user.pseudo}
                    tag={postMap?.tag}
                    post={postMap?.post_text}
                    postDate={postMap?.creation_date}
                    answers={answerList
                      .filter((answer) => answer.post_id === postMap?.id)
                      .map((answerMap) => ({
                        textAnswer: answerMap.answer_text,
                        dateAnswer: answerMap.creation_date,
                        userAnswer: userList.find(
                          (userFind) => userFind.id === answerMap.user_id
                        ),
                      }))}
                    newAnswerSubmitted={newAnswerSubmitted}
                    setNewAnswerSubmitted={setNewAnswerSubmitted}
                  />
                );
              })
            : sortedPostList.map((postMap) => {
                const user = userList.find(
                  (userFind) => userFind.id === postMap.user_id
                );
                return (
                  <Post
                    key={postMap?.id}
                    postId={postMap?.id}
                    pseudo={user.pseudo}
                    tag={postMap?.tag}
                    post={postMap?.post_text}
                    postDate={postMap?.creation_date}
                    answers={answerList
                      .filter((answer) => answer.post_id === postMap?.id)
                      .map((answerMap) => ({
                        answerId: answerMap.id,
                        textAnswer: answerMap.answer_text,
                        dateAnswer: answerMap.creation_date,
                        userAnswer: userList.find(
                          (userFind) => userFind.id === answerMap.user_id
                        ),
                      }))}
                    newAnswerSubmitted={newAnswerSubmitted}
                    setNewAnswerSubmitted={setNewAnswerSubmitted}
                  />
                );
              })}
        </Stack>
      </Stack>
    </Container>
  );
}
Post.propTypes = {
  answerList: PropTypes.arrayOf(
    PropTypes.shape({
      textAnswer: PropTypes.string,
      dateAnswer: PropTypes.string,
      userAnswer: PropTypes.number,
    })
  ),
};
