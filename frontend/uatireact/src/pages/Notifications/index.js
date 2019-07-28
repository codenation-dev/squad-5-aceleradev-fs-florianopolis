import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";

import { EnhancedTable } from "../../components/NotificationTable";

import { ExpansionPanelStyled, ExpansionPanelDetailsStyled, FakeExpand, UlStyled } from "./styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from '@material-ui/core/CircularProgress';

class Notifications extends Component {
  constructor (){
    super();
    this.state ={
      currentPage: 1,
      alertsPerPage: 10,
      notificationList: [],
      totalLength: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(number) {
    this.paginationFunct(number, this.props.notificationList);
  }
  
  componentDidMount() {
    const asyncFunc = async () => {
      await this.props.getNotifications();
    };
    asyncFunc();
    // let names = this.props.notificationList.name.split(",");
  }

  componentWillReceiveProps(nextProps) {
    const newData = nextProps.notificationList.filter(item => {
      return (
        item.clients != null
      );
    });
    
    this.paginationFunct(1, newData);
  }


  paginationFunct(currentPage, data){
    const { alertsPerPage } = this.state;
    const indexOfLastTodo = currentPage * alertsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - alertsPerPage;
    const notificationList = data.slice(indexOfFirstTodo, indexOfLastTodo);
    this.setState({notificationList, currentPage, totalLength: data.length});
  }

  mountPageBlocks(){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.totalLength / this.state.alertsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          onClick={() => this.handleClick(number)}
          style={{backgroundColor: this.state.currentPage === number ? `#DDD` : ""}}
        >
          {number}
        </li>
      );
    });

    return renderPageNumbers;
  }

  render() {
    // let names = this.props.notificationList.name.split(",");
    // console.log(names);
    

    return (
      <div style={{ padding: "15px" }}>
        <h1>Notificações</h1>
        {this.props.loading ? (
          <div style={{padding: "25vh"}}>
            <CircularProgress />
          </div>
        ) : (
        <React.Fragment>
          {this.state.notificationList.map((item, index) => {
            
            return (
              <React.Fragment key={index}>
                {item.isClient ? (
                  <FakeExpand>
                    <Typography>O cliente {item.clients[0].name} se tornou um funcionário publico</Typography>
                  </FakeExpand>
                ) : (
                <ExpansionPanelStyled>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Existem {item.clients.length} clientes em potencial na atualização de {item.sentAt}
                    </Typography>
                  </ExpansionPanelSummary>
                    <ExpansionPanelDetailsStyled>
                      <div style={{ width: "100%" }}>
                        <EnhancedTable dataAtualizacao={item.sentAt} dados={item.clients} />
                      </div>
                    </ExpansionPanelDetailsStyled>
                  </ExpansionPanelStyled>
                )}
                
              </React.Fragment>
            );
          })}
          <UlStyled id="page-numbers">
              {this.mountPageBlocks()}
          </UlStyled>
        </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationList: state.notificationReducer.notificationList,
  loading: state.notificationReducer.loading
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
