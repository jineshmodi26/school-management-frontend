import React from "react";
import {
  Box,
  CssBaseline,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  AppBar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

// import LoginImage from "../../Static/login.svg";

const useStyle = makeStyles((them) => ({
  Container: {
    width: "100%",
    height: "100vh",
  },
  SubContainer: {
    width: "100%",
    height: "100vh",
  },
  TabHeader: {
    flex: 1,
  },
  LoginBox: {
    border: "1px solid black",
    borderRadius: 20,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 60,
    paddingBottom: 60,
  },
}));

export default function LoginPage(props) {
  const styleClass = useStyle();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Box
        width="100%"
        height="100vh"
        overflow="auto"
        className={styleClass.Container}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-around"
          className={styleClass.SubContainer}
        >
          <Grid item md={4} sm={12} lg={4} xl={4}>
            <Box
              py={40}
              b={2}
              borderRadius={10}
              className={styleClass.LoginBox}
            >
              <Box style={{marginBottom:20}}>
                <Typography variant="h4" color="primary" align="center">
                  Login in School
                </Typography>
              </Box>
              <AppBar position="relative">
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Student" className={styleClass.TabHeader} />
                  <Tab label="Teacher" className={styleClass.TabHeader} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0} />
              <TabPanel value={value} index={1} />
            </Box>
          </Grid>
          <Grid item md={6} sm={12} lg={6} xl={6}>
            {/* <img src={LoginImage} alt="" /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function TabPanel(props) {
  return (
    <>
      {props.value === props.index && props.index === 0 ? (
        <>
          <Grid container justifyContent="center">
            <Grid md={12} lg={12} sm={12} xs={12}>
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter Student ID"
                label="Student"
                fullWidth
              />
            </Grid>
            <Grid md={12} lg={12} sm={12} xs={12}>
              <TextField
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="Enter Password"
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid md={12} lg={12} sm={12} xs={12}>
              <Button variant="outlined" color="primary" size="large" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}
      {props.value === props.index && props.index === 1 ? (
        <>
          <Grid container justifyContent="center">
            <Grid md={12} lg={12} sm={12} xs={12}>
              <TextField
                margin="normal"
                variant="outlined"
                placeholder="Enter Teacher ID"
                label="Teacher"
                fullWidth
              />
            </Grid>
            <Grid md={12} lg={12} sm={12} xs={12}>
              <TextField
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="Enter Password"
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid md={12} lg={12} sm={12} xs={12} component={Box} mt={4}>
              <Button variant="outlined" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
}
