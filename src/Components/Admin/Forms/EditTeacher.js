// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CustomDrawerComponents from '../Drawer'
// import {
//     Container,
//     TextField,
//     makeStyles,
//     Button,
//     Box,
//     useTheme,
//     Input,
//     InputLabel,
//     Select,
//     MenuItem,
//     FormControl,
//     Chip,
//     LinearProgress
// } from "@material-ui/core"
// import {useParams} from "react-router-dom";
// import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//     textField: {
//         margin: "20px"
//     },
//     buttonDiv: {
//         display: "flex",
//         justifyContent: "center"
//     },
//     button: {
//         margin: "10px",
//         width: "300px"
//     },
//     formControl: {
//         margin: "20px",
//         minWidth: 200,
//         maxWidth: 300,
//     },
//     chips: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     chip: {
//         margin: 2,
//     },
//     noLabel: {
//         marginTop: theme.spacing(3),
//     },
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// const subjects = [
//     'Maths-9_A',
//     'Science-7_B',
//     'Computer-8_A',
//     'English-9_C',
//     'Social Science-7_D'
// ];

// function getStyles(subject, subjectName, theme) {
//     return {
//         fontWeight:
//             subjectName.indexOf(subject) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

// const EditTeacher = () => {

//     const {id} = useParams();

//     const classes = useStyles();
//     const theme = useTheme();
//     const [subjects, setSubjects] = useState([]);
//     const [teacherFlag, setTeacherFlag] = useState(false);
//     const [salaryFlag, setSalaryFlag] = useState(false);
//     const [subjectName, setSubjectName] = React.useState([]);
//     const [teacher, setTeacher] = useState({});
//     const [loading, setLoading] = useState(false);

//     const editTeacher = async (e) => {
//         e.preventDefault();
//         let subjectsId = [];
//         await subjectName.map((subject) => {
//             subjectsId.push({Subject_Id : subject._id});
//         })
//         if (subjectsId.length === 0) {
//             toast.error("Select atleast one subject")
//         } else {
//             await axios({
//                 method : "PATCH",
//                 url : `${process.env.REACT_APP_API_URL}/teachers/${id}`,
//                 headers : {
//                     "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//                 },
//                 data : {
//                     Teacher_Name : teacher.Teacher_Name,
//                     Salary : teacher.Salary,
//                     Subjects_Id : subjectsId
//                 }
//             }).then((res) => {
//                 if (res.data.error) {
//                     toast.error(res.data.message);
//                 } else {
//                     toast.success(res.data.message);
//                 }
//             }).catch((error) => {
//                 toast.error(error.response.data.message);
//             });
//         }
//     }

//     useEffect(() => {
//         axios({
//             method: "GET",
//             url: `${process.env.REACT_APP_API_URL}/teachers/teacher/${id}`,
//             headers: {
//                 "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
//             }
//         }).then((res) => {
//             if (res.data.error) {
//                 toast.error(res.data.message);
//             } else {
//                 setTeacher(res.data.data);
//                 setLoading(true);
//             }
//         }).catch((error) => {
//             toast.error(error.response.data.message);
//         })
//         axios({
//             method : "GET",
//             url : `${process.env.REACT_APP_API_URL}/subjects`,
//             headers : {
//                 "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//             }
//         }).then(async (res) => {
//             if (res.data.error) {
//                 toast.error(res.data.message);
//             } else {
//                 setSubjects(res.data.data);
//                 setLoading(true);
//             }
//         }).catch((error) => {
//             // toast.error(error.response.data.message);
//         });
//     }, [])

//     return (
//         <>
//             <ToastContainer />
//             <CustomDrawerComponents>
//                 <Container>
//                     {
//                         loading ? <form onSubmit={editTeacher}>
//                         <Box>
//                             <Box>
//                                 <TextField
//                                     label="Teacher Name"
//                                     variant='outlined'
//                                     required
//                                     fullWidth
//                                     value={teacher.Teacher_Name}
//                                     onChange={(e) => { setTeacher({...teacher, Teacher_Name : e.target.value}), setTeacherFlag(true) }}
//                                     className={classes.textField}
//                                     error={teacher.Teacher_Name == "" && teacherFlag == true ? true : false}
//                                 />
//                             </Box>
//                             <Box>
//                                 <TextField
//                                     label="Salary"
//                                     variant='outlined'
//                                     type="number"
//                                     required
//                                     fullWidth
//                                     value={teacher.Salary}
//                                     onChange={(e) => { setTeacher({...teacher, Salary : e.target.value}), setSalaryFlag(true) }}
//                                     className={classes.textField}
//                                     error={teacher.Salary == "" && salaryFlag == true ? true : false}
//                                 />
//                             </Box>
//                             <Box>
//                                 <FormControl className={classes.formControl}>
//                                 <InputLabel id="demo-mutiple-chip-label">Subjects</InputLabel>
//                                     <Select
//                                         labelId="demo-mutiple-chip-label"
//                                         id="demo-mutiple-chip"
//                                         multiple
//                                         value={subjectName}
//                                         onChange={(event) => {setSubjectName(event.target.value)}}
//                                         input={<Input id="select-multiple-chip" />}
//                                         renderValue={(selected) => (
//                                             <div className={classes.chips}>
//                                                 {selected.map((value) => (
//                                                     <Chip key={value} label={value.Subject_Name+" - "+value.Class_Id.Std_Name} className={classes.chip} />
//                                                 ))}
//                                             </div>
//                                         )}
//                                         MenuProps={MenuProps}
//                                     >
//                                         {subjects.map((subject) => (
//                                             <MenuItem key={subject._id} value={subject} style={getStyles(subject.Subject_Name, subject.Subject_Name, theme)}>
//                                                 {subject.Subject_Name} - {subject.Class_Id.Std_Name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                             <Box className={classes.buttonDiv}>
//                                 <Button
//                                     color='primary'
//                                     variant='contained'
//                                     className={classes.button}
//                                     type="submit"
//                                 >
//                                     Edit Teacher
//                                 </Button>
//                             </Box>
//                         </Box>
//                     </form> : <Box>
//                             <LinearProgress />
//                         </Box>
//                     }
//                 </Container>
//             </CustomDrawerComponents>
//         </>
//     );
// }

