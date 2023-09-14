/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Typography, Stack } from "@mui/material";
import { format } from "date-fns";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PostSent({
  onPostSelected,
  onSendAnswer,
  onPostDeleted,
}) {
  const [myPosts, setMyPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();

  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getMyPosts = () => {
    axios
      .get(`http://localhost:5000/posts/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .then((data) => {
        setMyPosts(data);
      });
  };

  const handlePostClick = (e, post) => {
    e.preventDefault();
    setSelectedPost({ tag: post.tag, postText: post.post_text });
    onPostSelected({ id: post.id, tag: post.tag, postText: post.post_text });
    onSendAnswer({ id: post.id, tag: post.tag, postText: post.post_text });
    onPostDeleted(false);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const handleDeletePost = (postId) => {
    axios
      .delete(`http://localhost:5000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getMyPosts();
        onPostDeleted(true);
      })
      .catch((error) => {
        console.info(error);
      });
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={4}
      sx={{
        borderRadius: 1,
        boxShadow: "10px 10px 15px 2px #D7D7D7",
        backgroundColor: "#009AA6",
        width: "100%",
      }}
    >
      <main style={{ padding: "1rem", width: "100%" }}>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            color: "#009AA6",
            backgroundColor: "#ffff",
            borderRadius: 1,
            padding: "0.6rem",
            marginBottom: "1rem",
          }}
        >
          Mes posts ici:
        </Typography>
        {myPosts.map((post) => (
          <Accordion
            key={post.id}
            sx={{
              backgroundColor: "#fff",
              marginBottom: "1rem",
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              onClick={(e) => handlePostClick(e, post)}
              id="panel1a-header"
              sx={{
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                style={{ cursor: "pointer" }}
                value={selectedPost}
              >
                {post.tag}
              </Typography>
            </AccordionSummary>
            <AccordionDetails key={post.id}>
              <TextField
                aria-label="Post Text"
                value={post.post_text}
                multiline
                fullWidth
                rows={20}
              />
              <section
                className="MyPostDelete"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  scrollbarColor: "yellow",
                }}
              >
                <Typography variant="subtitle1">
                  {" "}
                  {format(new Date(post.creation_date), "dd/MM/yyyy")}
                </Typography>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <DeleteIcon sx={{ color: "#009AA6" }} />
                </IconButton>
              </section>
            </AccordionDetails>
          </Accordion>
        ))}
      </main>
    </Stack>
  );
}
