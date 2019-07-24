class ServiceCharts {
  static async loadClientsRelation() {
    return [
      {
        name: "Clientes",
        quantity: 86
      },
      {
        name: "Candidatos",
        quantity: 52
      },
      {
        name: "Servidores públicos",
        quantity: 38
      },
      {
        name: "Salários acima de R$ 20000",
        quantity: 14
      },
      {
        name: "Total de Cidadões",
        quantity: 218
      }
    ];
  }

  static async loadNotificationsSentPerDay() {
    return [
      {
        name: "23/07",
        quantity: 20
      },
      {
        name: "22/07",
        quantity: 15
      },
      {
        name: "21/07",
        quantity: 16
      },
      {
        name: "20/07",
        quantity: 18
      },
      {
        name: "19/07",
        quantity: 19
      }
    ];
  }

  static async loadNewClientsPerDay() {
    return [
      {
        name: "19/07",
        current: 20,
        newClients: 2
      },
      {
        name: "20/07",
        current: 22,
        newClients: 0
      },
      {
        name: "21/07",
        current: 22,
        newClients: 1
      },
      {
        name: "22/07",
        current: 23,
        newClients: 2
      },
      {
        name: "23/07",
        current: 25,
        newClients: 3
      }
    ];
  }
}

export default ServiceCharts;
