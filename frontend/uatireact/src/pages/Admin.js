import React from "react";

const Admin = () => {
  return (
    <div>
      <h1>Admin page</h1>
      <form onSubmit={() => {}}>
        <input type="text" placeholder="new person to be notified" />
        <button type="submit">Add person</button>
      </form>
    </div>
  );
};

export default Admin;
