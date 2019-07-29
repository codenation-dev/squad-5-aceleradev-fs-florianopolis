import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCharts } from "../../redux/actions";

import ChartNotifications from "./ChartNotifications";

class ChartsPanel extends Component {
  componentDidMount() {
    this.props.loadCharts();
  }

  render() {
    const { notificationsSentPerDay } = this.props;

    if (!notificationsSentPerDay) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div className='charts'>
        <ChartNotifications data={notificationsSentPerDay} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notificationsSentPerDay: state.chartReducer.notificationsSentPerDay,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadCharts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPanel);
