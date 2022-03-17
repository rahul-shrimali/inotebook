import React from "react";
import PropTypes from "prop-types";
import {Link, useLocation} from 'react-router-dom'
import { useContext } from "react";
import modeContext from "../context/mode/modeContext"

// accepting props in here
export default function Navbar(props) {

  const context = useContext(modeContext);
  const {mode, toggleMode} = context;

  const location = useLocation();
  
  const logOut = ()=>{
      localStorage.removeItem('token')
  }

  return (
    <div>

    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">
                Home 
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">
                {props.aboutText}
              </Link>
            </li>
          </ul>
          <form className="form-inline d-flex ">
           {!localStorage.getItem('token') ? <div>
            <Link role="button" to="/login" className="btn btn-primary mx-2" type="submit">Login</Link>
            <Link role="button" to="/signUp" className="btn btn-primary mx-2" type="submit">Sign Up</Link>
            </div> : 
              <button className="btn btn-primary mx-2" onClick={logOut}>Log Out</button>
            }
            
            
            <div className={`form-check form-switch text-${(mode === 'light') ? 'dark' : 'light'}`}>
              <input
                className="form-check-input"
                onClick = {toggleMode}
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Enable Dark Mode
              </label>
            </div>
          </form>
        </div>
      </div>
    </nav>
    </div>
  );
}

//Define types of props
Navbar.propTypes = {
  //If we use isRequired we have to set the prop else it wll give error i.e. it can't be undefined
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

//Setting the default value of props
Navbar.defaultProps = {
  title: "Set Title",
  aboutText: "About",
};
