import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../redux/actions";

const formStyle = {
  ipt: {
    marginTop: "10px"
  },
  link: {
    textDecoration: "none !important"
  },
  btn: {
    marginTop: "10px",
    marginRight: "10px"
  },
  error: {
    fontSize: "12px",
    color: "red",
    padding: "10px 0px"
  }
};
class AccessForm extends Component {
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
    success ? history.push("/dashboard") : this.setState(this.props.msg);
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={e => this.submitForm(e)}>
          <Input
            name="username"
            type="text"
            fullWidth={true}
            placeholder="Usuário"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            style={formStyle.ipt}
            type="password"
            fullWidth={true}
            placeholder="Senha"
            onChange={this.handleChange}
          />
          <div style={formStyle.error}>{this.props.msg}</div>
          <Button
            style={formStyle.btn}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  success: state.loginReducer.success,
  error: state.loginReducer.error,
  msg: state.loginReducer.text
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccessForm)
);
