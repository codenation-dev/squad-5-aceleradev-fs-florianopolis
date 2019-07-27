import { get, post } from "../utils/api";
class ServiceUser {
  static getUsers() {
    return get("users", true);
  }
  static signUser(credentials) {
    credentials = JSON.stringify(credentials);
    return post("signup", credentials, true);
  }
}

export default ServiceUser;
