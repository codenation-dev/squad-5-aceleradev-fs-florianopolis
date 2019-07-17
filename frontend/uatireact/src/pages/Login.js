import React from "react";
import { Grid } from "@material-ui/core";
import AccessForm from "../components/AccessForm";

const Login = () => {
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
        <h1>Login</h1>
        <Grid item lg={12}>
          <AccessForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
