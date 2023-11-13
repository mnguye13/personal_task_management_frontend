import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ListItemText from "@mui/material/ListItemText";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Checkbox from "@mui/material/Checkbox";
import { SearchBar } from "./SearchBar";
import { Dropdown } from "./Dropdown";

import { Box, Container, Chip, Divider, IconButton, Tooltip, Badge, Typography } from "@mui/material";
import { TaskModal } from "./TaskModal";
import { useGetTasksQuery, useUpdateTaskMutation } from "./configs/tasksApiSlice";
import _ from "lodash";
import { LinearLoading } from "./LinearLoading";
import { AlertBar } from "./AlertBar";

import dayjs from "dayjs";

export function TasksList({ filteredStatus }: { filteredStatus: string | null }) {
  const [checked, setChecked] = useState([0]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [tasks, setTasks] = useState([] as any[]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);

  const options = ["All", "Critical", "High", "Medium", "Low"];

  const { data: tasksData = [], isLoading } = useGetTasksQuery();
  const [updateTask, result] = useUpdateTaskMutation();

  let defaultTasks = _.cloneDeep(tasksData).sort((a, b) => b.status.localeCompare(a.status));

  if (filteredStatus === "Current") {
    defaultTasks = defaultTasks.filter((task) => ["Incomplete", "In Progress"].includes(task.status));
  } else if (filteredStatus) {
    defaultTasks = defaultTasks.filter((task) => task.status === filteredStatus);
  }

  useEffect(() => {
    if (!isLoading) {
      setTasks(defaultTasks);
    }
  }, [tasksData, isLoading]);

  if (isLoading) {
    return <LinearLoading />;
  }

  const colorMapping = {
    Critical: "error",
    High: "warning",
    Medium: "info",
    Low: "secondary",
    Completed: "success",
    Incomplete: "error",
    "In Progress": "primary",
  };

  const handleSearchChange = (event: React.SyntheticEvent) => {
    setSearchValue(event.target.value);

    setTasks(defaultTasks.filter((task) => task.name.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  const handleDropdownChange = (event: React.SyntheticEvent) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "All") {
      setTasks(defaultTasks);

      return;
    }

    setTasks(defaultTasks.filter((task) => task.severity === event.target.value));
  };

  const handleToggle = (updatedTask: any) => () => {
    const currentIndex = checked.indexOf(updatedTask.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(updatedTask.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    updateTask({ ...updatedTask, status: "Completed" });
  };

  const handleUpdateStatus = (updatedTask) => {
    updateTask(updatedTask);
    setOpenSuccessSnackBar(true);
  };

  return (
    <Container>
      <AlertBar open={openSuccessSnackBar} setOpen={setOpenSuccessSnackBar} />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <SearchBar value={searchValue} onChange={handleSearchChange} />
        <Dropdown
          label="Severity"
          options={options}
          selectedValue={selectedOption}
          onChange={handleDropdownChange}
          defaultValue={"All"}
        />
      </Box>

      <TaskModal
        task={selectedTask}
        open={openModal}
        handleOpen={() => setOpenModal(true)}
        handleClose={() => setOpenModal(false)}
      />
      {tasks.length > 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {tasks.map((task) => {
            const labelId = `checkbox-list-label-${task}`;

            return (
              <>
                <Divider variant="inset" component="li" />

                <ListItem
                  key={task}
                  secondaryAction={
                    <>
                      {!["Completed", "In Progress"].includes(task.status) ? (
                        <Tooltip title="Mark as In Progress">
                          <IconButton onClick={() => handleUpdateStatus({ ...task, status: "In Progress" })}>
                            <PlayArrowIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Mark as Incomplete">
                          <IconButton onClick={() => handleUpdateStatus({ ...task, status: "Incomplete" })}>
                            <RestartAltIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                  disablePadding
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.status === "Completed" || checked.indexOf(task) !== -1}
                      disabled={task.status === "Completed"}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      onClick={handleToggle(task)}
                    />
                  </ListItemIcon>

                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      setSelectedTask(task), setOpenModal(true);
                    }}
                    dense
                  >
                    <Badge
                      variant="dot"
                      color={colorMapping[task.severity]}
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      <ListItemText
                        id={labelId}
                        primary={task.name}
                        secondary={
                          <>
                            Due Date: {task.dueDate}
                            <Chip
                              sx={{ marginLeft: 1 }}
                              variant="filled"
                              size="small"
                              label={task.status}
                              color={colorMapping[task.status]}
                            />
                            {task.status !== "Completed" &&
                              dayjs(task.dueDate, "MM/DD/YYYY").isBefore(dayjs(), "day") && (
                                <Chip
                                  sx={{ marginLeft: 1 }}
                                  variant="outlined"
                                  size="small"
                                  label="Past Due"
                                  color="error"
                                  icon={<PriorityHighIcon fontSize="small" />}
                                />
                              )}
                          </>
                        }
                      />
                    </Badge>
                  </ListItemButton>
                </ListItem>
              </>
            );
          })}
        </List>
      ) : (
        <Typography>No tasks</Typography>
      )}
    </Container>
  );
}
