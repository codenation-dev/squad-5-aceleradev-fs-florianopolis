import { ActionTypes } from "../actions";
import { isLogged } from "../../helpers/auth";

const INITIAL_STATE = {
  credentials: [],
  loggedUser: [],
  loading: false,
  isLogged: isLogged(),
  success: false,
  error: false,
  errorText: ""
};

function Login(state = INITIAL_STATE, action) {
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
      localStorage.removeItem("userToken");
      return {
        ...state,
        isLogged: false,
        loggedUser: []
      };
    default:
      return state;
  }
}

export default Login;
