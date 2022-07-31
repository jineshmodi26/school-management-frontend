import React, { useState,useEffect } from "react";
import { Container, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Switch, Button, FormControlLabel, Box, LinearProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDrawerComponents from '../Drawer'
import axios from 'axios';
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
// import {
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        buttonDiv: {
            display: "flex",
            justifyContent: "center",
            color: 'purple'
        },
        button: {
            margin: "10px",
            width: "300px"
        }
    },
    // formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 120,
    //   maxWidth: 300,
    // },
    // noLabel: {
    //   marginTop: theme.spacing(3),
    // },
}));
export default function EditFinance() {
    const {id} = useParams();
    const classes = useStyles();
    const theme = useTheme();
    const [Finances, setFinances] = React.useState({});
    const [Amount, setAmount] = React.useState();
    const [Description, setDescription] = React.useState();
    const [Date, setDate] = React.useState("2022-05-22");
    const [Finance, setFinance] = React.useState(false);
    const [AmountFlag, setAmountFlag] = useState(false);
    const [DescriptionFlag, setDescriptionFlag] = useState(false);
    const [DateFlag, setDateFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    //////////////////////////////////////////////
    const editFinance = async (e) => {
        e.preventDefault();
        await axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}/finances/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            },
            data: {
                date: Date,
                description: Finances.description,
                amount: Finances.amount,
                finance: Finance
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
    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/finances/${id}`,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                setFinances(res.data.data);
                setFinance(res.data.data.expense);
                setDate(res.data.data.date.substring(0, 10));
                setLoading(true);
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }, []);
    //////////////////////////////////////////////

    // const [values, setValues] = React.useState({
    //   amount: ''
    // });
    // const handleChangeamount = (prop) => (event) => {
    //   setValues({ ...values, [prop]: event.target.value });
    // };

    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    // };

    return (
        <>
            <ToastContainer />
            <CustomDrawerComponents>
                {
                    loading ?
                        <Container>
                            <form onSubmit={editFinance} className={classes.root} noValidate autoComplete="off">
                                <Box>
                                    <FormControl fullWidth className={classes.margin} variant="outlined" style={{ marginLeft: '7px' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={Finances.amount}
                                            onChange={(e) => { setFinances({...Finances,amount:e.target.value}); setAmountFlag(true) }}
                                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                            labelWidth={60}
                                            error={Amount === "" && AmountFlag == true ? true : false}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>

                                    <TextField
                                        style={{ width: '100%', marginTop: '16px' }}
                                        required
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={Finances.description}
                                        onChange={(e) => { setFinances({...Finances,description:e.target.value}); setDescriptionFlag(true) }}
                                        error={Description === "" && DescriptionFlag == true ? true : false}
                                    />
                                </Box>
                                <Box>

                                    <TextField
                                        style={{ width: '100%' }}
                                        type="date"
                                        variant="outlined"
                                        margin="normal"
                                        label="Date"
                                        fullWidth
                                        value={Date}
                                        onChange={(e) => { setDate(e.target.value); setDateFlag(true) }}
                                        error={Date === "" && DateFlag == true ? true : false}
                                    />
                                </Box>
                                {/* <Box>

                                    <TextField
                                        style={{ width: '100%' }}
                                        type="date"
                                        variant="outlined"
                                        margin="normal"
                                        label="Date"
                                        fullWidth
                                        value={Finances.date}
                                        onChange={(e) => { setFinances({...Finances,date:e.target.value}), setDateFlag(true) }}
                                        error={Date === "" && DateFlag == true ? true : false}
                                    />
                                </Box> */}
                                <Box>
                                    <div style={{ display: 'flex', margin: '10px', justifyContent: '', alignItems: 'center' }}>
                                        <span style={{ fontSize: '20px' }}>Income</span>
                                        <FormControlLabel
                                            style={{ margin: "0px 3px 0px 0px" }}
                                            control={<Switch color="primary" checked={Finance} onChange={(e) => { setFinance((prev)=>!prev) }}/>}
                                            label=""
                                            labelPlacement="start"
                                        />
                                        <span style={{ fontSize: '20px' }}>Expence</span>
                                    </div>
                                </Box>
                                <Box className={classes.buttonDiv} style={{ display: 'flex', justifyContent: 'center' }}>
 				<Button
                color='primary'
                variant='outlined'
                className={classes.button}
                style={{ width: "300px", margin: '10px' }}
              >
                <Link to="/finance">cancel</Link>
              </Button>
				 <Button
                                        style={{ width: "300px", margin: '10px' }}
                                        color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        type="submit"
                                    >
                                        Edit Finance
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
    );
}
