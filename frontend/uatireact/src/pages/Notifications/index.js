import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";

import { EnhancedTable } from "../../components/NotificationTable";

import { ExpansionPanelStyled, ExpansionPanelDetailsStyled, FakeExpand } from "./styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
    // let names = this.props.notificationList.name.split(",");
  }

  render() {
    // let names = this.props.notificationList.name.split(",");
    // console.log(names);
    return (
      <div style={{ padding: "15px" }}>
        <h1>Notificações</h1>
        {this.props.notificationList.map((item, index) => {
          let splitName = item.name.split(",");
          let data = splitName.map(name => {
            return {
              name: name
            };
          });
          return (
            <React.Fragment>
              {item.isClientEmail &&
                <FakeExpand>
                  <Typography>O cliente {data[0].name} se tornou um funcionário publico</Typography>
                </FakeExpand>
              }

              {!item.isClientEmail &&
              <ExpansionPanelStyled key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    Existem {splitName.length} clientes em potencial na atualização de {item.sentAt}
                  </Typography>
                </ExpansionPanelSummary>
                  <ExpansionPanelDetailsStyled>
                    <div style={{ width: "100%" }}>
                      <EnhancedTable dataAtualizacao={item.sentAt} dados={data} />
                    </div>
                  </ExpansionPanelDetailsStyled>
                </ExpansionPanelStyled>
              }
            </React.Fragment>
          );
        })}
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
