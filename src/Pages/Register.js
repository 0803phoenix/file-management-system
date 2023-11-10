import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/authActionCreator";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterFormSubmit = (e)=>{
    e.preventDefault();

    if(!name || !email || !password || !passwordConfirmation){
      toast.error("Please fill in all the valid Details!!");
      return;
    }

    if(password !== passwordConfirmation){
      toast.error("Password do not match");
      return;
    }
    const signUpData = {
      name:name,
      email:email,
      password:password
    }
    console.log(signUpData);
    dispatch(registerUser(signUpData, setSuccess));
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
          <h3>Register Form</h3>
          <div className="vertical-line"></div>
        </div>
        <form className="login-form">
          <div className="form-group login-form-lables">
            {/* <label for="exampleInputEmail1">Name</label> */}
            <input
              type="email"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              value={name}
              onChange={e=> setName(e.target.value)}
            />
          </div>
          <div className="form-group login-form-lables">
            {/* <label for="exampleInputEmail1">Email address</label> */}
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group login-form-lables">
            {/* <label for="exampleInputPassword1">Password</label> */}
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={e=> setPassword(e.target.value)}
            />
          </div>
          <div className="form-group login-form-lables">
            {/* <label for="exampleInputPassword1">Re-type Password</label> */}
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
              placeholder="Re-type Password"
              value={passwordConfirmation}
              onChange={e=>setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-button" onClick={handleRegisterFormSubmit}>
            Submit
          </button>
          <div className="text">
            <p>Already a member? </p>&nbsp; <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
