/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [deletedUser, setDeletedUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUser("");
    setOpen(false);
    setErrorMessage("");
  };
  const handleConfirm = () => {
    navigate("/inscription");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    if (!userId) {
      setErrorMessage("Veuillez confirmer la suppression");

      return;
    }

    axios
      .delete(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDeletedUser(response.data);
        setErrorMessage("");
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          "Une erreur s'est produite lors de la suppression du compte"
        );
      });
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Supprimer votre compte
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ATTENTION vous allez supprimer votre compte</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour supprimer votre compte, veuillez confirmer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleConfirm}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
