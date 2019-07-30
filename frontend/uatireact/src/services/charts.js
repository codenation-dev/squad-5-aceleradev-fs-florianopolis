import { get } from '../utils/api';

class ServiceCharts {
  static getAvgSalaries() {
    return get('dbinfo/avgSalaries', true);
  }

  static async loadAlerts() {
    return get("alerts", true);
  }

  static buildChartNotificationsSentPerDay(alerts) {
    const map = {};

    alerts.forEach(a => {
      const sentAtDate = a.sentAt.slice(0, 10);
      const quantity = map[sentAtDate];
      map[sentAtDate] = !quantity? 1 : quantity + 1;
    });

    const formattedData = [];
    const keys = Object.keys(map)

    for (const key of keys) {
      const value = map[key];

      formattedData.push({
        name: key,
        quantity: value
      });
    }

    return formattedData;
  }
}

export default ServiceCharts;
