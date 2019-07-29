import { ActionTypes } from '../actions';

const INITIAL_STATE = {
  successful: false,
  loading: false,
  error: false,
  clientsRelation: [],
  notificationsSentPerDay: [],
  avgSalaries: {},
  clientsSalary: {}
};

function Charts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SALARIES_AVG.REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.SALARIES_AVG.SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        successful: true
      };
    case ActionTypes.CHART.SUCCESS:
      return {
        ...state,
        successful: true,
        loading: false,
        clientsRelation: action.payload.clientsRelation,
        notificationsSentPerDay: action.payload.notificationsSentPerDay,
        averageWage: action.payload.averageWage
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
