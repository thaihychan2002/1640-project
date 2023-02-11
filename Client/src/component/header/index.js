import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
export default function Header() {
  const classses = useStyles();
  return (
    <Typography variant="h4" align="center" className={classses.container}>
      GreFeed
    </Typography>
  );
}
