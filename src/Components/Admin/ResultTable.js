import React, { useState,useEffect } from "react";

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

export default function CustomResultTableComponents(props) {
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Exam Start Date</TableCell>
              <TableCell>Subject-Marks</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.resultList.slice(page * row, page * row + row).map((item, index) => (
              <TableRow>
                <TableCell>{(item.student===null)?"":item.student.studentName}</TableCell>
                <TableCell>{(item.student===null)?"":item.student.studentID}</TableCell>
                <TableCell>{(item.exam===null)?"":item.exam.class.Std_Name}</TableCell>
                <TableCell>{(item.exam===null)?"":item.exam.startDate.slice(0,10)}</TableCell>
                <TableCell>
                    {
                        item.exams.map((exam) => {
                          if(exam.subject)
                            return <p>{exam.subject.Subject_Name} - {exam.marks}</p>
                          else{
                            return <></>
                          }
                        })
                    }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10]}
          count={props.resultList.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
