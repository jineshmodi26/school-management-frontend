import React, { useState,useEffect } from 'react';
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

const AddSubject = () => {

    const classes = useStyles();
    const [subjectName, setSubjectName] = useState("");
    // const [subjects, setSubjects] = useState([]);
    const [subjectFlag, setSubjectFlag] = useState(false);
    const [classsFlag, setClasssFlag] = useState(false);

    const [classList, setClassList] = useState([]);
    const [isClassLoading, setIsClassLoading] = useState(false);
    const [selectClass, setSelectClass] = React.useState(1);

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
                } else {
                    setClassList([]);
                    toast.error('Please create class');
                }
            }
        }).catch((error) => {
            toast.error(error.response.data.error);
        });
    }, []);

    const addSubject = async (e) => {
        e.preventDefault();
        if (classList.length !== 0) {
            await axios({
                method : "POST",
                url : `${process.env.REACT_APP_API_URL}/subjects/`,
                headers : {
                    "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
                },
                data : {
                    subName : subjectName,
                    Class_Id : selectClass
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
        } else {
            toast.error("Please create class");
        }
    }

    return (
        <>
            <ToastContainer />
            <CustomDrawerComponents>
                <Container>
                    <form onSubmit={addSubject}>
                        <Box>
                            <Box>
                                <TextField
                                    label="Subject Name"
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={subjectName}
                                    onChange={(e) => { setSubjectName(e.target.value); setSubjectFlag(true) }}
                                    className={classes.textField}
                                    error={subjectName == "" && subjectFlag == true ? true : false}
                                />
                            </Box>
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
                            <Box className={classes.buttonDiv}>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    className={classes.button}
                                    type="submit"
                                >
                                    Add Subject
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Container>
            </CustomDrawerComponents>
        </>
    );
}

export default AddSubject
