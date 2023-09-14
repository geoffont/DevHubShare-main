/* eslint-disable react/jsx-no-bind */
import Divider from "@mui/material/Divider";
import { Stack, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import PostSent from "./PostSent";
import Conversation from "./Conversation";
import MyAnswer from "./MyAnswer";
import LinkButton from "./LinkButton";
import UserImage from "../UserImage";

export default function MyPosts() {
  const isMediumScreen = useMediaQuery("(max-width: 800px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [selectedPost, setSelectedPost] = useState({});
  const [sendAnswer, setSendAnswer] = useState({});
  const [isNewAnswerSubmitted, setIsNewAnswerSubmitted] = useState(false);
  const [postIsDeleted, setPostIsDeleted] = useState(false);

  function handleSelectedPost(post) {
    setSelectedPost(post);
  }

  function handleAnswer(post) {
    setSendAnswer(post);
  }

  function handleNewAnswerSubmitted() {
    setIsNewAnswerSubmitted(!isNewAnswerSubmitted);
  }

  function determineMinWidth() {
    if (isMediumScreen) {
      return "60vw";
    }
    if (isSmallScreen) {
      return "96vw";
    }
    return "50%";
  }

  return (
    <Stack
      direction={isMediumScreen ? "column" : "row"}
      justifyContent="center"
      paddingTop="1rem"
      paddingLeft="5%"
    >
      <Stack
        direction="column"
        sx={{
          minWidth: determineMinWidth(isMediumScreen, isSmallScreen),
        }}
      >
        <div className="imageAvatarPost" style={{ paddingBottom: "1rem" }}>
          <UserImage size="5rem" backgroundColor="grey" />
        </div>
        <PostSent
          onPostSelected={handleSelectedPost}
          onSendAnswer={handleAnswer}
          onPostDeleted={setPostIsDeleted}
        />
      </Stack>
      {isMediumScreen ? (
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
      ) : (
        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: "1rem", marginRight: "1rem" }}
        />
      )}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          minWidth: determineMinWidth(isMediumScreen, isSmallScreen),
        }}
      >
        <Conversation
          post={selectedPost}
          newAnswer={isNewAnswerSubmitted}
          postIsDeleted={postIsDeleted}
        />
        <MyAnswer
          post={sendAnswer}
          onNewAnswerSubmitted={handleNewAnswerSubmitted}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "4rem",
            marginBottom: "0.5rem",
          }}
        >
          <LinkButton />
        </div>
      </Stack>
    </Stack>
  );
}
