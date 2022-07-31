// import React, { useEffect, useState } from "react";

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
// import axios from "axios";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { toast, ToastContainer } from "react-toastify";
// import { Link } from "react-router-dom";

// export default function CustomTeacherTableComponents(props) {
  
//   const [teachers, setTeachers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [row, setRow] = useState(2);

//   const deleteTeacher = async (id) => {
//     await axios({
//       method : "DELETE",
//       url : `${process.env.REACT_APP_API_URL}/teachers/${id}`,
//       headers : {
//         "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//       }      
//     }).then((res) => {
//       if (res.data.error) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         setTeachers(teachers.filter((teacher) => {
//           return teacher._id !== id;
//         }));
//       }
//     }).catch((error) => {
//       toast.error(error.response.data.message);
//     });
//   }

//   useEffect(() => {
//     setTeachers(props.teachers);
//   },[])

//   return (
//     <>
//     <ToastContainer />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Teacher Name</TableCell>
//               <TableCell>Salary</TableCell>
//               <TableCell>Subject</TableCell>
//               <TableCell>Allocated Class</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {teachers.slice(page * row, page * row + row).map((item) => (
//               <TableRow>
//                 <TableCell>{item.Teacher_Name}</TableCell>
//                 <TableCell>{item.Salary}</TableCell>
//                 <TableCell>
//                   {
//                     item.Subjects_Id.map((subject) => {
//                       return <p>{subject.Subject_Id.Subject_Name}</p>
//                     })
//                   }
//                 </TableCell>
//                 <TableCell>
//                   {
//                     item.Subjects_Id.map((subject) => {
//                       return <p>{subject.Subject_Id.Class_Id.Std_Name}</p>
//                     })
//                   }
//                 </TableCell>
//                 <TableCell>
//                   <Link to={`/teachers/edit/${item._id}`}>
//                     <IconButton>
//                       <EditIcon style={{ color: green[900] }} />
//                     </IconButton>
//                   </Link>
//                   <IconButton onClick={() => {deleteTeacher(item._id)}}>
//                     <DeleteIcon style={{ color: red[500] }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[2, 3, 5, 10]}
//           count={teachers.length}
//           rowsPerPage={row}
//           page={page}
//           onChangePage={(event, newPage) => setPage(newPage)}
//           onChangeRowsPerPage={(event) => setRow(event.target.value)}
//         />
//       </TableContainer>
//     </>
//   );
// }

// ------------------------------------------------- new

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
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function CustomTeacherTableComponents(props) {
  
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);

  const deleteTeacher = async (id) => {
	if(window.confirm('Do you really want to Teacher?') ){   
 await axios({
      method : "DELETE",
      url : `${process.env.REACT_APP_API_URL}/teachers/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }      
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setTeachers(teachers.filter((teacher) => {
          return teacher._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }
}
  useEffect(() => {
    setTeachers(props.teachers);
  },[])

  return (
    <>
    <ToastContainer />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teacher Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Allocated Class</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.slice(page * row, page * row + row).map((item) => (
              <TableRow>
                <TableCell>{item.Teacher_Name}</TableCell>
                <TableCell>{item.UserName}</TableCell>
                <TableCell>{item.Salary}</TableCell>
                <TableCell>
                  {
                    item.Subjects_Id.map((subject) => {
                      if (subject.Subject_Id !== null) return <p>{subject.Subject_Id.Subject_Name}</p>
                      else return <p>Deleted</p>
                    })
                  }
                </TableCell>
                <TableCell>
                  {
                    item.Subjects_Id.map((subject) => {
                      if (subject.Subject_Id !== null)
                        if(subject.Subject_Id.Class_Id !== null)
                          return <p>{subject.Subject_Id.Class_Id.Std_Name}</p>
                        else return <p>Deleted</p>
                      else return <p>Deleted</p>
                    })
                  }
                </TableCell>
                <TableCell>
                  <Link to={`/teachers/edit/${item._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: green[900] }} />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => {deleteTeacher(item._id)}}>
                    <DeleteIcon style={{ color: red[500] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10]}
          count={teachers.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
