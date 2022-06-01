import React, { useState, useEffect } from "react";

import {
  Grid,
  Box,
  Button,
  LinearProgress
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import CustomDrawerComponents from "../../../Components/Admin/Drawer";
import CustomResultTableComponents from "../../../Components/Admin/ResultTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResultManagementPage(props) {
  const [resultList, setResultList] = React.useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/results`,
      headers: {
        "Authorization": `Bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        setResultList(res.data.data);
        setLoading(true);
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    });
  }, []);
  return (
    <>
      <CustomDrawerComponents>
        <Box mx={2} my={4}>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item sm={12} md={4} lg={4} xl={4}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                fullWidth
              >
                <Link to="/results/add">Add Result</Link>
              </Button>
            </Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
              {
                loading ? <CustomResultTableComponents resultList={resultList} /> : <Box>
                  <LinearProgress />
                </Box>
              }
            </Grid>
          </Grid>
        </Box>
      </CustomDrawerComponents>
    </>
  );
}
