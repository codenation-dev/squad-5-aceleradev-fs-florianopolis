import React from "react";
import "./App.css";
// prettier-ignore
import { Login, ImportPage, Dashboard, Admin, Notifications, User, routes} from './pages'
import { Switch } from "react-router-dom";

import Layout from "./pages/Layout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <PublicRoute
            restricted={true}
            exact
            path="/login"
            component={Login}
          />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <PrivateRoute exact path="/import" component={ImportPage} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute exact path="/user" component={User} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
