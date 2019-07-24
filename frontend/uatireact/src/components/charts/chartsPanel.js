import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCharts } from "../../redux/actions";

import BarChartClients from "./chartClientes";
import ChartNotifications from "./chartNotifications";

class ChartsPanel extends Component {
  componentDidMount() {
    this.props.loadCharts();
  }

  render() {
    const { clientsRelation, notificationsSentPerDay } = this.props;

    if (!clientsRelation) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div>
        <BarChartClients data={clientsRelation} />
        <ChartNotifications data={notificationsSentPerDay} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientsRelation: state.chartReducer.clientsRelation,
    notificationsSentPerDay: state.chartReducer.notificationsSentPerDay
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadCharts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPanel);
