import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

export const Dropdown = ({ label, options, selectedValue, onChange, ...rest }) => {
  return (
    <FormControl sx={{ mt: 1, minWidth: 120 }}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select label={label} value={selectedValue} onChange={onChange} defaultValue={rest.defaultValue}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
