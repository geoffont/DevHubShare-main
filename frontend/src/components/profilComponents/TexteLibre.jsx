/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Grid, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 5,
    marginBottom: theme.spacing(2),
  },
}));

function TexteLibre() {
  const [textArea, setTextArea] = useState("");
  const classes = useStyles();
  const { userIdSelected } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userIdSelected}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTextArea(response.data);
      });
  }, []);

  return (
    <div className={classes.root}>
      <h3>Texte libre</h3>
      <List>
        <Grid item xs={12}>
          <TextField
            className={classes.field}
            value={`${textArea.user_text ? ` ${textArea.user_text}` : ""}`}
            multiline
            minRows={8}
            fullWidth
            disabled
          />
        </Grid>
      </List>
    </div>
  );
}

export default TexteLibre;
