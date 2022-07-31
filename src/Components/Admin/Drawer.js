import React, { useEffect } from "react";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemText,
  makeStyles,
  IconButton,
  Box
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "none",
      color: "black",
    }
  },
  heading: {
    justifyContent: "space-between"
  }
}));

export default function CustomDrawerComponents(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const DrawerNavigatorText = [
    { name: "Notice Board", path: "/Notices" },
    { name: "Class Management", path: "/classes" },
    { name: "Teacher Management", path: "/teachers" },
    { name: "Fees Payment", path: "/fees" },
    { name: "Student Management", path: "/students" },
    { name: "Subject Management", path: "/subjects" },
    { name: "Manage Finance", path: "/finance" },
    { name: "Exam Management", path: "/Exams" },
    { name: "Result Management", path: "/results" },
  ];
  const check = async()=>{
    await axios({
        method : "POST",
        url : `${process.env.REACT_APP_API_URL}/admin/check`,
        headers : {
          "Authorization" : `Bearer ${window.sessionStorage.getItem('token')}`
        }      
      }).then((res) => {
        if (res.data.error && !res.data.check) {
          toast.error(res.data.message);
          navigate("/admin/login", { replace: true });
        }
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
}
  const adminLogout = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/admin/logout`,
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (!res.data.error) {
        window.sessionStorage.removeItem('token');
        navigate("/admin/login", { replace: true });
      }
      else {
        toast.error(res.data.message);
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }
  useEffect(() => {
    if (window.sessionStorage.getItem("token") === null) {
      navigate("/admin/login", { replace: true });
    }
    else{
      check();
    }
  }, [])

  return (
    <div className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.heading}>
          <Typography variant="h6" noWrap>
            {
              (window.sessionStorage.getItem('SchoolName') === null) ?
                <>School Name</> : <>{window.sessionStorage.getItem('SchoolName')}</>
            }
          </Typography>
          <IconButton onClick={adminLogout}>
            <PowerSettingsNewIcon style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          {DrawerNavigatorText.map((text) => (
            <ListItem button key={text.name}>
              <Link to={text.path} className={classes.link}><ListItemText primary={text.name} /></Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
