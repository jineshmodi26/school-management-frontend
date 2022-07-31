import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import {
    Container,
    TextField,
    makeStyles,
    Button,
    Box
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    textField : {
        margin : "20px"
    },
    buttonDiv : {
        display : "flex",
        justifyContent : "center"
    },
    button : {
        margin : "10px",
        width : "300px"
    }
}))

const AddClass = () => {
  
    const classes = useStyles();
    const [stdName, setStdName] = useState("");
    const [feesPerStudent, setFeesPerStudent] = useState("");
    const [stdFlag, setStdFlag] = useState(false);    
    const [feesFlag, setFeesFlag] = useState(false);

    const addClass = async (e) => {
        e.preventDefault();
        await axios({
            method : "POST",
            url : `${process.env.REACT_APP_API_URL}/classes`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data : {
                stdName : stdName,
                feesPerStudent : feesPerStudent
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

    return (
    <>
        <ToastContainer />
        <CustomDrawerComponents>
            <Container>
                <form onSubmit={addClass}>
                    <Box>
                        <Box>
                            <TextField 
                            label="Standard Name"
                            variant='outlined'
                            required
                            fullWidth
                            value={stdName}
                            onChange = {(e) => {setStdName(e.target.value); setStdFlag(true)}}
                            className={classes.textField}
                            error={stdName == "" && stdFlag == true ? true : false}
                            placeholder="ex. 7_A, 9_B"
                            />
                        </Box>
                        <Box>
                            <TextField 
                            label="Fees per student"
                            variant='outlined'
                            type="number"
                            required
                            fullWidth
                            value={feesPerStudent}
                            onChange = {(e) => {setFeesPerStudent(e.target.value); setFeesFlag(true)}}
                            className={classes.textField}
                            error={feesPerStudent == "" && feesFlag == true ? true : false}
                            />
                        </Box>
                        <Box className={classes.buttonDiv}>
				<Button
                                color='primary'
                                variant='outlined'
                                className={classes.button}
                            >
                                <Link to="/classes">cancel</Link>
                            </Button>
                            <Button
                            color='primary'
                            variant='contained'
                            className={classes.button}
                            type="submit"
                            >
                                Add Class
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Container>           
        </CustomDrawerComponents>
    </>
  )
}

export default AddClass
