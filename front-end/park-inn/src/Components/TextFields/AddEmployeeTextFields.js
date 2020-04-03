import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ width: `100%` }}
    >
      <TextField
        style={{ width: `25%` }}
        id="standard-basic"
        label="First Name"
      />
      <TextField
        style={{ width: `25%` }}
        id="standard-basic"
        label="Last Name"
      />
      <TextField style={{ width: `25%` }} id="standard-basic" label="Email" />
    </form>
  );
}
