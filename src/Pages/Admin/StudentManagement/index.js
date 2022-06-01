// import React, { useEffect, useState } from "react";

// import { Button, Grid, Box, Select, MenuItem, makeStyles, LinearProgress } from "@material-ui/core";
// import CustomDrawerComponents from "../../../Components/Admin/Drawer";

// import AddIcon from "@material-ui/icons/Add";
// import CustomStudentTableComponents from "../../../Components/Admin/StudentTable";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles((theme) => ({
//   link: {
//     textDecoration: "none",
//     color: "white",
//     "&:hover": {
//       textDecoration: "none",
//       color: "white",
//     }
//   },

// }))

// export default function StudentManagementPage(props) {
//   const [selectClass, setSelectClass] = React.useState(1);
//   const classes = useStyles();
//   const [classList, setClassList] = useState([]);
//   const [isClassLoading, setIsClassLoading] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getStudentsByClass = async (classId) => {
//     await axios({
//       method: "GET",
//       url: `${process.env.REACT_APP_API_URL}/students/${classId}`,
//       headers: {
//         "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`,
//       }
//     }).then((res) => {
//       if (res.data.error) {
//         toast.error(res.data.message);
//       } else {
//         setStudents(res.data.data);
//         setLoading(true);
//       }
//     }).catch((error) => {
//       toast.error(error.response.data.error);
//     })
//   }

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: `${process.env.REACT_APP_API_URL}/classes/`,
//       headers: {
//         "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
//       }
//     }).then(async (res) => {
//       if (res.data.error) {
//         toast.error(res.data.message);
//       } else {
//         setClassList(res.data.data);
//         setIsClassLoading(true);
//         if (res.data.data.length > 0) {
//           setSelectClass(res.data.data[0]._id);
//           axios({
//             method: "GET",
//             url: `${process.env.REACT_APP_API_URL}/students/${res.data.data[0]._id}`,
//             headers: {
//               "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`,
//             }
//           }).then((res) => {
//             if (res.data.error) {
//               toast.error(res.data.message);
//             } else {
//               setStudents(res.data.data);
//               setLoading(true);
//             }
//           }).catch((error) => {
//             toast.error(error.response.data.error);
//           })
//         } else {
//           toast.error("Please create class");
//         }
//       }
//     }).catch((error) => {
//       toast.error(error.response.data.error);
//     });
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <CustomDrawerComponents>
//         <Box mx={2} my={4}>
//           <Grid container spacing={4} justifyContent="space-between" alignItems="center">
//             <Grid item md={2} sm={8} lg={2} xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<AddIcon />}
//                 fullWidth
//               >
//                 <Link to="/students/add" className={classes.link}>Add Student</Link>
//               </Button>
//             </Grid>
//             <Grid item md={2} sm={8} lg={2} xs={12}>
//               <Select
//                 onChange={(event) => { setSelectClass(event.target.value), setLoading(false), getStudentsByClass(event.target.value) }}
//                 value={selectClass}
//                 variant="outlined"
//                 margin="dense"
//               >
//                 {
//                   isClassLoading ? classList.map((cls) => {
//                     return <MenuItem value={cls._id} key={cls._id}>{cls.Std_Name}</MenuItem>
//                   }) : <CircularProgress />
//                 }
//               </Select>
//             </Grid>
//             <Grid item md={12} sm={12} lg={12} xs={12}>
//               {
//                 loading ? <CustomStudentTableComponents students={students} /> : <Box className={classes.root}>
//                   <LinearProgress />
//                 </Box>
//               }
//             </Grid>
//           </Grid>
//         </Box>
//       </CustomDrawerComponents>
//     </>
//   );
// }

// ----------------------------------------------------------------- new

import React, { useEffect, useState } from "react";

import { Button, Grid, Box, Select, MenuItem, makeStyles, LinearProgress } from "@material-ui/core";
import CustomDrawerComponents from "../../../Components/Admin/Drawer";

import AddIcon from "@material-ui/icons/Add";
import CustomStudentTableComponents from "../../../Components/Admin/StudentTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "white",
    }
  },

}))

export default function StudentManagementPage(props) {
  const [selectClass, setSelectClass] = React.useState(1);
  const classes = useStyles();
  const [classList, setClassList] = useState([]);
  const [isClassLoading, setIsClassLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudentsByClass = async (classId) => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/students/class/${classId}`,
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`,
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        setStudents(res.data.data);
        setLoading(true);
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    })
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/classes/`,
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then(async (res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        setClassList(res.data.data);
        setIsClassLoading(true);
        if (res.data.data.length > 0) {
          setSelectClass(res.data.data[0]._id);
          axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/students/class/${res.data.data[0]._id}`,
            headers: {
              "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`,
            }
          }).then((res) => {
            if (res.data.error) {
              toast.error(res.data.message);
            } else {
              setStudents(res.data.data);
              setLoading(true);
            }
          }).catch((error) => {
            toast.error(error.response.data.error);
          })
        } else {
          toast.error("Please create class");
        }
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <CustomDrawerComponents>
        <Box mx={2} my={4}>
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item md={2} sm={8} lg={2} xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
              >
                <Link to="/students/add" className={classes.link}>Add Student</Link>
              </Button>
            </Grid>
            <Grid item md={2} sm={8} lg={2} xs={12}>
              <Select
                onChange={(event) => { setSelectClass(event.target.value); setLoading(false); getStudentsByClass(event.target.value) }}
                value={selectClass}
                variant="outlined"
                margin="dense"
              >
                {
                  isClassLoading ? classList.map((cls) => {
                    return <MenuItem value={cls._id} key={cls._id}>{cls.Std_Name}</MenuItem>
                  }) : <CircularProgress />
                }
              </Select>
            </Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
              {
                loading ? <CustomStudentTableComponents students={students} /> : <Box className={classes.root}>
                  <LinearProgress />
                </Box>
              }
            </Grid>
          </Grid>
        </Box>
      </CustomDrawerComponents>
    </>
  );
}