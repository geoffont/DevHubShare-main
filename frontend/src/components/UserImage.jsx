/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: "auto",
    fontSize: theme.spacing(18),
    backgroundColor: theme.palette.primary.main,
  },
}));

function UserImage({ src, size, backgroundColor }) {
  const classes = useStyles();

  return (
    <Avatar
      className={classes.avatar}
      src={src}
      style={{
        width: size || "inherit",
        height: size || "inherit",
        backgroundColor: backgroundColor || "inherit",
      }}
    >
      {UserImage.src ? null : <PersonIcon />}
    </Avatar>
  );
}

export default UserImage;
