import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({
  component: Component,
  restricted,
  isLogged,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        isLogged && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isLogged: state.loginReducer.isLogged
});
export default connect(
  mapStateToProps,
  null
)(PublicRoute);
