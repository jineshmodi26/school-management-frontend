import React from "react";

import {
  MenuItem,
  Grid,
  Box,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import CustomDrawerComponents from "../../../Components/Admin/Drawer";

export default function TeacherClassManagementPage(props) {
  const [selectClass, setSelectClass] = React.useState(1);
  const [selectSubject, setSelectSubject] = React.useState(1);
  return (
    <>
      <CustomDrawerComponents>
        <Box mx={2} my={4}>
          <Grid container spacing={4}>
            <Grid item md={12} sm={12} lg={12} xs={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel>Class</InputLabel>
                <Select
                  onChange={(event) => setSelectClass(event.target.value)}
                  value={selectClass}
                  label="Class"
                >
                  <option value={1}>Class 1</option>
                  <option value={2}>Class 2</option>
                  <option value={3}>Class 3</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel>Subject</InputLabel>
                <Select
                  onChange={(event) => setSelectSubject(event.target.value)}
                  value={selectSubject}
                  label="Subject"
                >
                  <option value={1}>Maths</option>
                  <option value={2}>Science</option>
                  <option value={3}>Social Science</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </CustomDrawerComponents>
    </>
  );
}
