import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadClients } from "../../../redux/actions";
import "./searchForm.css";

const WAIT_INTERVAL = 1000;

class ClientsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    }
  }

  handleSearch = e => {
    clearTimeout(this.timer);
    this.setState({searchText: e.target.value});

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  triggerChange = () => {
    this.props.loadClients(this.state.searchText, this.props.pageNumber);
  };

  handlePreviousPage = () => {
    const newPageNumber = this.props.pageNumber > 1? this.props.pageNumber - 1 : 1;
    this.props.loadClients(this.state.searchText, newPageNumber);
  };

  handleNextPage = () => {
    const newPageNumber = this.props.clients.length === 10? this.props.pageNumber + 1 : this.props.pageNumber;
    this.props.loadClients(this.state.searchText, newPageNumber);
  };

  componentDidMount() {
    this.props.loadClients("", 1);
  }

  componentWillMount() {
    this.timer = null;
  }

  render() {
    const { clients, pageNumber, total, totalSearch, err } = this.props;

    if (err) {
      return <div>{err}</div>;
    }

    if (clients.length === 0) {
      return <div>No data found</div>;
    }

    const startingPage = pageNumber * 10 - 10;
    const endPage = pageNumber * 10 > totalSearch? totalSearch : pageNumber * 10;

    return (
      <div className="search-form">
        <div className="title">
          Total de Clientes: {total}
        </div>

        <div className="search-field">
          <input
            name="search"
            type="text"
            value={this.state.query}
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
          {clients.map((d, i) => (
            <div className="search-data-item" key={i}> {d.name}</div>
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
            {startingPage} - {endPage} (Total: {totalSearch})
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
    totalSearch: state.clientsReducer.totalSearch,
    err: state.clientsReducer.err
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadClients }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsPanel);
