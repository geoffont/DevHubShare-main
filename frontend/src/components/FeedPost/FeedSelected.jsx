import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Typography, Chip, Button } from "@mui/material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AddIcon from "@mui/icons-material/Add";
import Post from "./Post";
import SelectedLanguageContext from "../../services/context/SelectedLanguageContext";

export default function FeedSelected() {
  const { selectedLanguage } = useContext(SelectedLanguageContext);
  const [postList, setPostList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [newAnswerSubmitted, setNewAnswerSubmitted] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAnswerList = async () => {
      const response = await axios.get("http://localhost:4000/answers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswerList(response.data);
    };
    const getUserList = async () => {
      const response = await axios.get("http://localhost:4000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserList(response.data);
    };
    getAnswerList();
    getUserList();
  }, [newAnswerSubmitted]);

  useEffect(() => {
    const getLanguageList = async () => {
      const response = await axios.get("http://localhost:4000/languages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLanguageList(response.data);
    };
    getLanguageList();
  }, []);

  useEffect(() => {
    const getPostList = async () => {
      const response = await axios.get("http://localhost:4000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostList(response.data);
    };
    getPostList();
  }, [newAnswerSubmitted, answerList]);

  const languageFiltered = languageList.filter(
    (l) => l.language_name === selectedLanguage
  );
  const postFiltered = postList.filter(
    (p) => p.language_id === languageFiltered[0]?.id
  );

  const sortedPostList = [...postList].sort(
    (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
  );
  const sortedPostFiltered = [...postFiltered].sort(
    (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
  );

  const displayedPosts = selectedLanguage ? sortedPostFiltered : sortedPostList;

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
        {selectedLanguage && (
          <Chip
            label={selectedLanguage}
            size="small"
            sx={{
              backgroundColor: "#EEF2FF",
              color: "#6366F1",
              fontWeight: 600,
              fontSize: 12,
            }}
          />
        )}
        <Box sx={{ ml: "auto" }}>
          <Button
            component={Link}
            to="/creer-post"
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
          >
            Créer un post
          </Button>
        </Box>
      </Box>

      {displayedPosts.length === 0 ? (
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {displayedPosts.map((postMap) => {
            const user = userList.find((u) => u.id === postMap.user_id);
            if (!user) return null;
            return (
              <Post
                key={postMap.id}
                postId={postMap.id}
                pseudo={user.pseudo}
                tag={postMap.tag}
                post={postMap.post_text}
                postDate={postMap.creation_date}
                answers={answerList
                  .filter((a) => a.post_id === postMap.id)
                  .map((a) => ({
                    answerId: a.id,
                    textAnswer: a.answer_text,
                    dateAnswer: a.creation_date,
                    userAnswer: userList.find((u) => u.id === a.user_id),
                  }))}
                newAnswerSubmitted={newAnswerSubmitted}
                setNewAnswerSubmitted={setNewAnswerSubmitted}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
