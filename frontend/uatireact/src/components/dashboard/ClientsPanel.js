import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadClients } from "../../redux/actions";

class ClientsPanel extends Component {
constructor(props) {
  super(props);

  this.state = {
    clients: [],
    pageNumber: 1,
    totalClients: 0,
    query: "",
    err: ""
  }
}

  componentDidMount() {
    this.props.loadClients();
  }

  render() {
    const { clients, pageNumber, totalClients, query, err } = this.props;

    if (err) {
      return <div>{err}</div>;
    }

    if (clients.length === 0) {
      return <div>No clients found</div>;
    }

    return <div>
      <ul>
        {clients.map(c => <li>{c}</li>)}
      </ul>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clientsDashboardReducer.clients,
    pageNumber: state.clientsDashboardReducer.pageNumber,
    totalClients: state.clientsDashboardReducer.totalClients,
    query: state.clientsDashboardReducer.query,
    err: state.clientsDashboardReducer.err
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadClients }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsPanel);
