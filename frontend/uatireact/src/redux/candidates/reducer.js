import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  candidates: [],
  err: ""
};

function Candidates(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.CANDIDATES.SUCCESS:
      return {
        ...state,
        candidates: action.payload.candidates,
        err: ""
      };
    case ActionTypes.CLIENTS.FAILURE:
      return {
        ...state,
        candidates: [],
        err: action.payload.err
      };
    default:
      return state;
  }
}

export default Candidates;