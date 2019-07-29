import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { loadCandidates } from "../../../redux/actions";

class CandidatePanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      err: ""
    };
  }
  
  handleSearch = e => {};

  handlePreviousPage = e => {};

  handleNextPage = e => {};

  componentDidMount() {
    this.props.loadCandidates();
  }

  render() {
    const { candidates, err } = this.props;

    if (err) {
      return <div>{err}</div>;
    }

    if (candidates.length === 0) {
      return <div>No data found</div>;
    }

    return (
      <div className="search-form">
        <div className="search-data-header">
          <div className="header-nome-candidato">
            <b>Nome do candidato</b>
          </div>
          <div className="header-is-cliente">
            <b>Cliente</b>
          </div>
          <div className="header-salario">
            <b>Salário (R$)</b>
          </div>
        </div>

        <div className="search-data">
          {candidates.map((d, i) => (
            <div className="search-data-item" key={i}>
              <div className="nome-candidato">{d.name}</div>
              <div className="is-cliente">{d.isClient? 'Sim' : 'Não'}</div>
              <div className="salario">{parseFloat(Math.round(d.salary * 100) / 100).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candidates: state.candidatesReducer.candidates,
    err: state.candidatesReducer.err
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadCandidates }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidatePanel);
