import React from "react";
import "./App.css";
// prettier-ignore
import { SideBar, Login, Register, ImportPage, Dashboard, Admin } from './components'
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";

const App = props => {
  const HomeRoute = () => {
    if (props.isLogged) {
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/login" />;
  };

  return (
    <div className="App">
      <SideBar />
      <Grid container>
        <Grid item xs={3}>
          <h1>Hello</h1>
        </Grid>
        <Grid item xs={9}>
          <Switch>
            <Route exact path="/" component={HomeRoute} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/import" component={ImportPage} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return { isLogged: state.userReducer.isLogged };
};

export default connect(
  mapStateToProps,
  null
)(App);
