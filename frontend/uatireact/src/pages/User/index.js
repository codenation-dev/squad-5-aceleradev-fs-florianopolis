import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";
import { localizationSettings } from "../../helpers/tableSettings";

class User extends Component {
  state = {
    columns: [
      { title: "Nome", field: "name" },
      { title: "Email", field: "email" },
      {
        title: "Senha",
        field: "password"
      }
    ],
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <MaterialTable
        title="Usuários do sistema"
        columns={this.state.columns}
        data={this.props.userList}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.props.userList];
                data.push(newData);
                this.props.cadastraUser(newData);
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.props.userList];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.props.userList];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state, data });
              }, 600);
            })
        }}
        localization={localizationSettings}
      />
    );
  }
}

const mapStateToProps = state => ({
  userList: state.userReducer.userList
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
