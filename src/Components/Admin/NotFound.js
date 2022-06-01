import React from 'react'
import notfound from "../../Assets/notfound.jpg"
import {Box, Button} from  '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <img src={notfound} alt="Paris" style={{width : "40%",display: "block",marginLeft: "auto",marginRight: "auto"}}/>
      <Box style={{display: "flex",justifyContent: "center"}}>
        <Link to="/classes">
        <Button
            color='primary'
            variant='contained'
            // className={classes.button}
        >
            Go To Home
        </Button>
        </Link>
      </Box>
    </>
  )
}

export default NotFound