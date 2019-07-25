class ServiceClients {
  static async loadClientsDashboard(query, pageNumber) {
    return {
      clients: ["José", "Maria", "João"],
      totalClients: 3,
      pageNumber,
      query
    };
  }
}

export default ServiceClients;
