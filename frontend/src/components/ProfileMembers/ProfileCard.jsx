import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";

export default function ProfileCard({ pseudo, email, userText, onClickUser }) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Container
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 1,
      }}
    >
      <Grid
        container
        sx={{
          flexDirection: isMobile && "column",
          alignContent: isMobile && "center",
        }}
      >
        <Grid
          item
          sm={2}
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            onClick={onClickUser}
            alt="pseudo"
            sx={{
              width: isMobile ? 60 : 70,
              height: isMobile ? 60 : 70,
              mr: isMobile ? 0 : 3,
              "&:hover": { boxShadow: "0px 8px 15px -2px #D7D7D7" },
              mt: isMobile && 1,
            }}
          >
            {pseudo.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item sm={10} xs={12}>
          <Grid container direction="column" spacing={0.6} sx={{ m: 0 }}>
            <Grid item>
              <Typography color="#009AA6" fontWeight="bold">
                Pseudo
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                aria-label="pseudo"
                readOnly
                value={pseudo}
                size="small"
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 1,
                  border: "solid 1px #009AA6",
                  minWidth: isMobile ? "100%" : "97%",
                }}
              />
            </Grid>
            <Grid item>
              <Typography color="#009AA6" fontWeight="bold">
                email
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                aria-label="email"
                readOnly
                value={email}
                size="small"
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 1,
                  border: "solid 1px #009AA6",
                  width: isMobile ? "100%" : "97%",
                  mb: 1,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ m: 1, width: "100%" }}>
          {userText ? (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: "#009AA6" }}>
                  Texte libre de {pseudo}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  aria-label="user-text"
                  readOnly
                  value={userText}
                  multiline
                  rows={2}
                  size="small"
                  sx={{
                    width: "100%",
                    borderRadius: 1,
                    border: "solid 1px #009AA6",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </AccordionDetails>
            </Accordion>
          ) : (
            <TextField
              aria-label="no-user-text"
              disabled
              value={`Il n'y a pas  de texte libre pour ${pseudo} !`}
              size="small"
              sx={{
                width: "100%",
                borderRadius: 1,
                border: "dotted 1px #009AA6",
                backgroundColor: "#FFFFFF",
                fontStyle: "italic",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

ProfileCard.propTypes = {
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userText: PropTypes.string,
  onClickUser: PropTypes.func.isRequired,
};
ProfileCard.defaultProps = { userText: "" };
