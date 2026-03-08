import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Box, Typography, Chip } from "@mui/material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostFeed({ languageNameSelected, languageSelected }) {
  const [postsWithAnswers, setPostsWithAnswers] = useState([]);
  const [newAnswerSubmitted, setNewAnswerSubmitted] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  const localId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [answers, users, posts] = await Promise.all([
          axios.get("http://localhost:4000/answers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:4000/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:4000/posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const postsAnswers = posts.data.map((post) => ({
          ...post,
          answers: answers.data.filter((a) => a.post_id === post.id),
          users: users.data.filter((u) => u.id === post.user_id),
        }));

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
          (p) => p.language_id === languageSelected[0]?.id
        )
      : postsWithAnswers;

  const handleUpdateAnswer = async (postId, answerId, updatedAnswerText) => {
    try {
      await axios.put(
        `http://localhost:4000/answers/${answerId}`,
        { user_id: localId, post_id: postId, answer_text: updatedAnswerText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPostsWithAnswers((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                answers: post.answers.map((a) =>
                  a.id === answerId
                    ? { ...a, answer_text: updatedAnswerText }
                    : a
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error(error);
      navigate("/erreur404");
    }
  };

  return (
    <Box sx={{ maxWidth: 680, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            backgroundColor: "#F0FDF4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ForumOutlinedIcon sx={{ color: "#10B981", fontSize: 20 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A" }}>
          Fil de discussion
        </Typography>
        {languageNameSelected && (
          <Chip
            label={languageNameSelected}
            size="small"
            sx={{
              backgroundColor: "#EEF2FF",
              color: "#6366F1",
              fontWeight: 600,
              fontSize: 12,
            }}
          />
        )}
        <Chip
          label={`${filteredPosts.length} post${
            filteredPosts.length > 1 ? "s" : ""
          }`}
          size="small"
          sx={{
            backgroundColor: "#F1F5F9",
            color: "#64748B",
            fontSize: 12,
            ml: "auto",
          }}
        />
      </Box>

      {filteredPosts.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
          }}
        >
          <ForumOutlinedIcon sx={{ fontSize: 48, color: "#CBD5E1", mb: 2 }} />
          <Typography sx={{ color: "#94A3B8", fontSize: 15 }}>
            Aucun post pour le moment. Soyez le premier !
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              postUsers={post.users}
              postTag={post.tag}
              postDate={post.creation_date}
              postText={post.post_text}
              postAnswers={post.answers.map((answer) => {
                const answerUser = post.users.find(
                  (u) => u.id === answer.user_id
                );
                return {
                  ...answer,
                  user_pseudo: answerUser ? answerUser.pseudo : "",
                };
              })}
              postUserId={post.user_id}
              newAnswerSubmitted={newAnswerSubmitted}
              setNewAnswerSubmitted={setNewAnswerSubmitted}
              postDeleted={postDeleted}
              setPostDeleted={setPostDeleted}
              handleUpdateAnswer={handleUpdateAnswer}
            />
          ))}
        </Box>
      )}
    </Box>
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
