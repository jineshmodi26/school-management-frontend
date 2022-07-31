import React, { useState, useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from '@material-ui/icons/Save';
import AddResultSubject from "./AddResultList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
// import ExamTimeTableComponents from "../ExamTimeTable";
import {
    Container,
    TextField,
    Box,
    LinearProgress
} from "@material-ui/core"
import axios from 'axios';
import ResultList from "../ResultList";
import { remove, some } from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginTop: "20px"
    },
    link: {
        textDecoration: "none",
        color: "white",
        "&:hover": {
            textDecoration: "none",
            color: "white",
        }
    },
}));
export default function AddResult() {

    const [ExamTime, setExams] = React.useState(false);
    const classes = useStyles();
    const [classsFlag, setClasssFlag] = useState(false);
    const [classList, setClassList] = useState([]);
    const [isClassLoading, setIsClassLoading] = useState(false);
    const [selectExam, setSelectExam] = React.useState(1);
    const [selectStudent, setSelectStudent] = React.useState(1);
    const [examList, setExamList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [studentLoading, setStudentLoading] = useState(false);

    const handleExam = () => {
        setExams(!ExamTime);
    }

    const [marksList, setMarksList] = useState([]);
 
    const HandleAddExamTimeList = (e) => {
        if (!some(marksList, {subject : e.subject})) {
            setMarksList([...marksList, e]);
        }
    }

    const removeSubject = async (e) => {
        setMarksList(marksList.filter((subject) => {
            return subject.subject !== e
        }));
    }

    const addExam = async (e) => {
        e.preventDefault();
        let exams = [];
        await marksList.map((item) => {
            exams.push({
                "subject": item.subject,
                "marks": item.marks,
            });
        })
        await axios({
            method : "POST",
            url : `${process.env.REACT_APP_API_URL}/results`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data : {
                exam : selectExam,
                student : selectStudent,
                exams : exams
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/exams/all`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setExamList(res.data.data);
                setIsClassLoading(true);
                if (res.data.data.length > 0) {
                    setSelectExam(res.data.data[0]._id);
                    let classId = res.data.data[0].class._id
                    await axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API_URL}/students/class/${classId}`,
                        headers: {
                            "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                        }
                    }).then(async (response) => {
                        if (response.data.error) {
                            toast.error(response.data.message);
                        } else {
                            setStudentList(response.data.data);
                            setStudentLoading(true);
                            if (response.data.data.length > 0) {
                                setSelectStudent(response.data.data[0]._id);
                            }
                        }
                    }).catch((error) => {
                        toast.error(error.response.data.error);
                    });

                } else {
                    toast.error("No exams are exists");
                }
            }
        }).catch((error) => {
            toast.error(error.response.data.error);
        });
    }, []);

    const handleExamChange = async (e) => {
        setSelectExam(e.target.value);
        setClasssFlag(true);
        setMarksList([]);
        setStudentLoading(false);
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/exams/admin/${e.target.value}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (response) => {
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                if (response.data.data.class !== null) {
                    await axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API_URL}/students/class/${response.data.data.class._id}`,
                        headers: {
                            "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                        }
                    }).then(async (res) => {
                        if (res.data.error) {
                            toast.error(res.data.message);
                        } else {
                            setStudentList(res.data.data);
                            setStudentLoading(true);
                            if (res.data.data.length > 0) {
                                setSelectStudent(res.data.data[0]._id);
                            }
                        }
                    }).catch((error) => {
                        toast.error(error.res.data.error);
                    });
                }
            }
        }).catch((error) => {
            toast.error(error.response.data.error);
        });
    }

    return (
        <>
            <CustomDrawerComponents>
                <Container>
                    {
                        (ExamTime) ? <>
                            <AddResultSubject exam={examList.length !== 0 && examList} handlee={handleExam} handleet={HandleAddExamTimeList} selectExam={selectExam}/>
                        </>
                            : <>
                                {
                                    isClassLoading ? <form noValidate autoComplete="off">
                                        {/* <div> */}
                                        <Box fullWidth className={classes.textField}>
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel id="demo-simple-select-outlined-label" fullWidth>Exam</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={selectExam}
                                                    onChange={(e) => { handleExamChange(e) }}
                                                    required
                                                    fullWidth
                                                    error={selectExam == "" && classsFlag == true ? true : false}
                                                    label="Exam"
                                                >
                                                    {
                                                        examList.length !== 0 && examList.map((exam) => {
                                                            return <MenuItem value={exam._id}>{exam.class.Std_Name} - {exam.startDate.slice(0, 10)} </MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box className={classes.textField}>
                                            {
                                                studentLoading ? <FormControl variant="outlined" fullWidth>
                                                    <InputLabel id="demo-simple-select-outlined-label">Student</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={selectStudent}
                                                        onChange={(e) => { setMarksList([]);setSelectStudent(e.target.value); setClasssFlag(true) }}
                                                        required
                                                        error={selectStudent == "" && classsFlag == true ? true : false}
                                                        label="Student"
                                                    >
                                                        {
                                                            studentLoading && studentList.length !== 0 && studentList.map((student) => {
                                                                return <MenuItem value={student._id}>{student.studentID} </MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl> : <Box>
                                                    <LinearProgress />
                                                </Box>
                                            }
                                        </Box>
                                        <div style={{ margin: "20px auto 20px auto", width: "60%", display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleExam}
                                                color=""
                                                startIcon={<AddIcon />}
                                                style={{ width: "40%" }}
                                            >
                                                Add Marks
                                            </Button>
                                        </div>
                                    </form> : <Box>
                                        <LinearProgress />
                                    </Box>
                                }
                            </>
                    }
                    <ResultList marksList={marksList} removeSubject={removeSubject}/>
                    {
                        (!ExamTime) ? <>
                            <div style={{ margin: "20px auto 20px auto", width: "50%",display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                color='primary'
                                variant='outlined'
                                style={{ width: "300px", margin: '0px 30px 0px 0px' }}
                            >
                                <Link to="/results">cancel</Link>
                            </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    fullWidth
                                    onClick={addExam}
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                            : <></>
                    }
                </Container>
            </CustomDrawerComponents>
        </>
    );
}
