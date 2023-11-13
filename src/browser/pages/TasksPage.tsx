import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper, Grid, Fab } from "@mui/material";

import { BasicTabs } from "src/components/Tabs";
import { PageTitle } from "src/components/PageTitle";
import { TasksList } from "src/components/TasksList";

import { NavBar } from "src/components/NavBar";
import AddIcon from "@mui/icons-material/Add";
import { TaskForm } from "src/components/TaskForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function TasksPage() {
  const [value, setValue] = React.useState(0);
  const [openForm, setOpenForm] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar />
      <PageTitle title="Tasks" description="Manage tasks" />

      <TaskForm openForm={openForm} setOpenForm={setOpenForm} />

      <Container>
        <Fab color="primary" aria-label="add" onClick={() => setOpenForm(true)}>
          <AddIcon />
        </Fab>
        <BasicTabs value={value} handleChange={handleChange} />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ maxHeight: "400px", overflow: "auto" }}>
              <CustomTabPanel value={value} index={0}>
                <TasksList />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TasksList filteredStatus="In Progress" />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <TasksList filteredStatus="Completed" />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <TasksList filteredStatus="Incomplete" />
              </CustomTabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
