const TYPES = ["REQUEST", "SUCCESS", "FAILURE", "CANCEL", "RESET"];

const createActionTypes = base => {
  const ref = {};

  TYPES.forEach(type => {
    ref[type] = `${type}_${base}`;
  });

  return ref;
};

export const ActionTypes = {
  LOGIN: createActionTypes("ATTEMPT_LOGIN"),
  LOGOUT: createActionTypes("LOGOUT"),
  USER: createActionTypes("ATTEMPT_USER"),
  SIGN: createActionTypes("SIGN_USER"),
  NOTIFICATION: createActionTypes("ATTEMPT_NOTIFICATION"),
  IMPORT: createActionTypes("IMPORT"),
  FILE: createActionTypes("FILE"),
  CHART: createActionTypes("CHART"),
  CANDIDATES: createActionTypes("CANDIDATES"),
  CLIENTS: createActionTypes("CLIENTS")
};

export function loadCharts() {
  return {
    type: ActionTypes.CHART.REQUEST
  }
}

export function getUsers() {
  return {
    type: ActionTypes.USER.REQUEST
  };
}

export function getNotifications() {
  return {
    type: ActionTypes.NOTIFICATION.REQUEST 
  };
}

export function login(credentials) {
  return {
    type: ActionTypes.LOGIN.REQUEST,
    payload: {
      credentials
    }
  };
}

export function importClients(file) {
  return {
    type: ActionTypes.IMPORT.REQUEST,
    payload: {
      file
    }
  };
}
export function selectFile(file) {
  
  return {
    type: ActionTypes.FILE.REQUEST,
    payload: {
      file
    }
  };
}
export function resetFile(file) {
  return {
    type: ActionTypes.FILE.RESET
  };
}

export function cadastraUser(credentials) {
  return {
    type: ActionTypes.SIGN.REQUEST,
    payload: {
      credentials
    }
  };
}

export function loadClients(query, pageNumber) {
  return {
    type: ActionTypes.CLIENTS.REQUEST,
    payload: {
      query, pageNumber
    }
  }
}

export function loadCandidates() {
  return {
    type: ActionTypes.CANDIDATES.REQUEST
  }
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT.REQUEST
  };
}
