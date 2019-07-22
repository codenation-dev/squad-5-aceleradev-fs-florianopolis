import { get } from "../utils/api";
class ServiceUser {
  static getUsers() {
    return get("alerts");
  }
}

export default ServiceUser;
