import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  successful: false,
  clientsRelation: [],
  notificationsSentPerDay: []
};

function Charts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_LOAD_CHARTS:
      return {
        ...state,
        successful: true,
        clientsRelation: action.payload.clientsRelation,
        notificationsSentPerDay: action.payload.notificationsSentPerDay,
        newClientsPerDay: action.payload.newClientsPerDay
      };
    default:
      return state;
  }
}

export default Charts;
