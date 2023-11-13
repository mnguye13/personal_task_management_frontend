import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

export const BasicLineChart = ({ title, data }) => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <LineChart
        title="Velocity"
        xAxis={[
          {
            dataKey: "openDate",
            valueFormatter: (d) => dayjs(d).format("MM/DD/YYYY"),
          },
        ]}
        series={[{ dataKey: "count" }]}
        dataset={data}
        width={500}
        height={300}
      />
    </>
  );
};
