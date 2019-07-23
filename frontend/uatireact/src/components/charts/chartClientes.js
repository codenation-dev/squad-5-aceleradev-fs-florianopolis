import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from 'react-redux'
import { loadCharts } from '../../redux/actions'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class BarChartClientes extends Component {

  componentDidMount() {
    this.props.loadCharts();
  }

  renderChart = (data) => {
    console.log(data);

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
        <Bar dataKey="quantity" stackId="a" fill="#8884d8" />
      </BarChart>
    )
  }

  render() {  
    return (
      <div>
        <h1>Relação entre clientes e potenciais candidatos</h1>
        <div>
          {this.renderChart(this.props.clientsRelation)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    clientsRelation: state.chartReducer.clientsRelation
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadCharts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BarChartClientes);