// import { 
//   Button, 
//   Grid, 
//   Box,
//   makeStyles,
//   LinearProgress
// } from "@material-ui/core";
// import CustomDrawerComponents from "../../../Components/Admin/Drawer";
// import AddIcon from "@material-ui/icons/Add";
// import CustomTeacherTableComponents from "../../../Components/Admin/TeacherTable";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const useStyles = makeStyles((theme) => ({
//   link : {
//     textDecoration : "none",
//     color : "white",
//     "&:hover": {
//       textDecoration : "none",
//       color : "white",
//     }
//   },
  
// }))

// export default function TeacherManagementPage(props) {
  
//   const classes = useStyles();
//   const [teachers,setTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios({
//       method : "GET",
//       url : `${process.env.REACT_APP_API_URL}/teachers/`,
//       headers : {
//         "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//       }
//     }).then((res) => {
//       if (res.data.error) {
//         toast.error(res.data.message);
//       } else {
//         setTeachers(res.data.data);
//         setLoading(true);
//       }
//     }).catch((error) => {
//       toast.error(error.response.data.message);
//     })
//   },[]);
  
//   return (
//     <>
//       <CustomDrawerComponents>
//         <Box mx={2} my={4}>
//           <Grid container spacing={4}>
//             <Grid item md={2} sm={8} lg={2} xs={12}>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<AddIcon />}
//                 fullWidth
//               >
//                 <Link to="/teachers/add" className={classes.link}>Add Teacher</Link>
//               </Button>
//             </Grid>
//             <Grid item md={12} sm={12} lg={12} xs={12}>
//               {
//                 loading ? <CustomTeacherTableComponents teachers={teachers}/> : <Box className={classes.root}>
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

// ----------------------------------------------------------------new

import { 
  Button, 
  Grid, 
  Box,
  makeStyles,
  LinearProgress
} from "@material-ui/core";
import CustomDrawerComponents from "../../../Components/Admin/Drawer";
import AddIcon from "@material-ui/icons/Add";
import CustomTeacherTableComponents from "../../../Components/Admin/TeacherTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  link : {
    textDecoration : "none",
    color : "white",
    "&:hover": {
      textDecoration : "none",
      color : "white",
    }
  },
  
}))

export default function TeacherManagementPage(props) {
  
  const classes = useStyles();
  const [teachers,setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method : "GET",
      url : `${process.env.REACT_APP_API_URL}/teachers/`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        setTeachers(res.data.data);
        setLoading(true);
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  },[]);
  
  return (
    <>
      <CustomDrawerComponents>
        <Box mx={2} my={4}>
          <Grid container spacing={4}>
            <Grid item md={2} sm={8} lg={2} xs={12}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
              >
                <Link to="/teachers/add" className={classes.link}>Add Teacher</Link>
              </Button>
            </Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
              {
                loading ? <CustomTeacherTableComponents teachers={teachers}/> : <Box className={classes.root}>
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
