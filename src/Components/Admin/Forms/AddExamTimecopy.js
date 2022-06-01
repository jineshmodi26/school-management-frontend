import "date-fns";
import React, { useState,useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import {Select,Input,Chip,useTheme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from '@material-ui/icons/Save';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
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
    formControl: {
        margin: "20px",
        minWidth: 200,
        maxWidth: 300,
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AddExamTime(props) {
    // const [classeId,setClassId] = React.useState(props.selectClass);
    const [MinDate,setMinDate] = React.useState(props.starDate);
    const [MaxDate,setMaxDate] = React.useState(props.endDate);
    const [classe, setClass] = React.useState('');
    const [startime,setStartTime] = React.useState('');
    const [startimeFlag,setStartTimeFlag] = React.useState(false);
    const [endtime,setEndTime] = React.useState('');
    const [endtimeFlag,setEndTimeFlag] = React.useState(false);
    const [examDate,setExamDate] = React.useState();
    const [examDateFlag,setExamDateFlag] = React.useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [subject, setSubject] = React.useState(1);
    const [subjectFlag, setSubjectFlag] = useState(false);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const handleDateChange = (date) => {
        setExamDate(date);
        setExamDateFlag(true);
    };
    const handleChange = (event) => {
        setClass(event.target.value);
    };
    const submitExamtimeHandler = (e)=>{
        e.preventDefault();
        const obj = {
            "startTime":startime,
            "endTime":endtime,
            "date":examDate.toISOString(),
            "subject":subject,
        }
        props.handleet(obj);
    }
    useEffect(() => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/subjects/subject/class/${props.selectClass}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setSubjectList(res.data.data);
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, []);

    return (
        <>
            <ToastContainer />
                <Container>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitExamtimeHandler}>
                        {/* <div> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                style={{ width: '100%' }}
                                id="time"
                                label="Start Time"
                                type="time"
                                defaultValue="07:30"
                                value={startime}
                                onChange={(e)=>{setStartTime(e.target.value);setStartTimeFlag(true)}}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                error={startime === "" && startimeFlag == true ? true : false}
                            />
                            <TextField
                                style={{ width: '100%' }}
                                id="time"
                                label="End Time"
                                type="time"
                                defaultValue="07:30"
                                value={endtime}
                                onChange={(e)=>{setEndTime(e.target.value);setEndTimeFlag(true)}}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                error={endtime === "" && endtimeFlag == true ? true : false}
                            />
                            <Box>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container>
                                        <KeyboardDatePicker
                                              disableToolbar
                                            variant="outline"
                                              format="dd/MM/yyyy"
                                              minDate={MinDate}
                                              maxDate={MaxDate}
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Exam Date"
                                          value={examDate}
                                          onChange={handleDateChange}
                                          KeyboardButtonProps={{
                                            "aria-label": "change date"
                                          }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Box>
                            {/* <TextField
                                style={{ width: '100%' }}
                                id="date"
                                label="Exam Date"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={examDate}
                                onChange={(e) => { setExamDate(e.target.value), setExamDateFlag(true) }}
                                error={examDate === "" && examDateFlag == true ? true : false}
                            /> */}
                        </div>
                        <Box>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={subject}
                                    onChange={(e) => { setSubject(e.target.value); setSubjectFlag(true)}}
                                    required
                                    error={subject == "" && subjectFlag == true ? true : false}
                                    label="Subject"
                                >
                                    {
                                        subjectList.map((sub) => {
                                            return <MenuItem value={sub}>{`${sub.Subject_Name} - ${sub.Class_Id.Std_Name} `}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            </Box>
                        <div style={{ margin: "20px auto 20px auto", width: "60%",display:'flex' ,justifyContent:'space-around'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{width: "60%"}}
                                onClick={submitExamtimeHandler} 
                            >
                                Add Exam
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={props.handlee} 
                            >
                                Done
                            </Button>
                        </div>
                    </form>
                </Container>
        </>
    );
}
