import { ActionTypes } from "../actions";
import { isLogged } from "../../helpers/auth";

const INITIAL_STATE = {
  credentials: [],
  loggedUser: {
    email: localStorage.getItem("userEmail")
      ? localStorage.getItem("userEmail")
      : "",
    token: localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : ""
  },
  loading: false,
  isLogged: isLogged(),
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
        text: "carregando.."
      };
    case ActionTypes.LOGIN.SUCCESS:
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
    case ActionTypes.LOGIN.FAILURE:
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
