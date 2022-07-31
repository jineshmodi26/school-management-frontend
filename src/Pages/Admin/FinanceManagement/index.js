import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Grid,
  Box,
  TextField,
  List,
  ListItem,
  Paper,
  ListItemText,
  Button,
  Typography,
  Divider,
  makeStyles,
  IconButton
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomDrawerComponents from "../../../Components/Admin/Drawer";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "white",
    }
  },
}))
export default function FinanceManagementPage(props) {
  const classes = useStyles();
  const [expenceData, setExpenceData] = React.useState([]);
  const currentdate = new Date();
  const [startDate, setStartDate] = React.useState(new Date(currentdate.getFullYear(),currentdate.getMonth(),1).toISOString().substring(0, 10));
  const [endDate, setEndDate] = React.useState(new Date().toISOString().substring(0, 10));
  const [startDateFlag, setStartDateFlag] = React.useState(false);
  const [endDateFlag, setEndDateFlag] = React.useState(false);
  const [loading, setLoading] = useState(false);
  let income = 0;
  let expence = 0;
  expenceData.map((i) => {
    if (i.income) {
      income += i.amount
    }
    else {
      expence += i.amount
    }
  })
  const deleteFinance = async (id) => {
if(window.confirm('Do you really want to Delete This Expence?') ){
    await axios({
      method : "DELETE",
      url : `${process.env.REACT_APP_API_URL}/finances/${id}`,
      headers : {
        "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
      }      
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setExpenceData(expenceData.filter((finance) => {
          return finance._id !== id;
        }));
      }
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }
}
  // const startDate= "2022-05-13T00:00:00.000Z"
  // const endDate= "2022-05-22T00:00:00.000Z"
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/finances/${startDate}/${endDate}`,
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        setExpenceData(res.data.data);
        setLoading(true);
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    });
  }, [startDate, endDate]);
  return (
    <>
      <ToastContainer />
      <CustomDrawerComponents>
        <Box mx={2} my={4}>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item sm={12} md={4} lg={4} xl={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                fullWidth
              >
                <Link to="/finance/add" className={classes.link}>Add Expence & Income</Link>
              </Button>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={4}
              >
                <Grid item sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    type="date"
                    variant="outlined"
                    margin="normal"
                    label="From"
                    fullWidth
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setStartDateFlag(true) }}
                    error={startDate === "" && startDateFlag == true ? true : false}
                  />
                </Grid>
                <Grid item sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    type="date"
                    variant="outlined"
                    margin="normal"
                    label="To"
                    fullWidth
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setEndDateFlag(true) }}
                    error={endDate === "" && endDateFlag == true ? true : false}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={6}>
              <Paper component={Box} maxHeight={500} p={4} overflow={"auto"}>
                <Typography variant="h6">Income</Typography>
                <List>
                  {expenceData.map((item) =>
                    (item.income) ? (
                      <>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <ListItem>
                            <Grid container>
                              <Grid item sm={12} md={12} xl={12}>
                                <Typography variant="button" display="block">
                                  {new Date(item.date).toLocaleDateString()}
                                </Typography>
                              </Grid>
                              <Grid item sm={12} md={12} xl={12}>
                                <ListItemText
                                  primary={item.description}
                                  secondary={item.amount}
                                />
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem style={{ display: 'flex', justifyContent: 'end' }}>
                            <Link to={`/finance/edit/${item._id}`}>
                              <IconButton>
                                <EditIcon style={{ color: green[900] }} />
                              </IconButton>
                            </Link>
                            <IconButton onClick={() => {deleteFinance(item._id)}}>
                              <DeleteIcon style={{ color: red[500] }} />
                            </IconButton>
                          </ListItem>
                        </Box>
                        <Divider />
                      </>
                    ) :
                      <>
                      </>
                  )}
                </List>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={6}>
              <Paper component={Box} maxHeight={500} p={4} overflow={"auto"}>
                <Typography variant="h6">Expances</Typography>
                <List>
                  {expenceData.map((item) =>
                    item.expense ? (
                      <>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <ListItem>
                            <Grid container>
                              <Grid item sm={12} md={12} xl={12}>
                                <Typography variant="button" display="block">
                                  {new Date(item.date).toLocaleDateString()}
                                </Typography>
                              </Grid>
                              <Grid item sm={12} md={12} xl={12}>
                                <ListItemText
                                  primary={item.description}
                                  secondary={item.amount}
                                />
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem style={{ display: 'flex', justifyContent: 'end' }}>
                            <Link to={`/finance/edit/${item._id}`}>
                              <IconButton>
                                <EditIcon style={{ color: green[900] }} />
                              </IconButton>
                            </Link>
                            <IconButton onClick={() => {deleteFinance(item._id)}}>
                              <DeleteIcon style={{ color: red[500] }} />
                            </IconButton>
                          </ListItem>
                        </Box>
                        <Divider />
                      </>
                    ) : (
                      <>

                      </>
                    )
                  )}
                </List>
              </Paper>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h6">{`Total Income is ${income}`}</Typography>
              <Typography variant="h6">{`Total Expance is ${expence}`}</Typography>
              <Typography variant="h6">{`Over All Income is ${income - expence}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      </CustomDrawerComponents>
    </>
  );
}
