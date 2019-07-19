import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  credentials: [],
  loggedUser: [],
  loading: false,
  isLogged: false,
  success: false,
  error: false,
  errorText: ""
};

function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_ATTEMPT_LOGIN:
      return {
        ...state,
        credentials: action.payload.credentials,
        loading: true,
        text: "carregando.."
      };
    case ActionTypes.SUCCESS_ATTEMPT_LOGIN:
      return {
        ...state,
        loggedUser: action.payload.loggedUser,
        credentials: [],
        loading: false,
        isLogged: true,
        success: true,
        error: false,
        text: "sucesso"
      };
    case ActionTypes.FAILURE_ATTEMPT_LOGIN:
      return {
        ...state,
        loggedUser: [],
        credentials: [],
        loading: false,
        isLogged: false,
        success: false,
        error: true,
        text: action.payload.text
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
