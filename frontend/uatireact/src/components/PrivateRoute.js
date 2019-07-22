import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
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
)(PrivateRoute);
