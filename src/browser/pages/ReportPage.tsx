import React from "react";
import { Grid, Paper, Skeleton, Typography, styled } from "@mui/material";
import { BasicBars } from "src/components/BarChart";
import { BasicLineChart } from "src/components/LineChart";
import { NavBar } from "src/components/NavBar";
import { PageTitle } from "src/components/PageTitle";
import { BasicPie } from "src/components/PieChart";
import { useGetTasksQuery } from "src/components/configs/tasksApiSlice";
import { PageLoading } from "src/components/PageLoading";
import dayjs from "dayjs";
import { StatsTable } from "src/components/StatsTable";

export function ReportPage() {
  const { data: tasksData = [], isLoading } = useGetTasksQuery();

  if (isLoading) {
    return <PageLoading isLoading={isLoading} />;
  }

  const pieData = tasksData.reduce(
    (accumulator, task) => {
      if (task.status === "Incomplete") {
        accumulator[0].value += 1;
      } else if (task.status === "In Progress") {
        accumulator[1].value += 1;
      } else if (task.status === "Completed") {
        accumulator[2].value += 1;
      }
      return accumulator;
    },
    [
      { label: "Incomplete", value: 0 },
      { label: "In Progress", value: 0 },
      { label: "Completed", value: 0 },
    ],
  );

  const transformBarData = (inputData) => {
    const labels = ["Incompleted", "In Progress", "Completed"];

    const transformedData = inputData.reduce(
      (acc, task) => {
        const statusIndex = task.status === "In Progress" ? 1 : task.status === "Completed" ? 2 : 0;
        const severityIndex =
          task.severity === "Medium" ? 1 : task.severity === "High" ? 2 : task.severity === "Critical" ? 3 : 0;

        acc[statusIndex].data[severityIndex] += 1;

        return acc;
      },
      labels.map((label) => ({ data: [0, 0, 0, 0], label })),
    );

    return transformedData;
  };

  const barData = transformBarData(tasksData);

  const transformLineData = (inputData) => {
    return Object.entries(
      inputData.reduce((countByDate, task) => {
        const { openDate } = task;

        // If the openDate is already a key, increment the count, otherwise initialize it to 1
        countByDate[openDate] = (countByDate[openDate] || 0) + 1;

        return countByDate;
      }, {}),
    )
      .map(([openDate, count]) => ({
        openDate: dayjs(openDate),
        count: count,
      }))
      .sort((a, b) => a.openDate - b.openDate);
  };

  const lineData = transformLineData(tasksData);

  const countTasksBySeverity = (inputData) => {
    const currentDate = dayjs();

    const result = inputData.reduce((acc, task) => {
      const { status, severity, dueDate } = task;

      if (!acc[severity]) {
        acc[severity] = {
          opened: 0,
          completed: 0,
          pastDue: 0,
        };
      }

      acc[severity].opened += 1;

      if (status === "Completed") {
        acc[severity].completed += 1;
      } else if (status === "Incomplete" && dayjs(dueDate, "MM/DD/YYYY").isBefore(currentDate, "day")) {
        acc[severity].pastDue += 1;
      } else if (status === "In Progress" && dayjs(dueDate, "MM/DD/YYYY").isBefore(currentDate, "day")) {
        acc[severity].pastDue += 1;
      }

      return acc;
    }, {});

    // Sorting by severity: Low, Medium, High, Critical
    const sortedResult = Object.fromEntries(
      Object.entries(result).sort(([a], [b]) => {
        const severityOrder = { Low: 0, Medium: 1, High: 2, Critical: 3 };
        return severityOrder[a] - severityOrder[b];
      }),
    );

    return sortedResult;
  };

  const taskCounts = countTasksBySeverity(tasksData);

  return (
    <>
      <NavBar />
      <PageTitle title="Report" description="Performance Report" />

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Item>
            <BasicPie data={pieData} title="Total Tasks" />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <BasicBars data={barData} title="Severity Level" />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <BasicLineChart title="Daily Tasks" data={lineData} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <StatsTable title="Statistics" data={taskCounts} />
          </Item>
        </Grid>
      </Grid>
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  margin: 20,
  display: "flex",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  height: 300,
}));
