import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  userList: [],
  loading: false,
  success: false,
  error: false
};

function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ATTEMPT_USER:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.SUCCESS_ATTEMPT_USER:
      return {
        ...state,
        userList: action.payload.userList,
        loading: false,
        error: false
      };
    case ActionTypes.FAILURE_ATTEMPT_USER:
      return {
        ...state,
        userList: [],
        loading: false,
        error: true
      };

    case ActionTypes.REQUEST_SIGN_USER:
      return {
        ...state,
        credentials: action.payload.credentials,
        loading: true
      };
    case ActionTypes.SUCCESS_SIGN_USER:
      return {
        ...state,
        success: true
      };
    case ActionTypes.FAILURE_SIGN_USER:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}

export default User;
