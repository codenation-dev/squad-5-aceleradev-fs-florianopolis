import React from "react";
import ChartsPanel from "../../components/charts/ChartsPanel";
import Card from "../../components/dashboard/Card";
import ClientsPanel from "../../components/dashboard/panels/ClientsPanel";
import CandidatePanel from "../../components/dashboard/panels/CandidatePanel";
import { get } from "../../utils/api";

import "./dashboard.css";

const Dashboard = () => {
  (async () => console.log(await get("clients", true)))();

  return (
    <div className="dashboard-div">
      <h1>Dashboard</h1>

      <hr />

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
};

export default Dashboard;
