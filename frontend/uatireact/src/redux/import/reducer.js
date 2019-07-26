import { ActionTypes } from "../actions";
const INITIAL_STATE = {
  file: "",
  fileSelected: "",
  loading: false,
  success: false,
  error: false,
  resetFile: false
};

function Import(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.IMPORT.REQUEST:
      return {
        ...state,
        file: action.payload.file,
        loading: true
      };
    case ActionTypes.IMPORT.SUCCESS:
      return {
        ...state,
        file: "",
        loading: false,
        success: true,
        error: false
      };
    case ActionTypes.IMPORT.FAILURE:
      return {
        ...state,
        file: "",
        loading: false,
        success: false,
        error: true
      };
    case ActionTypes.SELECT.REQUEST:
      return {
        ...state,
        fileSelected: action.payload.file
      };
    case ActionTypes.SELECT.RESET:
      return {
        ...state,
        fileSelected: "",
        resetFile: true
      };
    default:
      return state;
  }
}

export default Import;
