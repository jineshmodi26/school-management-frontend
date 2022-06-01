import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import {
    Container,
    TextField,
    makeStyles,
    Button,
    Box,
    LinearProgress
} from "@material-ui/core"
import {useParams} from "react-router-dom";
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

const EditClass = () => {
  
    const {id} = useParams();

    const classes = useStyles();  
    const [feesFlag, setFeesFlag] = useState(false);
    const [classs, setClasss] = useState({});
    const [loading, setLoading] = useState(false);

    const editClass = async (e) => {
        e.preventDefault();
        await axios({
            method : "PATCH",
            url : `${process.env.REACT_APP_API_URL}/classes/${id}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data : {
                Std_Name : classs.Std_Name,
                Fees_Per_Student : classs.Fees_Per_Student
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

    useEffect(() => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/classes/${id}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setClasss(res.data.data);
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, []);

    return (
    <>
        <ToastContainer />
        <CustomDrawerComponents>
            {
                loading ? <Container>
                <form onSubmit={editClass}>
                    <Box>
                        <Box>
                            <TextField 
                            label="Standard Name"
                            variant='outlined'
                            fullWidth
                            value={classs.Std_Name}
                            disabled
                            className={classes.textField}
                            />
                        </Box>
                        <Box>
                            <TextField 
                            label="Fees per student"
                            variant='outlined'
                            type="number"
                            required
                            fullWidth
                            value={classs.Fees_Per_Student}
                            onChange = {(e) => {setClasss({...classs, Fees_Per_Student : e.target.value}); setFeesFlag(true)}}
                            className={classes.textField}
                            error={classs.Fees_Per_Student == "" && feesFlag == true ? true : false}
                            />
                        </Box>
                        <Box className={classes.buttonDiv}>
                            <Button
                            color='primary'
                            variant='contained'
                            className={classes.button}
                            type="submit"
                            >
                                Edit Class
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Container> : <Box>
                    <LinearProgress />
                </Box>
            }
        </CustomDrawerComponents>
    </>
  )
}

export default EditClass