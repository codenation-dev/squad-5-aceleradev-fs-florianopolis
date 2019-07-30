import React, { Component } from "react";
import { bindActionCreators } from "redux";
import SalariesChart from "../../components/charts/AvgSalaries";
import ClientsSalariesChart from "../../components/charts/ClientsSalaries";

import { connect } from "react-redux";
import * as allActions from "../../redux/actions";

import ChartNotifications from "./ChartNotifications";

class ChartsPanel extends Component {
  getSalariesChartArray = () => {
    const { avgSalaries } = this.props;
    const salariesArray = [];

    const mediaClientes = {
      name: "Media de salarios de clientes",
      salary: avgSalaries.avgClientsSalary.toFixed(2)
    };
    salariesArray.push(mediaClientes);

    const mediaEspeciais = {
      name: "Media de salarios de pessoas de interesse",
      salary: avgSalaries.avgSpecialsSalary.toFixed(2)
    };
    salariesArray.push(mediaEspeciais);

    const mediaClientesEspecias = {
      name: "Media de salarios de clientes especiais",
      salary: avgSalaries.avgSpecialClientsSalary.toFixed(2)
    };
    salariesArray.push(mediaClientesEspecias);

    return salariesArray;
  };

  getClientsSalaryArray = () => {
    const { clientsSalary } = this.props;
    const salariesArray = [];

    const sub5 = {
      name: "Até 5 mil reais",
      salary: clientsSalary.sub5
    };
    salariesArray.push(sub5);

    const sub10 = {
      name: "Até 10 mil reais",
      salary: clientsSalary.sub10
    };
    salariesArray.push(sub10);

    const sub15 = {
      name: "Até 15 mil reais",
      salary: clientsSalary.sub15
    };
    salariesArray.push(sub15);

    const sub20 = {
      name: "Até 20 mil reais",
      salary: clientsSalary.sub20
    };
    salariesArray.push(sub20);

    const over20 = {
      name: "Mais de 20 mil reais",
      salary: clientsSalary.over20
    };
    salariesArray.push(over20);

    return salariesArray;
  };

  async componentDidMount() {
    await this.props.loadCharts();
    await this.props.getAvgSalaries();
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
      <div className="charts">
        {this.props.avgSalaries.OverClientsAvgSpecials && (
          <SalariesChart avgSalaries={this.getSalariesChartArray()} />
        )}

        {this.props.clientsSalary.sub5 && (
          <ClientsSalariesChart salaries={this.getClientsSalaryArray()} />
        )}

        <ChartNotifications data={notificationsSentPerDay} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notificationsSentPerDay: state.chartReducer.notificationsSentPerDay,
    avgSalaries: state.chartReducer.avgSalaries,
    clientsSalary: state.chartReducer.clientsSalary
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsPanel);
