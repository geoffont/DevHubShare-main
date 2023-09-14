import React from "react";
import {
  Container,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import LogoSNCF from "../assets/LOGO_SNCF_GROUPE_RVB_small.png";

const Logo = styled("img")({
  width: "4rem",
});

const FooterLink = styled(Link)({
  marginRight: "1rem",
  marginLeft: "1rem",
  textDecoration: "none",
  color: "#FFFFFF",
  "&:hover": {
    color: "#B9B9B9",
  },
});

const FooterContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#333333",
  color: "#FFFFFF",
  minWidth: "100vw",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
});

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <FooterContainer>
      <Grid sx={{ alignSelf: "center" }}>
        <Logo
          src={LogoSNCF}
          alt="logo"
          sx={{
            ml: isMobile ? "0rem" : "0.8rem",
          }}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <FooterLink href="https://github.com/WildCodeSchool/DevHubConnect">
          DevHub Connect {">"}
        </FooterLink>
        <FooterLink href="https://github.com/WildCodeSchool/DevHubProject">
          DevHub Project {">"}
        </FooterLink>
      </Grid>
      <Grid
        sx={{
          alignSelf: isMobile ? "center" : "flex-end",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.5rem",
            mr: isMobile ? "0.2rem" : "1.6rem",
          }}
        >
          <em>WCS Marseille 2023_Créé par Nelly, Karine, Sandra et Geoffroy</em>
        </Typography>
      </Grid>
    </FooterContainer>
  );
}
