import React, { Component } from "react";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

import './chart.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class BarChartClients extends Component {

  renderChart = (data) => {
    return (
      <PieChart
        width={1000}
        height={300}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <Pie dataKey="quantity" nameKey="name" name="Quantidade" data={data} fill="#416849" legendType="square" labelLine>
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
        </Pie>
        <Tooltip />
      </PieChart>
    )
  }

  render() {  
    return (
      <div>
        <h1>Relação entre clientes e potenciais candidatos</h1>
        <div className="chart">
          {this.renderChart(this.props.data)}
        </div>
      </div>
    );
  }
}

export default BarChartClients;