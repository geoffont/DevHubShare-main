import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { format } from "date-fns";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

export default function PostSent({
  onPostSelected,
  onSendAnswer,
  onPostDeleted,
}) {
  const [myPosts, setMyPosts] = useState([]);

  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getMyPosts = () => {
    axios
      .get(`http://localhost:4000/posts/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMyPosts(response.data));
  };

  const handlePostClick = (e, post) => {
    e.preventDefault();
    onPostSelected({ id: post.id, tag: post.tag, postText: post.post_text });
    onSendAnswer({ id: post.id, tag: post.tag, postText: post.post_text });
    onPostDeleted(false);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const handleDeletePost = (postId) => {
    axios
      .delete(`http://localhost:4000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getMyPosts();
        onPostDeleted(true);
      })
      .catch((error) => console.info(error));
  };

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
        Mes posts
      </Typography>
      {myPosts.length === 0 ? (
        <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
          Vous n'avez pas encore de posts.
        </Typography>
      ) : (
        myPosts.map((post) => (
          <Accordion
            key={post.id}
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
              onClick={(e) => handlePostClick(e, post)}
            >
              <Typography variant="body2" fontWeight={600} color="#0F172A">
                {post.tag}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                value={post.post_text}
                multiline
                fullWidth
                rows={6}
                InputProps={{ readOnly: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F8FAFC",
                    "& fieldset": { borderColor: "#E2E8F0" },
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#94A3B8" }}>
                  {format(new Date(post.creation_date), "dd/MM/yyyy")}
                </Typography>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDeletePost(post.id)}
                  sx={{ color: "#EF4444" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}

PostSent.propTypes = {
  onPostSelected: PropTypes.func.isRequired,
  onSendAnswer: PropTypes.func.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};
