// import React, { useState } from "react";

// import {
//   Table,
//   TableContainer,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
//   TablePagination,
//   Paper,
//   IconButton,
// } from "@material-ui/core";

// import { green, red } from "@material-ui/core/colors";

// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";

// export default function CustomSubjectTableComponents(props) {
//   const [page, setPage] = useState(0);
//   const [row, setRow] = useState(2);

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Subject Name</TableCell>
//               <TableCell>Teachers</TableCell>
//               <TableCell>Class</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {props.subjects.slice(page * row, page * row + row).map((item) => (
//               <TableRow>
//                 <TableCell>{item.subName}</TableCell>
//                 <TableCell>
//                   {
//                     item.teachers.length
//                   }
//                 </TableCell>
//                 <TableCell>
//                   {item.classes.Std_Name}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton>
//                     <EditIcon style={{ color: green[900] }} />
//                   </IconButton>
//                   <IconButton>
//                     <DeleteIcon style={{ color: red[500] }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[2, 3, 5, 10]}
//           count={props.subjects.length}
//           rowsPerPage={row}
//           page={page}
//           onChangePage={(event, newPage) => setPage(newPage)}
//           onChangeRowsPerPage={(event) => setRow(event.target.value)}
//         />
//       </TableContainer>
//     </>
//   );
// }


// ----------------------------------------------------------- new

import React, { useState, useEffect } from "react";

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

import { blue, green, red } from "@material-ui/core/colors";
import axios from 'axios';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function CustomSubjectTableComponents(props) {

  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);

  const deleteSubject = async (id) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/subjects/${id}`,
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setSubjects(subjects.filter((subject) => {
          return subject._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message)
    });
  }

  useEffect(() => {
    setSubjects(props.subjects);
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.slice(page * row, page * row + row).map((item) => {
              return <TableRow>
                <TableCell>{item.Subject_Name}</TableCell>
                <TableCell>
                  {item.Class_Id.Std_Name}
                </TableCell>
                <TableCell>
                  <Link to={`/subjects/edit/${item._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: green[900] }} />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => { deleteSubject(item._id) }}>
                    <DeleteIcon style={{ color: red[500] }} />
                  </IconButton>
                  <Link to={`/subjects/view/${item._id}`}>
                    <IconButton>
                      <VisibilityIcon style={{ color : "blue" }} />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            }
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10]}
          count={subjects.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
