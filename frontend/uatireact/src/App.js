import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import ImportPage from "./components/ImportPage";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const isLogged = () => {
    return false;
  };

  const HomeRoute = () => {
    if (isLogged()) {
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/login" />;
  };

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeRoute} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/import" component={ImportPage} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </div>
  );
};

export default App;
