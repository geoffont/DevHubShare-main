import React from "react";
import { Grid, Box } from "@mui/material";
import Informations from "./Informations";
import TexteLibre from "./TexteLibre";

function UserProfile() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Informations />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            p: 3,
          }}
        >
          <TexteLibre />
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
