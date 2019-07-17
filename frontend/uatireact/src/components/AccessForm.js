import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
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
  }
};
class AccessForm extends Component {
  submitForm = e => {
    e.preventDefault();
    this.props.toggleIsLogged();
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={e => this.submitForm(e)}>
          <Input type="text" fullWidth={true} placeholder="Usuário" />
          <Input
            style={formStyle.ipt}
            type="password"
            fullWidth={true}
            placeholder="Senha"
          />
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

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AccessForm);
