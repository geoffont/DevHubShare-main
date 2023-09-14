/* eslint-disable react/prop-types */
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function LangSelectSignUp({ onChange }) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [sideLanguages, setSideLanguages] = useState([]);

  const handleClose = () => {
    setSelectOpen(false);
  };

  const handleOpen = () => {
    setSelectOpen(true);
  };

  const getLanguages = () => {
    axios
      .get("http://localhost:5000/languages")
      .then((response) => response.data)
      .then((data) => {
        setSideLanguages(data);
      });
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <form>
      <FormControl
        sx={{
          m: 1,
          minWidth: 130,
        }}
      >
        <Select
          sx={{
            color: "#009AA6",
            height: 30,
            borderRadius: 1,
            fontSize: 14,
            backgroundColor: "white",
          }}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={selectOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={onChange}
          displayEmpty
          renderValue={(value) => value || "Sélection du langage"}
        >
          {sideLanguages.map((language) => (
            <MenuItem
              sx={{
                color: "#009AA6",
              }}
              key={language.id}
              value={language.language_name}
              onChange={onChange}
            >
              {language.language_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}
