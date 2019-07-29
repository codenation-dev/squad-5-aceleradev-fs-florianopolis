import React, { Component } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import './chart.css'
class ChartAverageWage extends Component {

  renderChart = (data) => {
    return (
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" name="Quant. de Clientes Atuais" stackId="a" fill="#347382" />
        <Bar dataKey="newClients" name="Novos Clientes" stackId="a" fill="#6688aa" />
      </BarChart>
    )
  }

  render() {  
    return (
      <div>
        <h1>Média salarial entre diferentes perfis</h1>
        <div className="chart">
          {this.renderChart(this.props.data)}
        </div>
      </div>
    );
  }
}

export default ChartAverageWage;