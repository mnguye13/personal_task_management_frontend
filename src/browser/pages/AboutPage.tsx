import * as React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PageTitle } from "src/components/PageTitle";
import { NavBar } from "src/components/NavBar";

export const AboutPage = () => {
  return (
    <>
      <NavBar />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <PageTitle title="About" description="Personal Task Management App" />

        <Typography variant="h5" component="h2" gutterBottom>
          This app is developed using React for frontend with AWS Lambda as the backend.
        </Typography>
        <Typography variant="body1">Libraries Used</Typography>
      </Container>
    </>
  );
};
