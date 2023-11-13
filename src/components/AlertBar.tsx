import React from "react";
import { Snackbar, Alert } from "@mui/material";

export const AlertBar = ({ open, setOpen }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      message="Success"
    >
      <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
        Successfully update task!
      </Alert>
    </Snackbar>
  );
};
