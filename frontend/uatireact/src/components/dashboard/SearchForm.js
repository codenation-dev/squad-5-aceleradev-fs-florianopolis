import React, { Component } from "react";

class SearchForm extends Component {
    handleSearch = (e) => {

    }

    handlePreviousPage = (e) => {

    }

    handleNextPage = (e) => {

    }

  render() {
    const { data, pageNumber, total, query, err } = this.props;

    if (err) {
      return <div>{err}</div>;
    }

    if (data.length === 0) {
      return <div>No data found</div>;
    }

    return (
      <div>
        <div>
            Total: {total}
        </div>
        <div>
            <input
              name="search"
              type="text"
              value={query}
              placeholder="Pesquisar..."
              onChange={this.handleSearch}
            />
        </div>
        <div>
            <ul>
                {data.map(d => (<li>{d}</li>))}
            </ul>
        </div>
        <div>
            Página: {pageNumber}
        </div>
        <div>
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
      </div>
    );
  }
}

export default SearchForm;
