import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomDrawerComponents from '../Drawer'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Container, Box, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { some } from 'lodash';

const useStyles = makeStyles({

});

export default function ViewSubject() {
    
    const {id} = useParams();
    const classes = useStyles();
    const [subject, setSubject] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/subjects/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setSubject(res.data.data);
                if (res.data.data.Class_Id === null) {
                    toast.error("Subject doesn't exist");
                } else {
                    await axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_API_URL}/teachers/`,
                        headers: {
                            "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                        }
                    }).then((response) => {
                        if (response.data.error) {
                            toast.error(response.data.message);
                        } else {
                            setTeachers(response.data.data);
                            setLoading(true);
                        }
                    }).catch((error) => {
                        toast.error(error.response.data.message);
                    });
                }
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }, [])

    return (
        <>
            <ToastContainer />
            <CustomDrawerComponents>
                <Container>
                    {
                        loading ? <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <Table>
                                    <TableRow>
                                        <TableCell variant="head">Subject Name</TableCell>
                                        <TableCell>{subject.Subject_Name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Standard Name</TableCell>
                                        <TableCell>{subject.Class_Id.Std_Name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Teachers</TableCell>
                                        <TableCell>
                                            {
                                                teachers.map((teacher) => {
                                                    if (some(teacher.Subjects_Id, {Subject_Id : {_id : subject._id}})) {
                                                        return <p>{teacher.Teacher_Name }</p>
                                                    }
                                                })
                                            }
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </Table>
                        </TableContainer> : <Box>
                        <LinearProgress />
                    </Box>
                    }
                </Container>
            </CustomDrawerComponents>
        </>
    );
}
