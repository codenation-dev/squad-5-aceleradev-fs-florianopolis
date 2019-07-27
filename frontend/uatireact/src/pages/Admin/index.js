import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { PersonAdd } from "@material-ui/icons";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    // height: "110px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  icones: {
    fontSize: "40px"
  }
}));

const Admin = () => {
  const classes = useStyles();

  const actionItems = [
    {
      name: "Cadastro de Usuários",
      path: "/user",
      icon: <PersonAdd className={classes.icones} />
    }
  ];

  const renderActions = actionItems => {
    return actionItems.map(({ name, path, icon }) => (
      <Grid key={name} item lg={3}>
        <Link to={path} style={{ textDecoration: "none" }}>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  style={{ minHeight: "80px" }}
                >
                  <Grid item lg={9}>
                    <Typography variant="h6">{name}</Typography>
                  </Grid>
                  <Grid item lg={3}>
                    {icon}
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        </Link>
      </Grid>
    ));
  };

  return (
    <div style={{ backgroundColor: "#ecf0f5" }}>
      <Grid container spacing={3}>
        {renderActions(actionItems)}
      </Grid>
    </div>
  );
};

export default Admin;
