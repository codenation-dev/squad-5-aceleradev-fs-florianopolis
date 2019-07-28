import { post } from "../utils/api";
class ServiceNotification {
  static getNotifications(obj) {
    return post("alerts", obj, true);
  }
}

export default ServiceNotification;
