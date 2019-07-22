import { get } from "../utils/api";
class ServiceNotification {
  static getNotifications() {
    return get("alerts");
  }
}

export default ServiceNotification;
