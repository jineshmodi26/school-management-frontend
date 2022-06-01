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
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        marginTop : "20px"
    },
    noLabel: {
        marginTop: theme.spacing(3),
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

export default function AddResultSubject(props) {
    const [subject, setSubject] = React.useState(1);
    const [subjectFlag, setSubjectFlag] = useState(false);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const [marks, setMarks] = useState(0);
 
    const submitExamtimeHandler = (e)=>{
        e.preventDefault();
        const obj = {
            subject : subject,
            marks : marks 
        }
        props.handleet(obj);
    }

    useEffect(() => {
        if (props.exam.filter((exam) => { return exam._id === props.selectExam })[0].exams.length !== 0 && 
            props.exam.filter((exam) => { return exam._id === props.selectExam })[0].exams[0].subject !== null) {
            setSubject(props.exam.filter((exam) => { return exam._id === props.selectExam })[0].exams[0].subject._id);
        }
    },[]);

    return (
        <>
            <ToastContainer />
                <Container>
                    <form noValidate autoComplete="off" onSubmit={submitExamtimeHandler}>
                        {/* <div> */}                            
                        <Box fullWidth>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label" fullWidth>Subject</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={subject}
                                    onChange={(e) => {setSubject(e.target.value); setSubjectFlag(true)}}
                                    required
                                    fullWidth
                                    error={subject == "" && subjectFlag == true ? true : false}
                                    label="Subject"
                                >
                                    {
                                        props.exam.filter((exam) => {
                                            return exam._id === props.selectExam
                                        })[0].exams.map((sub) => {
                                            if (sub.subject === null) {
                                                return null;
                                            } else{
                                                return <MenuItem value={sub.subject._id}>{sub.subject.Subject_Name}</MenuItem>
                                            }
                                        })
                                    }
                                </Select>
                            </FormControl>
                            </Box>
                            <Box>
                                <TextField className={classes.formControl} 
                                type="number"
                                variant="outlined"
                                label="Marks"
                                fullWidth
                                value={marks}
                                required
                                onChange={(e) => {setMarks(e.target.value)}}
                                />
                            </Box>
                        <div style={{ margin: "20px auto 20px auto", width: "60%",display:'flex' ,justifyContent:'space-around'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{width: "60%"}}
                            >
                                Add Marks
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
