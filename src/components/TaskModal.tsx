import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stepper, Step, StepLabel, Rating } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const TaskModal = ({
  task,
  open,
  handleOpen,
  handleClose,
}: {
  task: any;
  open: boolean;
  handleOpen: () => any;
  handleClose: () => any;
}) => {
  const steps = ["Incomplete", "In Progress", "Completed"];

  const stepsMapping = {
    Incomplete: 0,
    "In Progress": 1,
    Completed: 3,
  };

  const severityMapping = {
    Low: 1,
    Medium: 3,
    High: 4,
    Critical: 5,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {task.name} <Rating name="read-only" value={severityMapping[task.severity]} readOnly />
          </Typography>
          <Stepper activeStep={stepsMapping[task.status]} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography id="modal-modal-openDate" sx={{ mt: 2 }}>
            Open Date: {task.openDate}
          </Typography>
          <Typography id="modal-modal-dueDate" sx={{ mt: 2 }}>
            Due Date: {task.dueDate}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description: {task.description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
