/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  TextField,
  Button,
  List,
  Card,
  CardContent,
} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "../UserImage";
import ModalSuppression from "./ModalSuppression";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  texteLibreContainer: {
    background: "#FFF",
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  card: {
    background: "#82BE00",
    marginBottom: theme.spacing(2),
  },
  gridCard: {
    display: "grid",
    alignItems: "center",
  },
}));

function RegisteredInformations() {
  const [currentUser, setCurrentUser] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const [userUpdate, setUserUpdate] = useState([currentUser]);
  const [pseudo, setPseudo] = useState([currentUser]);
  const [firstname, setFirstname] = useState([currentUser]);
  const [lastname, setLastname] = useState([currentUser]);
  const [email, setEmail] = useState([currentUser]);
  const [workplace, setWorkplace] = useState([currentUser]);
  const [github, setGithub] = useState([currentUser]);
  const [linkedin, setLinkedin] = useState([currentUser]);
  const [userText, setUserText] = useState([currentUser]);
  const [sideLanguages, setSideLanguages] = useState([]);
  const [language_id, setLanguageId] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getLanguages = () => {
    axios
      .get("http://localhost:5000/languages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .then((data) => {
        setSideLanguages(data);
      });
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCurrentUser(response.data);
      });
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      axios
        .get(`http://localhost:5000/user_has_language/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .then((data) => {
          const userLanguageObjects = data.map((lang) => ({
            language_name: lang.language_name,
          }));
          setUserLanguages(userLanguageObjects);
        });
    }
  }, [currentUser]);

  const handleSaveChanges = (event) => {
    event.preventDefault();
    navigate("/mon-compte");
    const languageUpdate = {
      language_id,
    };
    axios
      .put(
        `http://localhost:5000/users/${userId}`,
        { ...userUpdate, language_id, languageUpdate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUserUpdate([...userUpdate, response.data]);
        setLanguageId([selectedLanguage]);
        setSelectedLanguage("");
      });
  };

  const handlePseudoChange = (event) => {
    setPseudo(event.target.value);
    setUserUpdate({ ...userUpdate, pseudo: event.target.value });
  };
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
    setUserUpdate({ ...userUpdate, firstname: event.target.value });
  };
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
    setUserUpdate({ ...userUpdate, lastname: event.target.value });
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setUserUpdate({ ...userUpdate, email: event.target.value });
  };
  const handleWorkplaceChange = (event) => {
    setWorkplace(event.target.value);
    setUserUpdate({ ...userUpdate, workplace: event.target.value });
  };
  const handleGithubChange = (event) => {
    setGithub(event.target.value);
    setUserUpdate({ ...userUpdate, github: event.target.value });
  };
  const handleLinkkedinChange = (event) => {
    setLinkedin(event.target.value);
    setUserUpdate({ ...userUpdate, linkedin: event.target.value });
  };
  const handleUserTextChange = (event) => {
    setUserText(event.target.value);
    setUserUpdate({ ...userUpdate, user_text: event.target.value });
  };
  function handleLanguageChange(id) {
    if (typeof id === "number") {
      if (language_id.includes(id)) {
        setLanguageId((prev) => prev.filter((languageId) => languageId !== id));
      } else {
        setLanguageId((prev) => [...prev, id]);
      }
    } else {
      setLanguageId((prev) => prev);
    }
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Button
              variant="contained"
              className={classes.retour}
              href="/creer-post"
            >
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
                    label={`Pseudo*${
                      currentUser.pseudo ? ` (${currentUser.pseudo})` : ""
                    }`}
                    value={pseudo}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="pseudo"
                    onChange={handlePseudoChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label={`Prénom${
                      currentUser.firstname ? ` (${currentUser.firstname})` : ""
                    }`}
                    value={firstname}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="firstname"
                    onChange={handleFirstnameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label={`Nom${
                      currentUser.lastname ? ` (${currentUser.lastname})` : ""
                    }`}
                    value={lastname}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="lastname"
                    onChange={handleLastnameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label={`Email*${
                      currentUser.email ? ` (${currentUser.email})` : ""
                    }`}
                    value={email}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="email"
                    id="email"
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label={`Poste actuel${
                      currentUser.workplace ? ` (${currentUser.workplace})` : ""
                    }`}
                    value={workplace}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="workplace"
                    onChange={handleWorkplaceChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label={`Github${
                      currentUser.github ? ` (${currentUser.github})` : ""
                    }`}
                    value={github}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="github"
                    onChange={handleGithubChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label={`Linkedin${
                      currentUser.linkedin ? ` (${currentUser.linkedin})` : ""
                    }`}
                    value={linkedin}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="linkedin"
                    onChange={handleLinkkedinChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label="Langages"
                    value={userLanguages
                      .map((lang) => lang.language_name)
                      .join(", ")}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      disableAnimation: true,
                      position: "top",
                    }}
                    type="text"
                    id="langages"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Langages préférés*
                  </Typography>
                  {sideLanguages.map((language) => (
                    <FormControlLabel
                      key={language.id}
                      control={
                        <Checkbox
                          checked={language_id.includes(language.id)}
                          onChange={() => handleLanguageChange(language.id)}
                          name={language.language_name}
                        />
                      }
                      label={language.language_name}
                    />
                  ))}
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    className={classes.valider}
                    onClick={handleSaveChanges}
                  >
                    Valider
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  *Champs obligatoire
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid className={classes.gridCard} item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <h3>Texte libre</h3>
              <List>
                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    label="Votre texte ici"
                    value={currentUser.userText}
                    multiline
                    minRows={8}
                    fullWidth
                    type="text"
                    id="texte libre"
                    onChange={handleUserTextChange}
                  />
                </Grid>
              </List>
            </CardContent>
          </Card>
          <Grid item xs={12} className={classes.valider}>
            <ModalSuppression />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisteredInformations;
