import React,{useState} from "react";

import {
  Grid,
  Box,
  TextField,
  List,
  ListItem,
  Paper,
  ListItemText,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import CustomDrawerComponents from "../../../Components/Admin/Drawer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function FeesManagementPage(props) {

  const OnSubmitHandler = (id)=>{
    axios({
      method : "GET",
      url : `${process.env.REACT_APP_API_URL}/students/studentId/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setStudent(res.data.data);
        setLoading(true);
	setAmount(0);
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    });
  }
  const OnFeesPayment = (id)=>{
if(window.confirm(`The amount is ${Amount} , this is not reversable`) ){
    axios({
      method : "POST",
      url : `${process.env.REACT_APP_API_URL}/students/fees`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      },
      data: {
        studentID: id,
        amount: Amount,
    }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setStudent(res.data.data);
        setAmount(0);
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    });
}
  }
  const [Student, setStudent] = React.useState({
    "studentID": "----",
    "studentName": "----",
    "class": {
        "Std_Name": "---",
        "Fees_Per_Student": "----",
    },
    "pendingFees": "----",
});
  const [studentid,setStudentid] = React.useState(`${window.sessionStorage.getItem('SchoolName')}__`);
  const [Amount,setAmount] = React.useState();
  const [loading, setLoading] = useState(false);
  // const [Student, setStudent] = React.useState({
  //   studentID: "19ce077",
  //   class: 4,
  //   studentName: "Mendapara Drimil",
  //   fatherName: "Mendapara Kiritbhai",
  //   Address: "Rajkot , Gujarat",
  //   phoneNumber: "9664663001",
  //   feesStatus: "pending",
  //   isActive: false,
  //   totalFees: 31000,
  //   pendingFees: 2000,
  // });


  return (
    <>
    <ToastContainer/>
      <CustomDrawerComponents>
        <Box mx={2} my={4}>
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <TextField
                placeholder="Enter Student ID"
                label="Student ID"
                variant="outlined"
                margin="normal"
                fullWidth
                value={studentid}
                onChange={(e)=>{setStudentid(e.target.value)}}
              />
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={()=>{OnSubmitHandler(studentid)}}
              >
                Enter
              </Button>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Paper>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={`Student Name : ${Student.studentName}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Student ID : ${Student.studentID}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Student Class : ${Student.class.Std_Name}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Student Fees : ${Student.class.Fees_Per_Student}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Student panding Fees : ${Student.pendingFees}`}
                    />
                  </ListItem>
                  {/* <ListItem>
                    <ListItemText primary={`IsActive : ${Student.isActive}`} />
                  </ListItem> */}
                </List>
              </Paper>
            </Grid>
		{
              loading?
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Paper>
                <List>
                  <ListItem>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={4}
                    >
                      <Grid item sm={8} md={10} lg={10} xl={10}>
                        <TextField
                          placeholder="Enter Fees Payment Amount"
                          label="Fees"
                          value={Amount}
                          onChange={(e)=>{setAmount(e.target.value)}}
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item sm={4} md={2} lg={2} xl={2}>
                        <Button
                          variant="outlined"
                          size="medium"
                          color="primary"
                          fullWidth
                          onClick={()=>{OnFeesPayment(studentid)}}
                        >
                          Enter
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
	:<></>
            }
          </Grid>
        </Box>
      </CustomDrawerComponents>
    </>
  );
}
