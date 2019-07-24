import React from "react";
import * as allActions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ImportPage extends React.Component {
  handleChange = event => {
    this.setState({
      csv: event.target.files[0]
    });
  };

  handleSubmit = () => {
    let formData = new FormData();
    formData.append("file", this.state.csv);

    this.props.uploadClients(formData);
  };

  render() {
    return (
      <div>
        <h1>Submit your clients.csv file</h1>
        <form onSubmit={() => this.handleSubmit()}>
          <input
            type="file"
            name="file"
            label="Upload CSV"
            placeholder="UploadCSV..."
            onChange={e => this.handleChange(e)}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ImportPage);
