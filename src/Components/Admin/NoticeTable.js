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
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function CustomNoticeTableComponents(props) {
  const [Notice, setNotice] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);
  const deleteNotice = async (id) => {
    await axios({
      method : "DELETE",
      url : `${process.env.REACT_APP_API_URL}/notices/admin/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }      
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setNotice(Notice.filter((Notice) => {
          return Notice._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }
  useEffect(() => {
    setNotice(props.Notices);
  },[])

  return (
    <>
    <ToastContainer />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Notice Title</TableCell>
              <TableCell>Notice Details</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Notice.slice(page * row, page * row + row).map((item,index) => (
              <TableRow>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.Notice_Title}</TableCell>
                <TableCell>{item.Notice_Details}</TableCell>
                <TableCell>
                {
                    item.Classes_Id.map((classe,index) => {
                      if(classe.Class_Id===null){
                        return <span></span>
                      }
                      else{
                      return <span>{` ${classe.Class_Id.Std_Name},`}</span>
                      }
                    })
                  }
                </TableCell>
                <TableCell>{(item.Creator_Id === null)?"Admin":item.Creator_Id.Teacher_Name}</TableCell>
                <TableCell>
                  <Link to={`/Notices/edit/${item._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: green[900] }}/>
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => {deleteNotice(item._id)}}>
                    <DeleteIcon style={{ color: red[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 7,10]}
          count={Notice.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
