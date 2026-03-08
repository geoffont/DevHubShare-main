import React, { useState } from "react";
import { Box, Divider, useMediaQuery, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostSent from "./PostSent";
import Conversation from "./Conversation";
import MyAnswer from "./MyAnswer";

export default function MyPosts() {
  const isMediumScreen = useMediaQuery("(max-width: 800px)");
  const [selectedPost, setSelectedPost] = useState({});
  const [sendAnswer, setSendAnswer] = useState({});
  const [isNewAnswerSubmitted, setIsNewAnswerSubmitted] = useState(false);
  const [postIsDeleted, setPostIsDeleted] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMediumScreen ? "column" : "row",
        gap: 3,
        alignItems: "flex-start",
        mt: 2,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
        <PostSent
          onPostSelected={setSelectedPost}
          onSendAnswer={setSendAnswer}
          onPostDeleted={setPostIsDeleted}
        />
      </Box>

      {isMediumScreen ? (
        <Divider flexItem />
      ) : (
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      )}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Conversation
          post={selectedPost}
          newAnswer={isNewAnswerSubmitted}
          postIsDeleted={postIsDeleted}
        />
        <MyAnswer
          post={sendAnswer}
          onNewAnswerSubmitted={() => setIsNewAnswerSubmitted((prev) => !prev)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/creer-post")}
            sx={{ borderRadius: 2 }}
          >
            Créer un post
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
