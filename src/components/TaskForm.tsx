import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Calendar } from "./Calendar";
import { Dropdown } from "./Dropdown";
import dayjs from "dayjs";
import { usePostTaskMutation } from "./configs/tasksApiSlice";
import { AlertBar } from "./AlertBar";

export const TaskForm = ({ openForm, setOpenForm }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [dueDate, setDueDate] = useState(dayjs());
  const [postTask, result] = usePostTaskMutation();
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);

  const handleSeverityDropdown = (event: React.SyntheticEvent) => {
    setSeverity(event.target.value);
  };

  const createNewTask = (task) => {
    postTask({
      ...task,
      id: Date.now(),
      openDate: dayjs().format("MM/DD/YYYY"),
      dueDate: dayjs(task.dueDate).format("MM/DD/YYYY"),
      status: "Incomplete",
    });

    setOpenSuccessSnackBar(true);
    setOpenForm(false);
  };

  return (
    <>
      <AlertBar open={openSuccessSnackBar} setOpen={setOpenSuccessSnackBar} />
      <Dialog open={openForm} onClose={() => setOpenForm(!openForm)} fullWidth>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Container>
            <FormControl fullWidth>
              <TextField
                id="outlined-controlled"
                label="Task Name"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
                variant="outlined"
                margin="normal"
                required
              />

              <Dropdown
                label="Severity"
                options={["Critical", "High", "Medium", "Low"]}
                selectedValue={severity}
                onChange={handleSeverityDropdown}
              />

              <TextField
                id="standard-multiline-static"
                label="Task Description"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
              <Calendar value={dueDate} setValue={setDueDate} />
            </FormControl>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(!openForm)}>Cancel</Button>
          <Button onClick={() => createNewTask({ name, description, dueDate, severity })} disabled={!name}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
