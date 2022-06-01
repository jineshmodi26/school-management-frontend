// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CustomDrawerComponents from '../Drawer'
// import {
//     Container,
//     TextField,
//     makeStyles,
//     Button,
//     Box,
//     LinearProgress
// } from "@material-ui/core"
// import { useParams } from "react-router-dom";
// import axios from 'axios';

// const ViewStudent = () => {

//     useEffect(() => {

//     },[])

//     return (
//     <>
//     <ToastContainer />
//     <CustomDrawerComponents>
//         <Container>
//             <Table>

//             </Table>
//         </Container>
//     </CustomDrawerComponents>
//     </>
//   )
// }

// export default ViewStudent


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

const useStyles = makeStyles({

});

export default function ViewStudent() {
    
    const {id} = useParams();
    const classes = useStyles();
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(false);

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
            <ToastContainer />
            <CustomDrawerComponents>
                <Container>
                    {
                        loading ? <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <Table>
                                    <TableRow>
                                        <TableCell variant="head">Student ID</TableCell>
                                        <TableCell>{student.studentID}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Student Name</TableCell>
                                        <TableCell>{student.studentName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Class</TableCell>
                                        <TableCell>{student.class.Std_Name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Father Name</TableCell>
                                        <TableCell>{student.fatherName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Address</TableCell>
                                        <TableCell>{student.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Phone Number</TableCell>
                                        <TableCell>{student.phoneNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Pending Fees</TableCell>
                                        <TableCell>{student.pendingFees}</TableCell>
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
