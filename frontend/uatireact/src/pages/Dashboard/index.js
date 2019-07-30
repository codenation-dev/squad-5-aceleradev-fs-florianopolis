import React, { Component } from 'react';
import ChartsPanel from '../../components/charts/ChartsPanel';

import Card from '../../components/dashboard/Card';
import ClientsPanel from '../../components/dashboard/panels/ClientsPanel';
import CandidatePanel from '../../components/dashboard/panels/CandidatePanel';
import { get } from '../../utils/api';

import './dashboard.css';

class Dashboard extends Component {

  render() {
    (async () => console.log(await get('clients', true)))();
    return (
      <div className="dashboard-div">
        <h1 className="title-dashboard"> Dashboard</h1>

        <hr className="hr-dashboard" />

        <Card title="Gráficos">
          <ChartsPanel />
        </Card>

        <Card title="Lista dos 20 candidatos com os maiores salários">
          <CandidatePanel />
        </Card>

        <Card title="Clientes da Uati">
          <ClientsPanel />
        </Card>

        <div>&nbsp;</div>
      </div>
    );
  }
}


export default Dashboard;
