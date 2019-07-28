import { get } from "../utils/api";

class ServiceClients {
  static async loadClientsDashboard() {
    return get("clients", true);
  }

  static filterClients(query = "", pageNumber = 1, clients = []) {
    const filtered = query? clients.filter(c => c.name.toLowerCase().includes(query)) : clients;
    const offset = filtered.filter((c, i) => (i >= (pageNumber - 1) * 10)  && (i < pageNumber * 10));
    return offset;
  }
}

export default ServiceClients;
