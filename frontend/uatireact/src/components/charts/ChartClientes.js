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

class BarChartClients extends Component {

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
        <Bar dataKey="quantity" name="Quantidade" stackId="a" fill="#82ca9d" />
      </BarChart>
    )
  }

  render() {  
    return (
      <div>
        <h1>Relação entre clientes e potenciais candidatos</h1>
        <div>
          {this.renderChart(this.props.data)}
        </div>
      </div>
    );
  }
}

export default BarChartClients;