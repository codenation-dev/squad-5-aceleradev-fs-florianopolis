import { post } from "../utils/api";

class ServiceLogin {
  static tryLogin(payload) {
    return post("login", payload);
  }
}

export default ServiceLogin;
