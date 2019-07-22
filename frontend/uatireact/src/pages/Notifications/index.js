import React from "react";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const employees = [
  {
    name: "Marcos",
    alertSent: true
  },
  {
    name: "José",
    alertSent: true
  },
  {
    name: "Antonio",
    alertSent: false
  },
  {
    name: "Bruno",
    alertSent: true
  },
  {
    name: "Marta",
    alertSent: true
  },
  {
    name: "Ana",
    alertSent: true
  },
  {
    name: "Beatriz",
    alertSent: true
  },
  {
    name: "Carmen",
    alertSent: true
  },
  {
    name: "Luana",
    alertSent: true
  },
  {
    name: "Lenira",
    alertSent: true
  },
  {
    name: "Bob",
    alertSent: true
  }
];

const Notifications = props => {
  console.log(props);
  return (
    <div>
      <h1>Notificações</h1>
      <h2>Novas notificações:</h2>
      {employees
        .filter(item => item.alertSent)
        .map((item, index) => (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Novo cliente em potencial encontrado: {item.name}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <ul>
                  <li>Em: {new Date().toString()}</li>
                  <li>Alerta disparado para: {props.loggedUser.email}</li>
                  <li>Salário: </li>
                </ul>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.userReducer.loggedUser
});

export default connect(mapStateToProps)(Notifications);
