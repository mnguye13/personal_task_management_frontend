import { Skeleton, Typography } from "@mui/material";
import React from "react";
import { NavBar } from "src/components/NavBar";

export default function ErrorPage() {
  return (
    <>
      <NavBar />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={"100%"}
        height={"500px"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Page not found
      </Skeleton>
    </>
  );
}
