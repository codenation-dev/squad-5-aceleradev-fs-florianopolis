import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";

import { EnhancedTable } from "../../components/NotificationTable";

import {
  ExpansionPanelStyled,
  ExpansionPanelDetailsStyled,
  UlStyled,
  FakeExpand
} from "./styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      alertsPerPage: 10,
      notificationList: [],
      totalLength: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(number) {
    this.paginationFunct(number, this.props.notificationList);
  }

  componentDidMount() {
    const asyncGetNotifications = async () => {
      await this.props.getNotifications();
    };
    asyncGetNotifications();
  }

  componentWillReceiveProps(nextProps) {
    this.paginationFunct(1, nextProps.notificationList);
  }

  paginationFunct(currentPage, data = []) {
    const { alertsPerPage } = this.state;
    const indexOfLastTodo = currentPage * alertsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - alertsPerPage;
    const notificationList = data.slice(indexOfFirstTodo, indexOfLastTodo);
    this.setState({ notificationList, currentPage, totalLength: data.length });
  }

  mountPageBlocks() {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.totalLength / this.state.alertsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          onClick={() => this.handleClick(number)}
          style={{
            backgroundColor: this.state.currentPage === number ? `#DDD` : ""
          }}
        >
          {number}
        </li>
      );
    });

    return renderPageNumbers;
  }

  render() {
    return (
      <div style={{ padding: "15px" }}>
        <h1>Notificações</h1>
        {this.props.loading ? (
          <div style={{ padding: "25vh" }}>
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            {this.state.notificationList.map((item, index) => {
              let splitName = item.name.split(",");
              let data = splitName.map(name => {
                return {
                  name: name
                };
              });
              return (
                <React.Fragment key={index}>
                  {item.isClientEmail ? (
                    <FakeExpand>
                      <div>
                        O cliente {data[0].name} se tornou um funcionário
                        publico
                      </div>
                      <div>
                        Notificação enviada para {item.sentTo} em {item.sentAt}
                      </div>
                    </FakeExpand>
                  ) : (
                    <ExpansionPanelStyled>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          Existem {splitName.length} clientes em potencial na
                          atualização de {item.sentAt}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetailsStyled>
                        <div style={{ width: "100%" }}>
                          <EnhancedTable
                            dataAtualizacao={item.sentAt}
                            dados={data}
                          />
                        </div>
                      </ExpansionPanelDetailsStyled>
                    </ExpansionPanelStyled>
                  )}
                </React.Fragment>
              );
            })}
            <UlStyled id="page-numbers">{this.mountPageBlocks()}</UlStyled>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationList: state.notificationReducer.notificationList,
  loading: state.notificationReducer.loading
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
