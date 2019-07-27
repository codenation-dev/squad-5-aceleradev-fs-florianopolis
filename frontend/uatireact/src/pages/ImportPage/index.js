import React from "react";
import { Button } from "@material-ui/core";
import { Form, NomeFile, SuccessWarn, ErrorWarn } from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";
import DragAndDrop from '../../components/DragAndDrop';

class ImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      nomeFile: "",
      success: false,
      error: false
    };
    this.input = React.createRef();
  }
  onFormSubmit() {
    this.props.importClients(this.state.file);
    this.timeoutWarn();
    this.limpaFile();
  }

  limpaFile(){
    this.setState({file: null, nomeFile: ""});
    this.input.current.value = "";
    this.props.resetFile();
  }
  onChange(e) {
    this.handleFile(e.target.files[0]);
  }

  handleDrop = (file) => {
    this.handleFile(file[0]);
  }

  handleFile = (file) =>{
    let splitName = file.name.split(".");

    if(splitName[1] === "csv"){      
      this.setState({success: false, error: false});
      if(file){
        this.setState({
          file: file,
          nomeFile: file.name
        });
        this.props.selectFile(file)
      }
    }else{
      this.setState({success: false, error: true})
      this.timeoutWarn();
    }
  }
  
  timeoutWarn(){
    setTimeout(() => {
      this.setState({success: false, error: false});
    }, 7000);
  }

  componentWillReceiveProps(newProps) {
    const { success } = newProps;
    if (success) {
      this.setState({nomeFile: "", file: null, success});
    }
  }

  
  SubmitButton = React.forwardRef((props, ref) => <button {...props} ref={ref}  type='submit' />);
  render() {
    
    return (
      <Form>
        <h1>File Upload</h1>
        {this.state.error && <ErrorWarn>O arquivo selecionado não é um CSV</ErrorWarn>}
        {this.state.success && <SuccessWarn>Arquivo enviado com sucesso</SuccessWarn>}
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
              ref={this.input}
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
