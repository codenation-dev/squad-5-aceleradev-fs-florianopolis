import { Grid, Button } from "@material-ui/core";
// import AccessForm from "../../components/AccessForm";

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";

import { Form, Error } from "./styles";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: "",
    serverStatus: ""
  };

  //handleChange splitted so it can work with enzyme testing
  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  componentDidMount() {
    (async () => {
      try {
        await fetch("http://localhost:8080/", {
          method: "GET"
        });
        this.setState({ serverStatus: "online" });
      } catch (err) {
        console.log(err);
        this.setState({ serverStatus: "offline" });
      }
    })();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.sucess) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "70vh" }}
        >
          <Form onSubmit={e => this.submitForm(e)}>
            <h1>Login</h1>
            <input
              name="email"
              type="text"
              // fullWidth={true}
              placeholder="Email"
              onChange={this.handleEmailChange}
            />
            <input
              name="password"
              type="password"
              // fullWidth={true}
              placeholder="Senha"
              onChange={this.handlePasswordChange}
            />
            <Error className="loginMsg">{this.props.msg}</Error>
            <hr />
            <Button type="submit" className="loginButton">
              Login
            </Button>
            Server status: {this.state.serverStatus}
          </Form>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.userReducer.success,
  error: state.userReducer.error,
  msg: state.userReducer.text
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
