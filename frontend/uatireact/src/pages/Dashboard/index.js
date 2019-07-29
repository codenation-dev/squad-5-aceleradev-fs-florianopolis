import React, { Component } from 'react';
import ChartsPanel from '../../components/charts/ChartsPanel';
import SalariesChart from '../../components/charts/AvgSalaries';
import ClientsSalariesChart from '../../components/charts/ClientsSalaries';

import Card from '../../components/dashboard/Card';
import ClientsPanel from '../../components/dashboard/panels/ClientsPanel';
import CandidatePanel from '../../components/dashboard/panels/CandidatePanel';
import { get } from '../../utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allActions from '../../redux/actions';

import './dashboard.css';

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getAvgSalaries();
  }

  getSalariesChartArray = () => {
    const { avgSalaries } = this.props;
    const salariesArray = [];
    const mediaClientes = {
      name: 'Media de salarios de clientes',
      salary: avgSalaries.avgClientsSalary.toFixed(2)
    };
    salariesArray.push(mediaClientes);
    const mediaEspeciais = {
      name: 'Media de salarios de pessoas de interesse',
      salary: avgSalaries.avgSpecialsSalary.toFixed(2)
    };
    salariesArray.push(mediaEspeciais);
    const mediaClientesEspecias = {
      name: 'Media de salarios de clientes especiais',
      salary: avgSalaries.avgSpecialClientsSalary.toFixed(2)
    };
    salariesArray.push(mediaClientesEspecias);

    return salariesArray;
  };

  getClientsSalaryArray = () => {
    const { clientsSalary } = this.props;
    const salariesArray = [];
    const sub5 = {
      name: 'Até 5 mil reais',
      salary: clientsSalary.sub5
    };
    salariesArray.push(sub5);
    const sub10 = {
      name: 'Até 10 mil reais',
      salary: clientsSalary.sub10
    };
    salariesArray.push(sub10);
    const sub15 = {
      name: 'Até 15 mil reais',
      salary: clientsSalary.sub15
    };
    salariesArray.push(sub15);
    const sub20 = {
      name: 'Até 20 mil reais',
      salary: clientsSalary.sub20
    };
    salariesArray.push(sub20);
    const over20 = {
      name: 'Mais de 20 mil reais',
      salary: clientsSalary.over20
    };
    salariesArray.push(over20);
    return salariesArray;
  };

  render() {
    (async () => console.log(await get('clients', true)))();
    return (
      <div className="dashboard-div">
        <h1>Dashboard</h1>

        <hr />
        {this.props.avgSalaries.OverClientsAvgSpecials && (
          <SalariesChart avgSalaries={this.getSalariesChartArray()} />
        )}
        {this.props.clientsSalary.sub5 && (
          <ClientsSalariesChart salaries={this.getClientsSalaryArray()} />
        )}
        <Card title="Clientes da Uati">
          <ClientsPanel />
        </Card>

        <Card title="20 Candidatos com os maiores salários">
          <CandidatePanel />
        </Card>

        <Card title="Gráficos">
          <ChartsPanel />
        </Card>

        <div>&nbsp;</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  avgSalaries: state.chartReducer.avgSalaries,
  clientsSalary: state.chartReducer.clientsSalary
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
