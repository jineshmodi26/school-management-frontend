// import React, { useState, useEffect } from "react";

// import { Grid, Box, Button,makeStyles, LinearProgress } from "@material-ui/core";
// import CustomDrawerComponents from "../../../Components/Admin/Drawer";
// import AddIcon from "@material-ui/icons/Add";
// import CustomSubjectTableComponents from "../../../Components/Admin/SubjectTable";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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

// export default function SubjectManagementPage(props) {
  
//   const classes = useStyles();

//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios({
//       method : "GET",
//       url : `${process.env.REACT_APP_API_URL}/subjects/details`,
//       headers : {
//         "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//       }
//     }).then((res) => {
//       if (res.data.error) {
//         toast.error(res.data.message);
//       } else {
//         setSubjects(res.data.data);
//         setLoading(true)
//       }
//     }).catch((error) => {
//       toast.error(error.response.data.error);
//     });
//   }, []);
  
//   return (
//     <>
//     <ToastContainer />
//       <CustomDrawerComponents>
//         <Box mx={2} my={4}>
//           <Grid
//             container
//             spacing={4}
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Grid item md={2} sm={8} lg={2} xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<AddIcon />}
//                 fullWidth
//               >
//                 <Link to="/subjects/add" className={classes.link}>Add Subject</Link>
//               </Button>
//             </Grid>
//             <Grid item md={12} sm={12} lg={12} xs={12}>
//               {
//                 loading ? <CustomSubjectTableComponents subjects={subjects}/> : <Box className={classes.root}>
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

// -------------------------------------------------------- new

import React, { useState, useEffect } from "react";

import { Grid, Box, Button,makeStyles, LinearProgress } from "@material-ui/core";
import CustomDrawerComponents from "../../../Components/Admin/Drawer";
import AddIcon from "@material-ui/icons/Add";
import CustomSubjectTableComponents from "../../../Components/Admin/SubjectTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function SubjectManagementPage(props) {
  
  const classes = useStyles();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method : "GET",
      url : `${process.env.REACT_APP_API_URL}/subjects/`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        setSubjects(res.data.data);
        setLoading(true);
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
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={2} sm={8} lg={2} xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
              >
                <Link to="/subjects/add" className={classes.link}>Add Subject</Link>
              </Button>
            </Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
              {
                loading ? <CustomSubjectTableComponents subjects={subjects}/> : <Box className={classes.root}>
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
