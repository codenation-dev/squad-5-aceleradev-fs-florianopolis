import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  candidates: [],
  pageNumber: 1,
  total: 0,
  query: "",
  erro: ""
};

function Candidates(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_LOAD_CANDIDATES:
      return {
        ...state,
        candidates: action.payload.candidates,
        pageNumber: action.payload.pageNumber,
        total: action.payload.total,
        query: action.payload.query,
        err: ""
      };
    case ActionTypes.FAILURE_LOAD_CLIENTS:
      return {
        ...state,
        candidates: [],
        pageNumber: 1,
        total: 0,
        query: "",
        err: action.payload.err
      };
    default:
      return state;
  }
}

export default Candidates;