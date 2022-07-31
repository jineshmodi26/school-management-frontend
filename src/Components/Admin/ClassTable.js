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

// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from '@material-ui/icons/Delete';
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

// export default function CustomClassTableComponents(props) {
//   const [classes, setClasses] = useState([]);
//   const [page, setPage] = useState(0);
//   const [row, setRow] = useState(2);

//   useEffect(() => {
//     setClasses(props.classes);
//   },[])

//   const deleteClass = async (id) => {
//     // setClasses(classes.filter((cls) => {
//     //   return cls._id !== id;
//     // }))
//     await axios({
//       method : "DELETE",
//       url : `${process.env.REACT_APP_API_URL}/classes/${id}`,
//       headers : {
//         "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//       }
//     }).then((res) => {
//       if (res.data.error) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         setClasses(classes.filter((cls) => {
//           return cls._id !== id;
//         }));
//       }
//     }).catch((error) => {
//       toast.error(error.response.data.message);
//     });

//   }

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>STD.</TableCell>
//               <TableCell>Total Students</TableCell>
//               <TableCell>Total Teacher</TableCell>
//               <TableCell>Fees Per Students</TableCell>
//               <TableCell>Total Subjects</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {classes.slice(page * row, page * row + row).map((item) => (
//               <TableRow>
//                 <TableCell>{item.STD}</TableCell>
//                 <TableCell>{item.Students.length}</TableCell>
//                 <TableCell>{item.Teachers.length}</TableCell>
//                 <TableCell>{item.Fees_Per_Student}</TableCell>
//                 <TableCell>{item.Subjects.length}</TableCell>
//                 <TableCell>
//                   <Link to={`/classes/edit/${item._id}`}>
//                     <IconButton>
//                       <EditIcon style={{ color: green[900] }}/>
//                     </IconButton>
//                   </Link>
//                   <IconButton onClick={() => {deleteClass(item._id)}}>
//                     <DeleteIcon style={{ color: red[500] }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[2, 3, 5, 10]}
//           count={classes.length}
//           rowsPerPage={row}
//           page={page}
//           onChangePage={(event, newPage) => setPage(newPage)}
//           onChangeRowsPerPage={(event) => setRow(event.target.value)}
//         />
//       </TableContainer>
//     </>
//   );
// }

// ------------------------------------------------------------------------new

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
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function CustomClassTableComponents(props) {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(10);

  useEffect(() => {
    setClasses(props.classes);
  },[])

  const deleteClass = async (id) => {
    // setClasses(classes.filter((cls) => {
    //   return cls._id !== id;
    // }))
	if(window.confirm('Do you really want to Delete Class?') ){
    await axios({
      method : "DELETE",
      url : `${process.env.REACT_APP_API_URL}/classes/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setClasses(classes.filter((cls) => {
          return cls._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
}
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STD.</TableCell>
              {/* <TableCell>Total Students</TableCell>
              <TableCell>Total Teacher</TableCell> */}
              <TableCell>Fees Per Students</TableCell>
              {/* <TableCell>Total Subjects</TableCell> */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.slice(page * row, page * row + row).map((item) => (
              <TableRow>
                <TableCell>{item.Std_Name}</TableCell>
                {/* <TableCell>{item.totalStudents.length}</TableCell>
                <TableCell>{item.totalTeachers.length}</TableCell> */}
                <TableCell>{item.Fees_Per_Student}</TableCell>
                {/* <TableCell>{item.totalSubjects.length}</TableCell> */}
                <TableCell>
                  <Link to={`/classes/edit/${item._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: green[900] }}/>
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => {deleteClass(item._id)}}>
                    <DeleteIcon style={{ color: red[500] }} />
                  </IconButton>
                  <Link to={`/classes/view/${item._id}`}>
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
          rowsPerPageOptions={[2, 3, 5, 7,10]}
          count={classes.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
