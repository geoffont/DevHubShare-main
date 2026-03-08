import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Typography } from "@mui/material";

function TextPerso() {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUserData(response.data));
  }, []);

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

export default TextPerso;
