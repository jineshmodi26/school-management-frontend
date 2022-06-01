import "date-fns";
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
import AddExamTime from "./AddExamTimecopy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import ExamTimeTableComponents from "../ExamTimeTable";
import EditExamTimeTableComponents from "../EditExamTimeTable";
import {
    Container,
    TextField,
    Box
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
    link: {
        textDecoration: "none",
        color: "white",
        "&:hover": {
            textDecoration: "none",
            color: "white",
        }
    },
}));
export default function AddExam() {
    const [classe, setClass] = React.useState('');
    const [ExamTime, setExams] = React.useState(false);
    const classes = useStyles();
    const [classsFlag, setClasssFlag] = useState(false);
    const [starDate, setStartDate] = React.useState(new Date());
    const [starDateFlag, setStartDateFlag] = React.useState(false);
    const [endDate, setEndDate] = React.useState(new Date());
    const [endDateFlag, setEndDateFlag] = React.useState(false);
    const [classList, setClassList] = useState([]);
    const [isClassLoading, setIsClassLoading] = useState(false);
    const [selectClass, setSelectClass] = React.useState(1);
    const [minDate,setMinDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState(
      new Date()
    );
  
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setStartDateFlag(true);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
        setEndDateFlag(true);
    };
    const handleExam = () => {
        setExams(!ExamTime);
    }

    const [ExamsTimeList, setExamsTimeList] = useState([]);
    const HandleAddExamTimeList = (e) => {
        setExamsTimeList([...e]);
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
                }
            }
        }).catch((error) => {
            toast.error(error.response.data.error);
        });
    }, []);
    const addExam = async (e) => {
        e.preventDefault();
        let exams = [];
        await ExamsTimeList.map((item) => {
            exams.push({
                "startTime": item.startTime,
                "endTime": item.endTime,
                "date": item.date,
                "subject": item.subject._id
            });
        })
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/exams/admin`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data: {
                classId: selectClass,
                startDate: starDate,
                endDate: endDate,
                exams: exams
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
                <Container>
                    {
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
                                              minDate={minDate}
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
                                              minDate={minDate}
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
                                value={starDate}
                                onChange={(e) => { setStartDate(e.target.value), setStartDateFlag(true) }}
                                error={starDate === "" && starDateFlag == true ? true : false}
                            />
                            <TextField
                                style={{ width: '100%' }}
                                type="date"
                                variant="outlined"
                                margin="normal"
                                label="End Date"
                                fullWidth
                                value={endDate}
                                onChange={(e) => { setEndDate(e.target.value), setEndDateFlag(true) }}
                                error={endDate === "" && endDateFlag == true ? true : false}
                            /> */}
                        </form>
                    }
                    <EditExamTimeTableComponents ExamsTimeList={ExamsTimeList} selectClass={selectClass} HandleupdateExamTimeList={HandleAddExamTimeList} starDate={starDate} endDate={endDate}/>
                    {
                        <div style={{ margin: "20px auto 20px auto", width: "50%" }}>
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
                    }
                </Container>
            </CustomDrawerComponents>
        </>
    );
}
