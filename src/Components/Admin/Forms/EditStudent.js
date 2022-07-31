import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import {
    Container,
    TextField,
    makeStyles,
    Button,
    Box,
    LinearProgress,
InputAdornment,
    IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';

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

const EditStudent = () => {

    const { id } = useParams();

    const classes = useStyles();

    const [studentFlag, setStudentFlag] = useState(false);
    const [fatherFlag, setFatherFlag] = useState(false);
    const [addressFlag, setAddressFlag] = useState(false);
    const [phoneFlag, setPhoneFlag] = useState(false);

    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [disabled, setDisabled] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const editStudent = async (e) => {
        e.preventDefault();
        if (disabled === false) {
            await axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}/students/${id}`,
                headers: {
                    "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                },
                data: {
                    studentName: student.studentName,
                    fatherName: student.fatherName,
                    address: student.address,
                    phoneNumber: student.phoneNumber,
                    password : password
                }
            }).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                }
            }).catch((error) => {
                toast.error(error.response.data.message);
            });
        } else {
            await axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}/students/${id}`,
                headers: {
                    "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                },
                data: {
                    studentName: student.studentName,
                    fatherName: student.fatherName,
                    address: student.address,
                    phoneNumber: student.phoneNumber
                }
            }).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                }
            }).catch((error) => {
                toast.error(error.response.data.message);
            });
        }
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/students/student/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setStudent(res.data.data);
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }, [])

    return (
        <>
            <CustomDrawerComponents>
                {
                    loading ? <Container>
                        <form onSubmit={editStudent}>
                            <Box>
                                <Box>
                                    <TextField
                                        label="Student Name"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        disabled
                                        value={student.studentID}
                                        className={classes.textField}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Student Name"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={student.studentName}
                                        onChange={(e) => { setStudent({ ...student, studentName: e.target.value }); setStudentFlag(true) }}
                                        className={classes.textField}
                                        error={student.studentName == "" && studentFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Class"
                                        variant='outlined'
                                        required
                                        disabled
                                        fullWidth
                                        value={student.class.Std_Name}
                                        className={classes.textField}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Father Name"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={student.fatherName}
                                        onChange={(e) => { setStudent({ ...student, fatherName: e.target.value }); setFatherFlag(true) }}
                                        className={classes.textField}
                                        error={student.fatherName == "" && fatherFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Address"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={student.address}
                                        onChange={(e) => { setStudent({ ...student, address: e.target.value }); setAddressFlag(true) }}
                                        className={classes.textField}
                                        error={student.address == "" && addressFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Phone Number"
                                        type="number"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={student.phoneNumber}
                                        onChange={(e) => { setStudent({ ...student, phoneNumber: e.target.value }); setPhoneFlag(true) }}
                                        className={classes.textField}
                                        error={student.phoneNumber == "" && phoneFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Password"
                                        variant='outlined'
                                        disabled={disabled}
                                        onDoubleClick={() => { setDisabled(!disabled) }}
                                        fullWidth
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setPasswordFlag(true) }}
                                        className={classes.textField}
                                        error={password == "" && passwordFlag == true ? true : false}
					InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>
                                <Box className={classes.buttonDiv}>
                                   <Button
                                        color='primary'
                                        variant='outlined'
                                        className={classes.button}
                                    >
                                        <Link to="/students">cancel</Link>
                                    </Button>
				    <Button
                                        color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        type="submit"
                                    >
                                        Edit Student
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Container> : <Box className={classes.root}>
                        <LinearProgress />
                    </Box>
                }

            </CustomDrawerComponents>
        </>
    );
}

export default EditStudent
