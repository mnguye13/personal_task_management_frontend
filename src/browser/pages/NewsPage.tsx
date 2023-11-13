import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Button, CardActions, Typography, Grid, Container } from "@mui/material";
import axios from "axios";
import { PageTitle } from "src/components/PageTitle";
import { NavBar } from "src/components/NavBar";
import { useGetNewsQuery } from "src/components/configs/newsApiSlice";
import { PageLoading } from "src/components/PageLoading";

export function NewsPage() {
  const { data: articles = [], error, isLoading } = useGetNewsQuery();

  return (
    <>
      <NavBar />
      <PageTitle title="News" description="U.S Top News" />
      <PageLoading isLoading={isLoading} />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {articles.map(
            (
              article: {
                urlToImage: string | undefined;
                title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                content: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                url: string;
              },
              index: React.Key | null | undefined,
            ) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card elevation={4} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%",
                    }}
                    image={article.urlToImage}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {article.title}
                    </Typography>
                    <Typography> {article.content}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={article.url} target="_blank">
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ),
          )}
        </Grid>
      </Container>
    </>
  );
}
