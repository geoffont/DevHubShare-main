import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Select, MenuItem, Chip } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ProfileCard from "./ProfileCard";

export default function ProfileMembers() {
  const [languages, setLanguages] = useState([]);
  const [languageNameSelected, setLanguageNameSelected] = useState("");
  const [languageSelected, setLanguageSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [languagesUsers, setLanguagesUsers] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const [usersRes, langUsersRes, langsRes] = await Promise.all([
        axios.get("http://localhost:4000/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:4000/user_has_language", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:4000/languages", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(usersRes.data);
      setLanguagesUsers(langUsersRes.data);
      setLanguages(langsRes.data);
    };
    fetch().catch(() => {});
  }, []);

  useEffect(() => {
    const found = languages.filter(
      (l) => l.language_name === languageNameSelected
    );
    setLanguageSelected(found);
  }, [languageNameSelected, languages]);

  const usersFiltered = () => {
    if (languageSelected.length > 0) {
      const langId = languageSelected[0].id;
      const userIds = languagesUsers
        .filter((lu) => lu.language_id === langId)
        .map((lu) => lu.user_id);
      return users.filter((u) => userIds.includes(u.id));
    }
    return users;
  };

  const onClickUser = (userId) => navigate(`/profil-membre/${userId}`);
  const filtered = usersFiltered();

  return (
    <Box sx={{ maxWidth: 680, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            backgroundColor: "#F0F9FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PeopleOutlineIcon sx={{ color: "#0EA5E9", fontSize: 20 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A" }}>
          Membres
        </Typography>
        {languageNameSelected && (
          <Chip
            label={languageNameSelected}
            size="small"
            onDelete={() => setLanguageNameSelected("")}
            sx={{
              backgroundColor: "#EEF2FF",
              color: "#6366F1",
              fontWeight: 600,
              fontSize: 12,
            }}
          />
        )}
        <Chip
          label={`${filtered.length} membre${filtered.length > 1 ? "s" : ""}`}
          size="small"
          sx={{
            backgroundColor: "#F1F5F9",
            color: "#64748B",
            fontSize: 12,
            ml: "auto",
          }}
        />
      </Box>

      {/* Language filter */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 2.5,
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>
          Filtrer par langage :
        </Typography>
        <Select
          value={languageNameSelected}
          onChange={(e) => setLanguageNameSelected(e.target.value)}
          displayEmpty
          size="small"
          renderValue={(v) => v || "Tous les langages"}
          sx={{
            minWidth: 200,
            fontSize: 13,
            backgroundColor: "#F8FAFC",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
          }}
        >
          <MenuItem value="" sx={{ fontSize: 13 }}>
            Tous les langages
          </MenuItem>
          {languages.map((lang) => (
            <MenuItem
              key={lang.id}
              value={lang.language_name}
              sx={{ fontSize: 13 }}
            >
              {lang.language_name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Member list */}
      {filtered.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
          }}
        >
          <PeopleOutlineIcon sx={{ fontSize: 48, color: "#CBD5E1", mb: 2 }} />
          <Typography sx={{ color: "#94A3B8", fontSize: 15 }}>
            Aucun membre pour ce langage.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {filtered.map((user) => (
            <ProfileCard
              key={user.id}
              pseudo={user.pseudo}
              email={user.email}
              userText={user.user_text}
              onClickUser={() => onClickUser(user.id)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
