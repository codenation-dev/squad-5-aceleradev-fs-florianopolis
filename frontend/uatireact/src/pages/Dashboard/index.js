import React, { Component } from 'react';
import ChartsPanel from '../../components/charts/ChartsPanel';
import SalariesChart from '../../components/charts/AvgSalaries';
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

  render() {
    (async () => console.log(await get('clients', true)))();
    return (
      <div className="dashboard-div">
        <h1>Dashboard</h1>

        <hr />
        {this.props.avgSalaries.OverClientsAvgSpecials && (
          <SalariesChart avgSalaries={this.getSalariesChartArray()} />
        )}
        <Card title="Clientes da Uati">
          <ClientsPanel />
        </Card>

        <Card title="Candidatos a Clientes">
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
  avgSalaries: state.chartReducer.salariesAvg
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
