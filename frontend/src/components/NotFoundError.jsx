import React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Error404 from "../assets/Error404.jpg";

export default function NotFoundError() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const Error = styled("img")({
    width: isMobile ? "25rem" : "50rem",
    margin: "auto",
    marginTop: "10%",
  });

  const navigate = useNavigate();
  const handlePage = () => {
    navigate("/");
  };

  return (
    <Container
      onClick={handlePage}
      position="center"
      sx={{
        display: "flex",
      }}
    >
      <Error src={Error404} alt="Erreur" />
    </Container>
  );
}
