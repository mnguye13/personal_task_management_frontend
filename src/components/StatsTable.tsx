import React from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

export const StatsTable = ({ title, data }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h5">{title}</Typography>
        <Table sx={{ width: "100%" }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
              <TableCell align="right">Opened</TableCell>
              <TableCell align="right">Completed</TableCell>
              <TableCell align="right">Past Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">{value.opened}</TableCell>
                <TableCell align="right">{value.completed}</TableCell>
                <TableCell align="right">{value.pastDue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
