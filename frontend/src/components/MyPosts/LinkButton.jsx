import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function LinkButton() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/creer-post");
  };
  return (
    <Stack spacing={2} direction="row">
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: "#ffff",
          color: "#333333",
          "&:hover": {
            backgroundColor: "#d7d7d7",
          },
        }}
      >
        Créer un post
      </Button>
    </Stack>
  );
}
