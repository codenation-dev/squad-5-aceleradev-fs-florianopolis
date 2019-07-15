import React from "react";

const clients = [
  {
    id: 1,
    name: "Cliente 1"
  },
  {
    id: 2,
    name: "Cliente 2"
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard-div">
      <h1>Welcome to the Dashboard</h1>
      <h2>Clientes:</h2>
      <ul>
        {clients.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
