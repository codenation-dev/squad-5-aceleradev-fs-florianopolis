import React from "react";
import { Grid } from "@material-ui/core";
import AccessForm from "../components/AccessForm";

const Register = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <h1>Register</h1>
        <Grid item lg={12}>
          <AccessForm buttonName="Register" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
