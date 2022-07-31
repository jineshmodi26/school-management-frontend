import React, { useState, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {useParams} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import {
    Container,
    TextField,
    Box,
    LinearProgress,
    ListItemIcon,
    Checkbox,
    ListItemText
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
    }, textField: {
        margin: "20px"
    },
    buttonDiv: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        margin: "10px",
        width: "300px"
    }
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
function getStyles(classe, classeName, theme) {
    return {
        fontWeight:
            classeName.indexOf(classe) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EditNotice = () => {
    const {id} = useParams();
    const classes = useStyles();
    const theme = useTheme();
    const [Notice, setNotice] = useState({});
    const [NoticeDetails, setNoticeDetails] = React.useState();
    const [NoticeTitle, setNoticeTitle] = React.useState();
    const [AllClasses, setAllClasses] = React.useState([]);
    const [classeName, setClassName] = React.useState([]);
    const [NoticeTitleFlag, setNoticeTitleFlag] = useState(false);
    const [NoticeDetailsFlag, setNoticeDetailsFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selected, setSelected] = useState([]);
    const isAllSelected =
        AllClasses.length > 0 && selected.length === AllClasses.length;
    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
        setSelected(selected.length === AllClasses.length ? [] : AllClasses);
        return;
        }
        setSelected(value);
    };
    const editNotice = async (e) => {
        e.preventDefault();
        let classesId = [];
        await selected.map((classe) => {
            classesId.push({ Class_Id: classe._id });
        })
        if (classesId.length === 0) {
            toast.error("Select atleast one Class")
        } else {
            await axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}/notices/admin/${id}`,
                headers: {
                    "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
                },
                data: {
                    Notice_Title: Notice.NoticeTitle,
                    Notice_Details: Notice.NoticeDetails,
                    Classes_Id: classesId
                }
            }).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.message);
                } else {
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
            url : `${process.env.REACT_APP_API_URL}/notices/admin/${id}`,
            headers : {
                "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setNotice(res.data.data);
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, []);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/classes`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then(async (res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setAllClasses(res.data.data);
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
                    <form onSubmit={editNotice} className={classes.root} noValidate autoComplete="off">
                        {/* <div> */}
                        <Box>
                            <TextField
                                style={{ width: '100%' }}
                                required
                                id="outlined-required"
                                label="Notice Title"
                                variant="outlined"
                                value={Notice.Notice_Title}
                                onChange={(e) => { setNotice({...Notice, Notice_Title : e.target.value}); setNoticeTitleFlag(true) }}
                                className={classes.textField}
                                error={Notice.NoticeTitle === "" && NoticeTitleFlag == true ? true : false}
                            />
                        </Box>
                        <Box>
                            <TextField
                                style={{ width: '100%' }}
                                required
                                id="outlined-multiline-static"
                                label="Notice Details"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={Notice.Notice_Details}
                                onChange={(e) => { setNotice({...Notice, Notice_Details : e.target.value}); setNoticeDetailsFlag(true) }}
                                className={classes.textField}
                                error={Notice.NoticeDetails === "" && NoticeDetailsFlag == true ? true : false}
                            />
                        </Box>
                        <Box>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="mutiple-select-label">Select Class</InputLabel>
                                <Select
                                    labelId="mutiple-select-label"
                                    multiple
                                    value={selected}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value.Std_Name} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem
                                        value="all"
                                        classes={{
                                            root: isAllSelected ? classes.selectedAll : ""
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                classes={{ indeterminate: classes.indeterminateColor }}
                                                checked={isAllSelected}
                                                indeterminate={
                                                    selected.length > 0 && selected.length < AllClasses.length
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{ primary: classes.selectAllText }}
                                            primary="Select All"
                                        />
                                    </MenuItem>
                                    {AllClasses.map((classe) => (
                                        <MenuItem key={classe._id} value={classe}>
                                            <ListItemIcon>
                                                <Checkbox checked={selected.indexOf(classe) > -1} />
                                            </ListItemIcon>
                                            <ListItemText primary={classe.Std_Name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {/* <Box>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-chip-label">Classes</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={classeName}
                                    onChange={(event) => { setClassName(event.target.value) }}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value.Std_Name} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {AllClasses.map((classe) => (
                                        <MenuItem key={classe._id} value={classe} style={getStyles(classe.Std_Name, classe.Std_Name, theme)}>
                                            {classe.Std_Name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box> */}
                        <Box className={classes.buttonDiv}>
				<Button
                                    color='primary'
                                    variant='outlined'
                                    className={classes.button}
                                >
                                    <Link to="/Notices">cancel</Link>
                                </Button>
                            <Button
                                color='primary'
                                variant='contained'
                                className={classes.button}
                                type="submit"
                            >
                                Edit Notice
                            </Button>
                        </Box>
                    </form>
                </Container>
                : <Box>
                    <LinearProgress />
                </Box>
            }
            </CustomDrawerComponents>
        </>
    )
}

export default EditNotice
