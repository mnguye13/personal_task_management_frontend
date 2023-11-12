import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";

export const BasicPie = ({ data, title }) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <PieChart
        series={[
          {
            data,
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};
