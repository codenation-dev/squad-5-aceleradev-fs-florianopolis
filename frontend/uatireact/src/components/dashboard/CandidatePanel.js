import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCharts } from "../../redux/actions";

class CandidatePanel extends Component {
  componentDidMount() {
    //this.props.loadCharts();
  }

  render() {
    return <div>Lista de clientes</div>;
  }
}

const mapStateToProps = state => {
  //return {
  //  clients: state.clientsReducer.clients
  //};
};

const mapDispatchToProps = dispatch => {};
//bindActionCreators({ loadClients }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidatePanel);
