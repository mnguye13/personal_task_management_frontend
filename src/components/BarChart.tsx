import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Stack, Typography } from "@mui/material";

export const BasicBars = ({ data, title }) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Low", "Medium", "High", "Critical"] }]}
        series={data}
        width={500}
        height={300}
      />
    </>
  );
};
