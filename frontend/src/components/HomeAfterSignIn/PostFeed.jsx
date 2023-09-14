import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Container, Typography, Stack, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostFeed({ languageNameSelected, languageSelected }) {
  const [postsWithAnswers, setPostsWithAnswers] = useState([]);
  const [newAnswerSubmitted, setNewAnswerSubmitted] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  const localId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [answers, users, posts] = await Promise.all([
          axios.get("http://localhost:5000/answers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const postsAnswers = posts.data.map((post) => {
          const postAnswers = answers.data.filter(
            (answer) => answer.post_id === post.id
          );
          const postUsers = users.data.filter(
            (user) => user.id === post.user_id
          );
          return { ...post, answers: postAnswers, users: postUsers };
        });

        setPostsWithAnswers(postsAnswers);
      } catch (error) {
        console.error(error);
        navigate("/erreur404");
      }
    };

    fetchData();
  }, [newAnswerSubmitted, postDeleted, token, navigate]);

  const filteredPosts =
    languageSelected.length > 0
      ? postsWithAnswers.filter(
          (post) => post.language_id === languageSelected[0]?.id
        )
      : postsWithAnswers;

  const handleUpdateAnswer = async (postId, answerId, updatedAnswerText) => {
    try {
      await axios.put(
        `http://localhost:5000/answers/${answerId}`,
        {
          user_id: localId,
          post_id: postId,
          answer_text: updatedAnswerText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPostsWithAnswers = postsWithAnswers.map((post) => {
        if (post.id === postId) {
          const updatedAnswers = post.answers.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, answer_text: updatedAnswerText };
            }
            return answer;
          });
          return { ...post, answers: updatedAnswers };
        }
        return post;
      });
      setPostsWithAnswers(updatedPostsWithAnswers);
    } catch (error) {
      console.error(error);
      navigate("/erreur404");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mt: 3,
        mb: 3,
        minWidth: isMobile && "95vw",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "#82BE00", fontWeight: "medium" }}
      >
        <em>Fil de discussion {languageNameSelected}</em>
      </Typography>
      <Stack
        spacing={1}
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          boxShadow: "10px 10px 15px 2px #D7D7D7",
          backgroundColor: "#82BE00",
          width: "90%",
        }}
      >
        {filteredPosts?.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            postUsers={post.users}
            postTag={post.tag}
            postDate={post.creation_date}
            postText={post.post_text}
            postAnswers={post.answers.map((answer) => {
              const answerUser = post.users.find(
                (user) => user.id === answer.user_id
              );
              const answerUserPseudo = answerUser ? answerUser.pseudo : "";
              return { ...answer, user_pseudo: answerUserPseudo };
            })}
            postUserId={post.user_id}
            newAnswerSubmitted={newAnswerSubmitted}
            setNewAnswerSubmitted={setNewAnswerSubmitted}
            postDeleted={postDeleted}
            setPostDeleted={setPostDeleted}
            handleUpdateAnswer={handleUpdateAnswer}
          />
        ))}
      </Stack>
    </Container>
  );
}

PostFeed.propTypes = {
  languageSelected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      language_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  languageNameSelected: PropTypes.string.isRequired,
};
