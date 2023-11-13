import * as React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PageTitle } from "src/components/PageTitle";
import { NavBar } from "src/components/NavBar";

export const AboutPage = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ py: 8 }} maxWidth="md">
        <PageTitle title="About" description="Personal Task Management App" />
        <Typography variant="h5" component="h2" gutterBottom>
          My Board is a user-friendly and intuitive application designed to help individuals efficiently organize and
          manage their daily tasks, enhancing productivity and time management. This feature-rich application provides
          users with a seamless experience for creating, tracking, and completing tasks with ease.
        </Typography>
        <Typography variant="h6" component="h2">
          Features
        </Typography>
        <Typography gutterBottom>Intuitive Task Creation, Priority Management, Performance Tracking</Typography>
        <Typography variant="h6" component="h2">
          Frontend
        </Typography>
        <Typography gutterBottom>ReactJS</Typography>
        <Typography variant="h6" component="h2">
          Backend
        </Typography>
        <Typography gutterBottom>AWS Cognito, AWS API Gateway, AWS Lambda, AWS DynamoDb, and AWS S3</Typography>

        <Typography variant="h6" component="h2">
          Key Libraries
        </Typography>
        <Typography gutterBottom>MUI, Redux Toolkit, React Router Dom</Typography>
      </Container>
    </>
  );
};
