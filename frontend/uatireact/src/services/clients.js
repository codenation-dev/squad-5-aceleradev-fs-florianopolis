class ServiceClients {
  static async loadClientsDashboard(query = "", pageNumber = 0) {
    return {
      clients: ["José", "Maria", "João"],
      totalClients: 3,
      pageNumber,
      query
    };
  }
}

export default ServiceClients;
