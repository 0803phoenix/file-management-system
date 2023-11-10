import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authActionCreator";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginFormSubmit = (e)=>{
    e.preventDefault();
    if(!email || !password){
      toast.error("Please Fill in all the details!!")
      return;
    }
    else{
      const loginData = {
        email:email,
        password, password
      }
      console.log(loginData);
      dispatch(loginUser(loginData, setSuccess));
    }
  }

  useEffect(()=>{
    if(success){
      navigate("/");
    }
  },[success])

  return (
    <div className="main-container">
      <div className="file-management-text">
        <h3>File Management System</h3>
      </div>
      <div className="login-container">
        <div className="login-content">
          <h3>Login Form</h3>
          <div className="vertical-line"></div>
        </div>
        <form className="login-form">
          <div className="form-group login-form-lables">
            {/* <label for="exampleInputEmail1">Email address</label> */}
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="form-group login-form-lables">
            {/* <label for="exampleInputPassword1">Password</label> */}
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-button" onClick={handleLoginFormSubmit}>
            Submit
          </button>
          <div className="text">
            <p>Not a member? </p>&nbsp; <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