// export default EditTeacher

// ----------------------------------------------------- new

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import {
    Container,
    TextField,
    makeStyles,
    Button,
    Box,
    useTheme,
    Input,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Chip,
    LinearProgress
} from "@material-ui/core"
import { useParams } from "react-router-dom";
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
        minWidth: 200,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
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

const subjects = [
    'Maths-9_A',
    'Science-7_B',
    'Computer-8_A',
    'English-9_C',
    'Social Science-7_D'
];

function getStyles(subject, subjectName, theme) {
    return {
        fontWeight:
            subjectName.indexOf(subject) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EditTeacher = () => {

    const { id } = useParams();

    const classes = useStyles();
    const theme = useTheme();
    const [subjects, setSubjects] = useState([]);
    const [teacherFlag, setTeacherFlag] = useState(false);
    const [salaryFlag, setSalaryFlag] = useState(false);
    const [subjectName, setSubjectName] = React.useState([]);
    const [teacher, setTeacher] = useState({});
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const editTeacher = async (e) => {
        e.preventDefault();
        let subjectsId = [];
        await subjectName.map((subject) => {
            subjectsId.push({ Subject_Id: subject._id });
        })
        if (subjectsId.length === 0) {
            toast.error("Select atleast one subject")
        } else {
            if (disabled === false) {
                await axios({
                    method: "PATCH",
                    url: `${process.env.REACT_APP_API_URL}/teachers/${id}`,
                    headers: {
                        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                    },
                    data: {
                        Teacher_Name: teacher.Teacher_Name,
                        Salary: teacher.Salary,
                        Subjects_Id: subjectsId,
                        password: password
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
            } else {
                await axios({
                    method: "PATCH",
                    url: `${process.env.REACT_APP_API_URL}/teachers/${id}`,
                    headers: {
                        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                    },
                    data: {
                        Teacher_Name: teacher.Teacher_Name,
                        Salary: teacher.Salary,
                        Subjects_Id: subjectsId
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
        }
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/teachers/teacher/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setTeacher(res.data.data);
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/subjects`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setSubjects(res.data.data);
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, [])

    return (
        <>
            <CustomDrawerComponents>
                <Container>
                    {
                        loading ? <form onSubmit={editTeacher}>
                            <Box>
                                <Box>
                                    <TextField
                                        label="Teacher Name"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={teacher.Teacher_Name}
                                        onChange={(e) => { setTeacher({ ...teacher, Teacher_Name: e.target.value }); setTeacherFlag(true) }}
                                        className={classes.textField}
                                        error={teacher.Teacher_Name == "" && teacherFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="Salary"
                                        variant='outlined'
                                        type="number"
                                        required
                                        fullWidth
                                        value={teacher.Salary}
                                        onChange={(e) => { setTeacher({ ...teacher, Salary: e.target.value }); setSalaryFlag(true) }}
                                        className={classes.textField}
                                        error={teacher.Salary == "" && salaryFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-mutiple-chip-label">Subjects</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={subjectName}
                                            onChange={(event) => { setSubjectName(event.target.value) }}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value.Subject_Name + " - " + value.Class_Id.Std_Name} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {subjects.map((subject) => (
                                                <MenuItem key={subject._id} value={subject} style={getStyles(subject.Subject_Name, subject.Subject_Name, theme)}>
                                                    {subject.Subject_Name} - {subject.Class_Id.Std_Name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <TextField
                                        label="Password"
                                        variant='outlined'
                                        disabled={disabled}
                                        onDoubleClick={() => { setDisabled(!disabled) }}
                                        fullWidth
                                        type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setPasswordFlag(true) }}
                                        className={classes.textField}
                                        error={password == "" && passwordFlag == true ? true : false}
                                    />
                                </Box>
                                <Box className={classes.buttonDiv}>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        type="submit"
                                    >
                                        Edit Teacher
                                    </Button>
                                </Box>
                            </Box>
                        </form> : <Box>
                            <LinearProgress />
                        </Box>
                    }
                </Container>
            </CustomDrawerComponents>
        </>
    );
}

export default EditTeacher
