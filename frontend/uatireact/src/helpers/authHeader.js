export function authHeader() {
  // return authorization header with basic auth credentials
  let token = localStorage.getItem("userToken");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
export function isLogged() {
  let token = localStorage.getItem("userToken");

  if (token) {
    return true;
  } else {
    return false;
  }
}
