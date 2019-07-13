import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={() => {}}>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
