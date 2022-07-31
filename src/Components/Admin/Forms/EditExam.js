import "date-fns";
import React, { useState,useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from '@material-ui/icons/Save';
import {useParams} from "react-router-dom";
import AddExamTime from "./AddExamTimecopy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import EditExamTimeTableComponents from "../EditExamTimeTable";
import {
    Container,
    TextField,
    Box,
    LinearProgress
} from "@material-ui/core"
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";
import axios from 'axios';

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
    link : {
        textDecoration : "none",
        color : "white",
        "&:hover": {
          textDecoration : "none",
          color : "white",
        }
      },
}));
export default function EditExam() {
    const {id} = useParams();
    const [classe, setClass] = React.useState('');
    const [ExamTime,setExams] = React.useState(false);
    const classes = useStyles();
    const [classsFlag, setClasssFlag] = useState(false);
    const [starDate,setStartDate] = React.useState(new Date());
    const [starDateFlag,setStartDateFlag] = React.useState(false);
    const [endDate,setEndDate] = React.useState(new Date());
    const [endDateFlag,setEndDateFlag] = React.useState(false);
    const [classList, setClassList] = useState([]);
    const [isClassLoading, setIsClassLoading] = useState(false);
    const [selectClass, setSelectClass] = React.useState(1);
    const [WholeExam,setWholeExam] = React.useState({});
    const [loading, setLoading] = useState(false);
    const handleStartDateChange = (date) => {
        setStartDate(date);
        // setWholeExam({...WholeExam, starDate:date});
        setStartDateFlag(true)
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
        // setWholeExam({...WholeExam, endDate:e.target.value});
        setEndDateFlag(true)
    };
    const handleExam = ()=>{
        setExams(!ExamTime);
    }

    const [ExamsTimeList, setExamsTimeList] = useState([]);


    const HandleupdateExamTimeList= (e)=>{
        setExamsTimeList([...e]);
      }

      useEffect(() => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/exams/admin/${id}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setWholeExam(res.data.data);
                setExamsTimeList(res.data.data.exams);
                if(res.data.data.class===null){
                    toast.error("class is deleted!")
                }
                else{
                    setSelectClass(res.data.data.class._id);
                    setStartDate(new Date(res.data.data.startDate.substring(0, 10)))
                    setEndDate(new Date(res.data.data.endDate.substring(0, 10)))
                    setLoading(true);
                }
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, []);
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
            }
        }).catch((error) => {
            toast.error(error.response.data.error);
        });
    }, []);
    const updateExam = async (e) => {
        e.preventDefault();
        let exams = [];
        await ExamsTimeList.map((item)=>{
            exams.push({
                "startTime":item.startTime,
                "endTime":item.endTime,
                "date" :item.date,
                "subject":item.subject._id
            });
        })
        await axios({
            method : "PATCH",
            url : `${process.env.REACT_APP_API_URL}/exams/admin/${id}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data : {
                classId : selectClass,
                startDate : starDate,
                endDate : endDate,
                exams : ExamsTimeList
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
    return (
        <>
            <ToastContainer />
            <CustomDrawerComponents>
            {
                loading ?
                <Container>
                    <form className={classes.root} noValidate autoComplete="off">
                        {/* <div> */}
                        <Box>
                                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selectClass}
                                        onChange={(e) => { setSelectClass(e.target.value); setClasssFlag(true) }}
                                        required
                                        error={selectClass == "" && classsFlag == true ? true : false}
                                        label="Class"
                                    >
                                        {
                                            classList.map((cls) => {
                                                return <MenuItem value={cls._id}>{cls.Std_Name} </MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justifyContent="space-between">
                                        <KeyboardDatePicker
                                        style={{ width: "40%" }}
                                              disableToolbar
                                            variant="outline"
                                              format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Start Date"
                                          value={starDate}
                                          onChange={handleStartDateChange}
                                          KeyboardButtonProps={{
                                            "aria-label": "change date"
                                          }}
                                        />
                                        <KeyboardDatePicker
                                        style={{ width: "40%" }}
                                              disableToolbar
                                            variant="outline"
                                              format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="End Date"
                                          value={endDate}
                                          onChange={handleEndDateChange}
                                          KeyboardButtonProps={{
                                            "aria-label": "change date"
                                          }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Box>
                        {/* <TextField
                            style={{ width: '100%' }}
                            type="date"
                            variant="outlined"
                            margin="normal"
                            label="Start Date"
                            fullWidth
                            value={WholeExam.startDate.substring(0, 10)}
                            onChange={(e) => { setWholeExam({...WholeExam, starDate:e.target.value}), setStartDateFlag(true) }}
                            error={WholeExam.starDate === "" && starDateFlag == true ? true : false}
                        />
                        <TextField
                            style={{ width: '100%' }}
                            type="date"
                            variant="outlined"
                            margin="normal"
                            label="End Date"
                            fullWidth
                            value={WholeExam.endDate.substring(0, 10)}
                            onChange={(e) => { setWholeExam({...WholeExam, endDate:e.target.value}), setEndDateFlag(true) }}
                            error={endDate === "" && endDateFlag == true ? true : false}
                        /> */}
                    </form>
                    
                    <EditExamTimeTableComponents ExamsTimeList={WholeExam.exams} selectClass={selectClass}  HandleupdateExamTimeList={HandleupdateExamTimeList} starDate={starDate} endDate={endDate}/>
                {
                    (!ExamTime)?<>
                    <div style={{ margin: "20px auto 20px auto", width: "50%",display: 'flex', justifyContent: 'space-between'  }}>
                    <Button
                                color='primary'
                                variant='outlined'
                                style={{ width: "300px", margin: '0px 30px 0px 0px' }}
                            >
                                <Link to="/Exams">cancel</Link>
                            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            fullWidth
                            onClick={updateExam}
                        >
                            Save Changes
                        </Button>
                    </div>
                    </>
                    :<></>
                }
                </Container>
                :<Box>
                <LinearProgress />
                </Box>
            }
            </CustomDrawerComponents>
        </>
    );
}
