export const ActionTypes = {
  REQUEST_ATTEMPT_LOGIN: "REQUEST_ATTEMPT_LOGIN",
  SUCCESS_ATTEMPT_LOGIN: "SUCCESS_ATTEMPT_LOGIN",
  FAILURE_ATTEMPT_LOGIN: "FAILURE_ATTEMPT_LOGIN",
  REQUEST_LOGOUT: "REQUEST_LOGOUT"
};

export function login(credentials) {
  return {
    type: ActionTypes.REQUEST_ATTEMPT_LOGIN,
    payload: {
      credentials
    }
  };
}
export function logout() {
  return {
    type: ActionTypes.REQUEST_LOGOUT
  };
}
