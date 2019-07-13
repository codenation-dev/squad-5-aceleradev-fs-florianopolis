import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={() => {}}>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
