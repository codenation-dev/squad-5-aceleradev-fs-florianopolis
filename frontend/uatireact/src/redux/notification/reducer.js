import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  notificationList: [],
  loading: false,
  error: false
};

function Notification(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ATTEMPT_NOTIFICATION:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.SUCCESS_ATTEMPT_NOTIFICATION:
      return {
        ...state,
        notificationList: action.payload.notificationList,
        loading: false,
        error: false
      };
    case ActionTypes.FAILURE_ATTEMPT_NOTIFICATION:
      return {
        ...state,
        notificationList: [],
        loading: false,
        error: true
      };
    default:
      return state;
  }
}

export default Notification;
