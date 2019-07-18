import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  credentials: [],
  loggedUser: [],
  loading: false,
  isLogged: false,
  success: false,
  error: false
};

function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ATTEMPT_LOGIN:
      return {
        ...state,
        credentials: action.payload.credentials,
        loading: true
      };
    case ActionTypes.SUCCESS_ATTEMPT_LOGIN:
      return {
        ...state,
        loggedUser: action.payload.loggedUser,
        credentials: [],
        loading: false,
        isLogged: true,
        success: true,
        error: false
      };
    case ActionTypes.FAILURE_ATTEMPT_LOGIN:
      return {
        ...state,
        loggedUser: [],
        credentials: [],
        loading: false,
        isLogged: false,
        success: false,
        error: true
      };
    case ActionTypes.REQUEST_LOGOUT:
      return {
        state: INITIAL_STATE
      };
    default:
      return state;
  }
}

export default User;
