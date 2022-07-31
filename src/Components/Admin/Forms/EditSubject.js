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
//     InputLabel,
//     Select,
//     MenuItem,
//     FormControl,
//     Chip
// } from "@material-ui/core"
// import {useParams} from "react-router-dom";

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
//         minWidth: 120,
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     },
// }));

// const classList = [
//     '7_A',
//     '7_B',
//     '7_C',
//     '7_D',
//     '8_A'
// ];

// const EditSubject = () => {

//     const {id} = useParams();

//     const classes = useStyles();
//     const [subjectName, setSubjectName] = useState("");
//     const [classs, setClasss] = useState("");
//     // const [subjects, setSubjects] = useState([]);
//     const [subjectFlag, setSubjectFlag] = useState(false);
//     const [classsFlag, setClasssFlag] = useState(false);

//     const editSubject = (e) => {
//         e.preventDefault();
//     }

//     useEffect(() => {
//     }, []);

//     return (
//         <>
//             <ToastContainer />
//             <CustomDrawerComponents>
//                 <Container>
//                     <form onSubmit={editSubject}>
//                         <Box>
//                             <Box>
//                                 <TextField
//                                     label="Subject Name"
//                                     variant='outlined'
//                                     required
//                                     fullWidth
//                                     value={subjectName}
//                                     onChange={(e) => { setSubjectName(e.target.value), setSubjectFlag(true) }}
//                                     className={classes.textField}
//                                     error={subjectName == "" && subjectFlag == true ? true : false}
//                                 />
//                             </Box>
//                             <Box>
//                             <FormControl variant="outlined" className={classes.formControl} fullWidth>
//                                 <InputLabel id="demo-simple-select-outlined-label">Class</InputLabel>
//                                 <Select
//                                 labelId="demo-simple-select-outlined-label"
//                                 id="demo-simple-select-outlined"
//                                 value={classs}
//                                 onChange={(e) => {setClasss(e.target.value),setClasssFlag}}
//                                 required
//                                 error={classs == "" && classsFlag == true ? true : false}
//                                 label="Class"
//                                 >
//                                 {
//                                     classList.map((className) => {
//                                         return <MenuItem value={className}>{className}</MenuItem>
//                                     })
//                                 }
//                                 </Select>
//                             </FormControl>
//                             </Box>
//                             <Box className={classes.buttonDiv}>
//                                 <Button
//                                     color='primary'
//                                     variant='contained'
//                                     className={classes.button}
//                                     type="submit"
//                                 >
//                                     Edit Subject
//                                 </Button>
//                             </Box>
//                         </Box>
//                     </form>
//                 </Container>
//             </CustomDrawerComponents>
//         </>
//     );
// }

// export default EditSubject

// ----------------------------------------------------------- new

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
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Chip,
    LinearProgress
} from "@material-ui/core"
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
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

const classList = [
    '7_A',
    '7_B',
    '7_C',
    '7_D',
    '8_A'
];

const EditSubject = () => {

    const { id } = useParams();

    const classes = useStyles();
    const [subject, setSubject] = useState();
    const [loading, setLoading] = useState(false);
    const [subjectFlag, setSubjectFlag] = useState(false);
    const [classsFlag, setClasssFlag] = useState(false);
    const [classList, setClassList] = useState([]);
    const [selectClass, setSelectClass] = React.useState(1);
    const [isClassLoading, setIsClassLoading] = useState(false);

    const editSubject = async (e) => {
        e.preventDefault();
        await axios({
            method : "PATCH",
            url : `${process.env.REACT_APP_API_URL}/subjects/${id}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data : {
                Subject_Name : subject.Subject_Name,
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
        });
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/subjects/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                if (res.data.data.Class_Id == null) {
                    toast.error("Class doesn't exist");
                } 
                    setSubject(res.data.data);
                    if (res.data.data.Class_Id !== null) {
                        setSelectClass(res.data.data.Class_Id._id);
                    }
                    setLoading(true);
                    axios({
                        method : "GET",
                        url : `${process.env.REACT_APP_API_URL}/classes/`,
                        headers : {
                          "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
                        }
                      }).then((res) => {
                        if (res.data.error) {
                          toast.error(res.data.message);
                        } else {
                          setClassList(res.data.data);
                          setIsClassLoading(true);
                        }
                    }).catch((error) => {
                      toast.error(error.response.data.error);
                    });
                
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }, []);

    return (
        <>
            <ToastContainer />
            <CustomDrawerComponents>
                {
                    loading ? <Container>
                        <form onSubmit={editSubject}>
                            <Box>
                                <Box>
                                    <TextField
                                        label="Subject Name"
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={subject.Subject_Name}
                                        onChange={(e) => { setSubject({...subject, Subject_Name : e.target.value}); setSubjectFlag(true) }}
                                        className={classes.textField}
                                        error={subject.Subject_Name == "" && subjectFlag == true ? true : false}
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
                                                classList.map((className) => {
                                                    return <MenuItem value={className._id}>{className.Std_Name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box className={classes.buttonDiv}>
					<Button
                                    color='primary'
                                    variant='outlined'
                                    className={classes.button}
                                >
                                    <Link to="/subjects">cancel</Link>
                                </Button>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        type="submit"
                                    >
                                        Edit Subject
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
    );
}

export default EditSubject
