import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const SuperRoute = ({ component: Component, isLogged, isSuper, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged && isSuper ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isLogged: state.loginReducer.isLogged,
  isSuper: state.loginReducer.isSuper
});
export default connect(
  mapStateToProps,
  null
)(SuperRoute);
