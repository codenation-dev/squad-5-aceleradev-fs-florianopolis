import React from "react";
import { Button } from "@material-ui/core";
import { Form, NomeFile } from "./styles";

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
    // this.fileUpload(this.state.file).then((response)=>{
    // console.log(response.data);
    // })
  }
  onChange(e) {
    this.setState({
      file: e.target.files[0],
      nomeFile: e.target.files[0].name
    });
  }
  fileUpload(file) {
    const url = "http://example.com/file-upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
  }

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
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
      </Form>
    );
  }
}

export default ImportPage;
