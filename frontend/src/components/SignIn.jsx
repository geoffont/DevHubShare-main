/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import BasicModal from "./BasicModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function SignIn() {
  const token = localStorage.getItem("token");
  const schema = Yup.object({
    email: Yup.string().email("Email non valide").required("Email requis"),
    password: Yup.string()
      .min(8, "8 charactères minimum requis")
      .required("Mot de passe requis"),
  });

  const navigate = useNavigate();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId.toString());
        navigate("/creer-post");
      } catch (error) {
        helpers.setErrors({ submit: "Email ou mot de passe invalide" });
      }
    },
    validationSchema: schema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label=" Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(formik.errors.password)}
            helperText={formik.errors.password}
            onChange={formik.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Connexion
          </Button>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <BasicModal />
            </Grid>
            <Grid item xs={8}>
              <Button href="/inscription">Pas de compte? S'inscrire</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
