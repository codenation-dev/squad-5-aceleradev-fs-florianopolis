import React from "react";

import ChartsPanel from "../../components/charts/chartsPanel";
import { authGet } from "../../utils/api";
import Card from "../../components/dashboard/Card";
import ClientsPanel from "../../components/dashboard/ClientsPanel";
import CandidatePanel from "../../components/dashboard/CandidatePanel";

import "./dashboard.css";

const Dashboard = () => {
  (async () => console.log(await authGet("/clients")))();
  return (
    <div className="dashboard-div">
      <h1>Dashboard</h1>

      <hr />

      <Card title="Clientes da Uati">
        <ClientsPanel />
      </Card>

      <Card title="Candidatos a clientes">
        <CandidatePanel />
      </Card>

      <Card title="Gráficos">
        <ChartsPanel />
      </Card>

      <div>&nbsp;</div>
    </div>
  );
};

export default Dashboard;
