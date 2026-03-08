import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Typography } from "@mui/material";

function TexteLibre() {
  const [userData, setUserData] = useState({});
  const { userIdSelected } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userIdSelected}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUserData(response.data));
  }, [userIdSelected]);

  return (
    <Box>
      <Typography
        sx={{ fontSize: 12, fontWeight: 600, color: "#475569", mb: 1 }}
      >
        Texte libre
      </Typography>
      <TextField
        value={userData.user_text || ""}
        multiline
        minRows={8}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F8FAFC",
            "& fieldset": { borderColor: "#E2E8F0" },
          },
        }}
      />
    </Box>
  );
}

export default TexteLibre;
