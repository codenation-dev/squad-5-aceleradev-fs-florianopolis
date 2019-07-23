import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";

import { EnhancedTable } from "../../components/NotificationTable";

import { ExpansionPanelStyled, ExpansionPanelDetailsStyled } from "./styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Notifications extends Component {
  state = {
    alerts: [
      {
        sentTo: "teste@teste.com",
        count: 15,
        clients: [
          {
            name: "CICERO HARADA,DENIS EMANUEL DE ARAUJO",
            salary: 15000,
            read: true
          },
          {
            name: "ALEXANDRE LIAZI",
            salary: 22000,
            read: false
          },
          {
            name: "NELSON MASSAKASU NASHIRO",
            salary: 17000,
            read: true
          },
          {
            name: "MARIO KIYOCHI NAKASHIMA",
            salary: 16000,
            read: false
          },
          {
            name: "ROSELY SATIKO SAKUNO",
            salary: 13000,
            read: true
          },
          {
            name: "ARMANDO DE OLIVEIRA PIMENTEL",
            salary: 10000,
            read: false
          },
          {
            name: "CARLOS ALBERTO DE OLIVEIRA",
            salary: 12000,
            read: false
          }
        ],
        sentAt: "22/07/2019 00:00"
      },
      {
        sentTo: "admin@admin.com",
        count: 22,
        clients: [
          {
            name: "CICERO HARADA",
            salary: 15000,
            read: false
          },
          {
            name: "DENIS EMANUEL DE ARAUJO",
            salary: 19000,
            read: false
          },
          {
            name: "ALEXANDRE LIAZI",
            salary: 22000,
            read: true
          },
          {
            name: "NELSON MASSAKASU NASHIRO",
            salary: 17000,
            read: false
          },
          {
            name: "MARIO KIYOCHI NAKASHIMA",
            salary: 16000,
            read: true
          },
          {
            name: "ROSELY SATIKO SAKUNO",
            salary: 13000,
            read: false
          },
          {
            name: "ARMANDO DE OLIVEIRA PIMENTEL",
            salary: 10000,
            read: false
          },
          {
            name: "CARLOS ALBERTO DE OLIVEIRA",
            salary: 12000,
            read: true
          }
        ],
        sentAt: "21/07/2019 00:00"
      }
    ]
  };

  // componentDidMount() {
  //   this.props.getNotifications();
  // }

  render() {
    return (
      <div style={{ padding: "15px" }}>
        <h1>Notificações</h1>
        {/* {this.props.notificationList.map((item, index) => ( */}
        {this.state.alerts.map((item, index) => (
          <ExpansionPanelStyled key={index}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Existem {item.count} clientes em potencial na atualização de{" "}
                {item.sentAt}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetailsStyled>
              <div style={{ width: "100%" }}>
                <EnhancedTable
                  dataAtualizacao={item.sentAt}
                  dados={item.clients}
                />
              </div>
            </ExpansionPanelDetailsStyled>
          </ExpansionPanelStyled>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationList: state.notificationReducer.notificationList
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
