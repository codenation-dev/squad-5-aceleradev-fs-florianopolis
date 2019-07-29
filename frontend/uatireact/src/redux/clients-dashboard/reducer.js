import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  clients: [],
  pageNumber: 1,
  totalClients: 0,
  query: "",
  err: ""
};

function ClientsDashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.CLIENTS.SUCCESS:
      return {
        ...state,
        clients: action.payload.clients,
        pageNumber: action.payload.pageNumber,
        total: action.payload.total,
        totalSearch: action.payload.totalSearch,
        err: ""
      };
    case ActionTypes.CLIENTS.FAILURE:
      return {
        ...state,
        clients: [],
        pageNumber: 1,
        total: 0,
        query: "",
        err: action.payload.err
      };
    default:
      return state;
  }
}

export default ClientsDashboard;
