import React from "react";
import "./App.css";
// prettier-ignore
import { Login, Register, ImportPage, Dashboard, Admin, Notifications } from './pages'
import { Switch, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/notifications" component={Notifications} />
          <PrivateRoute path="/import" component={ImportPage} />
          <PrivateRoute path="/admin" component={Admin} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
