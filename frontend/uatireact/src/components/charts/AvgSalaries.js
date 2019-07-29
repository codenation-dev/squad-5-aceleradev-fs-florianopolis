import React, { Component } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import './chart.css';

class ChartNotifications extends Component {
  renderChart = data => {
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
        <Bar
          dataKey="salary"
          name="Média de Salario R$"
          stackId="a"
          fill="#8884d8"
        />
      </BarChart>
    );
  };

  render() {
    return (
      <div>
        <h1>Medias de Salario</h1>
        <div className="chart">{this.renderChart(this.props.avgSalaries)}</div>
      </div>
    );
  }
}

export default ChartNotifications;
