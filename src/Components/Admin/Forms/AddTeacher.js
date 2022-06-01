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
//     Chip
// } from "@material-ui/core"
// import axios from 'axios';
// import {pick} from "lodash"

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

// const AddTeacher = () => {

//     const classes = useStyles();
//     const theme = useTheme();
//     const [teacherName, setTeacherName] = useState("");
//     const [salary, setSalary] = useState("");
//     const [password, setPassword] = useState("");
//     const [subjects, setSubjects] = useState([]);
//     const [teacherFlag, setTeacherFlag] = useState(false);
//     const [salaryFlag, setSalaryFlag] = useState(false);
//     const [passwordFlag, setPasswordFlag] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const [subjectName, setSubjectName] = React.useState([]);
//     const [subjectsId, setSubjectsId] = useState([]);

//     const addTeacher = async (e) => {
//         e.preventDefault();
//         let subjectsId = [];
//         await subjectName.map((subject) => {
//             subjectsId.push({Subject_Id : subject._id});
//         })
//         if (subjectsId.length === 0) {
//             toast.error("Select atleast one subject")
//         } else {
//             await axios({
//                 method : "POST",
//                 url : `${process.env.REACT_APP_API_URL}/teachers/`,
//                 headers : {
//                     "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
//                 },
//                 data : {
//                     teacherName : teacherName,
//                     Salary : salary,
//                     Subjects_Id : subjectsId,
//                     password : password
//                 }
//             }).then((res) => {
//                 if (res.data.error) {
//                     toast.error(res.data.message);
//                 } else {
//                     toast.success(res.data.message);
//                 }
//             }).catch((error) => {
//                 toast.error(error.response.data.message)
//             })
//         }
//     }

//     useEffect(() => {
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
//                 if (res.data.data.length > 0) {
//                     setSubjects(res.data.data);
//                 } else {
//                     setSubjects([]);
//                     toast.error("Please create subjects");
//                 }
//                 setLoading(true);
//             }
//         }).catch((error) => {
//             // toast.error(error.response.data.message);
//         });
//     }, []);

//     return (
//         <>
//             <ToastContainer />
//             <CustomDrawerComponents>
//                 <Container>
//                     <form onSubmit={addTeacher}>
//                         <Box>
//                             <Box>
//                                 <TextField
//                                     label="Teacher Name"
//                                     variant='outlined'
//                                     required
//                                     fullWidth
//                                     value={teacherName}
//                                     onChange={(e) => { setTeacherName(e.target.value), setTeacherFlag(true) }}
//                                     className={classes.textField}
//                                     error={teacherName == "" && teacherFlag == true ? true : false}
//                                 />
//                             </Box>
//                             <Box>
//                                 <TextField
//                                     label="Salary"
//                                     variant='outlined'
//                                     type="number"
//                                     required
//                                     fullWidth
//                                     value={salary}
//                                     onChange={(e) => { setSalary(e.target.value), setSalaryFlag(true) }}
//                                     className={classes.textField}
//                                     error={salary == "" && salaryFlag == true ? true : false}
//                                 />
//                             </Box>
//                             <Box>
//                                 <TextField
//                                     label="Password"
//                                     variant='outlined'
//                                     type="password"
//                                     required
//                                     fullWidth
//                                     value={password}
//                                     onChange={(e) => { setPassword(e.target.value), setPasswordFlag(true) }}
//                                     className={classes.textField}
//                                     error={password == "" && passwordFlag == true ? true : false}
//                                 />
//                             </Box>
//                             <Box>
//                                 <FormControl className={classes.formControl}>
//                                     <InputLabel id="demo-mutiple-chip-label">Subjects</InputLabel>
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
//                                         {subjects.map((subject) => {
//                                             if (subject.Class_Id === null) {
//                                                 return null;
//                                             }
//                                             return <MenuItem key={subject._id} value={subject} style={getStyles(subject.Subject_Name, subject.Subject_Name, theme)}>
//                                                 {subject.Subject_Name} - {subject.Class_Id.Std_Name}
//                                             </MenuItem>
//                                         })}
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
//                                     Add Teacher
//                                 </Button>
//                             </Box>
//                         </Box>
//                     </form>
//                 </Container>
//             </CustomDrawerComponents>
//         </>
//     );
// }

// export default AddTeacher

// ------------------------------------------------------------- new

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
    Chip
} from "@material-ui/core"
import axios from 'axios';
import {pick} from "lodash"

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

const AddTeacher = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [teacherName, setTeacherName] = useState("");
    const [salary, setSalary] = useState("");
    const [password, setPassword] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [teacherFlag, setTeacherFlag] = useState(false);
    const [salaryFlag, setSalaryFlag] = useState(false);
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    const [subjectName, setSubjectName] = React.useState([]);
    const [subjectsId, setSubjectsId] = useState([]);

    const addTeacher = async (e) => {
        e.preventDefault();
        let subjectsId = [];
        await subjectName.map((subject) => {
            subjectsId.push({Subject_Id : subject._id});
        })
        if (subjectsId.length === 0) {
            toast.error("Select atleast one subject")
        } else {
            await axios({
                method : "POST",
                url : `${process.env.REACT_APP_API_URL}/teachers/`,
                headers : {
                    "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
                },
                data : {
                    teacherName : teacherName,
                    Salary : salary,
                    Subjects_Id : subjectsId,
                    password : password
                }
            }).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.message);
                } else {
                    toast.success("Username is "+res.data.data.UserName);
                    toast.success(res.data.message);
                }
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        }
    }

    useEffect(() => {
        axios({
            method : "GET",
            url : `${process.env.REACT_APP_API_URL}/subjects`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                if (res.data.data.length > 0) {
                    setSubjects(res.data.data);
                } else {
                    setSubjects([]);
                    toast.error("Please create subjects");
                }
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
                <Container>
                    <form onSubmit={addTeacher}>
                        <Box>
                            <Box>
                                <TextField
                                    label="Teacher Name"
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={teacherName}
                                    onChange={(e) => { setTeacherName(e.target.value); setTeacherFlag(true) }}
                                    className={classes.textField}
                                    error={teacherName == "" && teacherFlag == true ? true : false}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Salary"
                                    variant='outlined'
                                    type="number"
                                    required
                                    fullWidth
                                    value={salary}
                                    onChange={(e) => { setSalary(e.target.value); setSalaryFlag(true) }}
                                    className={classes.textField}
                                    error={salary == "" && salaryFlag == true ? true : false}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Password"
                                    variant='outlined'
                                    type="password"
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setPasswordFlag(true) }}
                                    className={classes.textField}
                                    error={password == "" && passwordFlag == true ? true : false}
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
                                        onChange={(event) => {setSubjectName(event.target.value)}}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value.Subject_Name+" - "+value.Class_Id.Std_Name} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {subjects.map((subject) => {
                                            if (subject.Class_Id === null) {
                                                return null;
                                            }
                                            return <MenuItem key={subject._id} value={subject} style={getStyles(subject.Subject_Name, subject.Subject_Name, theme)}>
                                                {subject.Subject_Name} - {subject.Class_Id.Std_Name}
                                            </MenuItem>
                                        })}
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
                                    Add Teacher
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Container>
            </CustomDrawerComponents>
        </>
    );
}

export default AddTeacher
