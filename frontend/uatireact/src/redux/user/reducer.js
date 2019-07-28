import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  userList: [],
  loading: false,
  success: false,
  error: false
};

function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.USER.REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.USER.SUCCESS:
      return {
        ...state,
        userList: action.payload.userList,
        loading: false,
        error: false
      };
    case ActionTypes.USER.FAILURE:
      return {
        ...state,
        userList: [],
        loading: false,
        error: true
      };

    case ActionTypes.SIGN.REQUEST:
      return {
        ...state,
        credentials: action.payload.credentials,
        loading: true
      };
    case ActionTypes.SIGN.SUCCESS:
      return {
        ...state,
        success: true
      };
    case ActionTypes.SIGN.FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}

export default User;
