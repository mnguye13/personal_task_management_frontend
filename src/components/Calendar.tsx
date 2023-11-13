import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const Calendar = ({ value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Due Date" value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
};
