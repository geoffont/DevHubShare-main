import React, { useState } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  IconButton,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";

export default function EditAnswer({ postId, answer, handleUpdateAnswer }) {
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingAnswerText, setEditingAnswerText] = useState(null);

  const handleEditClick = () => {
    setEditingAnswerId(answer.id);
    setEditingAnswerText(answer.answer_text);
  };

  const handleSaveClick = () => {
    handleUpdateAnswer(postId, editingAnswerId, editingAnswerText);
    setEditingAnswerId(null);
    setEditingAnswerText(null);
  };

  const isOwner =
    answer.user_id === parseInt(localStorage.getItem("userId"), 10);
  const isEditing = editingAnswerId === answer.id;

  return (
    <AccordionDetails sx={{ pb: 1, px: 2 }}>
      <Box sx={{ mb: 0.5 }}>
        <Typography sx={{ fontSize: 11, color: "#94A3B8", mb: 0.5 }}>
          {format(new Date(answer.creation_date), "dd/MM/yyyy")} —{" "}
          {isOwner ? "Vous" : answer.user_pseudo}
        </Typography>
        <TextField
          value={isEditing ? editingAnswerText : answer.answer_text}
          onChange={(e) => setEditingAnswerText(e.target.value)}
          multiline
          rows={2}
          size="small"
          fullWidth
          InputProps={{
            readOnly: !isEditing,
            endAdornment: isOwner && (
              <InputAdornment position="end">
                {isEditing ? (
                  <IconButton size="small" onClick={handleSaveClick}>
                    <SaveIcon sx={{ fontSize: 18, color: "#6366F1" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    onClick={handleEditClick}
                    disabled={
                      editingAnswerId !== null && editingAnswerId !== answer.id
                    }
                  >
                    <ModeEditIcon sx={{ fontSize: 18, color: "#94A3B8" }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#F8FAFC",
              "& fieldset": { borderColor: "#E2E8F0" },
              "&:hover fieldset": { borderColor: "#CBD5E1" },
              "&.Mui-focused fieldset": { borderColor: "#6366F1" },
            },
          }}
        />
      </Box>
    </AccordionDetails>
  );
}

EditAnswer.propTypes = {
  postId: PropTypes.number.isRequired,
  answer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    answer_text: PropTypes.string.isRequired,
    creation_date: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    user_pseudo: PropTypes.string.isRequired,
  }).isRequired,
  handleUpdateAnswer: PropTypes.func.isRequired,
};
