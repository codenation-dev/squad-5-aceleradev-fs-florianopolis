import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCharts } from "../../redux/actions";

import BarChartClients from "./ChartClientes";
import ChartNotifications from "./ChartNotifications";
import ChartAverageWage from "./ChartAverageWage"

class ChartsPanel extends Component {
  componentDidMount() {
    this.props.loadCharts();
  }

  render() {
    const { clientsRelation, notificationsSentPerDay, averageWage } = this.props;

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
        <ChartAverageWage data={averageWage} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientsRelation: state.chartReducer.clientsRelation,
    notificationsSentPerDay: state.chartReducer.notificationsSentPerDay,
    averageWage: state.chartReducer.averageWage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadCharts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPanel);
