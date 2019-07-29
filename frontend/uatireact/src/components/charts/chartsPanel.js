import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCharts } from "../../redux/actions";

import BarChartClients from "./ChartClientes";
import ChartNotifications from "./ChartNotifications";
import ChartNewClients from "./ChartNewClientsPerDay"

class ChartsPanel extends Component {
  componentDidMount() {
    this.props.loadCharts();
  }

  render() {
    const { clientsRelation, notificationsSentPerDay, newClientsPerDay } = this.props;

    if (!clientsRelation) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div className='charts'>
        <BarChartClients data={clientsRelation} />
        <ChartNotifications data={notificationsSentPerDay} />
        <ChartNewClients data={newClientsPerDay} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientsRelation: state.chartReducer.clientsRelation,
    notificationsSentPerDay: state.chartReducer.notificationsSentPerDay,
    newClientsPerDay: state.chartReducer.newClientsPerDay
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadCharts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPanel);
