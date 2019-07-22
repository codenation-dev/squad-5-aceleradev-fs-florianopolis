import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";
import { localizationSettings } from "../../helpers/tableSettings";

class User extends Component {
  state = {
    columns: [
      { title: "Email", field: "email" },
      {
        title: "Super Usuário",
        field: "superUser",
        lookup: { 0: "Não", 1: "Sim" }
      }
    ],
    data: [
      { email: "admin@admin.com", superUser: 1 },
      { email: "xuerei@teste.com", superUser: 0 }
    ]
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <MaterialTable
        title="Usuários do sistema"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.push(newData);
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
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

// const mapStateToProps = state => ({
//   success: state.loginReducer.success,
//   error: state.loginReducer.error,
//   msg: state.loginReducer.text
// });

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(User);
