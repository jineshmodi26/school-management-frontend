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

export default function ViewClass() {
    
    const {id} = useParams();
    const classes = useStyles();
    const [clas, setClas] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/classes/class/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setClas(res.data.data);
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
                                        <TableCell variant="head">Standard Name</TableCell>
                                        <TableCell>{clas.class.Std_Name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Fees Per Student</TableCell>
                                        <TableCell>{clas.class.Fees_Per_Student}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Total Students</TableCell>
                                        <TableCell>{clas.totalStudents}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Total Subjects</TableCell>
                                        <TableCell>
                                            {
                                                clas.subjects.map((subject) => {
                                                    return <p>{subject.Subject_Name }</p>
                                                    // return <TableRow>
                                                    //     <TableRow>
                                                    //         {subject.Subject_Name}
                                                    //     </TableRow>
                                                    // </TableRow>
                                                })
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Total Teachers</TableCell>
                                        <TableCell>
                                            {
                                                    clas.teachers.map((teacher) => {
                                                        return <p>{teacher.Teacher_Name }</p>
                                                        // return <TableRow>
                                                        //     <TableRow>
                                                        //         {teacher.Teacher_Name}
                                                        //     </TableRow>
                                                        // </TableRow>
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
