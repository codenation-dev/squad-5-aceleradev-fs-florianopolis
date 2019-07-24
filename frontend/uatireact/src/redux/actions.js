export const ActionTypes = {
  REQUEST_ATTEMPT_LOGIN: "REQUEST_ATTEMPT_LOGIN",
  SUCCESS_ATTEMPT_LOGIN: "SUCCESS_ATTEMPT_LOGIN",
  FAILURE_ATTEMPT_LOGIN: "FAILURE_ATTEMPT_LOGIN",
  REQUEST_LOGOUT: "REQUEST_LOGOUT",
  REQUEST_LOAD_CHARTS: "REQUEST_LOAD_CHARTS",
  FAILURE_LOAD_CHARTS: "FAILURE_LOAD_CHARTS",
  SUCCESS_LOAD_CHARTS: "SUCCESS_LOAD_CHARTS",
  REQUEST_SUBMIT_FILE: "REQUEST_SUBMIT_FILE",
  SUCCESS_SUBMIT_FILE: "SUCCESS_SUBMIT_FILE",
  FAILURE_SUBMIT_FILE: "FAILURE_SUBMIT_FILE"
};

export function uploadClients(file) {
  return {
    type: ActionTypes.REQUEST_SUBMIT_FILE,
    payload: {
      file
    }
  };
}

export function login(credentials) {
  return {
    type: ActionTypes.REQUEST_ATTEMPT_LOGIN,
    payload: {
      credentials
    }
  };
}

export function loadCharts() {
  return {
    type: ActionTypes.REQUEST_LOAD_CHARTS
  }
}

export function logout() {
  return {
    type: ActionTypes.REQUEST_LOGOUT
  };
}
