/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Button } from "@material-ui/core";
import InfoUser from "./InfoUser";
import TextPerso from "./TextPerso";

const useStyles = makeStyles((theme) => ({
  card: {
    background: "#82BE00",
    marginBottom: theme.spacing(2),
  },
  texteLibreContainer: {
    background: "#FFF",
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  gridCard: {
    display: "grid",
    alignItems: "center",
  },
  valider: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },
}));

function UserProfile() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <InfoUser />
        </Grid>
        <Grid className={classes.gridCard} item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.texteLibreContainer}>
                <TextPerso />
              </div>
            </CardContent>
          </Card>
          <Grid item xs={12} className={classes.valider}>
            <Button variant="text" href="/creation-compte">
              Modifier le profil
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
