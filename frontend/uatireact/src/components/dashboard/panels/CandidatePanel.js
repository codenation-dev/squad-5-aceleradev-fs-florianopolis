import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCandidates } from "../../../redux/actions";

class CandidatePanel extends Component {

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
    this.props.loadCandidates(this.state.query, this.state.pageNumber);
  }

  render() {
    const { candidates, pageNumber, total, query, err } = this.props;

    if (err) {
      return <div>{err}</div>;
    }

    if (candidates.length === 0) {
      return <div>No data found</div>;
    }

    return (
      <div className="search-form">
        <div className="title">
          Total de Candidatos: {total}
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
          <div className="header-nome-candidato">
            <b>Nome do candidato</b>
          </div>
          <div className="header-funcionario">
            <b>Funcionário Público</b>
          </div>
          <div className="header-salario">
            <b>Salário</b>
          </div>
        </div>

        <div className="search-data">
          {candidates.map(d => (
            <div className="search-data-item">
              <div className="nome-candidato">{d.name}</div>
              <div className="funcionario">{d.publico}</div>
              <div className="salario">{d.salary}</div>
            </div>
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
    candidates: state.candidatesReducer.candidates,
    pageNumber: state.candidatesReducer.pageNumber,
    total: state.candidatesReducer.total,
    query: state.candidatesReducer.query,
    err: state.candidatesReducer.err
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadCandidates }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidatePanel);
