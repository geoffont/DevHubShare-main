import React, { useState } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  AccordionDetails,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";

export default function EditAnswer({
  postId,
  answer,
  handleAnswerSubmit,
  handleUpdateAnswer,
}) {
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

  return (
    <AccordionDetails key={answer.id} sx={{ pb: 1 }}>
      <Grid container direction="column">
        <Grid item component="form" onSubmit={handleAnswerSubmit}>
          <TextField
            aria-label="answer"
            aria-readonly
            InputLabelProps={{ shrink: true }}
            label={`${format(new Date(answer.creation_date), "dd-MM-yyyy")} - ${
              answer.user_id === parseInt(localStorage.getItem("userId"), 10)
                ? `Vous`
                : `${answer.user_pseudo}`
            }`}
            value={
              editingAnswerId === answer.id
                ? editingAnswerText
                : answer.answer_text
            }
            onChange={(e) => setEditingAnswerText(e.target.value)}
            multiline
            rows={2}
            size="small"
            sx={{
              width: "100%",
              borderRadius: 1,
              border: "dotted 1px #82BE00",
              backgroundColor: "#FFFFFF",
            }}
            InputProps={{
              endAdornment: answer.user_id ===
                parseInt(localStorage.getItem("userId"), 10) && (
                <InputAdornment position="end">
                  {editingAnswerId === answer.id ? (
                    <IconButton
                      aria-label="save"
                      size="small"
                      onClick={handleSaveClick}
                    >
                      <SaveIcon sx={{ color: "#82BE00" }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={handleEditClick}
                      disabled={
                        editingAnswerId !== null &&
                        editingAnswerId !== answer.id
                      }
                    >
                      <ModeEditIcon sx={{ color: "#82BE00" }} />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
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
  handleAnswerSubmit: PropTypes.func.isRequired,
  handleUpdateAnswer: PropTypes.func.isRequired,
};
