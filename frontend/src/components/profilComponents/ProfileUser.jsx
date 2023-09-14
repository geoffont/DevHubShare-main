/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent } from "@material-ui/core";
import Informations from "./Informations";
import TexteLibre from "./TexteLibre";

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
          <Informations />
        </Grid>
        <Grid className={classes.gridCard} item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.texteLibreContainer}>
                <TexteLibre />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
