import React from "react";

const clients = [
  {
    name: "Cliente 1"
  },
  {
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
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
