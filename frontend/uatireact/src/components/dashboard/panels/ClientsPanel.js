import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadClients } from "../../../redux/actions";
import "./searchForm.css";

class ClientsPanel extends Component {

  handleSearch = e => {
    console.log(e);
    this.props.loadClients(e.target.value, this.props.pageNumber);
  };

  handlePreviousPage = () => {
    const newPageNumber = this.props.pageNumber > 1? this.props.pageNumber - 1 : 1;
    this.props.loadClients(this.props.query, newPageNumber);
  };

  handleNextPage = () => {
    const newPageNumber = this.props.clients.length === 10? this.props.pageNumber + 1 : this.props.pageNumber;
    this.props.loadClients(this.props.query, newPageNumber);
  };

  componentDidMount() {
    this.props.loadClients("", 1);
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
            onChange={e => this.handleSearch(e)}
          />
        </div>

        <div className="search-data-header">
          <div>
            <b>Nome do cliente</b>
          </div>
        </div>

        <div className="search-data">
          {clients.map(d => (
            <div className="search-data-item" key={d.name}>{d.name}</div>
          ))}
        </div>

        <div className="paginator">
          <input
            name="previous"
            type="button"
            value="Anterior"
            onClick={this.handlePreviousPage}
          />
          <input
            name="next"
            type="button"
            value="Próxima"
            onClick={this.handleNextPage}
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
    clients: state.clientsReducer.clients,
    pageNumber: state.clientsReducer.pageNumber,
    total: state.clientsReducer.total,
    query: state.clientsReducer.query,
    err: state.clientsReducer.err
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadClients }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsPanel);
