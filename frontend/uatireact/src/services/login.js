import { post } from "../utils/api";

class ServiceLogin {
  static tryLogin(payload) {
    return post(payload);
  }
}

export default ServiceLogin;
