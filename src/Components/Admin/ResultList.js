import React, { useState, useEffect } from "react";

import {
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    IconButton,
    LinearProgress,
    Box
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { some } from "lodash"

export default function ResultList(props) {

    const [newMarks, setNewMarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [row, setRow] = useState(10);

    const removeLocal = (name) => {
        setNewMarks(newMarks.filter((sub) => {
            return sub.subject !== name
        }));
    }

    useEffect(() => {
        if (props.marksList.length !== 0) {
            props.marksList.map(async (subject) => {
                await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API_URL}/subjects/${subject.subject}`,
                    headers: {
                        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                    }
                }).then(async (response) => {
                    if (response.data.error) {
                        toast.error(response.data.message);
                    } else {
                        if (!some(newMarks, { subject: response.data.data.Subject_Name })) {
                            setNewMarks([...newMarks, { _id: response.data.data._id, subject: response.data.data.Subject_Name, marks: subject.marks }]);
                            setLoading(true);
                        }
                    }
                }).catch((error) => {
                    toast.error(error.response.data.error);
                });
            })
        } else {
            setLoading(true);
            setNewMarks([]);
        }
    }, [props]);

    return (
        <>
            <ToastContainer />
            {
                loading ? <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell>Marks</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newMarks.slice(page * row, page * row + row).map((item, index) => (
                                <TableRow>
                                    <TableCell>{item.subject}</TableCell>
                                    <TableCell>{item.marks}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => { props.removeSubject(item._id); removeLocal(item.subject) }}>
                                            <DeleteIcon style={{ color: red[500] }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 3, 5, 10]}
                        count={props.marksList.length}
                        rowsPerPage={row}
                        page={page}
                        onChangePage={(event, newPage) => setPage(newPage)}
                        onChangeRowsPerPage={(event) => setRow(event.target.value)}
                    />
                </TableContainer> : <Box>
                    <LinearProgress />
                </Box>
            }

        </>
    );
}
