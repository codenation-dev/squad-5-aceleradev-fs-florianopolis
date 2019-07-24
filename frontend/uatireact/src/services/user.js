import { get, post } from "../utils/api";
class ServiceUser {
  static getUsers() {
    return get("users");
  }
  static signUser(credentials) {
    return post("signup", credentials, true);
  }
}

export default ServiceUser;
