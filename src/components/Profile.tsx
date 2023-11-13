import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { LinearLoading } from "./LinearLoading";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "src/auth";
import { clearUser } from "./configs/usersSlice";
import { tasksApi } from "./configs/tasksApiSlice";
import { newsApi } from "./configs/newsApiSlice";

export const Profile = () => {
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    signOut();
    dispatch(clearUser());
    dispatch(tasksApi.util.resetApiState());
  };

  return user ? (
    <Box>
      <Typography>Email: {user.email}</Typography>
      <Typography>UID: {user.sub}</Typography>
      <Typography>Department:</Typography>
      <Typography>Postition:</Typography>
      <Button variant="contained" onClick={() => handleSignout()}>
        Sign out
      </Button>
    </Box>
  ) : (
    <LinearLoading />
  );
};
