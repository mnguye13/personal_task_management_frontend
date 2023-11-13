import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

export const NavBar = () => {
  const history = useHistory();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#222" }}>
      <Toolbar>
        <Button sx={{ color: "white" }} variant="text" onClick={() => history.push("/")}>
          <Typography>My Board</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
