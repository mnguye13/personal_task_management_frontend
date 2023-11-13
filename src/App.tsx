import "./App.css";

import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import useConfig from "./components/useConfig";
import MainPage from "./browser/pages/MainPage";
import ErrorPage from "./browser/pages/ErrorPage";
import { ReportPage } from "./browser/pages/ReportPage";
import { TasksPage } from "./browser/pages/TasksPage";
import { NewsPage } from "./browser/pages/NewsPage";
import { LoginPage } from "./browser/pages/LoginPage";
import { AboutPage } from "./browser/pages/AboutPage";
import { Typography, Link, Container, Box, CssBaseline } from "@mui/material";
import { SignUpPage } from "./browser/pages/SignUpPage";
import { ConfirmSignUpPage } from "./browser/pages/ConfirmSignUpPage";
import { ProtectedRoute } from "./browser/pages/ProtectedRoute";

/**
 * Our Web Application
 */

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        My Board
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  const { app } = useConfig();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/confirmsignup">
            <ConfirmSignUpPage />
          </Route>
          <ProtectedRoute exact path="/" component={MainPage} />
          <ProtectedRoute path="/dashboard" component={MainPage} />
          <ProtectedRoute path="/report" component={ReportPage} />
          <ProtectedRoute path="/tasks" component={TasksPage} />
          <Route path="/news">
            <NewsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">Developed By Minh Nguyen</Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </>
  );
}
