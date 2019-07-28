import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadClients } from "../../../redux/actions";
import "./searchForm.css";

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

  handleSearch = e => {};

  handlePreviousPage = e => {};

  handleNextPage = e => {};

  componentDidMount() {
    this.props.loadClients(this.state.query, this.state.pageNumber);
  }

  render() {
    const { clients, pageNumber, total, query, err } = this.props;

    if (err) {
      return <div>{err}</div>;
    }

    if (clients.length === 0) {
      return <div>No data found</div>;
    }

    return (
      <div className="search-form">
        <div className="title">
          Total de Clientes: {total}
        </div>

        <div className="search-field">
          <input
            name="search"
            type="text"
            value={query}
            placeholder="Pesquisar..."
            onChange={this.handleSearch}
          />
        </div>

        <div className="search-data-header">
          <div>
            <b>Nome do cliente</b>
          </div>
        </div>

        <div className="search-data">
          {clients.map(d => (
            <div className="search-data-item">{d}</div>
          ))}
        </div>

        <div className="paginator">
          <input
            name="previous"
            type="button"
            value="Anterior"
            onChange={this.handlePreviousPage}
          />
          <input
            name="next"
            type="button"
            value="Próxima"
            onChange={this.handleNextPage}
          />
        </div>
        
        <div className="pageNumber">
          <div>
            {pageNumber * 10 - 10} - {pageNumber * 10}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clientsDashboardReducer.clients,
    pageNumber: state.clientsDashboardReducer.pageNumber,
    total: state.clientsDashboardReducer.totalClients,
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
