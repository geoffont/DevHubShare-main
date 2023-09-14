import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { styled } from "@mui/system";
import {
  Stack,
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";

const StyledButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#009AA6",
  "&:hover": { backgroundColor: "#FFFFFF" },
  fontSize: 9,
  fontWeight: "bold",
  width: "10%",
  alignSelf: "flex-end",
  marginRight: "6%",
});

export default function CreatePost({
  languageNameSelected,
  setLanguageNameSelected,
}) {
  const [languages, setLanguages] = useState([]);
  const [tag, setTag] = useState("");
  const [post, setPost] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const getLanguages = () => {
      axios
        .get("http://localhost:5000/languages", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLanguages(response.data);
        });
    };
    getLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    event.preventDefault();
    setLanguageNameSelected(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!languageNameSelected) {
      setErrorSubmit("La sélection d'un langage est obligatoire *");
    }
    const selectedLanguage = languages.find(
      (language) => language.language_name === languageNameSelected
    );
    axios
      .post(
        "http://localhost:5000/posts",
        {
          user_id: userId,
          language_id: selectedLanguage.id,
          tag,
          post_text: post,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        console.error(error);
        navigate("/erreur400");
      });
    navigate("/mes-posts");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mt: 3,
        minWidth: isMobile && "95vw",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "#009AA6", fontWeight: "medium" }}
      >
        <em>Créer un post</em>
      </Typography>
      <Stack
        aria-label="form"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          borderRadius: 1,
          boxShadow: "10px 10px 15px 2px #D7D7D7",
          backgroundColor: "#009AA6",
          width: "90%",
        }}
      >
        <Select
          aria-label="select-language"
          value={languageNameSelected}
          onChange={handleLanguageChange}
          displayEmpty
          renderValue={(value) => value || "Sélectionner un langage *"}
          size="small"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#009AA6",
            borderRadius: 1,
            alignSelf: "center",
            width: "80%",
          }}
        >
          {languages.map((language) => (
            <MenuItem
              key={language.id}
              value={language.language_name}
              sx={{ color: "#009AA6" }}
            >
              {language.language_name}
            </MenuItem>
          ))}
        </Select>
        {errorSubmit && (
          <Typography
            color="#333333"
            variant="h7"
            fontWeight="medium"
            textAlign="center"
          >
            {errorSubmit}
          </Typography>
        )}
        <TextField
          aria-label="tag"
          label="TAG"
          value={tag}
          onChange={handleTagChange}
          required
          size="small"
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 1,
            alignSelf: "center",
            width: "80%",
          }}
        />
        <TextField
          aria-label="post-content"
          label="Votre Post"
          value={post}
          onChange={handlePostChange}
          multiline
          rows={7}
          required
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 1,
            width: "100%",
          }}
        />
        <StyledButton type="submit">Poster</StyledButton>
        <Typography variant="caption" alignSelf="flex-start" color="#FFFFFF">
          Obligatoire *
        </Typography>
      </Stack>
    </Container>
  );
}

CreatePost.propTypes = {
  languageNameSelected: PropTypes.string.isRequired,
  setLanguageNameSelected: PropTypes.func.isRequired,
};
