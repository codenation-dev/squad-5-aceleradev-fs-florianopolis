import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as allActions from "../redux/actions";

const NavBar = props => {
  const renderLinks = () => {
    if (props.isLogged) {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
          <li>
            <Link to="/import">UploadFile</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      );
    }
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Welcome to Uati Bank</p>
      <nav className="navbar">
        <ul>
          {renderLinks()}
          <li>
            <button type="button" onClick={() => props.toggleIsLogged()}>
              IsLogged: {props.isLogged ? "true" : "false"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(allActions, dispatch);
};

const mapStateToProps = state => {
  return {
    isLogged: state.userReducer.isLogged
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
