import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import {
    Container,
    TextField,
    makeStyles,
    Button,
    Box,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Chip
} from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: "20px"
    },
    buttonDiv: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        margin: "10px",
        width: "300px"
    },
    formControl: {
        margin: "20px",
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddStudent = () => {

    const classes = useStyles();
    const [studentName, setStudentName] = useState("");
    const [classs, setClasss] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    // const [subjects, setSubjects] = useState([]);
    const [studentFlag, setStudentFlag] = useState(false);
    const [classsFlag, setClasssFlag] = useState(false);
    const [fatherFlag, setFatherFlag] = useState(false);
    const [addressFlag, setAddressFlag] = useState(false);
    const [phoneFlag, setPhoneFlag] = useState(false);
    const [passwordFlag, setPasswordFlag] = useState(false);

    const [selectClass, setSelectClass] = React.useState(1);
    const [classList, setClassList] = useState([]);
    const [isClassLoading, setIsClassLoading] = useState(false);
    
    const addStudent = async (e) => {
        e.preventDefault();
        await axios({
            method : "POST",
            url : `${process.env.REACT_APP_API_URL}/students`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data : {
                studentName : studentName,
                classId : selectClass,
                fatherName : fatherName,
                address : address,
                phoneNumber : phoneNumber,
                password : password
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success("Student Id is "+res.data.data.studentID);
                toast.success(res.data.message);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    useEffect(() => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/classes/`,
            headers : {
              "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            }
          }).then((res) => {
            if (res.data.error) {
              toast.error(res.data.message);
            } else {
              setClassList(res.data.data);
              setIsClassLoading(true);
              if (res.data.data.length > 0) {
                setSelectClass(res.data.data[0]._id);
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
                <Container>
                    <form onSubmit={addStudent}>
                        <Box>
                            <Box>
                                <TextField
                                    label="Student Name"
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={studentName}
                                    onChange={(e) => { setStudentName(e.target.value); setStudentFlag(true) }}
                                    className={classes.textField}
                                    error={studentName == "" && studentFlag == true ? true : false}
                                />
                            </Box>
                            <Box>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Class</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={selectClass}
                                onChange={(e) => {setSelectClass(e.target.value);setClasssFlag(true)}}
                                required
                                error={classs == "" && classsFlag == true ? true : false}
                                label="Class"
                                >
                                {
                                    classList.map((cls) => {
                                        return <MenuItem value={cls._id}>{cls.Std_Name}</MenuItem>
                                    })
                                }
                                </Select>
                            </FormControl>
                            </Box>
                            <Box>
                                <TextField
                                    label="Father Name"
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={fatherName}
                                    onChange={(e) => { setFatherName(e.target.value); setFatherFlag(true) }}
                                    className={classes.textField}
                                    error={fatherName == "" && fatherFlag == true ? true : false}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Address"
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value); setAddressFlag(true) }}
                                    className={classes.textField}
                                    error={address == "" && addressFlag == true ? true : false}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Phone Number"
                                    type="text"
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value); setPhoneFlag(true) }}
                                    className={classes.textField}
                                    error={phoneNumber == "" && phoneFlag == true ? true : false}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Password"
                                    variant='outlined'
                                    type="password"
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setPasswordFlag(true) }}
                                    className={classes.textField}
                                    error={password == "" && passwordFlag == true ? true : false}
                                />
                            </Box>
                            <Box className={classes.buttonDiv}>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    className={classes.button}
                                    type="submit"
                                >
                                    Add Student
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Container>
            </CustomDrawerComponents>
        </>
    );
}

export default AddStudent
