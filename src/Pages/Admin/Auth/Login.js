import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import schoolImage from "../../../Assets/school.png"
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = new useNavigate();
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
            } else {
              toast.success(res.data.message);
              navigate("/classes", {replace : true});
            }
          }).catch((error) => {
            toast.error(error.response.data.message);
          });
    }
    useEffect(() => {
            check();
    },[])

    const submitButton = async (e) => {
        e.preventDefault();
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/admin/login`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                UserName : username,
                password : password
            }
        }).then((res) => {
            if (res.data.token) {
                window.sessionStorage.setItem('token', res.data.token);
                window.sessionStorage.setItem('SchoolName',res.data.SchoolName);
                navigate("/classes", { replace: true });
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }

    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return <>
        <div>
            <ToastContainer />
            <div className="maindiv">
                <div className="innerdiv">
                    <div className="register">
                        <h3 className="register-heading text-center"></h3>
                        <div className='login-image'>
                            <img src={schoolImage} className="m-auto login-image" height="100" width="120" />
                        </div>
                        <form onSubmit={submitButton} className="register-form">
                            <div className="form-group">
                                <div className='icon-label'><EmailIcon /><label>Username</label></div>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Enter Your Username"
                                    className="form-control"
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                    value={username}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className='icon-label'><LockIcon /><label>Password</label></div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter Your Password"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    id="password"
                                    value={password}
                                    required
                                />
                                <div className="show-password">
                                    <div>
                                        <input type="checkbox" onClick={showPassword} />
                                        <span> Show Password</span>
                                    </div>
                                </div>
                            </div>
                            <div className='button-div'>
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn btn-dark mb-4 login-button"
                                />
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>
                                Don't have an account ?{" "}
                                <Link to="/signup" className="register-login text-dark font-weight-bold">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Login;