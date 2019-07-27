import { get } from "../utils/api";
class ServiceNotification {
  static getNotifications() {
    return get("alerts", true);
  }
}

export default ServiceNotification;
