import React, { Fragment } from "react";
import { Input, Button } from "@material-ui/core";

const formStyle = {
  ipt: {
    marginTop: "10px"
  },
  btn: {
    marginTop: "10px"
  }
};

const AccessForm = ({ buttonName }) => (
  <Fragment>
    <form onSubmit={() => {}}>
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
        {buttonName}
      </Button>
    </form>
  </Fragment>
);

export default AccessForm;
