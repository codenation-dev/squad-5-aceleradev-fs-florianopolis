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
    username: "",
    password: "",
    msg: ""
  };

  handleChange = event => {
    const input = event.target;
    const value = input.value;

    this.setState({ [input.name]: value });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  componentWillReceiveProps(newProps) {
    const { success, history } = newProps;
    success ? history.push("/dashboard") : console.log("s");
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
              name="username"
              type="text"
              // fullWidth={true}
              placeholder="Usuário"
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              // fullWidth={true}
              placeholder="Senha"
              onChange={this.handleChange}
            />
            <Error>{this.props.msg}</Error>
            <hr />
            <Button type="submit">Login</Button>
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
