import { Box, Container, Typography } from "@mui/material";
import * as React from "react";

export const PageTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {description}
        </Typography>
      </Container>
    </Box>
  );
};
