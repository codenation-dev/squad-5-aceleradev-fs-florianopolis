import { get } from "../utils/api";

class ServiceClients {
  static async loadClientsDashboard() {
    return get("clients", true);
  }

  static filterClientsByQuery(query = "", clients = []) {
    return query? clients.filter(c => c.name.toLowerCase().includes(query)) : clients;
    
  }

  static filterClientsByOffset(pageNumber = 1, clients = []) {
    return clients.filter((c, i) => (i >= (pageNumber - 1) * 10)  && (i < pageNumber * 10));
  }
}

export default ServiceClients;
