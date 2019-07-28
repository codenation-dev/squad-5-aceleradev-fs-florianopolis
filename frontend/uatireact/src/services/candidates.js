class ServiceCandidates {
  static async loadCandidates(query = "", pageNumber = 1) {
    return {
      candidates: [{name: "José", publico: "Sim", salary: "15000"}, 
                   {name: "Maria", publico: "Não", salary: "10000"}, 
                   {name: "João", publico: "Sim", salary: "8000"}],
      total: 3,
      pageNumber,
      query
    };
  }
}

export default ServiceCandidates;
