import React from "react";
import { Button } from "@material-ui/core";
import { Form, NomeFile } from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";
import DragAndDrop from '../../components/DragAndDrop';

class ImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      nomeFile: ""
    };
  }
  onFormSubmit() {
    // e.preventDefault(); // Stop form submit
    this.props.importClients(this.state.file);
  }

  limpaFile(){
    this.setState({file: null, nomeFile: ""});
    this.props.resetFile();
  }
  onChange(e) {
    if(e.target.files[0]){
      this.setState({
        file: e.target.files[0],
        nomeFile: e.target.files[0].name
      });
      this.props.selectFile(e.target.files[0]);
    }
  }

  handleDrop = (files) => {
    if(files[0]){
      this.setState({
        file: files[0],
        nomeFile: files[0].name
      });
    }
  }

  componentWillReceiveProps(newProps) {
    const { success } = newProps;
    if (success) {
      this.setState({nomeFile: "", file: null});
    }
  }
  
  SubmitButton = React.forwardRef((props, ref) => <button {...props} ref={ref}  type='submit' />);
  render() {
    
    return (
      <Form>
        <h1>File Upload</h1>
        <h1>Arquivo enviado com sucesso</h1>
        <div>
          <DragAndDrop handleDrop={this.handleDrop}>
            <div style={{height: 300, width: 650}}>
                <NomeFile>{this.state.nomeFile}</NomeFile>
            </div>
          </DragAndDrop>        
        </div>
        <div>
            <small>ou selecione por aqui </small>
          <Button  color="primary" variant="contained" component="label">
            Upload File
            <input
              type="file"
              onChange={e => this.onChange(e)}
              style={{ display: "none" }}
            />
          </Button>
          <Button disabled={this.state.nomeFile === ""} style={{marginLeft: "15px"}} onClick={() => { if (window.confirm('Tem certeza que deseja fazer o upload desta planilha?')) this.onFormSubmit() } } variant="contained" >Enviar</Button>          
          <Button style={{marginLeft: "15px"}} color="secondary" onClick={() => this.limpaFile()} variant="contained" >Limpar</Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  success: state.importReducer.success
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportPage);
