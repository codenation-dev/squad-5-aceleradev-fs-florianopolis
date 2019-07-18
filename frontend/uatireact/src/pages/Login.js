import React from "react";
import { Grid } from "@material-ui/core";
import AccessForm from "../components/AccessForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loginBg: {
    backgroundColor: "#fff",
    padding: "60px 20px",
    border: "1px solid #ccc"
  }
}));

const Login = () => {
  const classes = useStyles();
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
        <Grid className={classes.loginBg} item lg={6}>
          <h1>Login</h1>
          <AccessForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
