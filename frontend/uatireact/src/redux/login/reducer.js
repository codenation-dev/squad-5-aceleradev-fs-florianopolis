import { ActionTypes } from "../actions";
import { isLogged, isSuper } from "../../helpers/auth";

const INITIAL_STATE = {
  credentials: [],
  loggedUser: {
    name: localStorage.getItem("userName")
      ? localStorage.getItem("userName")
      : "",
    token: localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : ""
  },
  loading: false,
  isLogged: isLogged(),
  isSuper: isSuper(),
  success: false,
  error: false,
  errorText: ""
};

function Login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.REQUEST:
      return {
        ...state,
        credentials: action.payload.credentials,
        loading: true,
        text: "Carregando.."
      };
    case ActionTypes.LOGIN.SUCCESS:
      return {
        ...state,
        loggedUser: action.payload.loggedUser,
        credentials: [],
        loading: false,
        isLogged: true,
        isSuper: isSuper(),
        success: true,
        text: ""
      };
    case ActionTypes.LOGIN.FAILURE:
      return {
        ...state,
        loggedUser: [],
        credentials: [],
        loading: false,
        isLogged: false,
        error: true,
        text: action.payload.text
      };
    case ActionTypes.LOGOUT.REQUEST:
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
