import React from "react";
import "./App.css";
// prettier-ignore
import { Login, Register, ImportPage, Dashboard, Admin, Notifications } from './components'
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/Layout";

const App = props => {
  const HomeRoute = () => {
    if (props.isLogged) {
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/login" />;
  };

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/import" component={ImportPage} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Layout>
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
