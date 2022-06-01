import React, { useState ,useEffect} from "react";

import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  IconButton,
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function ExamTimeTableComponents(props) {
  const [Exams, setExams] = useState(props.ExamsTimeList);
  useEffect(() => {
    setExams(props.ExamsTimeList)
  }, [props]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Exams.slice(page * row, page * row + row).map((item, index) => (
              <TableRow>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
                <TableCell>{item.date.substring(0, 10)}</TableCell>
                <TableCell>{`${item.subject.Subject_Name} - ${item.subject.Class_Id.Std_Name}`}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon style={{ color: green[900] }} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon style={{ color: red[500] }} />
                  </IconButton>
                  <IconButton>
                    <VisibilityIcon style={{ color: "blue" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10]}
          count={Exams.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
