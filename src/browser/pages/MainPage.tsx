import React, { useEffect, useState } from "react";

import useConfig from "../../components/useConfig";
import logo from "../../logo.svg";

import { styled } from "@mui/material/styles";
import { Grid, Paper, Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { TasksList } from "../../components/TasksList";

import axios from "axios";
import { Profile } from "src/components/Profile";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function MainPage() {
  const { app } = useConfig();

  const [healthStatus, setHealthStatus] = useState(false);

  const checkHealthStatus = async () => {
    try {
      const { data } = await axios.get("https://n4pm6ia4o0.execute-api.us-east-2.amazonaws.com/default/healthCheck");

      setHealthStatus(data);
    } catch (err) {}
  };

  useEffect(() => {
    checkHealthStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h3">Welcome to {app.TITLE}</Typography>
        <Typography variant="body1">
          System Status:{" "}
          {healthStatus ? (
            <>
              <span>
                OK <CheckCircleIcon />
              </span>
            </>
          ) : (
            <span>
              Unavailable <ErrorIcon />
            </span>
          )}
        </Typography>
      </header>
      <Container sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item elevation={2}>
              <Link to="report">Report</Link>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item elevation={2}>
              <Link to="tasks">Tasks</Link>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item elevation={2}>
              <Link to="news">News</Link>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item elevation={2}>
              <Link to="about">About</Link>
            </Item>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Item elevation={8}>
              <Typography variant="h5">Profile</Typography>
              <Profile />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item elevation={8}>
              <Typography variant="h5">Current tasks</Typography>
              <TasksList filteredStatus="Current" />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
