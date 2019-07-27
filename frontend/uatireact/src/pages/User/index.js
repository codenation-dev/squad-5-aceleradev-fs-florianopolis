import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";
import { localizationSettings } from "../../helpers/tableSettings";
import CircularProgress from '@material-ui/core/CircularProgress';

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
    data: []
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading ? (
          <div style={{padding: "25vh"}}>
            <CircularProgress />
          </div>
        ) : (
          <MaterialTable
            title="Usuários do sistema"
            columns={this.state.columns}
            data={this.state.data.length > 0 ? this.state.data : this.props.userList}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    this.props.cadastraUser(newData);
                    const data = [...this.props.userList];
                    delete newData.password;
                    data.push(newData);
                    this.setState({ ...this.state, data });
                  }, 600);
                }),
              // onRowUpdate: (newData, oldData) =>
              //   new Promise(resolve => {
              //     setTimeout(() => {
              //       resolve();
              //       const data = [...this.props.userList];
              //       data[data.indexOf(oldData)] = newData;
              //       this.setState({ ...this.state, data });
              //     }, 600);
              //   }),
              // onRowDelete: oldData =>
              //   new Promise(resolve => {
              //     setTimeout(() => {
              //       resolve();
              //       const data = [...this.props.userList];
              //       data.splice(data.indexOf(oldData), 1);
              //       this.setState({ ...this.state, data });
              //     }, 600);
              //   })
            }}
            
            options={{pageSize: 15}}
            localization={localizationSettings}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userList: state.userReducer.userList,
  loading: state.userReducer.loading
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
