"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread1", 356, 16.0, 49, 3.9),
  createData("Gingerbread2", 356, 16.0, 49, 3.9),
  createData("Gingerbread3", 356, 16.0, 49, 3.9),
  createData("Gingerbread4", 356, 16.0, 49, 3.9),
  createData("Gingerbread5", 356, 16.0, 49, 3.9),
  createData("Gingerbread6", 356, 16.0, 49, 3.9),
];

export default function Page() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  if (startDate != null) {
    console.log(dayjs(startDate).format("YYYY-MM-DD"));
    console.log(dayjs(endDate).format("YYYY-MM-DD"));
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <h2>
            <b>검색조건</b>
          </h2>
        </Grid>
      </Grid>
      <Paper elevation={1} style={{ padding: "10px" }}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          <Grid item xs={1}>
            <div style={{ lineHeight: "50px", height: "50px" }}>상품코드:</div>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic"
              label="상품코드"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1}>
            <div style={{ lineHeight: "50px", height: "50px" }}>LotNumber:</div>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic"
              label="LotNumber"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1}>
            <div style={{ lineHeight: "50px", height: "50px" }}>재고키:</div>
          </Grid>
          <Grid item xs={11}>
            <TextField id="outlined-basic" label="재고키" variant="outlined" />
          </Grid>
          <Grid item xs={1}>
            <div style={{ lineHeight: "50px", height: "50px" }}>지번:</div>
          </Grid>
          <Grid item xs={11}>
            <TextField id="outlined-basic" label="지번" variant="outlined" />
          </Grid>

          <Grid item xs={1}>
            <div style={{ lineHeight: "50px", height: "50px" }}>날짜:</div>
          </Grid>
          <Grid item xs={11}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="시작일"
                format={"YYYY-MM-DD"}
                value={startDate}
                defaultValue={new Date()}
                onChange={(value) => setStartDate(value)}
              />{" "}
              <span style={{ lineHeight: "50px", height: "50px" }}> ~ </span>{" "}
              <DesktopDatePicker
                label="종료일"
                minDate={startDate}
                defaultValue={startDate}
                format={"YYYY-MM-DD"}
                value={endDate}
                onChange={(value) => setEndDate(value)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>
            <b>리스트</b>
          </h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container item justifyContent={"center"}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Grid>
      </Grid>
    </>
  );
}
