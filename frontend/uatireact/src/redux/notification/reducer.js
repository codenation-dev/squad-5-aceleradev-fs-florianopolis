import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  notificationList: [],
  loading: false,
  success: false,
  error: false
};

function Notification(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.NOTIFICATION.REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.NOTIFICATION.SUCCESS:
      return {
        ...state,
        notificationList: action.payload.notificationList,
        loading: false,
        success: true
      };
    case ActionTypes.NOTIFICATION.FAILURE:
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
