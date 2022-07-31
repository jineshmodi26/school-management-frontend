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
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function CustomExamTableComponents(props) {
  const [Exams, setExams] = useState([]);
  const deleteExam = async (id) => {
if(window.confirm('Do you really want to Delete Exam?') ){ 
   await axios({
      method : "DELETE",
      url : `${process.env.REACT_APP_API_URL}/exams/admin/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }      
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setExams(Exams.filter((Exams) => {
          return Exams._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }
}
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);
  useEffect(() => {
    setExams(props.Examlist);
  },[props])
  return (
    <>
    <ToastContainer/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Related Class</TableCell>
              <TableCell>Schedule By</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Exams.slice(page * row, page * row + row).map((item, index) => (
              <TableRow>
                <TableCell>{index+1}</TableCell>
                <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{(item.class ===null)?"deleted":item.class.Std_Name}</TableCell>
                <TableCell>{(item.teacher === null)?"Admin":item.teacher.Teacher_Name}</TableCell>
                <TableCell>
                <Link to={`/Exams/edit/${item._id}`}>
                  <IconButton >
                    <EditIcon style={{ color: green[900] }} />
                  </IconButton>
                </Link>
                  <IconButton onClick={() => {deleteExam(item._id)}}>
                    <DeleteIcon style={{ color: red[500] }} />
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
