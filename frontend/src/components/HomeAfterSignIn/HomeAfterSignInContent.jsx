import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import PostFeed from "./PostFeed";

export default function HomeAfterSignInContent() {
  const [languageNameSelected, setLanguageNameSelected] = useState("");
  const [languageSelected, setLanguageSelected] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleLanguage = async () => {
      const languageName = languageNameSelected;
      const response = await axios.get("http://localhost:5000/languages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const languages = response.data;
      const selectLanguage = languages.filter(
        (language) => language.language_name === languageName
      );
      setLanguageSelected(selectLanguage);
    };
    handleLanguage();
  }, [languageNameSelected]);

  return (
    <div>
      <CreatePost
        languageNameSelected={languageNameSelected}
        setLanguageNameSelected={setLanguageNameSelected}
      />
      <PostFeed
        languageNameSelected={languageNameSelected}
        languageSelected={languageSelected}
      />
    </div>
  );
}
