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
    Container,
    Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { green, red } from "@material-ui/core/colors";
import EditExamTime from "./Forms/EditExamTime";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddExamTime from "./Forms/AddExamTimecopy";
export default function EditExamTimeTableComponents(props) {
    const OnEdit = (value, index) => {
        setExamTime(value);
        setEdit(true);
        setindex(index);
    }
    const [ExamTime, setExamTime] = useState({});
    const setExamh = () => {
        setEdit(!IsEdit);
    }
    const handleExam = () => {
        setAdd(!IsAdd);
    }
    const [index, setindex] = useState(0);
    const [Exams, setExams] = useState(props.ExamsTimeList);
    const [IsEdit, setEdit] = useState(false);
    const [IsAdd, setAdd] = useState(false);
        const OnDelete = (i) => {
            setExams(Exams.filter((item) => item._id !== i._id))
        }
    const [page, setPage] = useState(0);
    const [row, setRow] = useState(10);
    const HandleAddExamTimeList = async(e) => {
            setExams([...Exams, e]);
        props.HandleupdateExamTimeList([...Exams,e]);
    }
    const HandleEditExamTimeList = (e) => {
        let ExamArray = Exams;
        if (index === e.index) {
            const obj = {
                "startTime": e.startTime,
                "endTime": e.endTime,
                "date": e.date,
                "subject": e.subject
            };
            ExamArray[index] = obj;
            setExams([...ExamArray]);
            props.HandleupdateExamTimeList(Exams);
        }
        // setExamsTimeList([...ExamsTimeList, e]);
    }
    return (
        <>
            <Container>
                <div style={{ margin: "20px auto 20px auto", width: "60%", display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleExam}
                        color=""
                        startIcon={<AddIcon />}
                        style={{ width: "40%" }}
                    >
                        Add Subject Exam
                    </Button>
                </div>
                {
                    IsEdit ? <>
                        <EditExamTime ExamTime={ExamTime} setExamh={setExamh} HandleEditExamTimeList={HandleEditExamTimeList} index={index} selectClass={props.selectClass} starDate={props.starDate} endDate={props.endDate}/>
                    </> : <>
                        {
                            IsAdd ? <>
                                <AddExamTime handlee={handleExam} handleet={HandleAddExamTimeList} selectClass={props.selectClass} starDate={props.starDate} endDate={props.endDate}/>
                            </> : <></>
                        }
                    </>
                }
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Exams.slice(page * row, page * row + row).map((item, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.startTime}</TableCell>
                                    <TableCell>{item.endTime}</TableCell>
                                    <TableCell>{item.date.substring(0, 10)}</TableCell>
                                    <TableCell>{(item.subject===null)?`Deleted`:`${item.subject.Subject_Name} - ${item.subject.Class_Id.Std_Name}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => { OnEdit(item, index) }}>
                                            <EditIcon style={{ color: green[900] }} />
                                        </IconButton>
                                        <IconButton onClick={()=>{OnDelete(item)}}>
                                            <DeleteIcon style={{ color: red[500] }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 3, 5, 10]}
                        count={Exams.length}
                        rowsPerPage={row}
                        page={page}
                        onChangePage={(event, newPage) => setPage(newPage)}
                        onChangeRowsPerPage={(event) => setRow(event.target.value)}
                    />
                </TableContainer>
            </Container>
        </>
    );
}
