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
        fileSelected: "",
        loading: true,
        success: true,
        error: false,
        resetFile: false
      };
    case ActionTypes.IMPORT.SUCCESS:
      return {
        ...state,
        file: "",
        fileSelected: "",
        loading: false,
        success: true,
        error: false,
        resetFile: false
      };
    case ActionTypes.IMPORT.FAILURE:
      return {
        ...state,
        file: "",
        fileSelected: action.payload.file,
        loading: false,
        success: false,
        error: true,
      };
    case ActionTypes.FILE.REQUEST:
      return {
        ...state,
        file: "",
        fileSelected: action.payload.file,
        loading: false,
        success: false,
        error: false,
        resetFile: false
      };
    case ActionTypes.FILE.RESET:
      return {
        ...state,
        file: "",
        fileSelected: "",
        loading: false,
        success: false,
        error: false,
        resetFile: true
      };
    default:
      return state;
  }
}

export default Import;
