/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import UserImage from "../UserImage";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#009aa3",
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(1),
  },
  field: {
    background: "#FFF",
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: theme.spacing(1),
  },
  valider: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function Informations() {
  const [currentUser, setCurrentUser] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const classes = useStyles();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { userIdSelected } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userIdSelected}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCurrentUser(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user_has_language/${userIdSelected}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .then((data) => {
        const userLanguageObjects = data.map((lang) => ({
          language_name: lang.language_name,
        }));
        setUserLanguages(userLanguageObjects);
      });
  }, [userIdSelected]);

  useEffect(() => {
    const getUserClicked = async () => {
      const response = await axios.get(
        `http://localhost:5000/users/${userIdSelected}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentUser(response.data);
    };
    getUserClicked();
  }, [userIdSelected]);

  return (
    <Paper className={classes.root}>
      <Button variant="contained" className={classes.retour} href="/creer-post">
        Retour
      </Button>
      <div className={classes.userImageContainer}>
        <UserImage size="5rem" backgroundColor="grey" />
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Pseudo"
              value={`${currentUser.pseudo ? ` ${currentUser.pseudo}` : ""}`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Prénom"
              value={`${
                currentUser.firstname ? ` ${currentUser.firstname}` : ""
              }`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Nom"
              value={`${
                currentUser.lastname ? ` ${currentUser.lastname}` : ""
              }`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Email"
              value={`${currentUser.email ? ` ${currentUser.email}` : ""}`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Poste Actuel"
              value={`${
                currentUser.workplace ? ` ${currentUser.workplace}` : ""
              }`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Git-Hub Page"
              value={`${currentUser.github ? ` ${currentUser.github}` : ""}`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Linkedin"
              value={`${
                currentUser.linkedin ? ` ${currentUser.linkedin}` : ""
              }`}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Langues"
              value={userLanguages.map((lang) => lang.language_name).join(", ")}
              fullWidth
              InputLabelProps={{
                shrink: true,
                disableAnimation: true,
                position: "top",
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Informations;
