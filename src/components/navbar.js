import React from "react";
import "./navbar.css";

import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/authActionCreator";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/")
  };
  
  const handleHomeClick = ()=>{
    console.log("Home Button is clicked")
    navigate("/");
  }

  const isDashboardRoute =
    location.pathname.includes("/dashboard");
  return (
    <div className="navbar shadow-lg">
      <div className="navbar-name">
        <a className="text-decoration-none text-white" href="/">File Management System</a>
      </div>
      <div className="navbar-buttons">
        {isAuthenticated ? (
          <>
            <p className="my-0 mt-1">
              <span className="text-light">Welcome, </span>
              <span className="text-warning">{user.displayName}</span>
            </p>
            {isDashboardRoute ? (
              <button
                className="login btn btn-sm btn-success"
                onClick={handleHomeClick}
              >
                Home
              </button>
            ) : (
              <Link to="/dashboard" className="login btn btn-sm btn-primary">
                Dashboard
              </Link>
            )}

            <button
              className="login btn btn-sm btn-danger"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="login btn btn-sm btn-primary"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="register btn btn-sm btn-success"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
