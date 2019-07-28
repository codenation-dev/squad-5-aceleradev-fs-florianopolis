import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  file: {},
  loading: false,
  text: "Envie seu arquivo"
};

function Clients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_SUBMIT_FILE:
      return {
        ...state,
        file: action.payload,
        loading: true,
        text: "Fazendo upload"
      };
    case ActionTypes.SUCCESS_SUBMIT_FILE:
      return {
        ...state,
        loading: false,
        text: "Upload feito com sucesso"
      };
    case ActionTypes.FAILURE_SUBMIT_FILE:
      return {
        ...state,
        loading: false,
        text: `Falha no upload: ${action.payload.message}`
      };
    default:
      return state;
  }
}

export default Clients;
