import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  successful: false,
  loading: false,
  error: false,
  clientsRelation: [],
  notificationsSentPerDay: []
};

function Charts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.SUCCESS:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.CHART.SUCCESS:
      return {
        ...state,
        successful: true,
        loading: false,
        clientsRelation: action.payload.clientsRelation,
        notificationsSentPerDay: action.payload.notificationsSentPerDay,
        newClientsPerDay: action.payload.newClientsPerDay
      };
    case ActionTypes.LOGIN.FAILURE:
      return {
        ...state,
        loading: true,
        error: true,
        text: action.payload.text
      };
    default:
      return state;
  }
}

export default Charts;
