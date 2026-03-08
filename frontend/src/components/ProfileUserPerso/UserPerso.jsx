import React from "react";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoUser from "./InfoUser";
import TextPerso from "./TextPerso";

function UserProfile() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <InfoUser />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextPerso />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate("/creation-compte")}
              sx={{ borderRadius: 2 }}
            >
              Modifier le profil
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
