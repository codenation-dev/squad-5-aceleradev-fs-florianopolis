import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadClients } from "../../redux/actions";
import SearchForm from "./SearchForm";

class ClientsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      pageNumber: 1,
      totalClients: 0,
      query: "",
      err: ""
    };
  }

  componentDidMount() {
    this.props.loadClients();
  }

  render() {
    const {
      clients,
      pageNumber,
      totalClients,
      query,
      err,
      loadClients
    } = this.props;

    return (
      <SearchForm
        data={clients}
        pageNumber={pageNumber}
        total={totalClients}
        query={query}
        err={err}
        loadData={loadClients}
      />
    );
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
