import React, { useEffect, useState } from "react";

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
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function CustomStudentTableComponents(props) {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);

  const deleteStudent = async (id) => {
    await axios({
      method : "DELETE",
      url : `${process.env.REACT_APP_API_URL}/students/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }      
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setStudents(students.filter((student) => {
          return student._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  useEffect(() => {
    setStudents(props.students);
  },[])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Fees payment</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.slice(page * row, page * row + row).map((item) => (
              <TableRow>
                <TableCell>{item.studentID}</TableCell>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>{item.pendingFees > 0 ? "Pending" : "Paid"}</TableCell>
                <TableCell>
                  <Link to={`/students/edit/${item._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: green[900] }} />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => {deleteStudent(item._id)}}>
                    <DeleteIcon style={{ color: red[500] }} />
                  </IconButton>
                  <Link to={`/students/view/${item._id}`}>
                    <IconButton>
                      <VisibilityIcon style={{ color: "blue" }} />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10]}
          count={students.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
