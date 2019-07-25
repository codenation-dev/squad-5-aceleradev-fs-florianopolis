import React from "react";
import { Button } from "@material-ui/core";
import { Form, NomeFile } from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";

class ImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      nomeFile: "Nenhum arquivo selecionado "
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.props.importClients(this.state.file);
  }
  onChange(e) {
    this.setState({
      file: e.target.files[0],
      nomeFile: e.target.files[0].name
    });
  }

  render() {
    return (
      <Form onSubmit={e => this.onFormSubmit(e)}>
        <h1>File Upload</h1>
        {/* <Input type="file" onChange={this.onChange} />
        <Button type="submit">Upload</Button> */}
        <NomeFile>{this.state.nomeFile}</NomeFile>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            onChange={this.onChange}
            style={{ display: "none" }}
          />
        </Button>

        <button type="submit">Enviar</button>
      </Form>
    );
  }
}

// const mapStateToProps = state => ({
//   notificationList: state.notificationReducer.notificationList
// });

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ImportPage);
